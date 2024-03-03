import './app.css';
import Table from './Components/Table';
import GetLeaderboard from './api';
import SizeForm from './Components/SizeForm';
import ChooseAct from './Components/ChooseAct';
import { useEffect, useState } from 'react';

function App(){
    const [PlayerData, setPlayerData] = useState([]);
    const [size, setSize] = useState(100);
    const [act, setAct] = useState('Ep8Act1')

    useEffect(() => {
        async function fetchData(){
            const result = await GetLeaderboard(size, act);
             const list = [];
            result.map((player)=>{
                let Rank = player.leaderboardRank
                let gameName =  (player.gameName !== undefined) ? player.gameName : ('Anonnymous');
                let TagLine = (player.tagLine !== undefined) ? (player.tagLine) : ('#????');
                let RR =  player.rankedRating;
                let Wins =  player.numberOfWins;
               return(
                    list.push({Rank, gameName, TagLine, RR, Wins})
               );
            })
            setPlayerData(list);
        };
        fetchData();
    }, [size, act]);

    const HeadData = ['Rank', 'Player', 'Tag Line', 'RR', 'Games Won'];

    const getActName = (ActName) => {
        setAct(ActName);
    };
    
    return(
        <div className='h-full w-full'>
            <div style={{maxHeight:"802px"}} className='flex h-full w-full justify-center items-center overflow-auto'>
                <Table BodyData={PlayerData} HeadData={HeadData}/>
            </div>
            <SizeForm setSize={setSize}/>
            <ChooseAct setActName={getActName} />
        </div>
    );
};

export default App;