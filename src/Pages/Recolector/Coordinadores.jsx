import { useEffect, useState } from 'react'
import { useCordinador } from '../../context/coordinadorContext'

import { Form } from '../../components/Common/Form'
import { NavBar } from '../../components/Common/NavBar'
import { CoordinadorForm } from '../../components/Content/CoordinadorForm'
import { CoordiandorTable } from "@/components/Common/CoordiandorTable"
import { NullTable } from "@/components/Common/NullTable"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"

export const Coordinadores = () => {
  const { GetData, data, response } = useCordinador()
  const [newData, setNewData] = useState(data)

  useEffect(() => {
    GetData()
    setNewData(data)


  }, [])

  const columns = [

    {
      header: "Nombre",
      accessorKey: "nombre"
    }
  ]

  useEffect(() => {
    if (data) {
      setNewData(data)
      if (response) {
        if (response.msg == "Coordinador Creado") {
          document.getElementById('close').click()
        }
      }
    }

  }, [data, response])
  return (
    <>
      <NavBar title={'Coordiandores'} />
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
                <CoordinadorForm />
              </Form>
              <DialogFooter>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <CardContent>
            {console.log(data)}
            {
              data  && newData ?
                <CoordiandorTable data={newData} columns={columns} />
                :
                <NullTable data={newData} columns={columns} />
            }
          </CardContent>
        </Card>
      </div>
    </>
  )
}
