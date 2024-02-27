import axios from "axios";

const url = process.env.REACT_APP_RIOT_DOMAIN_URL;
const key = process.env.REACT_APP_RIOT_TOKEN_DEV_API_KEY;

const GetLeaderboard = async () => {
  const response = await axios.get(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8,pl;q=0.7",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com",
            "X-Riot-Token": key
        }
    });

    console.log(response);
};

export default GetLeaderboard;