import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useAuth } from '../../context/authContext'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner";



export const LoginForm = () => {


    const { register, handleSubmit, formState: {
        errors
    } } = useForm()

    const { login, isAutenticated, errors: LoginErrors } = useAuth()


    const onSubmit = handleSubmit(async (values) => {
        login(values)
    })



    return (
        <form onSubmit={onSubmit}>
            <div className="bg-red-500 text-white">
                {LoginErrors.map((error, i) => {
                    return <div key={i}>{error}</div>;
                })}
            </div>
            <div className="flex flex-col space-y-1.5 py-3">
                <Label htmlFor="username">Usuario</Label>
                <Input type="text"
                    {...register("username", { required: true })}
                    placeholder="Ingresa el usuario" />
                {
                    errors.username && (
                        <p className="text-red-500 text-xs">El usuario es obligatorio</p>
                    )
                }
            </div>
            <div className="flex flex-col space-y-1.5  py-3">
                <Label htmlFor="framework">Contraseña</Label>
                <Input type="password"
                    {...register("password", { required: true })}
                    placeholder="Ingresa la contraseña" />
                {
                    errors.password && (
                        <p className="text-red-500 text-xs">La contraseña es obligatoria</p>
                    )
                }
            </div>
            <Button>  Iniciar sesión</Button>

        </form>


    )
}
