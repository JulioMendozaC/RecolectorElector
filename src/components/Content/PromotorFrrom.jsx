import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import { usePromotor } from '../../context/promotorContext'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner";


export const PromotorFrrom = ({ dataEdit }) => {


    useEffect(() => {
        if (dataEdit) {
            async function loadData() {
                await GetOneData(dataEdit._id)
                setValue('nombre', dataEdit.nombre)
            }
            loadData()

        }

    }, [dataEdit])

    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const { CreatePromotor, GetOneData, UpdateData, promotor, response } = usePromotor()

    const onSubmit = handleSubmit(async (values) => {
        if (!dataEdit)
            CreatePromotor(values)
        else
            UpdateData(dataEdit._id, values)


    })

    return (
        <form onSubmit={onSubmit}>
            <div className="bg-red-500 text-white">
                {/* {LoginErrors.map((error, i) => {
            return <div key={i}>{error}</div>;
        })} */}
            </div>
            <div className="flex flex-col space-y-1.5 py-3">
                <Label htmlFor="username">Nombre completo</Label>
                <Input type="text"
                    {...register("nombre", { required: true })}
                    placeholder="Ingresa el nombre completo del pormotor" />
                {
                    errors.nombre && (
                        <p className="text-red-500 text-xs">El nombre es obligatorio</p>
                    )
                }
            </div>
            <Button>Iniciar sesión</Button>

        </form>
    )
}
