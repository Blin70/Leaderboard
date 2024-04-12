import Logo from '../images/Sword_Logo.png';
import DefaultProfilePic from '../images/default_profile_pic.png';
import { Link } from 'react-router-dom';
import useSession from '../Hooks/use-session';
import { supabase } from '../Supabase/SupabaseClient';
import { useState, useEffect } from 'react';

function Navbar({ disableProfileClick }){
    const [ProfilePic, setProfilePic] =useState(DefaultProfilePic);
    const session = useSession();

    useEffect(() => {
        const getProfilePic = async () => {
            if(session){
                const { data } = await supabase.from('Users').select('ProfilePic');

                const profilePicUrl = data && data.length > 0 ? data[0].ProfilePic : DefaultProfilePic;

                setProfilePic(profilePicUrl);

            }else{
                setProfilePic(DefaultProfilePic);
            }
        }

        getProfilePic();

    }, [session])
    
            //When the session does a softrefresh (when the user clicks on a LINK), the profilePic for a milisecond changes to the default one but then changes back to the correct ProfilePic, cant seem to fix 
    return(
            <div className="flex w-screen h-24 bg-black">
                <div className="w-1/2">
                    <Link to='/'>
                        <img alt='Brand Logo(Sword and Shield)' src={Logo} className='h-24 ml-20'/>
                    </Link>
                </div>
                <div className='w-1/2'>
                    <Link to={disableProfileClick ? null : 'Profile'}>
                        <img src={ProfilePic} alt='Profile Pic' className='h-20 w-20 rounded-full float-right mr-20 mt-2 mb-2'/>
                    </Link>
                </div>
            </div>
    );
};

export default Navbar;