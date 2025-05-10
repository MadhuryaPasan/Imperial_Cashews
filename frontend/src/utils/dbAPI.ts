
import axios from 'axios';

interface iColumns {
    name: string;
    age: number;
    gpa: number;
    month: string;
  }
  

const URL = "http://localhost:5000";
const URL_COLLECTION = "/read";

export async function getAllData() {

    try {
        const response = await axios.get(`${URL}${URL_COLLECTION}`);
        console.log(response.data.message);
        return response.data.data;

    } catch (error: any) {
        
        // console.log(error.response.data.message);
        // console.log(error.response.data.error);
        alert(error.response.data.message +"\n"+error.response.data.error);
    }

}

export async function deleteDoc(id:string){
    const response = await axios.delete(`${URL}${URL_COLLECTION}/${id}`);
    alert("Document deleted successfully");
    return response;
}

export async function createNew(data:any){
    console.log(data);
    const response = await axios.post(`${URL}${URL_COLLECTION}`,data);
    // alert("Document added successfully");
    console.log(data);
    console.log(response);
    return response;
}

