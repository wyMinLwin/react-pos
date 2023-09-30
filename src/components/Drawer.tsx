import React, { useEffect, useState } from 'react'
import { useClickOutside } from '../hooks/useClickOutside'

type DrawerProps = {
    drawer: boolean,
    closeDrawer: () => void,
    children: React.ReactNode
}
const Drawer = ({drawer,closeDrawer,children}:DrawerProps) => {
    const [animate,setAnimate] = useState<boolean|null>(null);
    const closeDrawerTimeout = () => {
        setAnimate(false);
        setTimeout(() => {
            closeDrawer();
        },350);
    }
    const ref = useClickOutside(() => closeDrawerTimeout());
    useEffect(() => {
        if (drawer === true) {
            setAnimate(true);
        }
    },[drawer])
    return (
    <>
        {
            drawer &&
            <div className='w-screen h-screen absolute top-0 bottom-0 left-0 right-0 z-30 bg-darkgray-soft/50 overflow-hidden'>
                <aside ref={ref} className={`w-11/12 sm:w-7/12 md:2/5 lg:w-1/3 2xl:w-1/4 h-full bg-lightgray-soft border-l-2 ml-auto ${animate && animate === true ?'drawer-in':'drawer-out'}`}>
                    {children}
                </aside>
            </div>
        }
    </>
  )
}

export default Drawer