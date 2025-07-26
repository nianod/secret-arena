import { definitions,pics } from "./LandingLogic";
import swal from 'sweetalert2'
import { motion, useScroll,  } from "framer-motion";
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
      background: 'white',
      color: 'black'
    })
  }


  return (
    <div>
      <motion.div 
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress, 
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 5,
          originX: 0,
          backgroundColor: 'green',
          zIndex: 10
        }}
        
      ></motion.div>
      <motion.h1 className="text-red-400 font-bold text-5xl text-center mt-10"
        initial={{ y: -100, opacity: 0}}
        animate={{ y: 0, opacity: 1}}
        transition={{ duration: 0.8, ease: 'easeOut'}}
      >
        WELCOME TO VIBLY ANONYMOUS
      </motion.h1>
        <div className="flex justify-center mt-12">
          <GetStarted checkbox={check}/>
        </div>
      <motion.div 
        className="bod m-4 p-4 overflow-hidden text-white flex flex-col md:flex-row"
        initial={{x: 100, opacity: 0}}
        animate={{x: 0, opacity: 1}}
        transition={{duration: 0.8, ease: 'easeOut'}}
      >
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h2 className="text-2xl sm:text-4xl font-black font-['helvetica'] text-center underline text-red-500">
            That secret you've been hiding
          </h2>
          <p className="text-center text-xl sm:text-3xl font-['oswald']">
            {definitions.speakUp}
          </p>
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <img
            className="object-cover w-full h-auto max-w-[300px] mx-auto md:max-w-none md:w-full md:h-[360px]"
            src={pics.img1} 
            alt="secret" 
          />
        </div>
      </motion.div>
          <h2 className="text-2xl md:text-4xl font-black text-center font-['helvetica'] underline text-red-500 w-full md:w-auto">
            Worrying of Exposure??
          </h2>
        <motion.div          
          className="bod m-3 p-4 overflow-hidden text-white flex flex-col md:flex-row items-center"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}      
        >
          <div className="w-full md:w-[50%] mt-4 md:mt-6 flex justify-center">
            <img
              className="max-w-full h-auto md:w-full object-cover"
              src={pics.img2} 
              alt="secret" 
            />
          </div>
          <div className="w-full md:w-auto flex flex-col gap-4 md:gap-6 font-['oswald'] text-xl md:text-3xl mt-4 md:mt-0">
            <p className="text-center">{definitions.identity}</p>
            <button 
              onClick={handleClick} 
              className="bg-[linear-gradient(to_right,_red,_blue)] text-white px-4 hover:scale-105 transition w-fit mx-auto py-2 rounded cursor-pointer"
            >
              Learn more
            </button>
          </div>
      </motion.div>
      <div>
        <h1 className="text-red-500 text-4xl font-bold underline font-[sans-serif] text-center mt-12">HOW IT WORKS</h1>
        <div>
          <Terms />
        </div>
        <hr className="bod text-white mt-3 mb-4 w-[50%] m-auto font-black"/>
      </div>
      <div className="m-3 flex align-center gap-1">
        <input type="checkbox"
          onChange={(e) => setAutoCheck(e.target.checked)}
          checked={autoCheck}
         />
        <p className="text-white">I Have read all the Terms and Conditions</p>
      </div>
      <div className="m-3 flex align-center gap-1">
        <input type="checkbox"
          onChange={(e) => setCheck(e.target.checked)}
          checked={check}
        />
        <p className="text-white">I Accept Terms and Conditions</p>
      </div>
      <span className="flex justify-center p-5"><GetStarted checkbox={check} /></span>
    </div>
  )
}

export default Landing
