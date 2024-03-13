import { createContext, useContext, useState } from "react";

import { CreateRequest, GetRequest, GetsRequest, GetAllRequest, GetAnalytics, GetSeccion, UpdateRequest, DeleteRequest } from "../api/data";


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
    const [dataSelect, setDataSelect] = useState(null)
    const [response, setResponse] = useState(null)
    const [errors, setErrors] = useState([])


    const GetOneData = async (id) => {
        try {
            const res = await GetsRequest(id)
            setEditData(res.data)
        } catch (error) {
            setErrors(error.response.data)
        }
    }

    const GetData = async () => {
        try {
            const res = await GetRequest()
            setData(res.data.reverse())
        } catch (error) {
            setErrors(error.response.data)
        }
    }

    const GetAllData = async () => {
        try {
            const res = await GetAllRequest()
            setDataSelect(res.data)
        } catch (error) {
            setErrors(error.response.data)
        }
    }
    const CreateData = async (data) => {
        try {
            const res = await CreateRequest(data)
            setData(res.data.data[0].reverse())
            setResponse(res.data.msg)
        } catch (error) {
            setErrors(error.response.data)
        }
    }
    const UpdateData = async (id, data) => {
        try {
            const res = await UpdateRequest(id, data)
            setResponse(res.data)
            GetData()
        } catch (error) {
            setErrors(error.response.data)
        }
    }
    const DeleteData = async (id) => {
        try {
            const res = await DeleteRequest(id)
            setResponse(res.data)
            GetData()

        } catch (error) {
            setErrors(error.response.data)
        }
    }

    const AllAnalytics = async () => {
        try {
            const res = await GetAnalytics()
            if (res.data.length != 0)
                setData(res.data)
        } catch (error) {
            setErrors(error.response.data)
        }
    }

    const GetSeccions = async (data) => {
        try {
            console.log(data)
            const res = await GetSeccion(data)
            setResponse(res.data)
            console.log(res.data)
        } catch (error) {
            setErrors(error.response.data)
        }
    }



    return (
        <DataContext.Provider value={{
            data,
            editData,
            dataSelect,
            response,
            GetData,
            GetOneData,
            GetAllData,
            GetSeccions,
            CreateData,
            UpdateData,
            DeleteData,
            AllAnalytics
        }}>
            {children}
        </DataContext.Provider>

    )

}