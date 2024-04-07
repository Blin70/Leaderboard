import { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { FaRegCheckSquare } from "react-icons/fa";
import { FiXSquare } from "react-icons/fi";
import SignOut from "../Supabase/SignOut";
import { supabase } from "../Supabase/SupabaseClient";

function ProfilePage({state, dispatch, session}){
    const [newnameEdit, setNewnameEdit] = useState(false);
    const [newname, setNewname] = useState(state.name);

    const handleSignOut = () => {
        SignOut();
        dispatch({ type: 'new_RESET'})
    }

    const handleDelete = () => {
        console.log('Delete func hasnt been implemented yet');
    }

    //Name Update

    const handleNameEdit = () => {
        setNewnameEdit(!newnameEdit);
    }

    const handleNameChange = (event) => {
        setNewname(event.target.value);
    }
    
    const handleNameClick = async () => {
        if(newname !== state.name){
            const { data, error } = await supabase.auth.updateUser({
                data: { name: newname }
            })
            if(data){
                const { data, error } = await supabase
                .from('Users')
                .update({ Name: newname })
                .eq("uuid", (await supabase.from('Users').select('uuid')).data[0].uuid)
                .then(setNewnameEdit(false))
                .then(await supabase.auth.refreshSession());
                
            }else if(error){
                console.log(error);
            }
        }
        
    }

    //Password Update
    //Not implemented yet
   
    useEffect(() => {
        setNewname(state.name);
    }, [newnameEdit, state.name])

    //After adding name updating functionallity, when signing up the name dissapears so this useEffect was added
    useEffect(()=>{
       const get = async ()=>{
            await supabase.auth.refreshSession()
        }
        get()
    }, [state.name])

    return(
        <div className="absolute flex h-full w-full justify-center items-center bg-[#3a3d45]">
            <div className="w-2/5 h-4/5 p-4 -mt-20 text-center">
                <img src={state.ProfilePic} alt="Profile" />
                {!newnameEdit 
                ? <h2 className="text-3xl relative">{state.name}  <MdEdit onClick={handleNameEdit} className="absolute text-3xl ml-7 top-0.5 cursor-pointer"/></h2>
                : (
                    <>
                        <br/>
                        <input onChange={handleNameChange} value={newname} className="w-52 mt-9 h-9 bg-[#c7c7c7] placeholder:text-[#6e6e6e] text-2xl border-0 rounded mb-5 focus-visible:outline-none" />
                        <FaRegCheckSquare onClick={handleNameClick} className="text-green-800 text-4xl ml-5 -mb-2.5 cursor-pointer" />
                        <FiXSquare onClick={()=>setNewnameEdit(false)} className="text-red-800 text-4xl ml-2 -mb-2.5 cursor-pointer" />
                    </>
                  )
                }
                <h2 className="text-3xl">Account Created: {state.AccCreated}</h2>
                <h2 className="text-3xl relative">User Password: {state.password} <MdEdit className="absolute text-3xl ml-7 top-0.5 cursor-pointer"/></h2>
                <button onClick={handleSignOut} disabled={!session} className="h-10 w-1/6 text-2xl border-0 rounded mb-5 cursor-pointer">LogOut</button><br/>
                <button onClick={handleDelete} disabled={!session} className="h-10 text-2xl border-0 rounded-xl mb-1 cursor-pointer bg-red-950 font-semibold">Delete Account</button>
            </div>
        </div>
    );
}

export default ProfilePage;