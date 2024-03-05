import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import { loginRequest, verifyRequest } from "../api/auth";


export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth most be used whithin an AuthProvider");
    }
    return context;
};


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [errors, setErrors] = useState([])
    const [isloading, setIsLoading] = useState(true)
    const [isAutenticated, setIsAutenticated] = useState(false)

    const login = async (user) => {
        try {
            const res = await loginRequest(user)
            setUser(res.data)
            setIsAutenticated(true)
            console.log(res.data)
        } catch (error) {
            setErrors(error.response.data.message)
            console.log(error.response.data)

        }
    }
    const CreateData = async (user) => {
        try {
            const res = await loginRequest(user)
            setUser(res.data)
            setIsAutenticated(true)
            console.log(res.data)
        } catch (error) {
            // setErrors(['Datos usuario o contraseña incorrectos'])

        }
    }

    useEffect(() => {
        async function CheckLogin() {
            const cookies = Cookies.get();

            if (!cookies.token) {
                setIsAutenticated(false);
                setIsLoading(false)
                return setUser(null)
            }
            try {
                const res = await verifyRequest(cookies.token);
                if (!res.data) {
                    setIsAutenticated(false);
                    setIsLoading(false)
                    return
                }

                setIsAutenticated(true)
                setUser(res.data);
                setIsLoading(false)
            } catch (error) {
                setIsAutenticated(false);
                setUser(null);
                setIsLoading(false)

            }

        }
        CheckLogin();
    }, []);

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 3000);

            return () => clearTimeout(timer)
        }
    }, [errors])


    return (
        <AuthContext.Provider value={{
            user,
            errors,
            isloading,
            isAutenticated,
            login
        }}>
            {children}
        </AuthContext.Provider>

    )

}