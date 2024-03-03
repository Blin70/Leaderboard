import ActOption from "./ActOption";

function ActOptionGroup(props){
    return(
        <optgroup {...props} label={props.label}>
            <ActOption grvalue={props.grvalue} actName={props.act1}/>
            <ActOption grvalue={props.grvalue} actName={props.act2}/>
            <ActOption grvalue={props.grvalue} actName={props.act3}/>
        </optgroup>
    );
};

export default ActOptionGroup;