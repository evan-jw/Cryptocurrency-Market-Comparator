import React from "react";
import { Grid, Row, Col, ButtonToolbar, Button } from "react-bootstrap";
import { ParseToTwoDecimal } from "../Helper/Helper";
import "./MarketsInfo.css";

export const MarketsInfo = ({ marketData }) => {
  let marketList = marketData.map((item, index) => {
    console.log(item.market + " - " + item.price + " - " + item.volume);
    return (
      <div key={index}>
        <Col xs={4} sm={4} md={4} lg={4}>
          {item.market}
        </Col>
        <Col xs={4} sm={4} md={4} lg={4}>
          {ParseToTwoDecimal(item.price)}
        </Col>
        <Col xs={4} sm={4} md={4} lg={4}>
          {ParseToTwoDecimal(item.volume)}
        </Col>
      </div>
    );
  });

  function toggleTable() {
    let btn = document.querySelector("#show-markets-btn");
    let element = document.querySelector(".markets-table");
    let className = element.className;
    if (className.indexOf("animated") >= 0) {
      btn.innerHTML = "Hide markets";
      element.className = "markets-table";
    } else {
      btn.innerHTML = "Show markets";
      element.className = "markets-table animated";
    }
  }

  return (
    <div>
      <ButtonToolbar className="show-market">
        <Button id="show-markets-btn" bsStyle="primary" onClick={toggleTable}>
          Hide Exchange
        </Button>
      </ButtonToolbar>

      <Grid className="markets-table">
        <div className="row-header">
          <Col xs={4} sm={4} md={4} lg={4}>
            <b>Name</b>
          </Col>
          <Col xs={4} sm={4} md={4} lg={4}>
            <b>Price</b>
          </Col>
          <Col xs={4} sm={4} md={4} lg={4}>
            <b>Volume</b>
          </Col>
        </div>
        {marketList}
      </Grid>
    </div>
  );
};
