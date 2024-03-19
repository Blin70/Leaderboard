import { useState, useReducer } from "react";
import { supabase } from "../Supabase/SupabaseClient";
import useSession from "../Hooks/use-session";
import Navbar from "../Components/Navbar";

const reducer = (state, action) => {
    switch (action.type){
        case 'new_name':
            return { ...state, name: action.payload};
        case 'new_email':
            return { ...state, email: action.payload};
        case 'new_password':
            return { ...state, password: action.payload};
        default:
            throw new Error();
    }
}

function ProfilePage(){
    const [state, dispatch] = useReducer(reducer, { name:'', email:'', password:''});
    const session = useSession();

    //Supabase
    const signUp = async () => {
        console.log(state.name, state.email, state.password);
        const { data, error } = await supabase.auth.signUp({
            email: state.email,
            password: state.password,
          })
          console.log(data, error);
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        console.log(error)
    }

    const login = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: state.email,
            password: state.password,
          });
          console.log(data,error)
    }



    return(             //style the form
        <><Navbar/>
            {!session && (
                <div className="absolute flex h-full w-full justify-center items-center">
                    <div>
                    <input onChange={(e)=>dispatch({ type: 'new_name', payload: e.target.value})} value={state.name} type='text' placeholder='Enter Your Name'/>
                    <input onChange={(e)=>dispatch({ type: 'new_email', payload: e.target.value})} value={state.email} type='text' placeholder='Enter Email'/>
                    <input onChange={(e)=>dispatch({ type: 'new_password', payload: e.target.value})} value={state.password} type='text' placeholder='Enter Password'/>
                    <button onClick={signUp} disabled={state.email === '' || state.password === ''}>SignUp</button>
                    <button onClick={login} disabled={state.email === '' || state.password === ''}>LogIn</button>
                    <button onClick={signOut} disabled={!session}>LogOut</button>
                    </div>
                </div>
            )};
        </>
    );
   
};

export default ProfilePage;