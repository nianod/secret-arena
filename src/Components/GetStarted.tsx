import { useNavigate } from 'react-router-dom'


const GetStarted = () => {
    
    const navigate = useNavigate()
    
    const handleStart = (e: React.FormEvent) => {
        e.preventDefault()
        navigate('/dashboard')
       
    }

  return (
    <div>
      <button 
        className="p-2 rounded bg-blue-600 text-white font-bold cursor-pointer hover:bg-blue-500 transition ease-in"
        onClick={handleStart}
      >
        Get started
      </button>
    </div>
  )
}

export default GetStarted
