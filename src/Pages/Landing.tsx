import { definitions,pics } from "./LandingLogic";


const Landing = () => {

  return (
    <div>
      <h1 className="text-red-400 font-bold text-5xl text-center">WELCOME TO VIBLY ANONYMOUS</h1>
      <div className="text-white flex mt-50 p-10 border">
        <div className="w-[50%]">
          <h2 className="text-4xl font-black font-[helvetica] underline text-red-500">That secret you've being Hiding</h2>
          <p>{definitions.speakUp}</p>
        </div>
        <div>
          <img src={pics.img1} alt="secret" />
        </div>
      </div>
      <div className="text-white flex mt-50 p-10 border">
        <div className="w-[50%]">
          <img src={pics.img2} alt="secret" />
        </div>
        <div>
          <h2 className="text-4xl font-black font-[helvetica] underline text-red-500">Worrying of Exposure??</h2>
          <p>{definitions.identity}</p>
        </div>
      </div>
    </div>
  )
}

export default Landing
