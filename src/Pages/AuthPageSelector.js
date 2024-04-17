import { useReducer, useEffect } from "react";
import useSession from "../Hooks/use-session";
import { supabase } from "../Supabase/SupabaseClient";
import Navbar from "../Components/Navbar";
import SignUpPage from "./SignUpPage";
import SignInPage from "./SignInPage";
import ProfilePage from "./ProfilePage";

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

function AuthPageSelector(){
    const [state, dispatch] = useReducer(reducer, { name:'', email:'', password:'', repeatPassword:'', tgPassword:false, tgRPassword:false, signInPage:false, RememberMe: false, ProfilePic: '', AccCreated: '' });
    const session = useSession();

    const getAccCreation = async () => {
        // Get the Account Creation Date
        dispatch({ type: 'new_AccCreated', payload: (await supabase.from('Users').select('Created')).data[0]?.Created }) 
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
                        {!state.signInPage && <SignUpPage state={state} dispatch={dispatch} getAccCreation={getAccCreation} />}
                        {state.signInPage && <SignInPage state={state} dispatch={dispatch} getAccCreation={getAccCreation} />}
                    </div>
                </div>
            )}
            {session && <ProfilePage state={state} dispatch={dispatch} />}
        </>
    );
   
};

export default AuthPageSelector;