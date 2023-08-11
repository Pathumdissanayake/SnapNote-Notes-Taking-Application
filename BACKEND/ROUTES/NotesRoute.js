const router = require("express").Router();
let Notes = require("../MODELS/NotesModel");

// create ~ http://localhost:4000/Notes/newNote
router.route("/newNote").post((req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  const newNote = new Notes({
    title,
    content,
  });

  newNote
    .save()
    .then(() => {
      res.json("Note Created!!");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error creating note" });
    });
});

// read ~ http://localhost:4000/Notes/notes
router.route("/notes").get((req, res) => {
  // fetch all notes
  Notes.find()
    .then((noteData) => {
      res.json(noteData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error fetching notes" });
    });
});

// update ~ http://localhost:4000/Notes/edit/id
router.route("/edit/:noteId").put(async (req, res) => {
  let NoteID = req.params.noteId; // Use req.params to get the ID from the URL

  const { title, content } = req.body;

  const editNote = {
    title,
    content,
  };

  //checking for an existing record
  try {
    const updatedNote = await Notes.findByIdAndUpdate(NoteID, editNote, {
      new: true, // This ensures that the updated document is returned
    });
    if (updatedNote) {
      res.status(200).json({ status: "Note Edited!!", note: updatedNote });
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "Error in editing notes!!", error: err.message });
  }
});


//delete ~ http://localhost:4000/Notes/delete
  router.route("/delete/:noteId").delete(async (req, res) => {
    let NoteID = req.params.noteId;
    await Notes.findByIdAndDelete(NoteID)
      .then(() => {
        res.status(200).send({ status: "Note Deleted" });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ status: "Error with deleting note", error: err.message });
      });
  });;

module.exports = router;
