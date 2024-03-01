import { useState } from "react";

function SizeForm({setSize}){
    const [value, setValue] = useState(100);

    const handleChange = (event) => {
        //setValue(event.target.value);
        event.target.value <=200 && event.target.value>=0 ? setValue(event.target.value) : setValue(prev => prev)
    };

    const handleClick = () => {
       // setSize(value)
    if(value == 0){
        setSize(1); 
        setValue(1)
    }else{
        setSize(value)
    }
    };
        //Add styles to input and button
    return( 
        <>
            <input value={value} onChange={handleChange} type="number"/>
            <button onClick={handleClick}>Submit</button>
        </>
    );
}

export default SizeForm;