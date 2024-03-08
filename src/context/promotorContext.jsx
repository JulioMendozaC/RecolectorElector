import { createContext, useContext, useEffect, useState } from "react";

import { GetRequest, CreateRequest, GetsRequest, UpdateRequest, DeleteRequest } from "../api/promotor";


export const PromotorContext = createContext()

export const usePromotor = () => {
    const context = useContext(PromotorContext);
    if (!context) {
        throw new Error("usePromotor most be used whithin Data");
    }
    return context;
};


export const PromotorProvider = ({ children }) => {

    const [promotor, setPromotor] = useState(null)
    const [editData, setEditData] = useState(null)
    const [response, setResponse] = useState(null)
    const [errors, setErrors] = useState([])
    const [isloading, setIsLoading] = useState(true)
    const [isAutenticated, setIsAutenticated] = useState(false)


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

    const GetPromotor = async () => {
        try {
            const res = await GetRequest()
            setPromotor(res.data.reverse())
        } catch (error) {
            // setErrors(['Datos usuario o contraseña incorrectos'])
            console.log(error)
        }
    }
    const CreatePromotor = async (data) => {
        try {
            const res = await CreateRequest(data)
            setPromotor(res.data.data[0].reverse())
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
            GetPromotor()
        } catch (error) {
            // setErrors(['Datos usuario o contraseña incorrectos'])
            console.log(error)
        }
    }
    const DeleteData = async (id) => {
        try {
            const res = await DeleteRequest(id)
            setResponse(res.data)
            GetPromotor()
        } catch (error) {
            // setErrors(['Datos usuario o contraseña incorrectos'])
            console.log(error)
        }
    }



    return (
        <PromotorContext.Provider value={{
            promotor,
            editData,
            response,
            GetOneData,
            GetPromotor,
            CreatePromotor,
            UpdateData,
            DeleteData
        }}>
            {children}
        </PromotorContext.Provider>

    )

}