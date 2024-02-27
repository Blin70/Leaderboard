import './app.css';
import Table from './Components/Table';

function App(){
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
        { Rank: '13', Player: 'Test4', RR: '135', Wins: '13', GamesPlayed: '20'}
    ];

    const HeadData = ['Rank', 'Player', 'RR', 'Wins', 'Games Played'];

    
    
    return(
            <div style={{maxHeight:"802px"}} className='flex h-full w-full justify-center items-center overflow-auto'>
                <Table BodyData={BodyData} HeadData={HeadData}/>
            </div>
    );
};

export default App;