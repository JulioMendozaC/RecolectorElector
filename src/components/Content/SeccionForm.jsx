import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { useSeccion } from '../../context/seccionContext'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner";


export const SeccionForm = ({ dataEdit }) => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const { CreateData, GetOneData, UpdateData, errors: SeccionErros } = useSeccion()

    const onSubmit = handleSubmit(async (values) => {
        if (!dataEdit)
            CreateData(values)
        else
            UpdateData(dataEdit._id, values)


    })

    useEffect(() => {
        if (dataEdit) {
            async function loadData() {
                await GetOneData(dataEdit._id)
                setValue('nombre', dataEdit.nombre)
                setValue('numero', dataEdit.numero)
            }
            loadData()
        }

    }, [dataEdit])

    return (
        <form onSubmit={onSubmit}>
            <div className="bg-red-500 text-white">
                {/* {
                    SeccionErros.map((error, i) => {
                        return <div key={i}>{error}</div>;
                    })
                } */}
            </div>
            <div className="flex flex-col space-y-1.5 py-3">
                <Label htmlFor="username">Seccion</Label>
                <Input type="text"
                    {...register("nombre", { required: true })}
                    placeholder="Ingresa el nombre de la seccion" />
                {
                    errors.nombre && (
                        <p className="text-red-500 text-xs">El nombre es obligatorio</p>
                    )
                }
            </div>
            <div className="flex flex-col space-y-1.5 py-3">
                <Label htmlFor="username">Clave</Label>
                <Input type="number"
                    {...register("numero", { required: true })}
                    placeholder="Ingresa la clave de la seccion" />
                {
                    errors.numero && (
                        <p className="text-red-500 text-xs">El nombre es obligatorio</p>
                    )
                }
            </div>
            <div className="flex flex-col space-y-1.5 py-3">
                <Label htmlFor="username">Clave</Label>
                <Input type="number"
                    {...register("lista_nominal", { required: true })}
                    placeholder="Ingresa el numero de lista nominal" />
                {
                    errors.lista_nominal && (
                        <p className="text-red-500 text-xs">El nombre es obligatorio</p>
                    )
                }
            </div>
            <Button>Iniciar sesión</Button>

        </form>
    )
}
