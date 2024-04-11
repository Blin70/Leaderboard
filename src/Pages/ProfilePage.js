import { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { FaRegCheckSquare } from "react-icons/fa";
import { FiXSquare } from "react-icons/fi";
import SignOut from "../Supabase/SignOut";
import { supabase } from "../Supabase/SupabaseClient";
import useSession from "../Hooks/use-session";

function ProfilePage({state, dispatch}){
    const session = useSession();
    const [user, setUser] = useState({
        uuid: session.user.id,
        name: session.user.user_metadata.name ? session.user.user_metadata.name : session.user.user_metadata.first_name,
        email: session.user.email,
        password: state.password,
        creationDate: state.AccCreated,
        profilePic: state.ProfilePic
    });
    const [newnameEdit, setNewnameEdit] = useState(false);
    const [newname, setNewname] = useState(user.name);
    const [newpasswordEdit, setNewpasswordEdit] = useState(false);
    const [newpassword, setNewpassword] = useState(user.password);
    

    // User Actions

    const handleSignOut = () => {
        SignOut();
        dispatch({ type: 'new_RESET'})
    }

    const handleDelete = async () => {
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
        if(newname !== user.name){
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

    

    //Password Update

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
         setNewname(user.name);
     }, [newnameEdit, user.name])

     useEffect(() => {
        setNewpassword(user.password);
     }, [newpasswordEdit, user.password])

     useEffect(() => {
        if (session) {
            setUser({
                uuid: session.user.id,
                name: session.user.user_metadata.name ? session.user.user_metadata.name : session.user.user_metadata.first_name,
                email: session.user.email,
                password: state.password,
                creationDate: state.AccCreated,
                profilePic: state.ProfilePic
            });
        }
    }, [session, state]);
    

    return(
        <div className="absolute flex h-full w-full justify-center items-center bg-[#3a3d45]">
            <div className="w-2/5 h-4/5 p-4 -mt-20 text-center">
                <img src={user.profilePic} alt="Profile" />
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
                <h2 className="text-3xl">Account Created: {user.creationDate}</h2>
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
                <br/>
                <button onClick={handleSignOut} disabled={!session} className="h-10 w-1/6 text-2xl border-0 rounded mb-5 cursor-pointer">LogOut</button><br/>
                <button onClick={handleDelete} disabled={!session} className="h-10 text-2xl border-0 rounded-xl mb-1 cursor-pointer bg-red-950 font-semibold">Delete Account</button>
            </div>
        </div>
    );
}

export default ProfilePage;