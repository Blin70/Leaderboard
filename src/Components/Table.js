function Table({BodyData, HeadData}){
    const renderedHeadData = HeadData.map((data, index) => {
        return <th key={index} className="border border-solid border-black border-collapse">{data}</th>
    });

    const renderedBodyData = BodyData.map((data, index) => {
        const renderedRowBodyData = Object.values(data).map((value, n) => {
            return <td key={n} className="border border-solid border-black border-collapse">{value}</td>
        });

        return (
            <tr key={index}>
                {renderedRowBodyData}
            </tr>
        );
    });

    return(
            <table className="w-1/2 border-2 border-solid border-black text-center text-2xl border-collapse m-auto">
                <thead className="border-2 border-solid border-black sticky top-0">
                    <tr>
                        {renderedHeadData}
                    </tr>
                </thead>
                <tbody>
                    {renderedBodyData}
                </tbody>
            </table>
    );
};

export default Table;