import axios from "axios";


async function sendAPIRequest(path, data) {
    const API_URL = process.env.REACT_APP_API_URL + path;

    return await axios.get(API_URL, {params: data})
}

export default sendAPIRequest;