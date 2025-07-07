import React, { useState } from "react"
import { supabase } from "../Supabase/SupabaseClient"

const PostField = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    //Inserting Data to Backend
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
          const { data: { user } } = await supabase.auth.getUser()

          const sendData = {
            name: name,
            description: description
          }

          const { data, error } = await supabase 
          .from('posts')
          .insert([sendData])
          .select()
          .single()

          if(error) {
            console.log("There was an error: ", error.message)
            setError('Failed to post')
          } else {
            console.log("success")
          }

        } catch (err) {
          setError("error.messag")
        }

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
        {error && (
          <p className="text-red-600 font-semibold">{error}</p>
        )}
        <div>
            <button 
             disabled={loading}
             className={`bg-blue-500 p-2 rounded w-full text-white font-bold hover:bg-blue-400 transition ${loading ? 'opcaity-60 cursor-not-allowed ' : "cursor-pointer"}`}
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
