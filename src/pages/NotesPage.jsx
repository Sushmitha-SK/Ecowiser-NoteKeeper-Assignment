import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import AddNote from "../components/AddNote";
import NoteCard from "../components/NoteCard";
import Pagination from "../components/Pagination";
import NoteModal from "../components/NoteModal";
import { db } from "../services/firebase";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    updateDoc,
    query,
    orderBy,
} from "firebase/firestore";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [notesPerPage] = useState(6);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const notesCollection = collection(db, "notekeeper");
        const notesQuery = query(
            notesCollection,
            orderBy("isPinned", "desc"),
            orderBy("timestamp", "desc")
        );

        const unsubscribe = onSnapshot(notesQuery, (snapshot) => {
            const fetchedNotes = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNotes(fetchedNotes);
        });

        return () => unsubscribe();
    }, []);

    async function addNote(note) {
        try {
            await addDoc(collection(db, "notekeeper"), {
                ...note,
                isPinned: false,
                timestamp: new Date(),
            });
            toast.success('Note added successfully!');
        } catch (e) {
            console.error("Error adding note:", e);
            toast.error('Failed to add note. Please try again.');
        }
    }

    const deleteNote = async (id) => {
        try {
            const noteDoc = doc(db, "notekeeper", id);
            await deleteDoc(noteDoc);
            toast.success('Note deleted successfully!');
        } catch (e) {
            console.error("Error deleting note:", e);
            toast.error('Failed to delete note. Please try again.');
        }
    };

    const togglePin = async (id, isPinned) => {
        try {
            const noteDoc = doc(db, "notekeeper", id);
            await updateDoc(noteDoc, { isPinned: !isPinned });
            if (!isPinned) {
                toast.success('Note pinned successfully!');
            } else {
                toast.info('Note unpinned successfully!');
            }
        } catch (e) {
            console.error("Error updating pin status:", e);
            toast.error('Failed to update pin status. Please try again.');
        }
    };


    const indexOfLastNote = currentPage * notesPerPage;
    const indexOfFirstNote = indexOfLastNote - notesPerPage;
    const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const openModal = (note) => {
        setSelectedNote(note);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedNote(null);
        setIsModalOpen(false);
    };


    return (
        <>
            <Header />
            <AddNote add={addNote} />
            <div className="notes-container">
                <ToastContainer
                    position="top-right"
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />

                <div className="all-notes">
                    {currentNotes.length > 0 ? (
                        currentNotes.map((noteItem) => (
                            <NoteCard
                                key={noteItem.id}
                                id={noteItem.id}
                                title={noteItem.title}
                                tagline={noteItem.tagline}
                                body={noteItem.body}
                                isPinned={noteItem.isPinned}
                                togglePin={togglePin}
                                delete={deleteNote}
                                onClick={() => openModal(noteItem)}
                            />
                        ))
                    ) : (null)}
                </div>

                {notes.length > notesPerPage && (
                    <Pagination
                        notesPerPage={notesPerPage}
                        totalNotes={notes.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                )}
            </div>

            {isModalOpen && selectedNote && (
                <NoteModal
                    note={selectedNote}

                    onSave={async (updatedNote) => {
                        try {
                            const noteDoc = doc(db, "notekeeper", updatedNote.id);
                            await updateDoc(noteDoc, { ...updatedNote });
                            closeModal()
                        } catch (e) {
                            console.error("Error updating note:", e);

                        }
                    }}
                    onDelete={async (id) => {
                        await deleteNote(id);
                        closeModal();
                    }}
                    onClose={closeModal}
                />
            )}


        </>
    );
};

export default NotesPage;
