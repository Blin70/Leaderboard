import { useReducer, useEffect } from "react";
import useSession from "../Hooks/use-session";
import Navbar from "../Components/Navbar";
import SignIn from "../Supabase/SignIn";
import SignUp from "../Supabase/SignUp";
import SignOut from "../Supabase/SignOut";
import InputFormDiv from "../Components/InputFormDiv";
import RememberForgot from "../Components/RememberForgot";
import LabelDiv from "../Components/LabelDiv";

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
    
    return(            
        <><Navbar disableProfileClick/>
            {!session && (
                <div className="absolute flex h-full w-full justify-center items-center bg-[#3a3d45]">
                    <div className="w-1/6 h-2/5 p-4 -mt-44">
                        {!state.signInPage && (
                            <>
                                <h1 className="text-6xl">Sign Up</h1>
                                <InputFormDiv state={state} dispatch={dispatch} dynamic_elementname='MdEmail' inputdispatchtype='new_email' iputvalue='email' inputtype='text' inputname='email' inputplaceholder='Enter Email'  className="absolute fill-[#3a3d45] text-3xl right-0 top-1.5"/>
                                <InputFormDiv state={state.tgPassword} dispatch={dispatch} passwordinput={true} dynamic_elementname='Icon' inputdispatchtype='new_password' inputvalue='password' inputtype={state.tgPassword ? 'text' : 'password'} inputname='password' inputplaceholder='Enter Password' />
                                <InputFormDiv state={state.tgRPassword} dispatch={dispatch} passwordInput={false} dynamic_elementname='Icon' inputdispatchtype='new_repeatPassword' inputvalue='repeatPassword' inputtype={state.tgRPassword ? 'text' : 'password'} inputname='repeat_password' inputplaceholder='Repeat Password' />
                                <button onClick={() => SignUp(state.email, state.password)} disabled={state.email === '' || state.password === '' || state.password !== state.repeatPassword} className="h-10 w-full text-2xl border-0 rounded mb-1 cursor-pointer">SignUp</button>
                                <RememberForgot state={state.RememberMe} dispatch={dispatch}/>
                                <LabelDiv firstlabeltext='Already have an account? ' secondlabeltext='Log In' dispatch={dispatch} />
                            </>
                        )}
                        {state.signInPage && (
                            <>
                                <h1 className="text-6xl">Log In</h1>
                                <InputFormDiv state={state} dispatch={dispatch} dynamic_elementname='MdEmail' inputdispatchtype='new_email' iputvalue='email' inputtype='text' inputname='email' inputplaceholder='Enter Email'  className="absolute fill-[#3a3d45] text-3xl right-0 top-1.5"/>
                                <InputFormDiv state={state.tgPassword} dispatch={dispatch} passwordinput={true} dynamic_elementname='Icon' inputdispatchtype='new_password' inputvalue='password' inputtype={state.tgPassword ? 'text' : 'password'} inputname='password' inputplaceholder='Enter Password' />
                                <button onClick={() => SignIn(state.email, state.password)} disabled={state.email === '' || state.password === ''} className="h-10 w-full text-2xl border-0 rounded mb-1 cursor-pointer">Log In</button>
                                <RememberForgot state={state.RememberMe} dispatch={dispatch} secondLabel={true} />
                                <LabelDiv firstlabeltext='Dont have an account? ' secondlabeltext='Sign Up' dispatch={dispatch}/>
                            </>
                        )}
                    </div>
                </div>
            )}
                {/* Work on when there is a session next */}
            {session && (
                <div className="absolute flex h-full w-full justify-center items-center">
                   <button onClick={SignOut} disabled={!session}>LogOut</button>
                </div>
            )}
        </>
    );
   
};

export default ProfilePage;