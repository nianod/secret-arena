import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const GetStarted = ({ checkbox }) => {
    
    const [error, setError] = useState("")

    const navigate = useNavigate()
    
    const handleStart = (e: React.FormEvent) => {
        e.preventDefault()
      if(!checkbox) {
        setError('Please Accept Terms and conditions to Proceed')
        return
      } else {
        navigate('/dashboard')
      }
       
    }

  return (
    <div className='flex flex-col'>
      <button 
        className="p-2 rounded bg-blue-600 text-white font-bold cursor-pointer hover:bg-blue-500 transition ease-in"
        onClick={handleStart}
      >
        Get started
      </button>
      {error && (
        <span className='text-red-700'>{error}</span>
      )}
    </div>
  )
}

export default GetStarted
