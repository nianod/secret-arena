import React, { useState } from "react"

const PostField = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
    }

  return (
    <div className="justify-center items-center h-5/6">
      <form onSubmit={handleSubmit}
        className=" flex flex-col gap-2 p-3 h-5/6"
      >
        <label className="block">Enter Your secret Nickname</label>
        <input type="text "
          className="p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          placeholder="Enter your anonymous name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label className="block">Describe your secret</label>
        <textarea
         placeholder="Enter you secret description here..."
         className="p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
         value={description}
         onChange={(e) => setDescription(e.target.value)}
         required
        >

        </textarea>
        <div>
            <button 
             className={`bg-blue-500 p-2 rounded text-white font-bold ${loading ? 'cursor-not-allowed bg-blue-300' : "cursor-pointer"}`}
             type="submit"
            >
              {loading ? "Sharing..." : "Share"}
            </button>
        </div>
      </form>
    </div>
  )
}

export default PostField
