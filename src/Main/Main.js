import React from "react";
import { Currencies, TargetCurrencies } from "../Currencies/Currencies";
import { GetApiData,ParseToTwoDecimal } from "../Helper/Helper";
import { GeneralInfo } from "./GeneralInfo";
import { Grid, Row, Col } from "react-bootstrap";
import "./Main.css";

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: "BTC",
      target: "AUD",
      showInfo: false,
      showError: false,
      showLoading: true,
      errorMsg: ""
    };

    this.ChangeSrc = this.ChangeSrc.bind(this);
    this.ChangeTarget = this.ChangeTarget.bind(this);
  }

  componentDidMount() {
    this.GetData(this.state.src, this.state.target);
  }
  ChangeSrc(e) {
    this.GetData(e.target.value, this.state.target);
  }

  ChangeTarget(e) {
    this.GetData(this.state.src, e.target.value);
  }

  GetData(src, target) {
    this.setState({
      src: src,
      target: target,
      showInfo: false,
      showError: false,
      showLoading: true
    });

    GetApiData(src, target).then(response => {
      let data = response.data;
      if (response.data.success) {
        let currencyData = data.ticker;
        this.setState({
          info: {
            price: ParseToTwoDecimal(currencyData.price),
            volume: ParseToTwoDecimal(currencyData.volume),
            change: ParseToTwoDecimal(currencyData.change)
          },
          markets: currencyData.markets,
          showLoading: false,
          showError: false,
          showInfo: true
        });
      } else {
        this.setState({
          showLoading: false,
          showError: true,
          showInfo: false,
          errorMsg: data.error
        });
      }
    });
  }

  GetCurrenciesOption(listCurrency) {
    return listCurrency.rows.map((item, index) => {
      return (
        <option key={index} value={item.code}>
          {item.code}
        </option>
      );
    });
  }

  render() {
    let options = this.GetCurrenciesOption(Currencies);
    let targetOptions = this.GetCurrenciesOption(TargetCurrencies);

    return (
      <Grid>
        <Row className="show-grid">
          <Col sm={12} md={12} lg={12} className="info-text">
            Please select your currencies
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12} lg={12} className="selector">
            <select value={this.state.src} onChange={this.ChangeSrc}>
              {options}
            </select>
            <span>
              <i className="fa fa-exchange" aria-hidden="true" />
            </span>
            <select value={this.state.target} onChange={this.ChangeTarget}>
              {targetOptions}
            </select>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm={12} md={12} lg={12}>
            <GeneralInfo data={this.state} />
          </Col>
        </Row>
      </Grid>
    );
  }
}
