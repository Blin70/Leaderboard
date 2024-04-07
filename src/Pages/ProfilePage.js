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
import { MdEdit } from "react-icons/md";

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
        case 'new_AccCreated':
            return { ...state, AccCreated: action.payload};
        default:
            throw new Error();
    }
}

function ProfilePage(){
    const [state, dispatch] = useReducer(reducer, { name:'', email:'', password:'', repeatPassword:'', tgPassword:false, tgRPassword:false, signInPage:false, RememberMe: false, ProfilePic: '', AccCreated: '' });
    const session = useSession();

    const getAccCreation = async () => {
        // Get the Account Creation Date
        dispatch({ type: 'new_AccCreated', payload: (await supabase.from('Users').select('Created')).data[0]?.Created }) 
    }

    const handleLogIn = async () => {
        await SignIn(state.email, state.password);
        dispatch({ type: 'new_ProfilePic', payload: (await supabase.from('Users').select('ProfilePic').eq('Email', state.email)).data[0].ProfilePic});
        getAccCreation();
    }

    const handleSignUp = async () => {
        await SignUp(state.email, state.password, state.name);
        dispatch({ type: 'new_ProfilePic', payload: (await supabase.from('Users').select('ProfilePic').eq('Email', state.email)).data[0].ProfilePic});
        getAccCreation();
    }

    const handleSignOut = () => {
        SignOut();
        dispatch({ type: 'new_RESET'})
    }

    const handleDelete = () => {
        console.log('Delete func hasnt been implemented yet');
    }


    useEffect(() => {
            if(session){
                const getProfilePic = async () => {
                    dispatch({ type: 'new_ProfilePic', payload: (await supabase.from('Users').select('ProfilePic')).data[0]?.ProfilePic});
                }
                const getUserName = async () => {
                    dispatch({ type: 'new_name', payload: (await supabase.from('Users').select('Name')).data[0]?.Name});
                }
                const getPassword = async () => {
                    dispatch({ type: 'new_password', payload: (await supabase.from('Users').select('Password')).data[0]?.Password});
                }
                getProfilePic();
                getUserName();
                getPassword();
                getAccCreation();
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
            {session && (
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
            )}
        </>
    );
   
};

export default ProfilePage;