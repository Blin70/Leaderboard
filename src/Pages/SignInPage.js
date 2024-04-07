import InputFormDiv from "../Components/InputFormDiv";
import RememberForgot from "../Components/RememberForgot";
import LabelDiv from "../Components/LabelDiv";
import SignIn from "../Supabase/SignIn";
import { supabase } from "../Supabase/SupabaseClient";

function SignInPage({state, dispatch, getAccCreation}){

    const handleLogIn = async () => {
        await SignIn(state.email, state.password);
        dispatch({ type: 'new_ProfilePic', payload: (await supabase.from('Users').select('ProfilePic')).data[0].ProfilePic});
        getAccCreation();
    }

    return(
        <>
            <h1 className="text-6xl">Log In</h1>
            <InputFormDiv state={state} dispatch={dispatch} dynamic_elementname='MdEmail' inputdispatchtype='new_email' iputvalue='email' inputtype='text' inputname='email' inputplaceholder='Enter Email'  className="absolute fill-[#3a3d45] text-3xl right-0 top-1.5"/>
            <InputFormDiv state={state.tgPassword} dispatch={dispatch} passwordinput={true} dynamic_elementname='Icon' inputdispatchtype='new_password' inputvalue='password' inputtype={state.tgPassword ? 'text' : 'password'} inputname='password' inputplaceholder='Enter Password' />
            <button onClick={handleLogIn} disabled={state.email === '' || state.password === ''} className="h-10 w-full text-2xl border-0 rounded mb-1 cursor-pointer">Log In</button>
            <RememberForgot state={state.RememberMe} dispatch={dispatch} secondLabel={true} />
            <LabelDiv firstlabeltext='Dont have an account? ' secondlabeltext='Sign Up' dispatch={dispatch}/>
        </>
    );
}

export default SignInPage;