const express = require('express');
const User = require('mongoose').model('User');

const router = new express.Router();

function mapUser(item) {
  var mappedUser = {}
  if (item) {
    mappedUser.id = item._id && item._id;
    mappedUser.firstName = item.firstName && item.firstName;
    mappedUser.lastName = item.lastName && item.lastName;
    mappedUser.email = item.email && item.email;
    mappedUser.phone = item.phone && item.phone;
    mappedUser.role = item.role && item.role;
  }
  return mappedUser;
}

router.get('/dashboard', (req, res) => {

  User.find({}, (err, users) => {
    if (err) {
      return res.status(400).json({
        message: 'error api get'
      })
    }
    else {
      return res.status(200).json({
        message: "success",
        users: users.map((item) => { return mapUser(item) })
      })
    }
  })
})

router.put('/profile/:id', (req, res) => {
  //in findByIdAndUpdate return old version user so we findOne updated user and send response
  var updatedUser = req.body;
  console.log(updatedUser)
  User.findByIdAndUpdate({ _id: req.params.id }, req.body).then((user) => {
    console.log('find one and update ', user)
    User.findOne({ _id: req.params.id }).then((user) => {
      console.log('find one', user)
      res.status(200).json({
        user: mapUser(user)
      })

    }).catch((error) => {
      res.status(400);
    })
  }).catch((error) => {
    res.status(400);
  })
})

router.delete('/profile/:id', (req, res) => {
  User.findByIdAndRemove({ _id: req.params.id }).then((user) => {
    res.status(200).json({
      user: mapUser(user)
    });
  }).catch(error => {
    res.status(400);
  })
})


module.exports = router;