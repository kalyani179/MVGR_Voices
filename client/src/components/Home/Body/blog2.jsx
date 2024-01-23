
import img from "C:/MyLearning/MVGR_Voices/client/src/assets/images/HomePage/blog.jpg"
import { Fade } from "react-awesome-reveal";
const Blog2 = () => {
  return (
    <div className="  lg:px-56 px-10 lg:py-0 py-10 text-center gap-5 lg:text-start flex lg:flex-row flex-col-reverse justify-between  lg:gap-28 items-center">
            
            <div className="h-full lg:py-40 flex flex-col justify-center lg:items-start items-center text-white">       
            <Fade direction="down">
            <h1 className="text-[52px] font-semibold mb-8 leading-normal text-primary">BLOGS</h1>
            </Fade>
            <Fade direction="up">
                <p>Whether you're a bit shy to speak or simply love conveying thoughts through writing, our community welcomes you. Share your unique perspectives, stories, and even interview experiences through the art of words. 
Your voice matters, whether spoken or written, and MVGR VOICES is the canvas for your ideas to shine.</p>
            </Fade>
            </div>
           
           <img src={img} width={390} height={390} className="" alt=""></img>
           
            
          
            
        
        </div>
  )
}

export default Blog2
