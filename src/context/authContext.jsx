import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import { loginRequest, UsersRequest, UserRequest, RegisterRequest, UserDeleteRequest, UserUpdateRequest, verifyRequest } from "../api/auth";


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
    const [response, setResponse] = useState(null)
    const [editData, setEditData] = useState(null)

    const [errors, setErrors] = useState([])
    const [isloading, setIsLoading] = useState(true)
    const [isAutenticated, setIsAutenticated] = useState(false)

    const login = async (user) => {
        try {
            const res = await loginRequest(user)
            setUser(res.data)
            console.log(res.data)
            setIsAutenticated(true)
        } catch (error) {
            setErrors(error.response.data.message)
        }
    }

    const logOut = async () => {
        Cookies.remove('token')
        setIsAutenticated(false)
        setUser(null)
    }

    const Register = async (user) => {
        try {
            const res = await RegisterRequest(user)
            setResponse(res.data)
            GetUsers()
            console.log(res.data)
        } catch (error) {
            setErrors(error.response.data.message)
        }
    }

    const GetUsers = async () => {
        try {
            const res = await UsersRequest()
            setResponse(res.data)
        } catch (error) {
            setErrors(error.response.message)

        }
    }

    const GetOneUsers = async (id) => {
        try {
            const res = await UserRequest(id)
            setEditData(res.data)
            console.log(res.data)
        } catch (error) {
            setErrors(error.response.message)

        }
    }

    const UpdateUser = async (id, data) => {
        try {
            const res = await UserUpdateRequest(id, data)
            setResponse(res.data)
            GetUsers()
        } catch (error) {
            console.log(error)
        }
    }
    const DeleteUser = async (id) => {
        try {
            const res = await UserDeleteRequest(id)
            setResponse(res.data)
            GetUsers()
        } catch (error) {
            setErrors(error.response.message)
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
                if (cookies) {
                    const res = await verifyRequest(cookies.token);
                    console.log(res)


                    if (!res.data) {
                        setIsAutenticated(false);
                        setIsLoading(false)
                        return
                    }

                    setIsAutenticated(true)
                    setUser(res.data);
                    setIsLoading(false)
                }

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
            response,
            errors,
            editData,
            isloading,
            isAutenticated,
            GetUsers,
            login,
            logOut,
            Register,
            GetOneUsers,
            UpdateUser,
            DeleteUser,

        }}>
            {children}
        </AuthContext.Provider>

    )

}