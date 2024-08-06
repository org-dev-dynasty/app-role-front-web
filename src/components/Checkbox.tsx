import { useState } from "react";


export function Checkbox() {
    const [checked, setChecked] = useState(false);

    const handleButtonClick = () => {
        setChecked(!checked);
    };
    return (
        <>
            <div 
                className="bg-transparent w-[32px] h-[32px] ml-[62px] mt-[32px] border-2 border-white rounded-[10px]"
            >
                <button 
                    className="bg-transparent w-[28px] h-[28px] " 
                    onClick={handleButtonClick}>
                    {checked && <i className="pi pi-check"></i>}
                    </button>
                <p className="ml-[41px] text-2xl">Organizador</p>
            </div>
        </>
    )
}