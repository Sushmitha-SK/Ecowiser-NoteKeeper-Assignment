import { addDoc, collection } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../services/firebase";
import { Add } from "@mui/icons-material";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddNote() {
  const [content, setContent] = useState({
    title: "",
    tagline: "",
    body: "",
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const formRef = useRef(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setContent((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  function expand() {
    setIsExpanded(true);
  }

  async function handleAddNote() {
    if (!content.title.trim() && !content.body.trim()) {
      toast.warn("Please add some content to your note.");
      return;
    }

    if (isAdding) return;

    setIsAdding(true);

    try {
      await addDoc(collection(db, "notekeeper"), {
        ...content,
        isPinned,
        timestamp: new Date(),
      });
      toast.success("Note added successfully!");
      setContent({ title: "", tagline: "", body: "" });
      setIsPinned(false);
      setIsExpanded(false);
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Error while adding note!");
    } finally {
      setIsAdding(false);
    }
  }
  const handleClose = () => {
    setIsExpanded(false);
    setContent({ title: "", tagline: "", body: "" });
    setIsPinned(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        handleClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>

      <form ref={formRef} className="create-note">
        {isExpanded && (
          <>
            <input
              onChange={handleChange}
              name="title"
              value={content.title}
              placeholder="Title"
              className="titleText"
            />
            <input
              onChange={handleChange}
              name="tagline"
              value={content.tagline}
              placeholder="Tagline"
              className="taglineText"
            />
          </>
        )}
        <textarea
          onClick={expand}
          onChange={handleChange}
          name="body"
          value={content.body}
          placeholder="Take a note..."
          rows={isExpanded ? "3" : "1"}
          className="bodyText"
        />
        {isExpanded && (
          <div >
            <span
              onClick={() => setIsPinned(!isPinned)}
              style={{
                cursor: "pointer",
                fontSize: "24px",
                position: "absolute",
                top: "10px",
                right: "10px",
                color: '#f5ba13'
              }}
            >
              {isPinned ? <PushPinIcon titleAccess="Unpin note" /> : <PushPinOutlinedIcon titleAccess="Pin note" />}
            </span>
          </div>
        )}
        {isExpanded && (
          <button type="button" onClick={handleAddNote} disabled={isAdding} className="addNoteButton">
            <Add titleAccess="Add Note" />
          </button>
        )}
      </form>

    </div>
  );
}
