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
  import { Button } from "@/components/ui/button"
   
  export function AlertDialogDemo() {
    return (
        <AlertDialog>
    
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Eliminar</AlertDialogTitle>
                <AlertDialogDescription>
                   Una ves eliminado no podras recuperar los datos 
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cerrar</AlertDialogCancel>
                <AlertDialogAction >Eliminar</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    )
  }