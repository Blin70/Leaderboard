import { useContext } from "react";
import SessionContext from "../context/Session";

function useSession(){
    return useContext(SessionContext);
}

export default useSession;