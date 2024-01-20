import img from "C:/MyLearning/MVGR_Voices/client/src/assets/images/HomePage/mvgr.jpg"
const _top = () => {
  return (
    <div className="  lg:px-59 px-10 lg:py-0 py-10 text-center gap-5 lg:text-start flex lg:flex-row flex-col-reverse justify-between  lg:gap-28 items-center">
        <div className="h-full lg:py-40 flex flex-col justify-center lg:items-start items-center text-white">       
            <h1 className="text-[52px] font-semibold mb-8 leading-normal">Welcome to <span className=" text-[52px] font-semibold mb-8 leading-normal text-primary"> MVGR VOICES</span></h1>
            <p>It's where students like to share cool stories in blogs and podcasts, creating a fun space filled with different experiences and voices.</p>
        </div>
        <img src={img} width={490} height={490} className="" alt=""></img>
      
    </div>
  )
}

export default _top


