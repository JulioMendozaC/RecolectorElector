import { createContext, useContext, useEffect, useState } from "react";

import { GetRequest, CreateRequest, GetsRequest, UpdateRequest, DeleteRequest } from "../api/coordinador";


export const CoordinadorContext = createContext()

export const useCordinador = () => {
    const context = useContext(CoordinadorContext);
    if (!context) {
        throw new Error("useCordinador most be used whithin provider");
    }
    return context;
};


export const CoordinadorProvider = ({ children }) => {

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
            setdata(res.data.data[0].reverse())
            setResponse(res.data)
            
        } catch (error) {
            // setErrors(['Datos usuario o contraseña incorrectos'])
            console.log(error)
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
        <CoordinadorContext.Provider value={{
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
        </CoordinadorContext.Provider>

    )

}