import { useEffect, useState } from 'react'
import { useData } from '../../context/dataContext'

import { Form } from '../../components/Common/Form'
import { DataForm } from '../../components/Content/DataForm'
import { SimpleTable } from "@/components/Common/SimpleTable"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"

export const Promotores = () => {
  
  const { GetData, data, response } = useData()
  const [newData, setNewData] = useState(data)
  const [isSuscribe, setIsSuscribe] = useState(false)

  return (
    <div>Promotores</div>
  )
}
