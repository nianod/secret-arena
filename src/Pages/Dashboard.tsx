import { useState } from "react"
import PostField from "../Components/PostField"


const Dashboard = () => {
  const [showPostField, setShowPostField] = useState(false)
  return (
    <div className="relative">
      <div className="box p-2 rounded-2xl flex justify-center gap-4 m-auto w-fit mt-6">
        <p className="text-xl font-bold align-center flex text-white">What is on your Mind?</p>
        <button
        onClick={() => setShowPostField(true)}
         className=" text-white p-2 bg-red-400 rounded cursor-pointer font-bold text-xl hover:bg-red-500"
        >
          Reveal
        </button>
      </div>
      {showPostField && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg relative shadow-lg">
            <button
              onClick={() => setShowPostField(false)}
              className="absolute top-2 right-2 text-2xl text-red-500 font-bold"
              title="Cancel"
            >
              X
            </button>
            <PostField />
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
 