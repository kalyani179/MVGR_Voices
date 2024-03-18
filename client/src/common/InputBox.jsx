import React, { useState } from 'react';

const InputBox = ({name,type,value,placeholder,icon,disable}) => {
    const [isActive,setActive] = useState(false);
    return (
        <div className="relative w-[100%] mb-4">
            <input 
                name={name}
                type={type}
                defaultValue={value}
                placeholder={placeholder}
                disabled={disable}
                className={`auth-input pl-8 focus:border-b-primary w-full`}
                onFocus={()=>setActive(!isActive)}
                onBlur={()=>setActive(false)}
            />
            <i className={`fi ${icon} edit-profile-icon ${isActive ? 'text-primary' : ''}`}></i>
        </div>
    )
}

export default InputBox;