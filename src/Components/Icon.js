import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";

export default function Icon({state, dispatch, passwordInput}) {
    if(passwordInput){
        if(state){
            return <GoEyeClosed onClick={() => dispatch({ type: 'new_tgPassword'})} className="absolute text-[#3a3d45] text-3xl right-0 top-1.5 cursor-pointer rounded-full hover:bg-[#dbdbdb]" title="Hide Password"/>
        }else{
            return <RxEyeOpen onClick={() => dispatch({ type: 'new_tgPassword'})} className="absolute text-[#3a3d45] text-3xl right-0 top-1.5 cursor-pointer rounded-full hover:bg-[#dbdbdb]" title="Show Password"/>
        }
    }else{
        if(state){
            return <GoEyeClosed onClick={() => dispatch({ type: 'new_tgRPassword'})} className="absolute text-[#3a3d45] text-3xl right-0 top-1.5 cursor-pointer rounded-full hover:bg-[#dbdbdb]" title="Hide Repeated Password"/>
        }else{
            return <RxEyeOpen onClick={() => dispatch({ type: 'new_tgRPassword'})} className="absolute text-[#3a3d45] text-3xl right-0 top-1.5 cursor-pointer rounded-full hover:bg-[#dbdbdb]" title="Show Repeated Password"/>
        }
    }
    
};