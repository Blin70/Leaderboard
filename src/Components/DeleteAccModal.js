import { useState } from "react";
import useSession from "../Hooks/use-session";
import { supabase } from "../Supabase/SupabaseClient";
import SignOut from "../Supabase/SignOut";

function DeleteAcc({uuid}){
    const [showModal, setShowModal] = useState(false);
    const session = useSession();

    const handleAskDelete = async () => {
        setShowModal(!showModal);
    }

    const handleDelete = async () => {
        let { data, error } = await supabase.rpc('delete_own_account', { user_id: uuid })
        if (data){
            SignOut();
            console.log(data);
        }else if(error){
            console.log(error);
        }

    };
    
        //Have to make it so it log the user out while/before deleting the account
    return ( 
        <>
            <button onClick={handleAskDelete} disabled={!session} className="h-10 text-2xl border-0 rounded-xl mb-1 cursor-pointer bg-red-950 font-semibold">Delete Account</button>
            {showModal ? (
                <div className="justify-center w-full h-full items-center flex fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="border-0 w-1/4 h-2/6 rounded-lg shadow-lg flex flex-col bg-neutral-300 outline-none focus:outline-none">
                            <div className="h-1/5 w-full items-center flex justify-center">
                                    <h1>Delete Your Account</h1>
                            </div>
                            <div className="h-3/5 w-full items-center flex justify-center">
                                <h2 className="w-full inline">Are you sure you want to delete your account? This action is irreversible</h2>
                            </div>
                            <div className="h-1/5 w-full items-center flex justify-center ">
                                    <button onClick={handleAskDelete} className="w-2/6 h-2/3 rounded-lg border-0 text-xl bg-gray-400 cursor-pointer ">Cancel</button>
                                    <button onClick={handleDelete} className="w-2/6 h-2/3 rounded-lg border-0 text-xl bg-red-800 cursor-pointer font-semibold ml-2">Delete</button>
                            </div>
                        </div>
                </div>
            ) : null
            }
        </>
    )

}

export default DeleteAcc;