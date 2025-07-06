import React, { useState } from "react"

const PostField = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter Your secret Nickname</label>
        <input type="text"
          placeholder="Enter your anonymous name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Describe your secret</label>
        <textarea
         placeholder="Enter you secret description here..."
         value={description}
         onChange={(e) => setDescription(e.target.value)}
         required
        >

        </textarea>
        <div>
            <button 
             type="submit"
            >
              Share
            </button>
            <button
             type="reset"
            >
              Cancel
            </button>
        </div>
      </form>
    </div>
  )
}

export default PostField
