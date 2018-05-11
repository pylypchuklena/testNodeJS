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

router.post('/order', (req, res, next) => {

  //validation
  var currentDay = new Date();
  console.log(req.body)
  var neworder = {
    isActive : true,
    orderDate : req.body.orderDate,
    type : req.body.types,
    userId: req.verifiedUser._id,
    orderStatus: '1',
    dayOfOrder :currentDay
  }
  Order.create(neworder).then(function (order) {
    return res.status(200).json({
      success: true,
      message: 'You have successfully'
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
  console.log(req.body);
  console.log('responce', res.body)
  var updatedOrder = req.body;
  Order.findByIdAndUpdate({ _id: req.params.id }, req.body).then((order) => {
    Order.findOne({ _id: req.params.id }).then((order) => {
      console.log('find one ', order)
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