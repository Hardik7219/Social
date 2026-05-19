import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true
});

export default API;

export const loginUser = async (data) => {

    const response = await API.post(
        "/auth/login",
        data
    );
    
    return response.data;
};


export const signUp = async (data)=>{
    const res=await API.post(
        "/auth/signup",
        data
    );
    return res;

}