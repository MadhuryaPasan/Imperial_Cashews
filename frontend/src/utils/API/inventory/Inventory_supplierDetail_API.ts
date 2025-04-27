import axios from 'axios';
import { useEffect, useState } from 'react';

const URL = "http://localhost:5000";
const URL_COLLECTION = "/Inventory_supplierDetail";

export async function Inventory_supplierDetail_GetAll() {
    try {
        const response = await axios.get(`${URL}${URL_COLLECTION}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all bank book entries:", error);
        throw error;
    }
}

export async function Inventory_supplierDetail_Delete(id: string) {
    try {
        const response = await axios.delete(`${URL}${URL_COLLECTION}/${id}`);
        alert("Document deleted successfully");
        return response;
    } catch (error) {
        console.error("Error deleting bank book entry:", error);
        throw error;
    }
}

export async function Inventory_supplierDetail_Add(data: any) {
    try {
        // console.log(data);
        const response = await axios.post(`${URL}${URL_COLLECTION}`, data);
        // console.log(data);
        // console.log(response);
        return response;
    } catch (error) {
        console.error("Error adding bank book entry:", error);
        throw error;
    }
}

export async function Inventory_supplierDetail_Update(id: string, data: any) {
    try {
        const response = await axios.put(`${URL}${URL_COLLECTION}/${id}`, data);
        alert("Document updated successfully");
        return response;
    } catch (error) {
        console.error("Error updating bank book entry:", error);
        throw error;
    }
}

export async function Inventory_supplierDetail_GetOne(id: string) {
    try {
        const response = await axios.get(`${URL}${URL_COLLECTION}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching bank book entry:", error);
        throw error;
    }
}


export function Inventory_supplierDetail_ReturnAll(){


  // db
  
  const [data, setData] = useState<any[]>([]);
  
  useEffect(() => {
    async function getAll() {
      try {
        let result = await Inventory_supplierDetail_GetAll();4
        // await new Promise((resolve) => setTimeout(resolve, 5000));
        setData(result);
      } catch (error) {
        console.error("Error fetching BankBook transactions:", error);
      }
    }
    getAll();
  }, []);
  
  return data;

}