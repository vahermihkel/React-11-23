import React from 'react'

// SmartId, MobiilId, Pakiautomaadid, Rahvastikuregister
const Payment = (props) => {
//const Payment = ({cartSum}) => { // 
  // "amount": props.cartSum xxxxxx
  // "amount": cartSum <----

  const pay = () => {
    // läbi EveryPay keskkonna
    const paymentUrl = process.env.REACT_APP_EVERYPAY_PAYMENT_URL;
    const paymentBody = {
      "api_username": process.env.REACT_APP_EVERYPAY_USERNAME,
      "account_name": "EUR3D1",
      "amount": props.cartSum,
      "order_reference": Math.random() * 9999999,
      "nonce": "a9b7f7e" + new Date() + Math.random() * 9999999,
      "timestamp": new Date(),
      "customer_url": process.env.REACT_APP_EVERYPAY_CUSTOMER_URL
      };
    const paymentHeaders = {
      "Authorization": process.env.REACT_APP_EVERYPAY_AUTHORIZATION,
      // "Basic " + new Buffer(REACT_APP_EVERYPAY_USERNAME + ":" + REACT_APP_EVERYPAY_PASSWORD).toString("base64")
      "Content-Type": "application/json"
    };

    fetch(paymentUrl, {"method": "POST", "body": JSON.stringify(paymentBody), "headers": paymentHeaders})
      .then(res => res.json())
      // .then(json => console.log(json));
      .then(json => window.location.href = json.payment_link);
  }

  // HTMLs: <Link> <--- alati töötav, koodi käima ei pane
  // JavaScript HOOK: useNavigate() <- rakenduse siseselt, kood ka käima, koodi allaossa
  // JavaScript: window.location.href <- rakenduse väline URL

  return (
    <button onClick={pay}>Maksa</button>
  )
}

export default Payment