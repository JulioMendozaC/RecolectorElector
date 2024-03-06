import React from 'react'
import { Button } from '../ui/button'
import { LogOut, MoreHorizontal, Settings } from 'lucide-react';


export const ButtonSide = ({ text, icon: Icon }) => {
    return (
        <Button variant='ghost' className='gap-2 justify-start'>

            {Icon && <Icon size={20} />}
            <span>{text}</span>
        </Button>
    )
}
