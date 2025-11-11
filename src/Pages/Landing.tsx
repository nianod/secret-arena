import { definitions,pics } from "./LandingLogic";
import swal from 'sweetalert2'
import { motion, useScroll } from "framer-motion";
import Terms from "../Components/Terms";
import GetStarted from "../Components/GetStarted";
import { useState } from "react";

const Landing = () => {
  const [check, setCheck] = useState(false)
  const [autoCheck, setAutoCheck] = useState(true)

  const { scrollYProgress } = useScroll();

  const handleClick = () => {
    swal.fire({
      title: "Privacy",
      text: "Your identity here is completely anonymous",
      icon: "warning",
      confirmButtonText: 'okay',
      background: '#1f2937',
      color: 'white',
      confirmButtonColor: '#ef4444'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      <motion.div 
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress, 
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          originX: 0,
          background: 'green',
          zIndex: 50
        }}
      />

       <div className="max-w-6xl mx-auto px-4">
        <motion.h1 
          className="text-red-400 font-bold text-5xl text-center mt-12 mb-8"
          initial={{ y: -100, opacity: 0}}
          animate={{ y: 0, opacity: 1}}
          transition={{ duration: 0.8, ease: 'easeOut'}}
        >
          WELCOME TO VIBLY ANONYMOUS
        </motion.h1>
 
        <div className="flex justify-center mb-16">
          <GetStarted checkbox={check}/>
        </div>

         <motion.div 
          className="bg-gray-800 rounded-2xl border border-gray-700 m-6 p-8 overflow-hidden text-white flex flex-col md:flex-row items-center"
          initial={{x: 100, opacity: 0}}
          animate={{x: 0, opacity: 1}}
          transition={{duration: 0.8, ease: 'easeOut'}}
        >
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <h2 className="text-3xl sm:text-4xl font-black font-['helvetica'] text-center md:text-left underline text-red-500">
              That secret you've been hiding
            </h2>
            <p className="text-center md:text-left text-xl sm:text-2xl font-['oswald'] leading-relaxed">
              {definitions.speakUp}
            </p>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <img
              className="object-cover w-full h-auto max-w-[400px] rounded-2xl shadow-lg"
              src={pics.img1} 
              alt="secret" 
            />
          </div>
        </motion.div>

         <div className="bg-gray-800 rounded-2xl border border-gray-700 m-6 p-8 overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-black text-center font-['helvetica'] underline text-red-500 mb-8">
            Worrying of Exposure??
          </h2>
          <motion.div          
            className="text-white flex flex-col md:flex-row items-center"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}      
          >
            <div className="w-full md:w-[50%] flex justify-center">
              <img
                className="max-w-full h-auto rounded-2xl shadow-lg"
                src={pics.img2} 
                alt="privacy protection" 
              />
            </div>
            <div className="w-full md:w-[50%] flex flex-col gap-6 font-['oswald'] text-xl md:text-2xl mt-8 md:mt-0 md:pl-12">
              <p className="text-center md:text-left leading-relaxed">{definitions.identity}</p>
              <button 
                onClick={handleClick} 
                className="cursor-pointer bg-gradient-to-r from-red-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all duration-200 w-fit mx-auto md:mx-0"
              >
                Learn more
              </button>
            </div>
          </motion.div>
        </div>

         <div className="bg-gray-800 rounded-2xl border border-gray-700 m-6 p-8 mt-12">
          <h1 className="text-red-500 text-4xl font-bold underline font-[sans-serif] text-center mb-8">
            HOW IT WORKS
          </h1>
          <div>
            <Terms />
          </div>
          <hr className="border-gray-600 mt-8 mb-6 w-[80%] mx-auto"/>
        </div>

         <div className="bg-gray-800 rounded-2xl border border-gray-700 m-6 p-8">
          <div className="flex items-center gap-3 mb-4 p-4 bg-gray-700 rounded-lg">
            <input 
              type="checkbox"
              onChange={(e) => setAutoCheck(e.target.checked)}
              checked={autoCheck}
              className="w-5 h-5 text-red-500 bg-gray-600 border-gray-500 rounded focus:ring-red-500"
            />
            <p className="text-white text-lg">I Have read all the Terms and Conditions</p>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-700 rounded-lg">
            <input 
              type="checkbox"
              onChange={(e) => setCheck(e.target.checked)}
              checked={check}
              className="w-5 h-5 text-red-500 bg-gray-600 border-gray-500 rounded focus:ring-red-500"
            />
            <p className="text-white text-lg">I Accept Terms and Conditions</p>
          </div>
          
          <div className="flex justify-center p-6">
            <GetStarted checkbox={check} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing