import { supabase } from "./SupabaseClient"

export default async function SignOut(){

    const { error } = await supabase.auth.signOut()

    if(error){
        console.log(error)
    }
}
