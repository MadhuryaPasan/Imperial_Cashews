
import axios from 'axios';


const URL = "http://localhost:5000";
const URL_COLLECTION = "/Finance_BalanceSheet";

export async function Finance_BalanceSheet_getAllData() {

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


export async function Finance_BalanceSheet_getDoc(id:string){
    const response = await axios.get(`${URL}${URL_COLLECTION}/${id}`);
    return response.data;
}

export async function Finance_BalanceSheet_deleteDoc(id:string){
    const response = await axios.delete(`${URL}${URL_COLLECTION}/${id}`);
    alert("Document deleted successfully");
    return response;
}

export async function FFinance_BalanceSheet_createNew(data:any){
    // console.log(data);
    const response = await axios.post(`${URL}${URL_COLLECTION}`,data);
    // alert("Document added successfully");
    console.log(data);
    console.log(response);
    return response;
}


export async function Finance_BalanceSheet_updateDoc(id:string,data:any){
    const response = await axios.put(`${URL}${URL_COLLECTION}/${id}`,data);
    alert("Document updated successfully");
    return response;
}



