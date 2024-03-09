import { useEffect, useState } from 'react'
import { useSeccion } from '../../context/seccionContext'

import { Form } from '../../components/Common/Form'
import { NavBar } from '../../components/Common/NavBar'
import { SeccionForm } from '../../components/Content/SeccionForm'
import { SeccionTable } from "@/components/Common/SeccionTable"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
export const Secciones = () => {

  const { GetData, data, response } = useSeccion()
  const [newData, setNewData] = useState(data)

  useEffect(() => {
    GetData()
    setNewData(data)
    console.log()

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
      header: "Clave",
      accessorKey: "numero"
    },
    {
      header: "Seccion",
      accessorKey: "nombre"
    },
    {
      header: "Lista nominals",
      accessorKey: "lista_nominal"
    }, 
  ]

  useEffect(() => {
    if (data) {
      setNewData(data)
      if (response) {
        if (response[0] == "Seccion Creado") {
          document.getElementById('close').click()
        }
      }
    }

  }, [data, response])

  return (
    <>
      <NavBar title={'Seccion'} />
      <div className="flex h-[calc(100vh-100px)] items-center justify-center bg-background">
        <Card className="w-[60vh] border-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mx-3 my-4">+ Anadir</Button>
            </DialogTrigger>
            <DialogClose asChild>
              <button id='close'></button>
            </DialogClose>
            <DialogContent className="sm:max-w-[60vh] border-0">
              <DialogHeader>
                <DialogTitle className='text-white'>Añadir Seccion</DialogTitle>
              </DialogHeader>
              <Form>
                <SeccionForm />
              </Form>
              <DialogFooter>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <CardContent>
            {
              data && newData ?
                <SeccionTable data={newData} columns={columns} />
                :
                <div className=""></div>
            }
          </CardContent>
        </Card>
      </div>
    </>
  )
}
