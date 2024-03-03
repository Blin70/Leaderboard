import ActOptionGroup from "./ActOptionGroup";

function ChooseAct({setActName}){

    const handleChange = (event) => {
        let ActName = event.target.selectedOptions[0].value;
        setActName(ActName);
    };
        //ADD STYLES
    return(
       <select defaultValue={''} onChange={handleChange}>
            <option value={''} disabled hidden>Choose an Act</option>
            <ActOptionGroup grvalue={'Ep1'} label={'Episode 1'} act1={'Act 1'} act2={'Act 2'} act3={'Act 3'}/>
            <ActOptionGroup grvalue={'Ep2'} label={'Episode 2'} act1={'Act 1'} act2={'Act 2'} act3={'Act 3'}/>
            <ActOptionGroup grvalue={'Ep3'} label={'Episode 3'} act1={'Act 1'} act2={'Act 2'} act3={'Act 3'}/>
            <ActOptionGroup grvalue={'Ep4'} label={'Episode 4'} act1={'Act 1'} act2={'Act 2'} act3={'Act 3'}/>
            <ActOptionGroup grvalue={'Ep5'} label={'Episode 5'} act1={'Act 1'} act2={'Act 2'} act3={'Act 3'}/>
            <ActOptionGroup grvalue={'Ep6'} label={'Episode 6'} act1={'Act 1'} act2={'Act 2'} act3={'Act 3'}/>
            <ActOptionGroup grvalue={'Ep7'} label={'Episode 7'} act1={'Act 1'} act2={'Act 2'} act3={'Act 3'}/>
            <ActOptionGroup grvalue={'Ep8'} label={'Episode 8'} act1={'Act 1'} act2={'Act 2'} act3={'Act 3'}/>
       </select>
    );
};

export default ChooseAct;