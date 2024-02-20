// import all modules
const express = require("express")
let unirest = require('unirest');
const bodyparser = require("body-parser")
const app = express()

//use the body-parser and express json
app.use(bodyparser.urlencoded({ extended: false }))
app.use(express.json())

//server listening on port 3000
app.listen( 3000, () => {
    console.log("server runnning...")
})

//home route
app.get("/", ( res, req ) => {
    console.log("Mpesa api by mutuku kamau")
})

//
let req = unirest('POST', 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest')
.headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 1E515o09eRlfTbWUWWdJZk5ldlne'//token
})
.send(JSON.stringify({
    "BusinessShortCode": 174379,// paybill or till number
    "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwMjIwMDkyODM2",
    "Timestamp": "20240220092836",// time in the format YYYYMMDDHHMMSS
    "TransactionType": "CustomerPayBillOnline",// or CustomerBuyGoodsOnline
    "Amount": 1,// funds been sent or recieved
    "PartyA": 2547, // mpesa phone number sending money
    "PartyB": 174379, // till or paybill number
    "PhoneNumber": 2547, // mpesa phone number sending money
    "CallBackURL": "https://mydomain.com/path", // this is the endpoint in which the results will be sent by M-Pesa API.
    "AccountReference": "CompanyXLTD", // Identifier of the transaction for the CustomerPayBillOnline transaction type.
    "TransactionDesc": "Payment of X" // additional information/comment that can be sent along with the request from your system.
  }))
.end(res => {
    if (res.error) throw new Error(res.error);
    console.log(res.raw_body);
});