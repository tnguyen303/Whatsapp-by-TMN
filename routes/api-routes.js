const mongoose = require("mongoose");
const Message = require("../models/Message");
const Chat = require("../models/Chat");
const User = require('../models/User');
// const db = require('../models')

module.exports = function(app) {
  //post a new message using Message Schema then add message id using the Chat Schema
  app.post("/api/chat/:user1/:user2", function(req, res) {
    Message.create(req.body).then(function(data) {
      //check whether chat between these 2 users already exists
      Chat.find({
        userList: { $all: [req.params.user1, req.params.user2] }
      }).then(function(data1) {
        if (isNotEmpty(data1)) {
          //if chat already exists, push id of the new messaeg the chat
          return Chat.findOneAndUpdate(
            { userList: { $all: [req.params.user1, req.params.user2] } },
            { $push: { messageList: data._id } },
            { new: true }
          ).catch(function(err) {
            console.log(err);
          });
        } else {
          //otherwise, create new chat object and push msg id
          Chat.create({ userList: [req.params.user1, req.params.user2] })
            .then(function() {
              Chat.findOneAndUpdate(
                { userList: { $all: [req.params.user1, req.params.user2] } },
                { $push: { messageList: data._id } }
              );
            })
            .catch(function(err) {
              console.log(err);
            });
        }
      });
    });

    res.end();
  });

  //get chat messages in history
  app.get("/api/chat/:user1/:user2", function(req, res) {
    Chat.findOne({
      userList: { $all: [req.params.user1, req.params.user2] }
    })
      .populate("messageList")
      .then(function(data) {
        res.json(data.messageList);
      })
      .catch(function(err){
        console.log(err);
      })
  });

  
};

function isNotEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return true;
    }
  }

  return false;
}
