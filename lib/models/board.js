var mongoose = require("mongoose"),
    relationship = require("mongoose-relationship"),
    Schema = mongoose.Schema;

var boardSchema = new Schema({
  name: String,
  user: {
    type: Schema.ObjectId,
    ref: "User",
    childPath: "boards"
  },
  widgets: [{
    type: Schema.ObjectId,
    ref: "Board"
  }]
});

boardSchema.plugin(relationship, { relationshipPathName: "user" });

module.exports = mongoose.model("Board", boardSchema);