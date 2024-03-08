import "../Styles/style.css";
import { useAuth } from '../../context/authContext'

import { Link } from 'react-router-dom'
import { ButtonSide } from "./ButtonSide";
import { Separator } from "@/components/ui/separator"
import { LogOut, MoreHorizontal, Settings, Users, UserPlus, MapPinned, CreditCard } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../ui/button";

export const Sidebar = () => {

  const { isAutenticated } = useAuth();

  return (

    <>
      {isAutenticated ?
        <aside className="w-[270px] max-w-xs h-screen fixed left-0 top-0  z-40 border-r border-gray-500">
          <div className="h-full px-3 py-4">
            <h3 className=" mx-3 text-lg font-semibold text-foreground ">RecolElector</h3>

            <div className="mt-5">
              <div className="flex flex-col gap-1 w-full">
                <Link to={'/Promotores'}>
                  <ButtonSide text={'Promotores'} className='w-full' icon={UserPlus} />
                </Link>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <Link to={'/Coordinadores'}>
                  <ButtonSide text={'Coordinadores'} className='w-full' icon={Users} />
                </Link>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <Link to={'/Secciones'}>
                  <ButtonSide text={'Secciones'} className='w-full' icon={MapPinned} />
                </Link>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <Link to={'/Promovido'}>
                  <ButtonSide text={'Promovidos'} className='w-full' icon={CreditCard} />
                </Link>
              </div>


              <div className="absolute left-0 bottom-3 w-full px-3">

                <Separator className='absolute -top-3 left-0 w-full' />

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant='ghost' className='w-full justify-start'>
                      <div className='flex justify-between items-center w-full'>
                        <div className='flex gap-2'>
                          <span>Usuario</span>
                        </div>

                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='mb-2 w-56 rounded-[1rem]'>
                    <div className="space-1-y">
                      <Link>
                        <ButtonSide size='sm' className='w-full' text={'Cerrar Sesion'} icon={LogOut}></ButtonSide>
                      </Link>
                    </div>
                  </PopoverContent>
                </Popover>

              </div>
            </div>
          </div>
        </aside>
        :
        <div className=""></div>
      }

    </>
  );
}

