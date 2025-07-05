import { definitions,pics } from "./LandingLogic";


const Landing = () => {

  return (
    <div>
      <h1 className="text-red-400 font-bold text-5xl text-center">WELCOME TO VIBLY ANONYMOUS</h1>
      <div className="text-white flex mt-50 p-15">
        <div className="w-[50%] gap-15 flex flex-col">
          <h2 className="text-4xl font-black font-[helvetica] text-center underline text-red-500">That secret you've being Hiding</h2>
          <p className="text-center text-3xl font-[oswald]">{definitions.speakUp}</p>
        </div>
        <div>
          <img
          className="object-cover w-150 h-90"
          src={pics.img1} alt="secret" />
        </div>
      </div>
      <div className="text-white flex gap-10 mt-50 p-10">
        <div className="w-[50%]">
          <img
          className="w-120"
          src={pics.img2} alt="secret" />
        </div>
        <div className="gap-15 flex flex-col font-[oswald] text-3xl ">
          <h2 className="text-4xl font-black text-center font-[helvetica] underline text-red-500">Worrying of Exposure??</h2>
          <p className="text-center">{definitions.identity}</p>
        </div>
      </div>
    </div>
  )
}

export default Landing
