const express = require("express");
const {
    createNote,
    getMyNotes,
    getSingleNote,
    updateNote,
    deleteNote,
} = require("../controllers/note.controller");
const protect = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", protect, createNote);
router.get("/", protect, getMyNotes);
router.get("/:id", protect, getSingleNote);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

module.exports = router;
