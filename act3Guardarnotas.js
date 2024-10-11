// Referencias a los elementos del DOM
const noteInput = document.getElementById('noteInput');
const addNoteBtn = document.getElementById('addNoteBtn');
const notesList = document.getElementById('notesList');

// Función para cargar las notas almacenadas en localStorage
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notesList.innerHTML = ''; // Limpiar la lista
    notes.forEach((note, index) => {
        createNoteElement(note, index);
    });
}

// Función para agregar una nueva nota
function addNote() {
    const noteText = noteInput.value.trim();
    if (noteText) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(noteText);
        localStorage.setItem('notes', JSON.stringify(notes));
        createNoteElement(noteText, notes.length - 1);
        noteInput.value = ''; // Limpiar el campo de entrada
    }
}

// Función para eliminar una nota
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes(); // Recargar las notas actualizadas
}

// Función para crear el elemento de nota en el DOM
function createNoteElement(noteText, index) {
    const li = document.createElement('li');
    li.textContent = noteText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.onclick = () => deleteNote(index);

    li.appendChild(deleteBtn);
    notesList.appendChild(li);
}

// Event listeners
addNoteBtn.addEventListener('click', addNote);

// Cargar las notas al abrir la página
window.onload = loadNotes;
