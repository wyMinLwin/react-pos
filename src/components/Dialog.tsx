import React from 'react'
import { createPortal } from 'react-dom'
import { useClickOutside } from '../hooks/useClickOutside'
type DialogProps = {
    children: React.ReactNode,
    dialogModel: boolean,
    zIndex?: string,
    closeDialog?: () => void,
} 
const Dialog = ({children,dialogModel,closeDialog,zIndex}:DialogProps) => {
    const ref = useClickOutside(() => closeDialog && closeDialog());
  return (
    <>
        {
            dialogModel && 
            createPortal(        
                <div className={`w-screen h-screen bg-darkgray-soft/50 overflow-hidden absolute top-0 left-0 right-0 bottom-0 z-30 ${zIndex}`}>
                    <div ref={ref} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        {children}
                    </div>
                </div>
                ,document.getElementById("portal") as Element | DocumentFragment
            )
            
        }
    </>
  )
}

export default Dialog