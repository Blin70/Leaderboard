import { FaRegCheckSquare } from "react-icons/fa";
import { FiXSquare } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { useState, useEffect } from "react";
import { supabase } from "../Supabase/SupabaseClient";

function ChangePhone({user}){
    const [newphoneEdit, setNewphoneEdit] = useState(false);
    const [newphone, setNewphone] = useState(user.phone);

    const handlePhoneEdit = () => {
        setNewphoneEdit(!newphoneEdit);
    }

    const handlePhoneChange = (event) => {
        setNewphone(event.target.value);
    }
    
    const handlePhoneClick = async () => {
        if(newphone !== user.phone && newphone.length >= 9 && newphone.typeof === 'number'){
            const { data, error } = await supabase.auth.updateUser({
                data: { phone: newphone }
            })
            if(data){
                await supabase
                .from('Users')
                .update({ Phone: newphone })
                .eq("uuid", user.uuid)
                .then(setNewphoneEdit(false))
                .then(await supabase.auth.refreshSession());
            }else if(error){
                console.log(error);
            }
        }
    }

    useEffect(() => {
        setNewphone(user.phone);
    }, [newphoneEdit, user.phone])

    return (
        <>
            {!newphoneEdit 
                ? <h2 className="text-3xl relative">{user.phone ? user.phone : 'No phone number entered'}  <MdEdit onClick={handlePhoneEdit} className="absolute text-3xl ml-7 top-0.5 cursor-pointer"/></h2>
                : (
                    <div className="ml-10">
                        <br/>
                        <input onChange={handlePhoneChange} value={newphone} className="w-52 mt-9 h-9 bg-[#c7c7c7] placeholder:text-[#6e6e6e] text-2xl border-0 rounded mb-5 focus-visible:outline-none" />
                        <FaRegCheckSquare onClick={handlePhoneClick} className="text-green-800 text-4xl ml-5 -mb-2.5 cursor-pointer" />
                        <FiXSquare onClick={()=>setNewphoneEdit(false)} className="text-red-800 text-4xl ml-2 -mb-2.5 cursor-pointer" />
                    </div>
                  )
            }
        </>
    );
}

export default ChangePhone;