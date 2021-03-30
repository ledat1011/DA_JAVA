var paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'ASZqe36bbJpdX4CLjNNqbH9Tva-AJEX1tcFUz6V_bcayi3RXTL2phg4-4LXDXGKiRCPIx0XDlXh-Wbt5',
    'client_secret': 'EEvnzHIHMny1sFaQe5LSAv3GwKOD5nsXCOmD5dxf-VhC27swb_xGwMdk61YQowVB8Hye7w0lcKDumRpW'
  });

function createPayment(data) {
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/",
            "cancel_url": "http://localhost:3000/"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": data.name,
                    "sku": "item",
                    "price": "1.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "1.00"
            },
            "description": data.description
        }]
    };
    
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
        }
    });
} 
  
module.exports = createPayment