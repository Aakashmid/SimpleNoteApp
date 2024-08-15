import React from 'react'

export default function Note({ noteId,title, content ,deleteNote }) {
  return (
    <div className='border rounded-md p-2'>
      <h1 className="title text-xl font-semibold">{title}</h1>
      <p className="content mt-2">{content}</p>
      <div className="flex space-x-4 mt-4">
        <button className='delete-btn px-2 py-1 bg-red-600 text-white font-medium rounded-md' onClick={()=>deleteNote(noteId)}>Delete</button>
        {/* <button className='edit-btn'>Delete</button> */}
      </div>
    </div>
  )
}
