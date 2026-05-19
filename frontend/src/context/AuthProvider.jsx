import { useEffect, useState } from "react";

import { AuthContext } from "./AuthContext";

import API from "../services/auth.service";

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const storedUser = localStorage.getItem("user");

        if (storedUser) 
            setUser(JSON.parse(storedUser));


    }, []);
    useEffect(() => {

        const checkAuth = async () => {

            try {

                const response = await API.get("/auth/my");

                setUser(response.data);                
            } catch (error) {
                console.log(error);
                
                localStorage.removeItem("user");

                setUser(null);
            }
        };

        checkAuth();

    }, []);
    const login = (userData) => {

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        setUser(userData);
    };

    const logout = () => {

        localStorage.removeItem("user");

        setUser(null);
    };

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>
    );
};

export default AuthProvider;