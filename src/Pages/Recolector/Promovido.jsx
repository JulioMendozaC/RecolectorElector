import { useEffect, useState } from 'react'
import { CSVLink } from "react-csv";

import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

import { useData } from '../../context/dataContext'
import { Form } from '../../components/Common/Form'
import { NavBar } from '../../components/Common/NavBar'
import { DataForm } from '../../components/Content/DataForm'
import { SimpleTable } from "@/components/Common/SimpleTable"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
export const Promovido = () => {

    const { GetData, GetAllData, data, dataSelect, response } = useData()
    const [newData, setNewData] = useState([])
    const [archivo, setArchivo] = useState(null)

    const columns = [

        {
            header: "Nombre",
            accessorKey: "nombre"
        },
        {
            header: "Clave",
            accessorKey: "clave_electoral"
        },
        {
            header: "Curp",
            accessorKey: "curp"
        },
        {
            header: "Promotor",
            accessorKey: "promotor"
        },
        {
            header: "Coordinador",
            accessorKey: "coordinador"
        },
        {
            header: "Fecha nacimiento",
            accessorKey: "fecha_nacimiento",
            cell: info => dayjs.utc(info.getValue()).format('DD-MM-YYYY')
        }

    ]



    useEffect(() => {
        GetData()
        GetAllData()
        setNewData(data)

    }, [])

    useEffect(() => {
        if (data) {
            setNewData(data)
            if (response) {
                if (response[0] == "Datos creados correctament") {
                    document.getElementById('close').click()
                }
            }
        }
    }, [data, response])


    const Busqueda = (filters) => {

        const busqueda = data.reduce((acc, persona) => {

            if (filters == 'seccion')
                acc[persona.seccion] = ++acc[persona.seccion] || 0;

            if (filters == 'clave_electoral')
                acc[persona.clave_electoral] = ++acc[persona.clave_electoral] || 0

            if (filters == 'curp')
                acc[persona.curp] = ++acc[persona.curp] || 0

            if (filters == 'fecha_nacimiento')
                acc[persona.fecha_nacimiento] = ++acc[persona.fecha_nacimiento] || 0

            return acc;
        }, {});

        const duplicados = data.filter((persona) => {
            if (filters == 'seccion')
                return busqueda[persona.seccion]

            if (filters == 'clave_electoral')
                return busqueda[persona.clave_electoral]

            if (filters == 'curp')
                return busqueda[persona.curp]

            if (filters == 'fecha_nacimiento')
                return busqueda[persona.fecha_nacimiento]
        });
        console.log(busqueda)
        if (duplicados.length > 0)
            setNewData(duplicados)
        else
            setNewData(data)


    }

    const FiltrarPor = (op, filtros) => {

        setArchivo(filtros)

        if (op == 'coordinador') {
            const filtro = data.filter((dato) => dato.coordinador == filtros);
            setNewData(filtro)
        }

        if (op == 'promotor') {
            const filtro = data.filter((dato) => dato.promotor == filtros);
            setNewData(filtro)
        }


    }

    return (
        <>
            <NavBar title={'Promovidos'} />
            <div className="flex h-[calc(100vh-100px)] items-center justify-center bg-background">
                <Card className="w-[120vh] border-0 ">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="mx-3 my-4">+ Anadir</Button>
                        </DialogTrigger>
                        <DialogClose asChild>
                            <button id='close'></button>
                        </DialogClose>
                        <DialogContent className="sm:max-w-[60vh] border-0">
                            <DialogHeader>
                                <DialogTitle className='text-white'>Añadir Datos</DialogTitle>
                            </DialogHeader>
                            <Form>
                                <DataForm />
                            </Form>
                            <DialogFooter>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <CardContent>
                        <div className="flex flex-row items-end  justify-end">
                            <div className="mx-5">
                                <Select onValueChange={(e) => Busqueda(e)} >
                                    <SelectTrigger className="w-[230px]">
                                        <SelectValue placeholder="Filtrar por campo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Campo</SelectLabel>
                                            <SelectItem value="-">Sin filtro</SelectItem>
                                            <SelectItem value="seccion">Seccion</SelectItem>
                                            <SelectItem value="clave_electoral">Clave electoral</SelectItem>
                                            <SelectItem value="curp">Curp</SelectItem>
                                            <SelectItem value="fecha_nacimiento">Fecha de nacimiento</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="mx-5">
                                <Select onValueChange={(e) => FiltrarPor('coordinador', e)}>
                                    <SelectTrigger className="w-[230px]">
                                        <SelectValue placeholder="Filtrar por coordinador" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Campo</SelectLabel>
                                            {
                                                dataSelect ?
                                                    dataSelect.coordinador.map(x => <SelectItem key={x._id} value={x.nombre}>{x.nombre}</SelectItem>)
                                                    :
                                                    <SelectItem value="-">No hay coordinadores</SelectItem>
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="mx-5">
                                <Select onValueChange={(e) => FiltrarPor('promotor', e)}>
                                    <SelectTrigger className="w-[230px]">
                                        <SelectValue placeholder="Filtrar por promotor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Campo</SelectLabel>
                                            {
                                                dataSelect ?
                                                    dataSelect.promotor.map(x => <SelectItem key={x._id} value={x.nombre}>{x.nombre}</SelectItem>)
                                                    :
                                                    <SelectItem value="-">No hay coordinadores</SelectItem>
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="mx-5">
                                {
                                    newData && archivo ?
                                        <Button><CSVLink data={newData} filename={`${archivo}.csv`}>
                                            Download me
                                        </CSVLink></Button>
                                        : null
                                }
                            </div>
                        </div>
                        {
                            data && newData ?
                                <SimpleTable data={newData} columns={columns} />
                                :
                                <div className=""></div>
                        }
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
