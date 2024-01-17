import React from 'react'
import { PaymentHeaders } from '../../models/payment/PaymentHeaders';
import { PaymentResponse } from '../../models/payment/PaymentResponse';
import { PaymentProps } from '../../models/payment/PaymentProps';

// SmartId, MobiilId, Pakiautomaadid, Rahvastikuregister
const Payment = (props: PaymentProps) => {
//const Payment = ({cartSum}) => { // 
  // "amount": props.cartSum xxxxxx
  // "amount": cartSum <----

  const pay = () => {
    // läbi EveryPay keskkonna
    const paymentUrl: string | undefined = process.env.REACT_APP_EVERYPAY_PAYMENT_URL;
    if (paymentUrl===undefined)return; 
    const paymentBody = {
      "api_username": process.env.REACT_APP_EVERYPAY_USERNAME,
      "account_name": "EUR3D1",
      "amount": 11,
      "order_reference": Math.random() * 9999999,
      "nonce": "a9b7f7e" + new Date() + Math.random() * 9999999,
      "timestamp": new Date(),
      "customer_url": process.env.REACT_APP_EVERYPAY_CUSTOMER_URL
      };
    const paymentHeaders: PaymentHeaders = {
      "Authorization": process.env.REACT_APP_EVERYPAY_AUTHORIZATION || "",
      "Content-Type": "application/json"
    };

    fetch(paymentUrl, {"method": "POST", "body": JSON.stringify(paymentBody), "headers": paymentHeaders})
      .then((res: Response) => res.json())
      // .then((json: PaymentResponse) => console.log(JSON.stringify(json)));
      .then((json: PaymentResponse) => window.location.href = json.payment_link);
  }

  // HTMLs: <Link> <--- alati töötav, koodi käima ei pane
  // JavaScript HOOK: useNavigate() <- rakenduse siseselt, kood ka käima, koodi allaossa
  // JavaScript: window.location.href <- rakenduse väline URL

  return (
    <button onClick={pay}>Maksa</button>
  )
}

export default Payment