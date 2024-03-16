import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useAuth } from '../../context/authContext'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner";


export const UsersForm = ({ dataEdit }) => {


    useEffect(() => {
        if (dataEdit) {
            async function loadData() {
                await GetOneUsers(dataEdit._id)
                setValue('username', dataEdit.username)
                setValue('password', dataEdit.password)
            }
            loadData()

        }

    }, [dataEdit])

    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const { Register, GetOneUsers, UpdateUser, promotor, response } = useAuth()

    const onSubmit = handleSubmit(async (values) => {
        if (!dataEdit)
            Register(values)
        else
            UpdateUser(dataEdit._id, values)


    })

    return (
        <form onSubmit={onSubmit}>
            <div className="bg-red-500 text-white">
                {/* {LoginErrors.map((error, i) => {
            return <div key={i}>{error}</div>;
        })} */}
            </div>
            <div className="flex flex-col space-y-1.5 py-3">
                <Label htmlFor="username">Nombre de usuario</Label>
                <Input type="text"
                    {...register("username", { required: true })}
                    placeholder="Ingresa el nombre del usuario" />
                {
                    errors.username && (
                        <p className="text-red-500 text-xs">El nombre es obligatorio</p>
                    )
                }
            </div>
            <div className="flex flex-col space-y-1.5 py-3">
                <Label htmlFor="username">Contraseña</Label>
                <Input type="password"
                    {...register("password", { required: true })}
                    placeholder="Ingresa la contraseña del usuario" />
                {
                    errors.nombre && (
                        <p className="text-red-500 text-xs">La contraseña es obligatoria</p>
                    )
                }
            </div>
            <Button>Guardar</Button>

        </form>
    )
}
