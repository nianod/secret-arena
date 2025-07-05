
const Landing = () => {

  const definitions: { speakUp: string; identity: string; imag: string} = {
    speakUp: "Why suffer inside? Bring up that secret heating up inside you! Releave youself",
    identity: "Worryng about Your identity? We don't knoe who you are. You're anonymous here",
    imag: "Screenshot 2025-07-04 215927.png"
  }

  return (
    <div>
      <h1 className="text-red-400 font-bold text-5xl text-center">WELCOME TO VIBLY ANONYMOUS</h1>
      <div className="text-white flex mt-50 p-10 border">
        <div className="w-[50%]">
          <h2 className="text-4xl font-black font-[helvetica] underline text-red-500">That secret you've being Hiding</h2>
          <p>{definitions.speakUp}</p>
        </div>
        <div>
          <img src={definitions.imag} alt="secret" />
        </div>
      </div>
      <div className="text-white flex mt-50 p-10 border">
        <div className="w-[50%]">
          <h2 className="text-4xl font-black font-[helvetica] underline text-red-500">That secret you've being Hiding</h2>
          <p>{definitions.speakUp}</p>
        </div>
        <div>
          <img src={definitions.imag} alt="secret" />
        </div>
      </div>
    </div>
  )
}

export default Landing
