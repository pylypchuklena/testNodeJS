const express = require('express');
const Order = require('mongoose').model('Order');

const router = new express.Router();

function mapOrder(item) {
  var mappedOrder = {}
  if (item) {
    mappedOrder.orderId = item._id && item._id;
    mappedOrder.type = item.type && item.type;
    mappedOrder.orderDate = item.orderDate && item.orderDate;
    mappedOrder.orderStatus = item.orderStatus && item.orderStatus;
    mappedOrder.isActive = item.isActive && item.isActive;
    mappedOrder.userId = item.userId && item.userId;
    mappedOrder.dayOfOrder = item.dayOfOrder && item.dayOfOrder;
  }
  return mappedOrder;
}

function validateOrderForm(payload){
  const errors = {};
  let isFormValid = true;
  let message = '';

  if(!payload || !payload.order.types||payload.order.types.length == 0){
    isFormValid = false;
    errors.services = 'Services must be more then 0';
  }
  if(!payload || new Date() > payload.order.orderDate){
    isFormValid = false;
    errors.orderDay = 'Order day must be later then today';
  }
  if (!isFormValid) {
    message = "Check the form for errors";
  }
  return{
    success: isFormValid,
    message,
    errors
  }
}

router.post('/order', (req, res, next) => {

  //add validation
  const validationResult = validateOrderForm(req.body)

  if(!validateOrderForm.success){
    return res.status(400).json({
      success:false,
      message: validationResult.message,
      errors: validateOrderForm.errors
    })
  }
 
  var neworder = {
    isActive : true,
    orderDate : req.body.order.orderDate,
    type : req.body.order.types,
    userId: req.verifiedUser._id,
    orderStatus: '1',
    dayOfOrder :new Date()
  }
  Order.create(neworder).then(function (order) {
    return res.status(200).json({
      success: true,
      message: 'You have successfully',
      order: mapOrder(order)
    })
  })

})

router.get('/order', (req, res) => {

  Order.find({}, (err, orders) => {
    if (err) {
      return res.status(400).json({
        message: 'error api get'
      })
    }
    else {
      return res.status(200).json({
        message: "success",
        orders: orders.map((item) => { return mapOrder(item) })
      })
    }
    
  })
})

router.put('/order/:id', (req, res, next) => {
  var updatedOrder = req.body;
  Order.findByIdAndUpdate({ _id: req.params.id }, req.body).then((order) => {
    Order.findOne({ _id: req.params.id }).then((order) => {
      res.status(200).json({
        success: true,
        message: 'You have successfully',
        order: mapOrder(order)
      })
    }).catch((err) => {
      res.status(400);
    })
  }).catch((err) => {
    res.status(400)
  })

})
module.exports = router;