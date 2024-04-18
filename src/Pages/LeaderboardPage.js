import '../css/LeaderboardPage.css';
import { useState, useEffect } from "react";
import Table from "../Components/Table";
//import GetLeaderboard from "../api";
import ChooseAct from "../Components/ChooseAct";
import SizeForm from "../Components/SizeForm";

function LeaderboardPage(){
    const [PlayerData, setPlayerData] = useState([]);
    const [size, setSize] = useState(100);
    const [act, setAct] = useState('Ep8Act1')

    const GetLeaderboard = (size, act) => [
        {
            competitiveTier: 25,
            gameName: 'dummy data',
            leaderboardRank: 1,
            numberOfWins: 184,
            puuid:'kmng1ng18n1g091ng18ng1gn1ign10g01',
            rankedRating:1905,
            tagLine: 'test'
        },{
            competitiveTier: 25,
            gameName: 'dummy data',
            leaderboardRank: 2,
            numberOfWins: 184,
            puuid:'kmng1ng18n1g091ng18ng1gn1ign10g01',
            rankedRating:1905,
            tagLine: 'test'
        },{
            competitiveTier: 25,
            gameName: 'dummy data',
            leaderboardRank: 3,
            numberOfWins: 184,
            puuid:'kmng1ng18n1g091ng18ng1gn1ign10g01',
            rankedRating:1905,
            tagLine: 'test'
        },{
            competitiveTier: 25,
            gameName: 'dummy data',
            leaderboardRank: 4,
            numberOfWins: 184,
            puuid:'kmng1ng18n1g091ng18ng1gn1ign10g01',
            rankedRating:1905,
            tagLine: 'test'
        },{
            competitiveTier: 25,
            gameName: 'dummy data',
            leaderboardRank: 5,
            numberOfWins: 184,
            puuid:'kmng1ng18n1g091ng18ng1gn1ign10g01',
            rankedRating:1905,
            tagLine: 'test'
        },{
            competitiveTier: 25,
            gameName: 'dummy data',
            leaderboardRank: 6,
            numberOfWins: 184,
            puuid:'kmng1ng18n1g091ng18ng1gn1ign10g01',
            rankedRating:1905,
            tagLine: 'test'
        },{
            competitiveTier: 25,
            gameName: 'dummy data',
            leaderboardRank: 7,
            numberOfWins: 184,
            puuid:'kmng1ng18n1g091ng18ng1gn1ign10g01',
            rankedRating:1905,
            tagLine: 'test'
        },{
            competitiveTier: 25,
            gameName: 'dummy data',
            leaderboardRank: 8,
            numberOfWins: 184,
            puuid:'kmng1ng18n1g091ng18ng1gn1ign10g01',
            rankedRating:1905,
            tagLine: 'test'
        },{
            competitiveTier: 25,
            gameName: 'dummy data',
            leaderboardRank: 9,
            numberOfWins: 184,
            puuid:'kmng1ng18n1g091ng18ng1gn1ign10g01',
            rankedRating:1905,
            tagLine: 'test'
        },{
            competitiveTier: 25,
            gameName: 'dummy data',
            leaderboardRank: 10,
            numberOfWins: 184,
            puuid:'kmng1ng18n1g091ng18ng1gn1ign10g01',
            rankedRating:1905,
            tagLine: 'test'
        },{
            competitiveTier: 25,
            gameName: 'dummy data',
            leaderboardRank: 11,
            numberOfWins: 184,
            puuid:'kmng1ng18n1g091ng18ng1gn1ign10g01',
            rankedRating:1905,
            tagLine: 'test'
        },{
            competitiveTier: 25,
            gameName: 'dummy data',
            leaderboardRank: 12,
            numberOfWins: 184,
            puuid:'kmng1ng18n1g091ng18ng1gn1ign10g01',
            rankedRating:1905,
            tagLine: 'test'
        },{
            competitiveTier: 25,
            gameName: 'dummy data',
            leaderboardRank: 13,
            numberOfWins: 184,
            puuid:'kmng1ng18n1g091ng18ng1gn1ign10g01',
            rankedRating:1905,
            tagLine: 'test'
        },{
            competitiveTier: 25,
            gameName: 'dummy data',
            leaderboardRank: 14,
            numberOfWins: 184,
            puuid:'kmng1ng18n1g091ng18ng1gn1ign10g01',
            rankedRating:1905,
            tagLine: 'test'
        },{
            competitiveTier: 25,
            gameName: 'dummy data',
            leaderboardRank: 15,
            numberOfWins: 184,
            puuid:'kmng1ng18n1g091ng18ng1gn1ign10g01',
            rankedRating:1905,
            tagLine: 'test'
        },{
            competitiveTier: 25,
            gameName: 'dummy data',
            leaderboardRank: 16,
            numberOfWins: 184,
            puuid:'kmng1ng18n1g091ng18ng1gn1ign10g01',
            rankedRating:1905,
            tagLine: 'test'
        },{
            competitiveTier: 25,
            gameName: 'dummy data',
            leaderboardRank: 17,
            numberOfWins: 184,
            puuid:'kmng1ng18n1g091ng18ng1gn1ign10g01',
            rankedRating:1905,
            tagLine: 'test'
        },{
            competitiveTier: 25,
            gameName: 'dummy data',
            leaderboardRank: 18,
            numberOfWins: 184,
            puuid:'kmng1ng18n1g091ng18ng1gn1ign10g01',
            rankedRating:1905,
            tagLine: 'test'
        },{
            competitiveTier: 25,
            gameName: 'dummy data',
            leaderboardRank: 19,
            numberOfWins: 184,
            puuid:'kmng1ng18n1g091ng18ng1gn1ign10g01',
            rankedRating:1905,
            tagLine: 'test'
        },{
            competitiveTier: 25,
            gameName: 'dummy data',
            leaderboardRank: 20,
            numberOfWins: 184,
            puuid:'kmng1ng18n1g091ng18ng1gn1ign10g01',
            rankedRating:1905,
            tagLine: 'test'
        }
    ]

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
                //test the max height on the div
    return(
        <>  
            <div style={{maxHeight:"750px"}} className='flex h-full w-full justify-center items-center overflow-auto mt-8'>
                <Table BodyData={PlayerData} HeadData={HeadData}/>
            </div>
            <SizeForm setSize={setSize}/>
            <ChooseAct setActName={getActName} />
        </>
    );
};

export default LeaderboardPage;