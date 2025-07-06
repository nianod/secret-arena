import { definitions,pics } from "./LandingLogic";
import swal from 'sweetalert2'
import { motion, useScroll } from "framer-motion";
import Terms from "../Components/Terms";


const Landing = () => {

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
        animate={{ y: 0, opacity: 1, rotate: 360}}
        transition={{ duration: 0.8, ease: 'easeOut'}}
      >
        WELCOME TO VIBLY ANONYMOUS</motion.h1>
      <motion.div style={{ x: -20 }} className="bod m-4 overflow-hidden pr-10 text-white flex mt-50 p-15">
        <div className="w-[50%] gap-15 flex flex-col">
          <h2 className="text-4xl font-black font-[helvetica] text-center underline text-red-500">That secret you've being Hiding</h2>
          <p className="text-center text-3xl font-[oswald]">{definitions.speakUp}</p>
        </div>
        <div>
          <img
          className="object-cover w-150 h-90"
          src={pics.img1} alt="secret" />
        </div>
      </motion.div>
      <div className="bod m-3 text-white flex gap-10 mt-50 p-10">
        <div className="w-[50%]">
          <img
          className="w-120"
          src={pics.img2} alt="secret" />
        </div>
        <div className="gap-15 flex flex-col font-[oswald] text-3xl ">
          <h2 className="text-4xl font-black text-center font-[helvetica] underline text-red-500">Worrying of Exposure??</h2>
          <p className="text-center">{definitions.identity}</p>
          <button onClick={handleClick} className="bg-[linear-gradient(to_right,_red,_blue)] text-white px-4 hover:scale-105 transition w-fit m-auto p-1 rounded cursor-pointer">Learn more</button>
        </div>
      </div>
      <div>
        <h1 className="text-red-500 text-4xl font-bold underline font-[sans-serif] text-center mt-12">HOW IT WORKS</h1>
        <div>
          <Terms />
        </div>
      </div>
    </div>
  )
}

export default Landing
