export default function LabelDiv({firstlabeltext, secondlabeltext, dispatch}){

    const handleClick = () => {
        dispatch({ type:'new_signInPage'});
    };

    return(
        <div className="w-full mt-5">
            <label className="text-[#c7c7c7]/40 text-xl">{firstlabeltext}</label>
            <label onClick={handleClick} className="text-[#c7c7c7]/40 text-xl hover:text-[#c7c7c7] cursor-pointer">{secondlabeltext}</label>
        </div>
    );
};