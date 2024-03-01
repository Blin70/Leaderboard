import axios from "axios";

const key = process.env.REACT_APP_RIOT_TOKEN_DEV_API_KEY;
const ActId = process.env.REACT_APP_RIOT_ACT_ID;

const GetLeaderboard = async (size) => {
  const response = await axios.get(`https://eu.api.riotgames.com/val/ranked/v1/leaderboards/by-act/${ActId}?size=${size}&startIndex=0&api_key=${key}`, {
        Headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8,pl;q=0.7",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com"
        }
    });

    return response.data.players;
};

export default GetLeaderboard;