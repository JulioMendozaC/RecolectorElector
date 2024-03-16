import { useEffect, useState } from 'react'
import { useData } from '../../context/dataContext'
import { useForm, Controller } from "react-hook-form"


import SimplePie from '@/components/Charts/SimplePie';
import SimpleBar from '@/components/Charts/SimpleBar';
import { CardDashboard } from '@/components/Common/CardDashboard';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components//ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components//ui/tabs"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export const SeccionCharts = () => {

    const { AllAnalytics, GetSeccions, data, response } = useData()
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm()


    const [valueGen, setValueGen] = useState([])
    const [seccionSelect, setSeccionSelect] = useState(null)

    const [valueSeccion, setValueSeccion] = useState(null)
    const [porcentaje, setPorcentaje] = useState(null)

    const [moda, setModa] = useState(null)
    const [media, setMedia] = useState(null)

    const [hombres, setHombres] = useState(null)
    const [mujeres, setMujeres] = useState(null)
    const [sexo, setSexo] = useState(null)
    const [dataYear, setDataYear] = useState(null)
    const [secSexo, setSecSexo] = useState(null)



    useEffect(() => {
        AllAnalytics()

    }, [])

    useEffect(() => {
        if (data) {
            if (data.Seccion) {
                if (data.Seccion.length != 0) {

                    setSeccionSelect(data.Seccion)
                    console.log(seccionSelect)

                }
            }
        }

        if (response) {
            if (response.Seccion && response.Seccion.length != 0)
                console.log(response.Seccion)
            setValueGen(response.Data.length)

            if (response.msg == 'Seccion encontrada') {
                if (response.Seccion && response.Seccion.length != 0) {
                    setValueSeccion(response.Seccion.lista_nominal)
                    const res = Math.trunc((valueGen / valueSeccion) * 100)
                    setPorcentaje(res)

                    const getYear = response.Data.map(x => x.fecha_nacimiento.slice(0, 4))
                    const date = new Date()
                    const year = date.getFullYear();

                    for (var valor in getYear) {
                        if (getYear.hasOwnProperty(valor)) {
                            getYear[valor] -= year;
                        }
                    }

                    const arrayYears = getYear.map(x => Math.abs(x))

                    setDataYear(RangEdad(arrayYears))

                    let getModa = encontrarModa(arrayYears)
                    setModa(getModa)
                    let getMedia = calcularMedia(arrayYears)
                    setMedia(Math.trunc(getMedia))

                      // ? Sexo porcenatjes

                      let getSexo = response.Data.map(x => x.sexo)

                      let getHombres = getSexo.filter(x => x == 'Hombre')
                      setHombres(getHombres.length)
  
                      let getMujer = getSexo.filter(x => x == 'Mujer')
                      setMujeres(getMujer.length)
  
                      if (hombres > mujeres)
                          setSexo(Math.trunc((hombres / getSexo.length) * 100))
                      else
                          setSexo(Math.trunc((mujeres / getSexo.length) * 100))
  

                }
            }


        }


    }, [data, response, valueGen])



    function encontrarModa(array) {
        var frecuencia = {};
        var moda = [];
        var maxFrecuencia = 0;

        for (var i = 0; i < array.length; i++) {
            var numero = array[i];
            frecuencia[numero] = (frecuencia[numero] || 0) + 1;

            if (frecuencia[numero] > maxFrecuencia) {
                maxFrecuencia = frecuencia[numero];
                moda = [numero];
            } else if (frecuencia[numero] === maxFrecuencia) {
                moda.push(numero);
            }
        }

        return parseInt(moda);
    }

    function calcularMedia(array) {
        var suma = 0;

        for (var i = 0; i < array.length; i++) {
            suma += array[i];
        }

        var media = suma / array.length;
        return media;
    }

    function contarRepeticiones(array) {
        let frecuencia = {};

        // Iterar sobre el array y contar las repeticiones de cada combinación de sección y valor
        array.forEach(function (objeto) {
            let clave = objeto.seccion + ' - ' + objeto.sexo;
            if (frecuencia[clave] === undefined) {
                frecuencia[clave] = 1;
            } else {
                frecuencia[clave]++;
            }
        });

        frecuencia = Object.entries(frecuencia).map(([clave, valor]) => ({ name: clave + ' : ' + valor, cantidad: valor }));
        frecuencia.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });


        return frecuencia.sort();

    }

    const RangEdad = (array) => {

        let countRang1 = 0;
        let countRang2 = 0;
        let countRang3 = 0;
        let countRang4 = 0;
        let countRang5 = 0;

        array.forEach(function (valor) {
            if (valor >= 18 && valor <= 25) {
                countRang1++;
            } else if (valor >= 26 && valor <= 35) {
                countRang2++;
            } else if (valor >= 36 && valor <= 45) {
                countRang3++;
            } else if (valor >= 46 && valor <= 55) {
                countRang4++;
            } else if (valor >= 56 && valor <= 100) {
                countRang5++;
            }
        });

        return [
            { name: '18-25', Promovidos: countRang1 },
            { name: '26-35', Promovidos: countRang2 },
            { name: '36-45', Promovidos: countRang3 },
            { name: '46-55', Promovidos: countRang4 },
            { name: '56-65 y mas', Promovidos: countRang5 }
        ]



    }

    const dataProSecc = [
        { name: 'Promovidos', value: valueGen },
        { name: 'Lista Nominal', value: valueSeccion }
    ]
    const dataSexo = [
        { name: 'Hombres', value: hombres },
        { name: 'Mujeres', value: mujeres }
    ]

    const FiltrarPor = (data) => {

        setValue('seccion', data)
        document.getElementById('btn').click()

    }

    const onSubmit = handleSubmit(async (values) => {
        GetSeccions(values)

    })
    return (

        <>

            <div className="hidden flex-col md:flex">
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <div className="ml-auto flex items-center space-x-4">
                        </div>
                    </div>
                </div>
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                        <div className="flex items-center space-x-2">
                            <Select onValueChange={(e) => FiltrarPor(e)}>
                                <SelectTrigger className="w-[230px]">
                                    <SelectValue placeholder="Filtrar por coordinador" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Campo</SelectLabel>
                                        {
                                            seccionSelect ?
                                                seccionSelect.map(x => <SelectItem key={x._id} value={x.nombre}>{x.nombre}</SelectItem>)
                                                :
                                                <SelectItem value="-">No hay seccione</SelectItem>
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <form onSubmit={onSubmit} hidden>
                                <input type="text" {...register("seccion", { required: true })} />
                                <button type='submit' id='btn'></button>
                            </form>
                        </div>
                    </div>
                   {valueGen.length != 0 ? 
                    <Tabs defaultValue="general" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="general">
                            General
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="general" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {porcentaje > 100 ?
                                <CardDashboard
                                    title={'Promovidos vs lista nominal'}
                                    data={`Promovidos: ${porcentaje}%`}
                                    description={`De la lista nominal de  ${valueSeccion} `}
                                    size={'col-span-1 text-red-600'}
                                />
                                :
                                <CardDashboard
                                    title={'Promovidos vs lista nominal'}
                                    data={`Promovidos: ${porcentaje}%`}
                                    description={`De la lista nominal de  ${valueSeccion} `}
                                    size={'col-span-1 '}
                                />
                            }

                            <CardDashboard
                                title={'Edad'}
                                data={`Promedio entre: ${moda} - ${media} `}
                                description={`La edad media de los promovidos es de  ${moda} `}
                                size={'col-span-1'}
                            />

                            {
                                hombres > mujeres ?
                                    <CardDashboard
                                        title={'Sexo'}
                                        data={` Hombres: ${hombres - 100}`}
                                        description={`La edad media de los promovidos es de  ${moda} `}
                                        size={'col-span-1'}
                                    />

                                    :
                                    <CardDashboard
                                        title={'Sexo'}
                                        data={` Mujeres: ${sexo}% `}
                                        description={`De una promedio de  ${hombres + mujeres} promovidos `}
                                        size={'col-span-1'}
                                    />
                            }


                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="col-span-4">
                                <CardHeader>
                                    <CardTitle>Promovidos vs lista nominal</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <SimplePie data={dataProSecc} />
                                </CardContent>
                            </Card>
                            <Card className="col-span-3">
                                <CardHeader>
                                    <CardTitle>Sexo</CardTitle>
                                    <CardDescription>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <SimplePie data={dataSexo} />
                                </CardContent>
                            </Card>
                            <Card className="col-span-8">
                                <CardHeader>
                                    <CardTitle>Edad</CardTitle>
                                    <CardDescription>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <SimpleBar data={dataYear} label1={'Promovidos'} color={'#24c35b'} />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                </Tabs>
                :
                <div className="">Seleccione una seccion para ver los resultados..</div>
                }
                </div>
            </div>
        </>
    )
}
