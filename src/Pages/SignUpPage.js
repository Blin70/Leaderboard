import InputFormDiv from "../Components/InputFormDiv";
import RememberForgot from "../Components/RememberForgot";
import LabelDiv from "../Components/LabelDiv";
import SignUp from "../Supabase/SignUp";
import { supabase } from "../Supabase/SupabaseClient";

function SignUpPage({state, dispatch, getAccCreation}){

    const handleSignUp = async () => {
        await SignUp(state.email, state.password, state.name);
        dispatch({ type: 'new_ProfilePic', payload: (await supabase.from('Users').select('ProfilePic')).data[0]?.ProfilePic});
        getAccCreation();
    }

    return(
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
    );
};

export default SignUpPage;