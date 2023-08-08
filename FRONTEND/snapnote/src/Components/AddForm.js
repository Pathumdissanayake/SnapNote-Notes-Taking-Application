import React from 'react'

export default function AddForm() {
  return (
    <div className='add-form-body'>
        <h1>New Note</h1>
        <form>
            <input type="text" placeholder='Title'></input>

            <br></br>
            <textarea placeholder='Start writing here'/>

            <br></br>
            <button>Create</button>
            <button>Cancel</button>
            <br></br>
            <button>+ Set Reminder</button>
        </form>
    </div>
  )
}
