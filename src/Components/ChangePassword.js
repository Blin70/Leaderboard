import { FaRegCheckSquare } from "react-icons/fa";
import { FiXSquare } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { useState, useEffect } from "react";
import { supabase } from "../Supabase/SupabaseClient";

function ChangePassword({user}){
    const [newpasswordEdit, setNewpasswordEdit] = useState(false);
    const [newpassword, setNewpassword] = useState(user.password);

    const handlePasswordEdit = () => {
        setNewpasswordEdit(!newpasswordEdit);
    }

    const handlePasswordChange = (event) => {
        setNewpassword(event.target.value);
    }

    const handlePasswordClick = async () => {
        if(newpassword !== user.password && newpassword.length >= 6){
            const { data, error } = await supabase.auth.updateUser({
                password: newpassword
            })
            if(data){
                await supabase
                .from('Users')
                .update({ Password: newpassword })
                .eq("uuid", user.uuid)
                .then(setNewpasswordEdit(false))
                .then(await supabase.auth.refreshSession());
            }else if(error){
                console.log(error);
            }
        }
    }

    useEffect(() => {
        setNewpassword(user.password);
     }, [newpasswordEdit, user.password])

    return (
        <>
            {!newpasswordEdit 
                ? <h2 className="text-3xl relative">User Password: {user.password} <MdEdit onClick={handlePasswordEdit} className="absolute text-3xl ml-7 top-0.5 cursor-pointer"/></h2>
                : (
                    <div className="ml-10">
                        <input onChange={handlePasswordChange} value={newpassword} className="w-52 mt-9 h-9 bg-[#c7c7c7] placeholder:text-[#6e6e6e] text-2xl border-0 rounded mb-5 focus-visible:outline-none" />
                        <FaRegCheckSquare onClick={handlePasswordClick} className="text-green-800 text-4xl ml-5 -mb-2.5 cursor-pointer" />
                        <FiXSquare onClick={()=>setNewpasswordEdit(false)} className="text-red-800 text-4xl ml-2 -mb-2.5 cursor-pointer" />
                    </div>
                  )
            }
        </>
    );
}

export default ChangePassword;