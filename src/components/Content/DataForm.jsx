import { useEffect } from "react"
import { useForm } from "react-hook-form"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

import { useData } from "@/context/dataContext"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export const DataForm = ({ dataEdit }) => {

    useEffect(() => {
        if (dataEdit) {
            async function loadData() {
                await GetOneData(dataEdit._id)
                setValue('nombre', dataEdit.nombre)
                setValue('apellido_p', dataEdit.apellido_p)
                setValue('apellido_m', dataEdit.apellido_m)
                setValue('curp', dataEdit.curp)
                setValue('fecha_nacimiento', dataEdit.fecha_nacimiento)
                setValue('sexo', dataEdit.sexo)
                setValue('calle', dataEdit.calle)
                setValue('No_ext', dataEdit.No_ext)
                setValue('No_int', dataEdit.No_int)
                setValue('colonia_barrio', dataEdit.colonia_barrio)
                setValue('codigo_postal', dataEdit.codigo_postal)
                setValue('clave_electoral', dataEdit.clave_electoral)
                setValue('seccion', dataEdit.seccion)
                setValue('fecha_vigencia', dataEdit.fecha_vigencia)
                setValue('promotor', dataEdit.promotor)
                setValue('coordinador', dataEdit.coordinador)

            }
            loadData()
        }
       
    }, [dataEdit])


    const { register, handleSubmit, setValue, formState: { errors } } = useForm()

    const { GetOneData, CreateData, UpdateData, response } = useData()



    const onSubmit = handleSubmit(async (values) => {
        if (!dataEdit)
            CreateData(values)
        else
            UpdateData(dataEdit._id, values)
    })


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
                            <Input type="text"
                                {...register("sexo", { required: true })}
                            />
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
                            <Input type="text"
                                {...register("seccion", { required: true })}
                                placeholder="Ingresa la seccion" />
                        </div>
                        <div className="flex flex-col space-y-1.5 my-4">
                            <Label htmlFor="framework">Fecha vigencia</Label>
                            <Input type="date"
                                {...register("fecha_vigencia", { required: true })}
                                placeholder="Ingresa el numero interiro" />
                        </div>
                        <div className="flex flex-col space-y-1.5 my-4">
                            <Label htmlFor="framework">Promotor</Label>
                            <Input type="text"
                                {...register("promotor", { required: true })}
                                placeholder="Ingresa la promotor" />
                        </div>
                        <div className="flex flex-col space-y-1.5 my-4">
                            <Label htmlFor="framework">Cordinador</Label>
                            <Input type="text"
                                {...register("coordinador", { required: true })}
                                placeholder="Ingresa el cordinador" />
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
