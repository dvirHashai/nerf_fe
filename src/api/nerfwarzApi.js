import axios from "axios";
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/'; //Without this we will get a CORS error

export const GenerateGame = async () => {
    let result;
    try {
        const response = await axios.get(PROXY_URL + "https://fk7qq3rvg5.execute-api.eu-central-1.amazonaws.com/dev/playersavailability");
        console.log("GenerateGame result", response.data);
        result = response.data;
    } catch (error) {
        console.log("GenerateGame failed", error);
        result = "";
    }
    return result;
};

export const GetGame = async (gameId) => {
    let result;
    try {
        gameId = "60eef921-35ca-4f96-8db0-db0870fd054b"; //TODO - drop this line
        const response = await axios.get(PROXY_URL + `https://m9iboowws1.execute-api.eu-central-1.amazonaws.com/dev/game/?gameId=${gameId}`);
        // console.log("GetGame response", response.data);
        // console.log("gameId", gameId);

        result = response.data.length >= 1 ?
            response.data.find(g => g.gameId === gameId) :
            response.data;
        console.log("GetGame result", result);

    } catch (error) {
        console.log("GetGame failed", error);
        result = "";
    }
    return result;
};

export const PublishGame = async (game) => {
    let result;
    try {
        console.log("log for dvir: ", JSON.stringify(game));
        const response = await axios({
            method: "post",
            url: PROXY_URL + `https://qh180nn8xb.execute-api.eu-central-1.amazonaws.com/dev/publishGame?gameId=${game.gameId}`,
            data: { game }
        });
        console.log("PublishGame result", response.data);
    } catch (error) {
        console.log("PublishGame failed", error);
        result = "";
    }
    return result;
};