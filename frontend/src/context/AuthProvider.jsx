import { useEffect, useState } from "react";

import { AuthContext } from "./AuthContext";

import API from "../lib/axios";

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const checkAuth = async () => {

            try {

                const response = await API.get("/auth/my");

                setUser(response.data.user);
            } catch (error) {
                console.log(error);
                localStorage.removeItem("user");
                setUser(null);
            } finally {
                setLoading(false);
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

    const logout = async () => {

        try {
            await API.post("/auth/logout");
        } catch (error) {
            console.log("Logout error:", error);
        }
        localStorage.removeItem("user");
        setUser(null);
    };

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loading
            }}
        >

            {children}

        </AuthContext.Provider>
    );
};

export default AuthProvider;