import axios from "axios";

const getProfilePic = async (FirstInitial) => {
    const response = await axios.get(`https://ui-avatars.com/api/?name=${FirstInitial}&rounded=true&length=1&size=160`);
    return response.request.responseURL;
};

export default getProfilePic;