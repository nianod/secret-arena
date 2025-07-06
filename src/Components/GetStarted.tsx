
const GetStarted = () => {
    
    const navigate = useNavigate()
    
    const handleStart = (e: React.FormEvent) => {
        e.preventDefault()
        navigate('/dashboard')
    }

  return (
    <div>
      <button 
        className="p-2 rounded bg-blue-600 text-white font-bold"
        onClick={handleStart}
      >
        Get started
      </button>
    </div>
  )
}

export default GetStarted
