
//Inventory_Stock

import axios from 'axios';

const URL = "http://localhost:5000";
const URL_COLLECTION = "/Inventory_Stock";

{/*export async function Inventory_Stock_getAllData() {
    try {
        const response = await axios.get(`${URL}${URL_COLLECTION}`);
        console.log(response.data.message);
        return response.data.data;
    } catch (error: any) {
        alert(error.response.data.message + "\n" + error.response.data.error); 
    }
} */}

export async function Inventory_Stock_getAllData() {
    try {
        const response = await axios.get(`${URL}${URL_COLLECTION}`);
        console.log(response.data.message);
        return response.data.data;
    } catch (error: any) {
        console.error("Error fetching inventory stock data:", error);
        alert(
            error.response?.data?.message + "\n" + (error.response?.data?.error || "Unknown error")
        );
    }
}


export async function Inventory_Stock_getDoc(id: string) {
    const response = await axios.get(`${URL}${URL_COLLECTION}/${id}`);
    return response.data;
}

export async function Inventory_Stock_deleteDoc(id: string) {
    const response = await axios.delete(`${URL}${URL_COLLECTION}/${id}`);
    alert("Document deleted successfully");
    return response;
}

export async function Inventory_Stock_createNew(data: any) {
    const response = await axios.post(`${URL}${URL_COLLECTION}`, data);
    console.log(data);
    console.log(response);
    return response;
}

export async function Inventory_Stock_updateDoc(id: string, data: any) {
    const response = await axios.put(`${URL}${URL_COLLECTION}/${id}`, data);
    alert("Document updated successfully");
    return response;
}
