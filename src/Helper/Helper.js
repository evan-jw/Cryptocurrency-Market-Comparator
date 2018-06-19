import axios from "axios";

export function ParseToTwoDecimal(val) {
  return parseFloat(val).toFixed(2);
}

export function GetApiData(fromCurrency, toCurrency) {
  return axios.get(
    "https://api.cryptonator.com/api/full/" + fromCurrency + "-" + toCurrency
  );
}

/*
Base - Base currency code
Target - Target currency code
Price - Volume-weighted price
Volume - Total trade volume for the last 24 hours
Change - Past hour price change
Timestamp - Update time in Unix timestamp format
Success - True or false
Error - Error description
*/
