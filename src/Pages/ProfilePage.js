import { MdEdit } from "react-icons/md";
import SignOut from "../Supabase/SignOut";

function ProfilePage({state, dispatch, session}){

    const handleSignOut = () => {
        SignOut();
        dispatch({ type: 'new_RESET'})
    }

    const handleDelete = () => {
        console.log('Delete func hasnt been implemented yet');
    }

    return(
        <div className="absolute flex h-full w-full justify-center items-center bg-[#3a3d45]">
            <div className="w-2/5 h-4/5 p-4 -mt-20 text-center">
                <img src={state.ProfilePic} alt="Profile" />
                <h2 className="text-3xl relative">User Name: {state.name}  <MdEdit className="absolute text-3xl ml-7 top-0.5 cursor-pointer"/></h2>
                <h2 className="text-3xl">Account Created: {state.AccCreated}</h2>
                <h2 className="text-3xl relative">User Password: {state.password} <MdEdit className="absolute text-3xl ml-7 top-0.5 cursor-pointer"/></h2>
                <button onClick={handleSignOut} disabled={!session} className="h-10 w-1/6 text-2xl border-0 rounded mb-5 cursor-pointer">LogOut</button><br/>
                <button onClick={handleDelete} disabled={!session} className="h-10 text-2xl border-0 rounded-xl mb-1 cursor-pointer bg-red-950 font-semibold">Delete Account</button>
            </div>
        </div>
    );
}

export default ProfilePage;