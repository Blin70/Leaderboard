import { useReducer } from "react";
import useSession from "../Hooks/use-session";
import Navbar from "../Components/Navbar";
import SignIn from "../Supabase/SignIn";
import SignUp from "../Supabase/SignUp";
import SignOut from "../Supabase/SignOut";

const reducer = (state, action) => {
    switch (action.type){
        case 'new_email':
            return { ...state, email: action.payload};
        case 'new_password':
            return { ...state, password: action.payload};
        case 'new_repeatPassword':
            return { ...state, repeatPassword: action.payload};
        default:
            throw new Error();
    }
}

function ProfilePage(){
    const [state, dispatch] = useReducer(reducer, { email:'', password:'', repeatPassword:'' });
    const session = useSession();

    return(             //style the form
        <><Navbar disableProfileClick/>
            {!session && (
                <div className="absolute flex h-full w-full justify-center items-center bg-[#3a3d45]">
                    <div className="w-1/6 h-2/5 p-4 -mt-44">
                        <h1 className="text-6xl">Sign Up</h1>
                        <input onChange={(e)=>dispatch({ type: 'new_email', payload: e.target.value})} value={state.email} type='text' name="email" placeholder='Enter Email' autoComplete="off" className="block h-10 w-full bg-[#c7c7c7] placeholder:text-[#6e6e6e] text-2xl border-0 rounded mb-5 focus-visible:outline-none"/>
                        <input onChange={(e)=>dispatch({ type: 'new_password', payload: e.target.value})} value={state.password} type='text' name="password" placeholder='Enter Password' className="block h-10 w-full bg-[#c7c7c7] placeholder:text-[#6e6e6e] text-2xl border-0 rounded mb-5 focus-visible:outline-none"/>
                        <input onChange={(e)=>dispatch({ type: 'new_repeatPassword', payload: e.target.value})} value={state.repeatPassword} type='text' name="repeat_password" placeholder='Repeat Password' className="block h-10 w-full bg-[#c7c7c7] placeholder:text-[#6e6e6e] text-2xl border-0 rounded mb-5 focus-visible:outline-none"/>
                        <button onClick={() => SignUp(state.email, state.password)} disabled={state.email === '' || state.password === '' || state.password !== state.repeatPassword} className="h-10 w-full text-2xl border-0 rounded mb-1">SignUp</button>
                        <div className="w-full inline">
                            <input type="checkbox" className="accent-[#c7c7c7]"/>
                            <label className="text-lg text-[#cfcfcf]/50">Remember me!</label>
                        </div>
                        {/*<button onClick={() => SignIn(state.email, state.password)} disabled={state.email === '' || state.password === ''}>LogIn</button>*/}
                    </div>
                </div>
            )}

            {session && (
                <div className="absolute flex h-full w-full justify-center items-center">
                   <button onClick={SignOut} disabled={!session}>LogOut</button>
                </div>
            )}
        </>
    );
   
};

export default ProfilePage;