import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { useData } from '../../context/dataContext'

import { DataForm } from "../Content/DataForm"
import { Form } from "./Form"

import { Input } from "@/components/ui/input"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,

    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


export const SimpleTable = ({ data, columns }) => {

    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState("")
    const [dataEdit, setDataEdit] = useState([])


    const { DeleteData } = useData()

 
    const table = useReactTable({
        data, columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),

        state: {
            sorting,
            globalFilter: filtering
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering
    })


    return (
        <div>
            <div className="">

            </div>

            <div className="p-2 max-w-5xl mx-auto fill-gray-400">
                <div className="flex justify-between mb-2">
                    <div className="w-full flex items-center gap-1">
                        <button className="text-">Descargar</button>
                    </div>
                    <Input
                        type='text'
                        value={filtering}
                        onChange={(e) => setFiltering(e.target.value)}
                        placeholder="Buscar..."

                    />
                </div>
            </div>

            <Table>
                <TableCaption></TableCaption>
                <TableHeader>
                    {
                        table.getHeaderGroups().map(headeGroup => (
                            <TableRow key={headeGroup.id}>
                                {
                                    headeGroup.headers.map(header => (
                                        <TableHead key={header.id}
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())
                                            }

                                            {{
                                                asc: "⬆️", desc: "⬇️"
                                            }
                                            [header.column.getIsSorted() ?? null]
                                            }
                                        </TableHead>
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>

                            ))}
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>•••</DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => {
                                            setDataEdit(row.original)
                                            document.getElementById('btn-edit').click()
                                        }} >Editar</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => {
                                            setDataEdit(row.original._id)
                                            document.getElementById('alert').click()
                                        }}>Eliminar</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => table.previousPage()} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext onClick={() => table.nextPage()} />

                    </PaginationItem>
                </PaginationContent>
            </Pagination>

            <Dialog>
                <DialogTrigger asChild>
                    <div className="" hidden>
                        <Button className="mx-3 my-4" id='btn-edit'>+ Anadir</Button>
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[60vh]">
                    <DialogHeader>
                        <DialogTitle>Añadir Datos</DialogTitle>
                    </DialogHeader>
                    <Form>
                        {
                            dataEdit == [] ?
                                <DataForm />
                                :
                                <DataForm dataEdit={dataEdit} />
                        }
                    </Form>
                    <DialogFooter>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <div hidden>
                        <Button variant="outline" id="alert"></Button>
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar</AlertDialogTitle>
                        <AlertDialogDescription>
                            Una ves eliminado no podras recuperar los datos
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cerrar</AlertDialogCancel>
                        <AlertDialogAction onClick={()=> DeleteData(dataEdit)}>Eliminar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>


    )
}
