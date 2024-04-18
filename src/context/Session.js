import { createContext, useState, useEffect } from "react";
import { supabase } from "../Supabase/SupabaseClient";

const SessionContext = createContext(null);

function SessionProvider({children}){
    const [session, setSession] = useState(null);

    useEffect(()=>{
        const subscription = supabase.auth.onAuthStateChange((event, session) => {
            if(event === 'SIGNED_OUT'){
                setSession(null);
            } else if(session){
                setSession(session)
            };
        });

        return () => {
            subscription.unsubscribe();
        }
    }, [])

    return(
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>  
    );
};

export { SessionProvider };
export default SessionContext;