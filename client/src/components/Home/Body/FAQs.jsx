import { useContext, useState } from "react";
import { ThemeContext } from "../../../App";

const Faq = (props) => {
    let { theme, setTheme } = useContext(ThemeContext);
    const [item, setItem] = useState(props.datas);

    const handleToggleActive = () => {
        let newActive = item.active === 1 ? 0 : 1;
        setItem({ ...item, active: newActive });
    };

    return (
        <div>
            <div className={`p-3 md:p-5 mb-3 md:mb-5 mt-3 md:mt-5 border-b ${theme === "light" ? "border-white" : "border-black"} lg:mx-40 duration-700 group ${item.active === 1 ? "is-active" : ""}`}>
                <div className="flex items-center">
                    <div className={`text-base md:text-2xl ${theme === "light" ? "text-white" : "text-black"} w-full duration-500 group-[.is-active]:font-medium group-[.is-active]:tracking-wide`}>{item.question}</div>
                    <div className="text-base md:text-lg duration-500 cursor-pointer group-[.is-active]:rotate-[180deg]" onClick={handleToggleActive}>
                        <i className={`fi fi-rr-angle-up ${theme === "light" ? "text-white" : "text-black"}`}></i>
                    </div>
                </div>
                <div className="text-base md:text-lg tracking-wide mt-1 md:mt-3 overflow-hidden max-h-0 duration-700 group-[.is-active]:max-h-[100px] text-primary">
                    {item.answer}
                </div>
            </div>
        </div>
    );
}

export default Faq;
