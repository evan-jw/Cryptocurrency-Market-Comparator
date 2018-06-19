import React from "react";
import PropTypes from "prop-types";
import { MarketsInfo } from "./MarketsInfo";
import { Grid, Row, Col, ButtonToolbar, Button } from "react-bootstrap";
import "./GeneralInfo.css";

class DetailInfo extends React.Component {
  render() {
    let currencyInfo = this.props.data.info;
    return (
      <div className="info-details-container">
        <div>
          1 {this.props.data.src} : {currencyInfo.price}{" "}
          {this.props.data.target}
        </div>
        <div>
          Trade Volume (24 hr) : {currencyInfo.volume ? currencyInfo.volume : 0}
        </div>
        <div>Price Change (Past hour) : {currencyInfo.change}</div>
        <MarketsInfo marketData={this.props.data.markets} />
      </div>
    );
  }
}

const DetailError = ({ errMsg }) => {
  return <div className="info-details-container">{errMsg}</div>;
};

const DetailLoading = () => {
  return (
    <div className="info-details-container">
      <i className="fa fa-spinner fa-spin" />
    </div>
  );
};

export const GeneralInfo = ({ data }) => {
  let infoSection = "";

  if (data.showLoading) {
    infoSection = <DetailLoading />;
  }

  if (data.showInfo) {
    infoSection = <DetailInfo data={data} />;
  }
  if (data.showError) {
    infoSection = <DetailError errMsg={data.errorMsg} />;
  }
  return infoSection;
};

DetailInfo.propTypes = {
  data: function(props, propName, componentName) {
    let properties = {
      showInfo: true,
      showLoading: true,
      showError: true,
      src: "string",
      target: "string",
      info: {
        price: 1,
        volume: 1,
        change: 1
      },
      errorMsg: "string"
    };

    for (let index in properties) {
      if (typeof props.data[index] !== typeof properties[index]) {
        return propTypesErrorMsg(propName, index, componentName);
      }
    }
  }
};

function propTypesErrorMsg(propName, objName, componentName) {
  return new Error(
    "Invalid prop " +
      propName +
      "." +
      objName +
      " supplied to " +
      componentName +
      ". Validation failed."
  );
}
