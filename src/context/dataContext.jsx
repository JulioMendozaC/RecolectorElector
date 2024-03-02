import { createContext, useContext, useEffect, useState } from "react";

import { CreateRequest, DeleteRequest, GetRequest, GetsRequest, UpdateRequest } from "../api/data";


export const DataContext = createContext()

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData most be used whithin Data");
    }
    return context;
};


export const DataProvider = ({ children }) => {

    const [data, setData] = useState(null)
    const [editData, setEditData] = useState(null)
    const [response, setResponse] = useState(null)
    const [errors, setErrors] = useState([])
    const [isloading, setIsLoading] = useState(true)
    const [isAutenticated, setIsAutenticated] = useState(false)


    const GetOneData = async (id) => {
        try {
            const res = await GetsRequest(id)
            setEditData(res.data)
            console.log(res.data)
            // setResponse(res.data)
        } catch (error) {
            // setErrors(['Datos usuario o contraseña incorrectos'])
            console.log(error)
        }
    }

    const GetData = async () => {
        try {
            const res = await GetRequest()
            setData(res.data.reverse())
            // setResponse(res.data)
        } catch (error) {
            // setErrors(['Datos usuario o contraseña incorrectos'])
            console.log(error)
        }
    }
    const CreateData = async (data) => {
        try {
            const res = await CreateRequest(data)
            setData(res.data.data[0].reverse())
            setResponse(res.data.msg)
        } catch (error) {
            // setErrors(['Datos usuario o contraseña incorrectos'])
            console.log(error)
        }
    }
    const UpdateData = async (id, data) => {
        try {
            const res = await UpdateRequest(id, data)
            setResponse(res.data)
            console.log(res.data)
        } catch (error) {
            // setErrors(['Datos usuario o contraseña incorrectos'])
            console.log(error)
        }
    }
    const DeleteData = async (id) => {
        try {
            const res = await DeleteRequest(id)
            setResponse(res.data)
                console.log(res.data)
        } catch (error) {
            // setErrors(['Datos usuario o contraseña incorrectos'])
            console.log(error)
        }
    }



    return (
        <DataContext.Provider value={{
            data,
            editData,
            response,
            GetOneData,
            GetData,
            CreateData,
            UpdateData,
            DeleteData
        }}>
            {children}
        </DataContext.Provider>

    )

}