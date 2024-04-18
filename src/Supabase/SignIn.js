import { supabase } from "./SupabaseClient";

export default async function SignIn(email, password){

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          });

        if(error){
            console.log(error.message);
            alert(error.message);
            return error;
        }
}