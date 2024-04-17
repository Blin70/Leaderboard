export default function RememberForgot({state, dispatch, secondLabel}){
    return(
        <div className="w-full inline">
            <input checked={state} onChange={() => dispatch({ type: 'new_RememberMe'})} type="checkbox" className="accent-[#c7c7c7]"/>
            <label className="text-lg text-[#cfcfcf]/50">Remember me!</label>{/*Not Implemented yet*/}
            {secondLabel && (<label className="float-right text-lg text-[#cfcfcf]/50 cursor-pointer hover:text-gray-600">Forgot Password!</label>)}{/*Forgot Password isnt implemented yet */}
        </div>
    );
};