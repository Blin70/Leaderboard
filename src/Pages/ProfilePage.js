import { useReducer, useEffect } from "react";
import useSession from "../Hooks/use-session";
import Navbar from "../Components/Navbar";
import SignIn from "../Supabase/SignIn";
import SignUp from "../Supabase/SignUp";
import SignOut from "../Supabase/SignOut";
import { MdEmail } from "react-icons/md";
import Icon from "../Components/Icon";

const reducer = (state, action) => {
    switch (action.type){
        case 'new_RESET/{RememberMe}':
            return { email:'', password:'', repeatPassword:'', tgPassword:false, tgRPassword:false, signInPage:false, RememberMe: state.RememberMe};
        case 'new_RESET':
            return { email:'', password:'', repeatPassword:'', tgPassword:false, tgRPassword:false, signInPage:false, RememberMe:false };
        case 'new_email':
            return { ...state, email: action.payload};
        case 'new_password':
            return { ...state, password: action.payload};
        case 'new_repeatPassword':
            return { ...state, repeatPassword: action.payload};
        case 'new_tgPassword':
            return { ...state, tgPassword: !state.tgPassword};
        case 'new_tgRPassword':
            return { ...state, tgRPassword: !state.tgRPassword};
        case 'new_signInPage':
            return { ...state, signInPage: !state.signInPage};
        case 'new_RememberMe':
            return { ...state, RememberMe: !state.RememberMe};
        default:
            throw new Error();
    }
}

function ProfilePage(){
    const [state, dispatch] = useReducer(reducer, { email:'', password:'', repeatPassword:'', tgPassword:false, tgRPassword:false, signInPage:false, RememberMe: false });
    const session = useSession();

    useEffect(() => {
        if(session){
            dispatch({ type: 'new_RESET/{RememberMe}'});
        }else{
            dispatch({ type: 'new_RESET'});
        }
    }, [session]);

    const handleClick = () => {
        dispatch({ type:'new_signInPage'})
    };

    return(             //style the form
        <><Navbar disableProfileClick/>
            {!session && (
                <div className="absolute flex h-full w-full justify-center items-center bg-[#3a3d45]">
                    <div className="w-1/6 h-2/5 p-4 -mt-44">
                        {!state.signInPage && (
                            <>
                                <h1 className="text-6xl">Sign Up</h1>
                                <div className="relative">
                                    <MdEmail className="absolute fill-[#3a3d45] text-3xl right-0 top-1.5"/>
                                    <input onChange={(e)=>dispatch({ type: 'new_email', payload: e.target.value})} value={state.email} type='text' name="email" placeholder='Enter Email' autoComplete="off" className="block h-10 w-full bg-[#c7c7c7] placeholder:text-[#6e6e6e] text-2xl border-0 rounded mb-5 focus-visible:outline-none"/>
                                </div>
                                <div className="relative">
                                    <Icon state={state.tgPassword} dispatch={dispatch} passwordInput={true}/>
                                    <input onChange={(e) => dispatch({ type: 'new_password', payload: e.target.value})} value={state.password} type={state.tgPassword ? 'text' : 'password'} name="password" placeholder='Enter Password' className="block h-10 w-full bg-[#c7c7c7] placeholder:text-[#6e6e6e] text-2xl border-0 rounded mb-5 focus-visible:outline-none"/>
                                </div>
                                <div className="relative">
                                    <Icon state={state.tgRPassword} dispatch={dispatch}/>
                                    <input onChange={(e) => dispatch({ type: 'new_repeatPassword', payload: e.target.value})} value={state.repeatPassword} type={state.tgRPassword ? 'text' : 'password'} name="repeat_password" placeholder='Repeat Password' className="block h-10 w-full bg-[#c7c7c7] placeholder:text-[#6e6e6e] text-2xl border-0 rounded mb-5 focus-visible:outline-none"/>
                                </div>
                                <button onClick={() => SignUp(state.email, state.password)} disabled={state.email === '' || state.password === '' || state.password !== state.repeatPassword} className="h-10 w-full text-2xl border-0 rounded mb-1 cursor-pointer">SignUp</button>
                                <div className="w-full inline">
                                    <input onClick={() => dispatch({ type: 'new_RememberMe'})} type="checkbox" className="accent-[#c7c7c7]"/>
                                    <label className="text-lg text-[#cfcfcf]/50">Remember me!</label>{/*Not Implemented yet*/}
                                </div>
                                <div className="w-full mt-5">
                                    <label className="text-[#c7c7c7]/40 text-xl">Already have an account? </label>
                                    <label onClick={handleClick} className="text-[#c7c7c7]/40 text-xl hover:text-[#c7c7c7] cursor-pointer">Log In</label>
                                </div>
                            </>
                        )}
                        {state.signInPage && (
                            <>
                                <h1 className="text-6xl">Log In</h1>
                                <div className="relative">
                                    <MdEmail className="absolute fill-[#3a3d45] text-3xl right-0 top-1.5"/>
                                    <input onChange={(e)=>dispatch({ type: 'new_email', payload: e.target.value})} value={state.email} type='text' name="email" placeholder='Enter Email' autoComplete="off" className="block h-10 w-full bg-[#c7c7c7] placeholder:text-[#6e6e6e] text-2xl border-0 rounded mb-5 focus-visible:outline-none"/>
                                </div>
                                <div className="relative">
                                    <Icon state={state.tgPassword} dispatch={dispatch} passwordInput={true}/>
                                    <input onChange={(e) => dispatch({ type: 'new_password', payload: e.target.value})} value={state.password} type={state.tgPassword ? 'text' : 'password'} name="password" placeholder='Enter Password' className="block h-10 w-full bg-[#c7c7c7] placeholder:text-[#6e6e6e] text-2xl border-0 rounded mb-5 focus-visible:outline-none"/>
                                </div>
                                <button onClick={() => SignIn(state.email, state.password)} disabled={state.email === '' || state.password === ''} className="h-10 w-full text-2xl border-0 rounded mb-1 cursor-pointer">Log In</button>
                                <div className="w-full inline">
                                    <input onClick={() => dispatch({ type: 'new_RememberMe'})} type="checkbox" className="accent-[#c7c7c7]"/>
                                    <label className="text-lg text-[#cfcfcf]/50">Remember me!</label>{/*Not Implemented yet*/}
                                    <label className="float-right text-lg text-[#cfcfcf]/50 cursor-pointer hover:text-gray-600">Forgot Password!</label>{/*Not implemented yet*/}
                                </div>
                                <div className="w-full mt-5">
                                    <label className="text-[#c7c7c7]/40 text-xl">Dont have an account? </label>
                                    <label onClick={handleClick} className="text-[#c7c7c7]/40 text-xl hover:text-[#c7c7c7] cursor-pointer">Sign Up</label>
                                </div>
                            </>
                        )}
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