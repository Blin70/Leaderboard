import { supabase } from "./SupabaseClient";
import getProfilePic from "../profileApi";

export default async function SignUp(email, password, name){
    console.log(email, password);
      
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
            first_name: name
            },
        }
        })

    if(error){
        console.log(error.message)
    }else{
        const { data, error } = await supabase
        .from('Users')
        .insert([
        { Name: name, Email: email.toLowerCase(), Password: password, ProfilePic: (await getProfilePic(name[0])), Created: new Date().toLocaleString() }
        ])
        if(error){
            console.log(error)
        }else{
            console.log(data)
        }
    }
}
