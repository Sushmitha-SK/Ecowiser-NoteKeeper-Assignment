import React, { useEffect, useRef, useState } from "react";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NoteModal = ({ note, onSave, onDelete, onClose }) => {
    const [editedNote, setEditedNote] = useState({ ...note });
    const [isPinned, setIsPinned] = useState(editedNote.isPinned || false);
    const modalRef = useRef(null);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedNote((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        const updatedNote = {
            ...editedNote,
            isPinned: isPinned,
            lastEdited: new Date(),
        };

        onSave(updatedNote)
            .then(() => {
                toast.success("Note updated successfully!");
            })
            .catch((error) => {
                console.error("Error updating note:", error);
                toast.error("Failed to update note. Please try again.");
            });
    };

    const togglePin = () => {
        setIsPinned((prevPinned) => !prevPinned);
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return "Unknown";
        const date = new Date(timestamp.seconds * 1000 || timestamp);
        return date.toLocaleString();
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);


    return (
        <div className="modal-overlay">
            <div className="modal-content" ref={modalRef}>
                <button
                    className="pin-btn"
                    onClick={togglePin}
                    style={{ position: "absolute", top: 10, right: 10, cursor: "pointer", color: '#f5ba13' }}
                >
                    {isPinned ? <PushPinIcon titleAccess="Unpin note" /> : <PushPinOutlinedIcon titleAccess="Pin note" />}
                </button>

                <input
                    type="text"
                    name="title"
                    value={editedNote.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="editTitleText"
                />
                <input
                    type="text"
                    name="tagline"
                    value={editedNote.tagline}
                    onChange={handleChange}
                    placeholder="Tagline"
                />
                <textarea
                    name="body"
                    value={editedNote.body}
                    onChange={handleChange}
                    placeholder="Body"
                />

                <div className='modal-footer'>
                    <p>
                        {editedNote.lastEdited
                            ? `Last edited: ${formatTimestamp(editedNote.lastEdited)}`
                            : `Created at: ${formatTimestamp(note.timestamp)}`}
                    </p>
                </div>

                <div className="modal-actions">
                    <button
                        className="delete-btn"
                        onClick={() => onDelete(note.id)}
                        style={{
                            position: "absolute",
                            bottom: "10px",
                            left: "10px",
                            cursor: "pointer",
                            color: "#f5ba13",
                            background: "none",
                            border: "none"
                        }}
                        title="Delete Note"
                    >
                        <DeleteIcon />
                    </button>

                    <button onClick={handleSave}>Save</button>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>

    )
}

export default NoteModal