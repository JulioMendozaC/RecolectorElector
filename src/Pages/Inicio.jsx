import { useEffect, useState } from 'react'
import { useData } from '../context/dataContext'

import { Form } from '../components/Common/Form'
import { DataForm } from '../components/Content/DataForm'
import { SimpleTable } from "@/components/Common/SimpleTable"
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

export const Inicio = () => {
    const { GetData, data, response } = useData()
    const [newData, setNewData] = useState(data)
    const [isSuscribe, setIsSuscribe] = useState(false)

    useEffect(() => {
        GetData()
        setNewData(data)

    }, [])


    useEffect(() => {
        if (data) {
            setNewData(data)
            if (response) {
                if (response[0] == "Datos creados correctament") {
                    document.getElementById('close').click()
                }
                if (response.msg == 'Datos actualizados' ) {
                    GetData()
                    document.getElementById('close').click()
                }
                if (response.msg == 'Datos eliminados correctament' ) {
                    GetData()
                }
            }
        }
console.log(response)
    }, [data, response])

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
            accessorKey: "fecha_vigencia",
        },
        {
            header: "Promotor",
            accessorKey: "promotor"
        },

    ]

    return (
        <>

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
        </>
    )
}
