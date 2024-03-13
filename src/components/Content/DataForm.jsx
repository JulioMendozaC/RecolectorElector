import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

import { useData } from "@/context/dataContext"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export const DataForm = ({ dataEdit }) => {


    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm()

    const { GetOneData, GetAllData, CreateData, UpdateData, dataSelect } = useData()



    const onSubmit = handleSubmit(async (values) => {
        if (!dataEdit)
            CreateData(values)
        else
            UpdateData(dataEdit._id, values)
    })

    useEffect(() => {
        GetAllData()
    }, [])

   



    useEffect(() => {

        if (dataEdit) {
            async function loadData() {
                await GetOneData(dataEdit._id)
                setValue('nombre', dataEdit.nombre)
                setValue('apellido_p', dataEdit.apellido_p)
                setValue('apellido_m', dataEdit.apellido_m)
                setValue('curp', dataEdit.curp)
                setValue('fecha_nacimiento', dayjs.utc(dataEdit.fecha_nacimiento).format('YYYY-MM-DD'))
                setValue('sexo', dataEdit.sexo)
                setValue('calle', dataEdit.calle)
                setValue('No_ext', dataEdit.No_ext)
                setValue('No_int', dataEdit.No_int)
                setValue('colonia_barrio', dataEdit.colonia_barrio)
                setValue('codigo_postal', dataEdit.codigo_postal)
                setValue('clave_electoral', dataEdit.clave_electoral)
                setValue('seccion', dataEdit.seccion)
                setValue('fecha_vigencia', dayjs.utc(dataEdit.fecha_vigencia).format('YYYY-MM-DD'))
                setValue('promotor', dataEdit.promotor)
                setValue('coordinador', dataEdit.coordinador)

            }
            loadData()
        }

    }, [dataEdit])

    return (
        <>
            <Tabs defaultValue="datos-personales" className="text-white" >
                <TabsList>
                    <TabsTrigger value="datos-personales">Datos Personales</TabsTrigger>
                    <TabsTrigger value="datos-direccion">Direccion</TabsTrigger>
                    <TabsTrigger value="datos-electorales">Datos Electorales</TabsTrigger>
                </TabsList>
                <form onSubmit={onSubmit}>
                    <TabsContent value="datos-personales">
                        <div className="flex flex-col space-y-1.5 my-4">
                            <Label htmlFor="name">Nombre</Label>
                            <Input type="text"
                                {...register("nombre", { required: true })}
                                placeholder="Ingresa el nombre" />
                        </div>
                        <div className="flex flex-col space-y-1.5 my-4">
                            <Label htmlFor="framework">Apellido paterno</Label>
                            <Input type="text"
                                {...register("apellido_p", { required: true })}
                                placeholder="Ingresa el apellido paterno"
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5 my-4">
                            <Label htmlFor="framework">Apellido materno</Label>
                            <Input type="text"
                                {...register("apellido_m", { required: true })}
                                placeholder="Ingresa el apellido materno" />
                        </div>
                        <div className="flex flex-col space-y-1.5 my-4">
                            <Label htmlFor="framework">Curp</Label>
                            <Input type="text"
                                {...register("curp", { required: true })}
                                placeholder="Ingresa el Curp" />
                        </div>
                        <div className="flex flex-col space-y-1.5 my-4">
                            <Label htmlFor="framework">Fecha de nacimiento</Label>
                            <Input
                                {...register("fecha_nacimiento", { required: true })}
                                type="date" />
                        </div>
                        <div className="flex flex-col space-y-1.5 my-4">
                            <Label htmlFor="framework">Sexo</Label>
                            <Controller
                                name="sexo"
                                control={control}
                                defaultValue=""
                                render={({ field }) =>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} {...field}  >
                                        <SelectTrigger>
                                            <SelectValue placeholder=" -- Seleccione --" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Sexo</SelectLabel>
                                                <SelectItem value="Hombre">Hombre</SelectItem>
                                                <SelectItem value="Mujer">Mujer</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                } />
                        </div>
                        <div className="flex flex-col space-y-1.5 my-4">
                            <Label htmlFor="name">Telefono</Label>
                            <Input type="number"
                                {...register("telefono", { required: true })}
                                placeholder="Ingresa el numero telefonico" />
                        </div>
                    </TabsContent>
                    <TabsContent value="datos-direccion">
                        <div className="flex flex-col space-y-1.5 my-4">
                            <Label htmlFor="name">Calle</Label>
                            <Input type="text"
                                {...register("calle", { required: true })}
                                placeholder="Ingresa La calle" />
                        </div>
                        <div className="flex flex-col space-y-1.5 my-4">
                            <Label htmlFor="framework">No. exterior</Label>
                            <Input type="text"
                                {...register("No_ext",)}
                                placeholder="Ingresa el numero exterior" />
                        </div>
                        <div className="flex flex-col space-y-1.5 my-4">
                            <Label htmlFor="framework">No. interiro</Label>
                            <Input type="text"
                                {...register("No_int")}
                                placeholder="Ingresa el numero interiro" />
                        </div>
                        <div className="flex flex-col space-y-1.5 my-4">
                            <Label htmlFor="framework">Colonia / Barrio</Label>
                            <Input type="text"
                                {...register("colonia_barrio", { required: true })}
                                placeholder="Ingresa la colonia o barrio" />
                        </div>
                        {/* <div className="flex flex-col space-y-1.5 my-4">
                            <Label htmlFor="framework">Municipio</Label>
                            <Input type="text"
                                {...register("colonia_barrio", { required: true })}
                                placeholder="Ingresa el municipio" />
                        </div> */}
                        <div className="flex flex-col space-y-1.5 my-4">
                            <Label htmlFor="framework">Codigo postal</Label>
                            <Input type="text"
                                {...register("codigo_postal", { required: true })}
                                placeholder="Ingresa el Codigo postal" />
                        </div>
                    </TabsContent>
                    <TabsContent value="datos-electorales">
                        <div className="flex flex-col space-y-1.5 my-4">
                            <Label htmlFor="name">Clave electoral</Label>
                            <Input type="text"
                                {...register("clave_electoral", { required: true })}
                                placeholder="Ingresa La calle" />
                        </div>
                        <div className="flex flex-col space-y-1.5 my-4">
                            <Label htmlFor="framework">Seccion</Label>
                            <Controller
                                name="seccion"
                                control={control}
                                defaultValue=""
                                render={({ field }) =>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} {...field}  >
                                        <SelectTrigger>
                                            <SelectValue placeholder=" -- Seleccione --" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Seccion</SelectLabel>
                                                {
                                                    dataSelect.seccion.map(x => <SelectItem key={x._id} value={x.nombre}>{x.nombre}</SelectItem>
                                                    )
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                } />
                        </div>
                        <div className="flex flex-col space-y-1.5 my-4">
                            <Label htmlFor="framework">Fecha vigencia</Label>
                            <Input type="date"
                                {...register("fecha_vigencia", { required: true })}
                                placeholder="Ingresa el numero interiro" />
                        </div>
                        <div className="flex flex-col space-y-1.5 my-4">
                            <Label htmlFor="framework">Promotor</Label>
                            <Controller
                                name="promotor"
                                control={control}
                                defaultValue=""
                                render={({ field }) =>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} {...field}  >
                                        <SelectTrigger>
                                            <SelectValue placeholder=" -- Seleccione --" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Promotor</SelectLabel>
                                                {
                                                    dataSelect.promotor.map(x => <SelectItem key={x._id} value={x.nombre}>{x.nombre}</SelectItem>
                                                    )
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                } />
                        </div>
                        <div className="flex flex-col space-y-1.5 my-4">
                            <Label htmlFor="framework">Cordinador</Label>
                            <Controller
                                name="coordinador"
                                control={control}
                                defaultValue=""
                                render={({ field }) =>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} {...field}  >
                                        <SelectTrigger>
                                            <SelectValue placeholder=" -- Seleccione --" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Coordinador</SelectLabel>
                                                {
                                                    dataSelect.coordinador.map(x => <SelectItem key={x._id} value={x.nombre}>{x.nombre}</SelectItem>
                                                    )
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                } />
                        </div>
                    </TabsContent>
                    <Button>Enviar</Button>

                </form>
            </Tabs>
            <div className="flex ">
            </div>

        </>
    )
}
