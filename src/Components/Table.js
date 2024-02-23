function Table(){
    const BodyData = [
        { Rank: '1', Player: 'Test1', RR: '130', Wins: '13', GamesPlayed: '20'},
        { Rank: '2', Player: 'Test2', RR: '130', Wins: '13', GamesPlayed: '20'},
        { Rank: '3', Player: 'Test3', RR: '130', Wins: '13', GamesPlayed: '20'},
        { Rank: '4', Player: 'Test4', RR: '135', Wins: '13', GamesPlayed: '20'},
        { Rank: '5', Player: 'Test4', RR: '135', Wins: '13', GamesPlayed: '20'},
        { Rank: '6', Player: 'Test4', RR: '135', Wins: '13', GamesPlayed: '20'},
        { Rank: '7', Player: 'Test4', RR: '135', Wins: '13', GamesPlayed: '20'},
        { Rank: '8', Player: 'Test4', RR: '135', Wins: '13', GamesPlayed: '20'},
        { Rank: '9', Player: 'Test4', RR: '135', Wins: '13', GamesPlayed: '20'},
        { Rank: '10', Player: 'Test4', RR: '135', Wins: '13', GamesPlayed: '20'},
        { Rank: '11', Player: 'Test4', RR: '135', Wins: '13', GamesPlayed: '20'},
        { Rank: '12', Player: 'Test4', RR: '135', Wins: '13', GamesPlayed: '20'},
        { Rank: '13', Player: 'Test4', RR: '135', Wins: '13', GamesPlayed: '20'},
    ];

    const HeadData = ['Rank', 'Player', 'RR', 'Wins', 'Games Played'];

    
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
            <table className="w-1/2 border-2 border-solid border-black text-center text-2xl border-collapse">
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