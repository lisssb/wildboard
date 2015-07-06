/************
 * Requires *
 ************/
var Board = require("../models/board");

/****************************
 * Board Controller Handlers *
 ****************************/
var BoardController = {
  create: function(user, data, fn) {
    //Limit the user dashboards to 4
    if (user.boards.length >= 4) {
      return fn({
        message: "Can´t create more boards."
      }, null);
    }

    Board.create({
      name: data.name,
      user: user._id
    }, function(err, board) {
      if (err) {
        return fn({
          code: 430,
          message: "There was an error. (430)"
        }, null);
      }
      if (!board) {
        return fn({
          code: 431,
          message: "There was an error. (431)"
        }, null);
      } else {
        return fn(null, board);
      }
    });
  },

  update: function(user, id, data, fn) {
    if(!data.name || data.name === ""){
      return fn({
        code: 7454,
        message: "The new name cant be empty.",
      });
    }
    Board.update({
      user: user._id,
      _id: id
    }, {
      name: data.name
    }, function(err, numAffected) {
      if(err){
        fn({
          code: 3543,
          message: "Couldn´t update the board.",
        });
      } else if(numAffected == 0) {
        fn({
          code: 3544,
          message: "Couldn´t update the board.",
        });
      }
      else{
        fn(null, {message: "Updated " +data.name});
      }
    });
  },

  delete: function(user, id, fn) {

  },

  findAllByUser: function(user, fn) {
    Board.find({
      user: user._id
    }, fn);
  },

  findById: function(id, fn) {
    Board.findOne({
      _id: id
    }, fn);
  }
};
module.exports = BoardController;