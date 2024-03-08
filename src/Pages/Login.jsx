import { useEffect } from "react";
import { useNavigate } from "react-router";
import { LoginForm } from '../components/Content/LoginForm'
import { useAuth } from '../context/authContext'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export const Login = () => {
  const {isAutenticated} = useAuth()
  const navigate = useNavigate()


    useEffect(() => {
        if (isAutenticated) navigate('/Inicio')

    }, [isAutenticated])
  

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center bg-background my-10">
    <Card className="w-[45vh] border-1">
      <CardHeader>
        <CardTitle>Inicio de sesión</CardTitle>
        <CardDescription>Ingresa tus datos para continuar.</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex justify-between">
      </CardFooter>
    </Card>
    </div>
  )
}
