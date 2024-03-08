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

export const NullTable = ({ data, columns }) => {


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

            <Table >
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

                    <TableRow className='text-center'>
                        <TableCell colspan='12'>
                            No hay datos....
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>




    

    )
}
