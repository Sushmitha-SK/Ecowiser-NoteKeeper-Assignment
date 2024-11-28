import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';

function NoteCard({ id, title, tagline, body, isPinned, togglePin, delete: deleteNote, onClick }) {
    return (
        <div className={`note ${isPinned ? "pinned" : ""}`} onClick={onClick}>
            <div className="note-pin">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        togglePin(id, isPinned);
                    }}
                >
                    {isPinned ? <PushPinIcon titleAccess="Unpin note" /> : <PushPinOutlinedIcon titleAccess="Pin note" />}
                </button>
            </div>

            <h1>{title}</h1>
            <h2>{tagline}</h2>
            <p>{body}</p>

            <div className="note-delete">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(id);
                    }}
                >
                    <DeleteIcon titleAccess="Delete note" />
                </button>
            </div>
        </div>
    );
}

export default NoteCard;
