import { useState, useEffect } from "react";
import SignOut from "../Supabase/SignOut";
import useSession from "../Hooks/use-session";
import DeleteAccModal from "../Components/DeleteAccModal";
import ChangeName from "../Components/ChangeName";
import ChangePassword from "../Components/ChangePassword";

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
    

    // SignOut

    const handleSignOut = () => {
        SignOut();
        dispatch({ type: 'new_RESET'})
    }


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
                <ChangeName  user={user} />
                <h2 className="text-3xl">Account Created: {user.creationDate}</h2>
                <ChangePassword user={user} />
                <br/>
                <button onClick={handleSignOut} disabled={!session} className="h-10 w-1/6 text-2xl border-0 rounded mb-5 cursor-pointer">LogOut</button><br/>
                <DeleteAccModal />
            </div>
        </div>
    );
}

export default ProfilePage;