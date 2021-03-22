import axios from "axios";


async function sendAPIRequest(path, data, requestNumber) {
    if (requestNumber === 1) {
        console.log("reading users from local cache")
        let data = JSON.parse(localStorage.getItem('cached_users'));
        if (data) {
            return data;
        }
    }

    const API_URL = process.env.REACT_APP_API_URL + path;

    return await axios.get(API_URL, {params: data})
}

export default sendAPIRequest;