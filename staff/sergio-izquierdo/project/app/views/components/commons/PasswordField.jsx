import { useState } from 'react'
import { Eye, EyeOff  } from 'lucide-react'

import { Label } from './Label'
import { Input } from './Input'

export function PasswordField({ alias, children }) {
    const [type, setType] = useState('password')

    const handleTogglePasswordClick = event => {
        event.preventDefault()

        setType(type === 'password' ? 'text' : 'password')
    }

    return <div className="flex flex-col w-full">
        <Label alias={alias}>{children}</Label>
        <div className='relative w-full flex items-center'>
        <Input alias={alias} type={type} autoComplete="off" className={`pr-10 ${type === 'password'? '' : 'bg-[gold]/10'}`} />
        <button className="absolute right-3 cursor-pointer" type="button" onClick={handleTogglePasswordClick}>{type === 'password' ? <Eye size={20} color="#3F295F" strokeWidth={1.25} /> : <EyeOff size={20} color="#3F295F" strokeWidth={1.25} />}</button>
        </div>
    </div>
}
