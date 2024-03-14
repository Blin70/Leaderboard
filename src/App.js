import { useState } from 'react';
import { supabase } from './Supabase/SupabaseClient';
import Navbar from './Components/Navbar';
import LeaderboardPage from './Pages/LeaderboardPage';

function App(){
    //Supabase
    const [SignUp, setSignUp] = useState({
        name:'',
        email:'',
        password:''
    });

    //SignUp    //works

    const signUp = async () => {
        const { data, error } = await supabase.auth.signUp(
            {
            email: SignUp.email,
            password: SignUp.password,
            options: {
                data: {
                first_name: SignUp.name,
                age: null,
                }
            }
            }
        )
    }

    return(
        <>
            <Navbar/>
            <LeaderboardPage/>
            <input onChange={(e)=>setSignUp.name(e.target.value)} value={SignUp.name} type='text' placeholder='Enter Your Name'/>
            <input onChange={(e)=>setSignUp.email(e.target.value)} value={SignUp.email} type='text' placeholder='Enter Email'/>
            <input onChange={(e)=>setSignUp.password(e.target.value)} value={SignUp.password} type='text' placeholder='Enter Password'/>
            <button onClick={signUp} disabled={SignUp.email === '' || SignUp.password === ''}>SignUp</button>
        </>
    );
};

export default App;