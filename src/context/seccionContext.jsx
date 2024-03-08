import { createContext, useContext, useEffect, useState } from "react";

import { GetRequest, CreateRequest, GetsRequest, UpdateRequest, DeleteRequest } from "../api/secciones";


export const SeccionContext = createContext()

export const useSeccion = () => {
    const context = useContext(SeccionContext);
    if (!context) {
        throw new Error("useSeccion most be used whithin provider");
    }
    return context;
};


export const SeccionProvider = ({ children }) => {

    const [data, setdata] = useState(null)
    const [editData, setEditData] = useState(null)
    const [response, setResponse] = useState(null)
    const [errors, setErrors] = useState([])

    const GetOneData = async (id) => {
        try {
            const res = await GetsRequest(id)
            setEditData(res.data)
            // setResponse(res.data)
        } catch (error) {
            // setErrors(['Datos usuario o contraseña incorrectos'])
            console.log(error)
        }
    }

    const GetData = async () => {
        try {
            const res = await GetRequest()
            setdata(res.data.reverse())
        } catch (error) {
            // setErrors(['Datos usuario o contraseña incorrectos'])
            console.log(error)
        }
    }
    const CreateData = async (data) => {
        try {
            const res = await CreateRequest(data)
            setdata(res.data.data.reverse())
            console.log(res.data.data)
            setResponse(res.data.msg)
            
        } catch (error) {
            setErrors(error.response.data)
            console.log(error.response.data)
        }
    }

    const UpdateData = async (id, data) => {
        try {
            const res = await UpdateRequest(id, data)
            setResponse(res.data)
            GetData()
        } catch (error) {
            // setErrors(['Datos usuario o contraseña incorrectos'])
            console.log(error)
        }
    }
    const DeleteData = async (id) => {
        try {
            const res = await DeleteRequest(id)
            setResponse(res.data)
            GetData()
        } catch (error) {
            // setErrors(['Datos usuario o contraseña incorrectos'])
            console.log(error)
        }
    }



    return (
        <SeccionContext.Provider value={{
            data,
            editData,
            response,
            errors,
            GetOneData,
            GetData,
            CreateData,
            UpdateData,
            DeleteData
        }}>
            {children}
        </SeccionContext.Provider>

    )

}