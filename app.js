const inputField = document.querySelector('.app__input-field')
const createNote = document.querySelector('.app__input-button')
const noteList = document.querySelector('.app__list')

const notes = [
  {
    title: 'buy milk',
    completed: false
  },
  {
    title: 'meditate',
    completed: false
  },
  {
    title: 'learn english',
    completed: false
  }
]

function renderNotes () {
  noteList.innerHTML = ''
  for (let index = 0; index < notes.length; index++) {
    noteList.insertAdjacentHTML('beforeend', getNoteTemplate(notes[index], index))
  }
}

renderNotes()

function getNoteTemplate (note, index) {
  return `
    <li class="app__item">
        <span class="app__item-title ${note.completed ? 'title--completed' : ''}">${note.title}</span>
        <div class="app__item-actions">
          <button class="app__item-button ${note.completed ? 'button--gray' : ''}" data-index="${index}" data-type="switch">✔</button>
          <button class="app__item-button button--gray ${note.completed ? 'button--nogray' : ''}" data-index="${index}" data-type="remove">✖</button>
        </div>
    </li>
  `
}

createNote.onclick = function () {
  if (inputField.value.length > 0) {
    const newNote = { 
      title: inputField.value,
      completed: false
    }
    notes.push(newNote) 
    renderNotes()
    inputField.value = null
  }
}

noteList.onclick = function (event) {
  if (event.target.dataset.index) {
    const index = Number(event.target.dataset.index)
    const type = event.target.dataset.type

    if (type === 'switch') {
      notes[index].completed = !notes[index].completed
    } else if (type === 'remove') {
      notes.splice(index, 1)
    }

    renderNotes()
  }
}