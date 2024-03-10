function ActOption({actName, grvalue}){
    const FullActName = grvalue + actName.replace(/\s/g, '') 

    return <option value={`${FullActName}`} disabled={FullActName === 'Ep8Act2' || FullActName === 'Ep8Act3' || FullActName.includes('Ep1')}>{actName}</option>
};

export default ActOption;