import axios from 'axios';

const URL  = "http://localhost:5000";
const URL_COLLECTION="/read";

export async function getAllData(){
    const response = await axios.get(`${URL}${URL_COLLECTION}`);
    return response.data;
}