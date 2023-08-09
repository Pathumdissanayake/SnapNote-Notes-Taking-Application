const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
  title: {
    type: String,
    requred: true, //validating title field
  },
  content: {
    type: String,
    requred: true, //validating content field
  },
});

const Notes = mongoose.model("Note", NotesSchema);
module.exports = Notes;
