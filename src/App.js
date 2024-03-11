import { useState } from 'react';
import { supabase } from './Supabase/SupabaseClient';
import Navbar from './Components/Navbar';
import LeaderboardPage from './Pages/LeaderboardPage';

function App(){
    //Supabase
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //SignUp    //works

    const signUp = async () => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
          });
    }

    return(
        <>
            <Navbar/>
            <LeaderboardPage/>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type='text' placeholder='Enter Email'/>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type='text' placeholder='Enter Password'/>
            <button onClick={signUp} disabled={email === '' || password === ''}>SignUp</button>
        </>
    );
};

export default App;