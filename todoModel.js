const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    // title: { type: String, required: true, unique: true },
    // priority: { type: String, required: true },
    text: { type: String, required: true, unique: true },
    priority:{type:Number, required:false, unique:false},
    creator_id: { type: String, required: true}
    });
  
  module.exports = Todo = mongoose.model("todo", todoSchema);