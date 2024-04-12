import { FaRegCheckSquare } from "react-icons/fa";
import { FiXSquare } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { useState, useEffect } from "react";
import { supabase } from "../Supabase/SupabaseClient";

function ChangeName({user}){
    const [newnameEdit, setNewnameEdit] = useState(false);
    const [newname, setNewname] = useState(user.name);

    const handleNameEdit = () => {
        setNewnameEdit(!newnameEdit);
    }

    const handleNameChange = (event) => {
        setNewname(event.target.value);
    }
    
    const handleNameClick = async () => {
        if(newname !== user.name && newname.length >= 2){
            const { data, error } = await supabase.auth.updateUser({
                data: { name: newname }
            })
            if(data){
                await supabase
                .from('Users')
                .update({ Name: newname })
                .eq("uuid", user.uuid)
                .then(setNewnameEdit(false))
                .then(await supabase.auth.refreshSession());
            }else if(error){
                console.log(error);
            }
        }
    }

    useEffect(() => {
        setNewname(user.name);
    }, [newnameEdit, user.name])

    return (
        <>
            {!newnameEdit 
                ? <h2 className="text-3xl relative">{user.name}  <MdEdit onClick={handleNameEdit} className="absolute text-3xl ml-7 top-0.5 cursor-pointer"/></h2>
                : (
                    <div className="ml-10">
                        <br/>
                        <input onChange={handleNameChange} value={newname} className="w-52 mt-9 h-9 bg-[#c7c7c7] placeholder:text-[#6e6e6e] text-2xl border-0 rounded mb-5 focus-visible:outline-none" />
                        <FaRegCheckSquare onClick={handleNameClick} className="text-green-800 text-4xl ml-5 -mb-2.5 cursor-pointer" />
                        <FiXSquare onClick={()=>setNewnameEdit(false)} className="text-red-800 text-4xl ml-2 -mb-2.5 cursor-pointer" />
                    </div>
                  )
            }
        </>
    );
}

export default ChangeName;