import Logo from '../images/Sword_Logo.png';
import DefaultProfilePic from '../images/default_profile_pic.png';
import { Link } from 'react-router-dom';

function Navbar({ disableProfileClick }){
    return(
            <div className="flex w-screen h-24 bg-black">
                <div className="w-1/2">
                    <Link to='/'>
                        <img alt='Brand Logo(Sword and Shield)' src={Logo} className='h-24 ml-20'/>
                    </Link>
                </div>
                <div className='w-1/2'>
                    <Link to={disableProfileClick ? null : 'Profile'}>
                        <img alt='Default Profile Pic' src={DefaultProfilePic} className='h-20 w-20 rounded-full float-right mr-20 mt-2 mb-2'/>
                    </Link>
                    
                </div>
            </div>
    );
};

export default Navbar;