import { useEffect, useState } from 'react'
import { usePromotor } from '../../context/promotorContext'

import { Form } from '../../components/Common/Form'
import { NavBar } from '../../components/Common/NavBar'
import { PromotorFrrom } from '../../components/Content/PromotorFrrom'
import { PromotorTable } from "@/components/Common/PromotorTable"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"

export const Promotores = () => {

  const { GetPromotor, promotor, response } = usePromotor()
  const [newData, setNewData] = useState(promotor)

  useEffect(() => {
    GetPromotor()
    setNewData(promotor)

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
    }
  ]

  useEffect(() => {
    if (promotor) {
      setNewData(promotor)
      if (response) {
        if (response.msg == "Promotor Creado") {
          document.getElementById('close').click()
        }
      }
    }

  }, [promotor, response])
  return (
    <>
      <NavBar title={'Promotores'} />
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
                <DialogTitle className='text-white'>Añadir Promotor</DialogTitle>
              </DialogHeader>
              <Form>
                <PromotorFrrom />
              </Form>
              <DialogFooter>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <CardContent>
            {
              promotor && newData ?
                <PromotorTable data={newData} columns={columns} />
                :
                <div className=""></div>
            }
          </CardContent>
        </Card>
      </div>
    </>
  )
}
