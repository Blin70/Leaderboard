import { supabase } from "./SupabaseClient";

export default async function SignUp(email, password){
    console.log(email, password);

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      })

    if(error){
        console.log(error.message)
    }else{
        console.log(data)
    }
}
