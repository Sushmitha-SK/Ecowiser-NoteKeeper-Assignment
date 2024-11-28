# NoteKeeper 

NoteKeeper is a minimalistic and user-friendly note-taking web application designed to help users manage their notes. The application allows users to add, edit, delete, and pin notes in a grid layout. Notes can be accessed through pagination, and pinned notes remain at the top of the page. This application leverages Google Cloud services for storing and managing notes.

## Features

1. **Add a Note**: Users can add a note with a title, tagline, and body. The note is displayed in a grid layout on the main page.
2. **Edit a Note**: By clicking on a note, users can open a popup to view and edit the note's content.

3. **Pin Notes**: Notes can be pinned so that they are always displayed at the top, regardless of their creation or last edit date.

4. **Pagination**: The application supports pagination. Each page can display a maximum of 6 notes.

6. **CRUD Operations**: Notes can be created, read, updated, and deleted.

7. **Cloud Storage**: Notes are securely stored and efficiently managed through Google Cloud services, with Firestore highly recommended for its robust real-time update capabilities, seamless scalability, and simplified data management.

## Tech Stack

- **Frontend**: React.js, HTML, CSS
- **Backend**: Google Cloud Firestore (Database)


