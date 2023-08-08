const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const NotesSchema = new Schema ({
    Title : {
        type : String,
        requred : true //validating title field
    },
    Content : {
        type : String,
        requred : true //validating content field
    }
})

const Notes = mongoose.model("Note", NotesSchema);
module.exports = Notes;