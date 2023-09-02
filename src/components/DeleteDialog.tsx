import React from 'react'
import Dialog from './Dialog'
import { useAppSelector } from '../store'
type DeleteDialogTypes = {
    dialog:boolean,
    closeFn: () => void,
    deleteFn: () => void,
    children?: React.ReactNode
}
const DeleteDialog = ({dialog,closeFn,deleteFn,children}:DeleteDialogTypes) => {
  const developerMode = useAppSelector(state => state.developerMode)
  return (
    <Dialog dialogModel={dialog} closeDialog={() => closeFn()}>
        <div className='flex flex-col justify-center items-center bg-lightgray-soft px-6 py-3 rounded-md gap-3'>
            {children}
            <div className='flex gap-5 justify-center items-center'>
                <button onClick={() => closeFn()} className='bg-darkgray-soft text-lightgray-soft px-2 rounded-md click-effect'>Cancel</button>
                <button onClick={() => deleteFn()} disabled={!developerMode} className='bg-grapefruit-soft text-lightgray-soft px-2 rounded-md click-effect'>Delete</button>
            </div>
        </div>
    </Dialog>
  )
}

export default DeleteDialog