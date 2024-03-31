import { useReducer, useEffect } from "react";
import useSession from "../Hooks/use-session";
import { supabase } from "../Supabase/SupabaseClient";
import Navbar from "../Components/Navbar";
import SignIn from "../Supabase/SignIn";
import SignUp from "../Supabase/SignUp";
import SignOut from "../Supabase/SignOut";
import InputFormDiv from "../Components/InputFormDiv";
import RememberForgot from "../Components/RememberForgot";
import LabelDiv from "../Components/LabelDiv";

const reducer = (state, action) => {
    switch (action.type){
        case 'new_RESET':
            return { name:'', email:'', password:'', repeatPassword:'', tgPassword:false, tgRPassword:false, signInPage:false, RememberMe:false, ProfilePic:'' };
        case 'new_name':
            return { ...state, name: action.payload};
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
            return { signInPage: !state.signInPage, name:'', email:'', password:'', repeatPassword:'', tgPassword: false, tgRPassword: false, RememberMe: false, ProfilePic:''};
        case 'new_RememberMe':
            return { ...state, RememberMe: !state.RememberMe};
        case 'new_ProfilePic':
            return { ...state, ProfilePic: action.payload};
        default:
            throw new Error();
    }
}

function ProfilePage(){
    const [state, dispatch] = useReducer(reducer, { name:'', email:'', password:'', repeatPassword:'', tgPassword:false, tgRPassword:false, signInPage:false, RememberMe: false, ProfilePic: '' });
    const session = useSession();

    const handleLogIn = async () => {
        await SignIn(state.email, state.password);
        dispatch({ type: 'new_ProfilePic', payload: (await supabase.from('Users').select('ProfilePic').eq('Email', state.email)).data[0].ProfilePic});
    }

    const handleSignUp = async () => { //error when signing up but just for a sec
        await SignUp(state.email, state.password, state.name);
        dispatch({ type: 'new_ProfilePic', payload: (await supabase.from('Users').select('ProfilePic').eq('Email', state.email)).data[0].ProfilePic});
    }

    const handleSignOut = () => {
        SignOut();
        dispatch({ type: 'new_RESET'})
    }

    useEffect(() => {
            if(session){
                const getProfilePic = async () => {
                     dispatch({ type: 'new_ProfilePic', payload: (await supabase.from('Users').select('ProfilePic').eq('Email', session.user.email)).data[0].ProfilePic});
                }
                getProfilePic();
            }
    }, [session]);


    
    return(
        <><Navbar disableProfileClick/>
            {!session && (
                <div className="absolute flex h-full w-full justify-center items-center bg-[#3a3d45]">
                    <div className="w-1/6 h-2/5 p-4 -mt-44">
                        {!state.signInPage && (
                            <>
                                <h1 className="text-6xl">Sign Up</h1>
                                <InputFormDiv state={state} dispatch={dispatch} dynamic_elementname='FaUser' inputdispatchtype='new_name' iputvalue='name' inputtype='text' inputname='name' inputplaceholder='Enter Your Name'  className="absolute fill-[#3a3d45] text-3xl right-0 top-1.5"/>
                                <InputFormDiv state={state} dispatch={dispatch} dynamic_elementname='MdEmail' inputdispatchtype='new_email' iputvalue='email' inputtype='text' inputname='email' inputplaceholder='Enter Email'  className="absolute fill-[#3a3d45] text-3xl right-0 top-1.5"/>
                                <InputFormDiv state={state.tgPassword} dispatch={dispatch} passwordinput={true} dynamic_elementname='Icon' inputdispatchtype='new_password' inputvalue='password' inputtype={state.tgPassword ? 'text' : 'password'} inputname='password' inputplaceholder='Enter Password' />
                                <InputFormDiv state={state.tgRPassword} dispatch={dispatch} passwordInput={false} dynamic_elementname='Icon' inputdispatchtype='new_repeatPassword' inputvalue='repeatPassword' inputtype={state.tgRPassword ? 'text' : 'password'} inputname='repeat_password' inputplaceholder='Repeat Password' />
                                <button onClick={handleSignUp} disabled={state.email === '' || state.password === '' || state.password !== state.repeatPassword} className="h-10 w-full text-2xl border-0 rounded mb-1 cursor-pointer">SignUp</button>
                                <RememberForgot state={state.RememberMe} dispatch={dispatch}/>
                                <LabelDiv firstlabeltext='Already have an account? ' secondlabeltext='Log In' dispatch={dispatch} />
                            </>
                        )}
                        {state.signInPage && (
                            <>
                                <h1 className="text-6xl">Log In</h1>
                                <InputFormDiv state={state} dispatch={dispatch} dynamic_elementname='MdEmail' inputdispatchtype='new_email' iputvalue='email' inputtype='text' inputname='email' inputplaceholder='Enter Email'  className="absolute fill-[#3a3d45] text-3xl right-0 top-1.5"/>
                                <InputFormDiv state={state.tgPassword} dispatch={dispatch} passwordinput={true} dynamic_elementname='Icon' inputdispatchtype='new_password' inputvalue='password' inputtype={state.tgPassword ? 'text' : 'password'} inputname='password' inputplaceholder='Enter Password' />
                                <button onClick={handleLogIn} disabled={state.email === '' || state.password === ''} className="h-10 w-full text-2xl border-0 rounded mb-1 cursor-pointer">Log In</button>
                                <RememberForgot state={state.RememberMe} dispatch={dispatch} secondLabel={true} />
                                <LabelDiv firstlabeltext='Dont have an account? ' secondlabeltext='Sign Up' dispatch={dispatch}/>
                            </>
                        )}
                    </div>
                </div>
            )}
                {/* Work on when there is a session next */}
            {session && (
                <div className="absolute flex h-full w-full justify-center items-center bg-[#3a3d45]">
                    <div className="w-2/5 h-4/5 p-4 -mt-20">
                        <img src={state.ProfilePic} alt="Profile" />

                    </div>
                   <button onClick={handleSignOut} disabled={!session}>LogOut</button>
                </div>
            )}
        </>
    );
   
};

export default ProfilePage;