import API from "../lib/axios";

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