// src/notes/noteManager.js
import { saveToStorage, getFromStorage } from "../storage.js";
export { Note, renderNote, addNote, updateNote, notes };

const notes = getFromStorage("notes");
const noteModal = document.querySelector("#note-modal");
const noteForm = document.querySelector("#note-form");

class Note {
  constructor(title, description) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
  }
}

function renderNote(note) {
  const notesContainer = document.querySelector(".notes-container");
  if (!notesContainer) return;

  const noteCard = document.createElement("div");
  noteCard.classList.add("note-card");
  noteCard.id = note.id;

  noteCard.innerHTML = `
        <div class="card-header">
            <h3>${note.title}</h3>
            <button class="edit"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></button>
            <button class="delete"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg></button>
        </div>
        <p>${note.description}</p>
    `;

  notesContainer.appendChild(noteCard);
}

function addNote(note) {
  notes.push(note);
  saveToStorage("notes", notes);
}

function deleteNote(id) {
  const noteIndex = notes.findIndex((note) => note.id === id);
  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
    saveToStorage("notes", notes);
  }
}

function editNote(id) {
  const modalTitle = document.querySelector("#note-modal h3");
  modalTitle.textContent = "Edit note";
  noteForm.dataset.editingId = id;
  const noteIndex = notes.findIndex((note) => note.id === id);

  noteForm.querySelector("#title").value = notes[noteIndex].title;
  noteForm.querySelector("#description").value = notes[noteIndex].description;

  noteModal.showModal();
}

function updateNote(id, updatedValues) {
  const note = notes.find((note) => note.id === id);
  if (!note) return;

  note.title = updatedValues.title;
  note.description = updatedValues.description;
  saveToStorage("notes", notes);

  const card = document.getElementById(id);
  if (!card) return;

  card.querySelector("h3").textContent = note.title;
  card.querySelector("p").textContent = note.description;
}

document.addEventListener("click", (event) => {
  const noteCard = event.target.closest(".note-card");
  if (!noteCard) return;
  const noteId = noteCard.id;

  if (event.target.closest(".delete")) {
    deleteNote(noteId);
    noteCard.remove();
  }

  if (event.target.closest(".edit")) {
    editNote(noteId);
  }
});
