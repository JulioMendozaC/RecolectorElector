import { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'

import { Form } from '../../components/Common/Form'
import { NavBar } from '../../components/Common/NavBar'
import { UsersForm } from '../../components/Content/UsersForm'
import { UserTable } from "@/components/Common/UsersTable"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"

export const Users = () => {

  const { GetUsers, response } = useAuth()
  const [newData, setNewData] = useState(response)

  useEffect(() => {
    GetUsers()
    setNewData(response)

  }, [])

  const columns = [

    {
      header: "Nombre",
      accessorKey: "username"
    }
  ]

  useEffect(() => {
    if (response) {
      setNewData(response)
      if (response) {
        if (response.msg) {
        if (response.msg == "Usuario registrado") {
          document.getElementById('close').click()

        }

        }
      }
    }

  }, [ response])
  return (
    <>
      <NavBar title={'Usuarios'} />
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
                <UsersForm />
              </Form>
              <DialogFooter>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <CardContent>
            {
              response && newData ?
                <UserTable data={newData} columns={columns} />
                :
                <div className=""></div>
            }
          </CardContent>
        </Card>
      </div>
    </>
  )
}
