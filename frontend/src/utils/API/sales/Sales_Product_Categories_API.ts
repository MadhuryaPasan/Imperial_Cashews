import axios from 'axios';
import { useEffect, useState } from 'react';

const URL = "http://localhost:5000";
const URL_COLLECTION = "/Sales_Product_Categories";

export async function getAll_Sales_Product_Categories() {

    try {
        const response = await axios.get(`${URL}${URL_COLLECTION}`);
        console.log(response.data.message);
        return response.data.data;

    } catch (error: any) {
        alert(error.response.data.message + "\n" + error.response.data.error);
    }

}

export async function Sales_Product_Categories_deleteDoc(id: string) {
    const response = await axios.delete(`${URL}${URL_COLLECTION}/${id}`);
    alert("Document deleted successfully");
    return response;
}

export async function Sales_Product_Categories_Product(data: any) {
    console.log(data);
    const response = await axios.post(`${URL}${URL_COLLECTION}`, data);
    // alert("Document added successfully");
    console.log(data);
    console.log(response);
    return response;
}

export async function Sales_Product_Categories_updateDoc(id: string, data: any) {
    const response = await axios.put(`${URL}${URL_COLLECTION}/${id}`, data);
    alert("Document updated successfully");
    return response;
}

export async function Sales_Product_Categories_getDoc(id: string) {
    const response = await axios.get(`${URL}${URL_COLLECTION}/${id}`);
    return response.data;
}



export function returnOneCategory(id: string) {

    const [data, setData] = useState<any>();
    useEffect(() => {
        async function loadPost() {
            try {
                let result = await Sales_Product_Categories_getDoc(id);
                if (result) {
                    setData(result);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        loadPost();
    }, []);

    return data;
}


export function returnAllCategory() {

    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        async function getAll() {
            try {
                let result = await getAll_Sales_Product_Categories();
                setData(result);
            }
            catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getAll();
    }, []);

    return data;
}


