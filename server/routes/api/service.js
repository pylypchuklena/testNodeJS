const express = require('express');
const Service = require('mongoose').model('Service');

const router = new express.Router();

router.get('/service', (req, res) => {

  Service.find({}, (err, services) => {
    if (err) {
      return res.status(400).json({
        message: 'error api get'
      })
    }
    else {
      return res.status(200).json({
        message: "success",
        services: services
      })
    }
    
  })
})

router.post('/service', (req, res, next) => {
  var newService = {
    isActive : true,
    type : req.body.type,
    name:req.body.name,
    price:req.body.price,
    description:req.body.description
  }
  Service.create(newService).then(function (service) {
    return res.status(200).json({
      success: true,
      message: 'You have successfully add new service'
    })
  })

})

router.put('/service/:id', (req, res, next) => {
  var updatedService = req.body;
  Service.findByIdAndUpdate({ _id: req.params.id }, updatedService).then((service) => {
    Service.findOne({ _id: service._id }).then((service) => {
      res.status(200).json({
        success: true,
        message: 'You have successfully',
        service: service
      })
    }).catch((err) => {
      res.status(400);
    })
  }).catch((err) => {
    res.status(400)
  })

})

module.exports = router;