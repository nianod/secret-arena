import React, { useState } from "react"
import { supabase } from "../Supabase/SupabaseClient"

const PostField = ({ onPostSuccess, closeModal }: { onPostSuccess?: () => void, closeModal?: () => void}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [time, setTime] = useState('')

    // Inserting Data to Backend
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

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
            setError('Failed to post your secret. Please try again.')
          } else {
            console.log("success inserting :", data)
            setName('')
            setDescription('')
            setTime('')
            if(onPostSuccess) onPostSuccess()
            if(closeModal) closeModal()
          }

        } catch (err) {
          setError("An unexpected error occurred")
        } finally {
          setLoading(false)
        }
    }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white text-center mb-6">Share Your Secret</h2>
      <form onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
      
        <div>
          <label className="block text-white font-semibold mb-2">Your Anonymous Name:</label>
          <input 
            type="text"
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            placeholder="Enter your anonymous name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
        </div>

         <div>
          <label className="block text-white font-semibold mb-2">Your Secret:</label>
          <textarea
            placeholder="Share what's on your mind... your secret is safe with us"
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none h-32"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={loading}
          />
        </div>

         <div>
          <label className="block text-white font-semibold mb-2">Auto-remove after:</label>
          <select 
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            disabled={loading}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
          >
            <option value="" disabled className="bg-gray-700">Choose duration</option>
            <option value="8 hours" className="bg-gray-700">8 hours</option>
            <option value="1 day" className="bg-gray-700">24 hours</option>
            <option value="2 days" className="bg-gray-700">2 days</option>
            <option value="3 days" className="bg-gray-700">3 days</option>
          </select>
        </div>

         {error && (
          <div className="p-3 bg-red-900/50 border border-red-700 rounded-xl">
            <p className="text-red-300 font-semibold text-center">{error}</p>
          </div>
        )}

         <div className="flex gap-3 mt-4">
          <button 
            disabled={loading}
            className="w-full cursor-pointer flex-1 bg-gradient-to-r from-red-500 to-blue-600 text-white p-3 rounded-xl font-bold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            type="submit"
          > 
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Posting...
              </span>
            ) : (
              "Share Secret"
            )}
          </button>
        </div>

         <div className="text-center mt-4">
          <p className="text-gray-400 text-sm">
            Your identity is completely anonymous
          </p>
        </div>
      </form>
    </div>
  )
}

export default PostField