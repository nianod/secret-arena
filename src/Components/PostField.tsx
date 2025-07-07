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
    <div className="justify-center items-center h-[70vh]">
      <form onSubmit={handleSubmit}
        className="shadow-md flex flex-col align-center gap-3 p-2 w-[300px] mt-10 h-[60vh]"
      >
        <label className="block font-semibold">Enter Your secret Nickname:</label>
        <input type="text "
          className="p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded border border-gray-300"
          placeholder="Enter your anonymous name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label className="block font-semibold">Describe your secret:</label>
        <textarea
         placeholder="Enter you secret description here..."
         className="p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded border border-gray-300 h-30"
         value={description}
         onChange={(e) => setDescription(e.target.value)}
         required
        >

        </textarea>
        <div>
            <button 
             disabled={loading}
             className={`bg-blue-500 p-2 rounded text-white font-bold hover:bg-blue-400 transition ${loading ? 'opcaity-60 cursor-not-allowed ' : "cursor-pointer"}`}
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
