import './app.css';
import Table from './Components/Table';
import GetLeaderboard from './api';
import { useEffect, useState } from 'react';

function App(){
    const [PlayerData, setPlayerData] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const result = await GetLeaderboard();
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
            console.log(list);
        };
        fetchData();
    }, []);
    console.log(PlayerData)

    const HeadData = ['Rank', 'Player', 'Tag Line', 'RR', 'Games Won'];

    
    
    return(
            <div style={{maxHeight:"802px"}} className='flex h-full w-full justify-center items-center overflow-auto'>
                <Table BodyData={PlayerData} HeadData={HeadData}/>
            </div>
    );
};

export default App;