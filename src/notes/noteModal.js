// src/notes/noteModal.js
import { Note, renderNote, addNote, updateNote } from "./noteManager.js";

const noteModal = document.querySelector("#note-modal");
const btnCloseModal = document.querySelector("#btn-close-note-modal");
const noteForm = document.querySelector("#note-form");
const modalTitle = document.querySelector("#note-modal h3");

document.addEventListener("click", (event) => {
  if (event.target.closest("#addNote")) {
    modalTitle.textContent = "Add new note";
    delete noteForm.dataset.editingId;
    noteForm.reset();
    noteModal.showModal();
  }
});

btnCloseModal.addEventListener("click", () => noteModal.close());

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = noteForm.querySelector("#title").value;
  const description = noteForm.querySelector("#description").value;

  if (modalTitle.textContent === "Add new note") {
    const note = new Note(title, description);
    addNote(note);
    renderNote(note);
  } else {
    updateNote(noteForm.dataset.editingId, { title, description });
    delete noteForm.dataset.editingId;
  }

  noteModal.close();
  noteForm.reset();
});
