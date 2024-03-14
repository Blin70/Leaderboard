import { useState, useEffect } from "react";
import { supabase } from "../Supabase/SupabaseClient";

function ProfilePage(){
    const [users, setUser] = useState('');

   
        const getSession = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            console.log(user);
        }
   
};

export default ProfilePage;