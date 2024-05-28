const express = require("express");
const router = express.Router();
const Notes = require('../models/Note');
var fetchuser = require('../middleware/fetchUser')
const { body, validationResult } = require('express-validator');


//Route 1: Get all the notes related to a user
router.get("/fetchnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        console.log(notes)
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured");
    }

})



//Route 2 : Add Notes: auth token required

router.post("/addnotes", fetchuser, [
    body('title', "Enter a min 3 char title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 char").isLength({ min: 5 })
], async (req, res) => {

    try {
        const { title, description, tag } = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const note = await Notes.create({
            title, description, tag, user: req.user.id
        })

        res.json(note)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured");
    }

})

//Route 3 : Update Notes : auth token required
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
    try {


        const { title, description, tag } = req.body
        //Create newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //find the note and update the note
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured");
    }
})

//Route 4: Delete Note
router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
    try {


        //find the note and delete the note
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }
        // find if the user owns that note or not
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured");
    }
})


module.exports = router