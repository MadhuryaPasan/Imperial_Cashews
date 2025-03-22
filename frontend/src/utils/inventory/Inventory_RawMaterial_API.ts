//Inventory_RawMaterial
import axios from 'axios';

const URL = "http://localhost:5000";
const URL_COLLECTION = "/Inventory_RawMaterial";

export async function Inventory_RawMaterial_getAllData() {
    try {
        const response = await axios.get(`${URL}${URL_COLLECTION}`);
        console.log(response.data.message);
        return response.data.data;
    } catch (error: any) {
        alert(error.response.data.message + "\n" + error.response.data.error);
    }
}

export async function Inventory_RawMaterial_getDoc(id: string) {
    const response = await axios.get(`${URL}${URL_COLLECTION}/${id}`);
    return response.data;
}

export async function Inventory_RawMaterial_deleteDoc(id: string) {
    const response = await axios.delete(`${URL}${URL_COLLECTION}/${id}`);
    alert("Document deleted successfully");
    return response;
}

export async function Inventory_RawMaterial_createNew(data: any) {
    const response = await axios.post(`${URL}${URL_COLLECTION}`, data);
    console.log(data);
    console.log(response);
    return response;
}

export async function Inventory_RawMaterial_updateDoc(id: string, data: any) {
    const response = await axios.put(`${URL}${URL_COLLECTION}/${id}`, data);
    alert("Document updated successfully");
    return response;
}
