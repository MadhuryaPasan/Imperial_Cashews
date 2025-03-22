
import axios from 'axios';


const URL = "http://localhost:5000";
const URL_COLLECTION = "/quality_raw_material_check";

export async function quality_end_product_check_getAllData() {

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


export async function quality_raw_material_check_getDoc(id:string){
    const response = await axios.get(`${URL}${URL_COLLECTION}/${id}`);
    return response.data;
}

export async function quality_raw_material_check_deleteDoc(id:string){
    const response = await axios.delete(`${URL}${URL_COLLECTION}/${id}`);
    alert("Document deleted successfully");
    return response;
}

export async function quality_raw_material_check_createNew(data:any){
    // console.log(data);
    const response = await axios.post(`${URL}${URL_COLLECTION}`,data);
    // alert("Document added successfully");
    console.log(data);
    console.log(response);
    return response;
}


export async function quality_raw_material_check_updateDoc(id:string,data:any){
    const response = await axios.put(`${URL}${URL_COLLECTION}/${id}`,data);
    console.log("hello api");
    alert("Document updated successfully");
    return response;
}