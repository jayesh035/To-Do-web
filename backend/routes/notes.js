const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all the notes using: GET "/api/notes/fetchallnotes". login required
router.get("/fetchAllNotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });

    res.json(notes);
  } catch (error) {
    res.status(500).send("internal server error");
  }
});

// ROUTE 2: add the notes using: POST "/api/notes/addnote". login required



router.post(
  "/addnote",
  [
    body("title", "Enter a valid name").isLength({ min: 3 }),
    // body('description', 'Enter a valid email').isEmail(),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  fetchuser,
  async (req, res) => {
    const { title, description, tag } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      res.status(500).send("internal server error");
      console.log(error);
    }
  }
);

// ROUTE 3: Update the existing notes using: PUT "/api/notes/updatenote". login required
router.put(
    "/updatenote/:id",
    fetchuser,
    async (req, res) => {
      try {
      const {title , description,tag}=req.body;
      //create a newNote object
      const newNote={};
      if(title){newNote.title=title}
      if(description){newNote.description=description}
      if(tag){newNote.tag=tag}

      //Find the note to be updated and update it
      let note =await Notes.findById(req.params.id)
      if(!note){return res.status(404).send("Not found!")}
      if(note.user.toString() !== req.user.id)
      {
       return  res.status(401).send("Not Allowed")
      }
      note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
      res.json({note});
    

      } catch (error) {
        res.status(500).send("internal server error");
      }
    }
  );

  // ROUTE 4: delete the existing notes using: DELETE "/api/notes/deletenote". login required
router.delete(
  "/deletenote/:id",
  fetchuser,
  async (req, res) => {
    
        try {
          //FIND note to be deleted and delete it
          let note =await Notes.findById(req.params.id);
          if(!note)
          {
            return res.status(404).send("Not found");
          }
          // Allow deletion only if user owns this note

          if(note.user.toString() !== req.user.id)
          {
            return res.status(401).send("Not Allowed");
          }
          note =await Notes.findByIdAndDelete(req.params.id);
          res.json({"Success":"Note has been deleted",note:note});

    } catch (error) {
      res.status(500).send("internal server error");
    }
  }
);
  

module.exports = router;