const mongoose = require("mongoose");
const Note = require("../models/note.model");

const validateNote = ({ title, content }, partial = false) => {
    if (!partial || title !== undefined) {
        if (typeof title !== "string" || !title.trim() || title.trim().length > 200) return "Title must be between 1 and 200 characters";
    }
    if (!partial || content !== undefined) {
        if (typeof content !== "string" || !content.trim() || content.length > 10000) return "Content must be between 1 and 10000 characters";
    }
    return null;
};

const validId = (id) => mongoose.Types.ObjectId.isValid(id);
const notFound = (res) => res.status(404).json({ message: "Note not found" });

const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const validationError = validateNote({ title, content });
        if (validationError) return res.status(422).json({ message: validationError });
        const note = await Note.create({ title: title.trim(), content, user: req.user._id });
        return res.status(201).json({ message: "Note created successfully", note });
    } catch (error) {
        console.error("Note creation failed:", error.message);
        return res.status(500).json({ message: "Failed to create note" });
    }
};

const getMyNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 }).lean();
        return res.status(200).json({ message: "Notes fetched successfully", notes });
    } catch (error) {
        console.error("Notes listing failed:", error.message);
        return res.status(500).json({ message: "Failed to fetch notes" });
    }
};

const getSingleNote = async (req, res) => {
    try {
        if (!validId(req.params.id)) return notFound(res);
        const note = await Note.findOne({ _id: req.params.id, user: req.user._id }).lean();
        if (!note) return notFound(res);
        return res.status(200).json({ message: "Note fetched successfully", note });
    } catch (error) {
        console.error("Note fetch failed:", error.message);
        return res.status(500).json({ message: "Failed to fetch note" });
    }
};

const updateNote = async (req, res) => {
    try {
        if (!validId(req.params.id)) return notFound(res);
        const { title, content } = req.body;
        const validationError = validateNote({ title, content }, true);
        if (validationError) return res.status(422).json({ message: validationError });
        if (title === undefined && content === undefined) return res.status(422).json({ message: "Title or content is required" });
        const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
        if (!note) return notFound(res);
        if (title !== undefined) note.title = title.trim();
        if (content !== undefined) note.content = content;
        await note.save();
        return res.status(200).json({ message: "Note updated successfully", note });
    } catch (error) {
        console.error("Note update failed:", error.message);
        return res.status(500).json({ message: "Failed to update note" });
    }
};

const deleteNote = async (req, res) => {
    try {
        if (!validId(req.params.id)) return notFound(res);
        const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!note) return notFound(res);
        return res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Note deletion failed:", error.message);
        return res.status(500).json({ message: "Failed to delete note" });
    }
};

module.exports = { createNote, getMyNotes, getSingleNote, updateNote, deleteNote };
