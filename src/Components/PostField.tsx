import React, { useState } from "react"
import { supabase } from "../Supabase/SupabaseClient"

const PostField = ({ onPostSuccess, closeModal }: { onPostSuccess?: () => void, closeModal?: () => void}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [time, setTime] = useState('')

    //Inserting Data to Backend
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
        
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
            console.log("success inserting :", data)
            setName('')
            setDescription('')
           if(onPostSuccess) onPostSuccess()
            if(closeModal) closeModal()
            
          }

        } catch (err) {
          setError("An error Occurred")
        }

    }

  return (
    <div className="justify-center items-center h-[70vh]">
      <form onSubmit={handleSubmit}
        className="shadow-md flex flex-col align-center gap-3 p-2 w-[300px] mt-10 h-[60vh]"
      >
        <label className="block font-semibold">Enter Your secret Nickname:</label>
        <input type="text"
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
         <label>Screen Time</label>
        <select name="screen-time"
          id="category"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="focus:outline-none border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Remove your post after-</option>
          <option value="8 hours">8 hours</option>
          <option value="1 day">24 hours</option>
          <option value="2 days">2 days</option>
          <option value="3 days">3 days</option>
        </select>
        {error && (
          <p className="text-red-600 font-semibold">{error}</p>
        )}
        <div>
            <button 
             disabled={loading}
             className={`bg-blue-500 p-2 rounded w-full text-white font-bold hover:bg-blue-400 transition ${loading ? 'opacity-60 cursor-not-allowed ' : "cursor-pointer"}`}
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
