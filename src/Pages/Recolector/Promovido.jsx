import { useEffect, useState } from 'react'
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

import { useData } from '../../context/dataContext'

import { Form } from '../../components/Common/Form'
import { NavBar } from '../../components/Common/NavBar'
import { DataForm } from '../../components/Content/DataForm'
import { SimpleTable } from "@/components/Common/SimpleTable"
import { PromotorTable } from "@/components/Common/PromotorTable"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
export const Promovido = () => {

    const { GetData, data, response } = useData()
    const [newData, setNewData] = useState(data)

    useEffect(() => {
        GetData()
        setNewData(data)

    //   Filtrar
        // const busqueda = data.reduce((acc, persona) => {
        //     acc[persona.seccion] = ++acc[persona.seccion] || 0;
        //     return acc;
        //   }, {});
          
        //   const duplicados = data.filter( (persona) => {
        //       return busqueda[persona.seccion];
        //   });
          
        //   console.log(duplicados);
      
          
    }, [])


 
    const columns = [

        {
            header: "Nombre",
            accessorKey: "nombre"
        },
        {
            header: "Seccion",
            accessorKey: "seccion"
        },
        {
            header: "Colonia/Barrio",
            accessorKey: "colonia_barrio"
        },
        {
            header: "Vigencia",
            cell: date => dayjs.utc(date.fecha_vigencia).format('DD-MM-YYYY')
        },
        {
            header: "Promotor",
            accessorKey: "promotor"
        },

    ]

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
