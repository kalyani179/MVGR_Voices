import img from "C:/MyLearning/MVGR_Voices/client/src/assets/images/HomePage/mic.jpg"
import { Fade } from "react-awesome-reveal";
const Pod1 = () => {
  return (
    <div className="  lg:px-56 px-10 lg:py-0 py-10 text-center gap-5 lg:text-start flex lg:flex-row flex-col-reverse justify-between  lg:gap-28 items-center">
        <img src={img} width={290} height={290} className="rounded-full border-2 p-1" alt=""></img>
          
        <div className="h-full lg:py-40 flex flex-col justify-center lg:items-start items-center text-white">  
        <Fade direction="down">
               
          <h1 className="text-[52px] font-semibold mb-8 leading-normal text-primary">PODCAST</h1>
        </Fade>
        <Fade direction="up">       
            <p>Here, you have the freedom to upload a diverse range of podcasts, 
                from motivational speeches that ignite inspiration to captivating stories that resonate 
                with the heart. Share your innovative ideas,or insightful interview experiences , 
                thought-provoking discussions, and more. Your voice, your content - 
                let your creativity flow on MVGR VOICES!"</p></Fade>
        </div>
        
      
    </div>
  )
}

export default Pod1
