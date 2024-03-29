import { MdEmail } from "react-icons/md";
import Icon from "../Components/Icon";

export default function InputFormDiv(props){
    const { state, dispatch, passwordinput , ...otherProps} = props;
    const ElementName = props.dynamic_elementname;

    return (
        <div className="relative">
            {ElementName === 'Icon' ? (<Icon state={state} dispatch={dispatch} passwordInput={passwordinput} {...otherProps} />) : <MdEmail {...otherProps} />}
            <input onChange={(e) => dispatch({ type: props.inputdispatchtype, payload: e.target.value })} value={props.state[props.inputvalue]} type={props.inputtype} name={props.inputname} placeholder={props.inputplaceholder} autoComplete="off" className="block h-10 w-full bg-[#c7c7c7] placeholder:text-[#6e6e6e] text-2xl border-0 rounded mb-5 focus-visible:outline-none" />
        </div>
    );
}