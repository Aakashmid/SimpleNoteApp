import React, { useEffect, useState } from 'react'
import api from '../Api'
import Note from '../components/Note'

export default function Home() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    CreateNote({ title, content })
  }

  useEffect(() => {
    getNotes()
  }, [])



  const getNotes = () => {
    //get all notes
    api.get('/api/notes/')
      .then((res) => res.data)
      .then((data) => setNotes(data))
      .catch((error) => alert(error))
  };

  const deleteNote = (id) => {
    api.delete(`/api/notes/delete/${id}/`).then((res) => {
      if (res.status === 204) {
        alert('Note Deleted')
        getNotes()
      }
      else {
        alert('Failed to delete note')
      }
    }).catch((error) => alert(error))
  };

  const CreateNote = (data) => {
    api.post('/api/notes/', data).then((res) => {
      if (res.status === 201) {
        alert('Note created ')
        getNotes()
      }
      else {
        alert('failed to create note')
      }
    }).catch((error) => alert(error))
  };

  return (
    <div className="home-container w-full md:w-11/12 lg:w-[900px]  h-[100vh] mx-auto">
      <div className="homepage-wrapper  py-6 px-5">
        <div className="Create-note-form">
          <form onSubmit={handleSubmit} className="write-notes flex flex-col  space-y-5 ">
            <h2 className="font-medium text-xl">Write note </h2>
            <div className="flex flex-col space-y-2">
              <label className='text-lg'>
                Title
              </label>
              <input type="text" name='title' id='title' className='p-2 focus:outline-none border rounded-md' onChange={(e) => setTitle(e.target.value)} value={title} required />
            </div>
            <div className="flex flex-col space-y-2">
              <label className='text-lg'>
                Content
              </label>
              <textarea name="content" id="content" className='p-2 focus:outline-none border rounded-md min-h-32 custom-scroll' onChange={(e) => setContent(e.target.value)} value={content} required></textarea>
            </div>
            <button type='submit' className='bg-sky-500 hover:bg-sky-700 text-white font-medium text-lg px-4 py-1 rounded-md w-fit'>Save</button>
          </form>
        </div>

        {/* all notes of user  */}
        <div className="notes-container">
          {notes.map((note) => {
            return <Note key={note.id} title={note.title} content={note.conten}/>
          })
          }
        </div>
      </div>

    </div>
  )
}
