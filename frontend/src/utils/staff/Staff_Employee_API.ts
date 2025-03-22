
import axios from 'axios';

  

const URL = "http://localhost:5000";
const URL_COLLECTION = "/Staff_Employee";

export async function getAllData_Staff_Employee() {

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
export async function Staff_Employee_getDoc(id: string) {
    const response = await axios.get(`${URL}${URL_COLLECTION}/${id}`);
    return response.data;
}

export async function Staff_Employee_deleteDoc(id:string){
    const response = await axios.delete(`${URL}${URL_COLLECTION}/${id}`);
    alert("Document deleted successfully");
    return response;
}

export async function createNew_Staff_Employee(data: any) {
    console.log("Data to be sent:", data);  // Log data here
    const response = await axios.post(`${URL}${URL_COLLECTION}`, data);
    console.log("Response from server:", response);  // Log the response
    return response;
  }
  