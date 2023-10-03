import React, { useEffect, useState } from 'react'
import { useClickOutside } from '../hooks/useClickOutside'
import {FaChevronLeft} from 'react-icons/fa';
type DrawerProps = {
    drawer: boolean,
    closeDrawer: () => void,
    children: React.ReactNode,
    unClick?: boolean,
}
const Drawer = ({drawer,closeDrawer,children,unClick=false}:DrawerProps) => {
    const [animate,setAnimate] = useState<boolean|null>(null);
    const closeDrawerTimeout = () => {
        if (unClick == true) return
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
                <aside ref={ref} className={`w-full flex flex-col sm:w-7/12 md:2/5 lg:w-1/3 2xl:w-1/4 h-full bg-lightgray-soft border-l-2 ml-auto ${animate && animate === true ?'drawer-in':'drawer-out'}`}>
                    <button className='sm:hidden mx-4 mt-3 p-2 w-fit rounded-md border-2 border-darkgray-hard' onClick={() => closeDrawerTimeout()}>
                        <FaChevronLeft />
                    </button>
                    <div className='grow overflow-y-scroll'>
                        {children}
                    </div>
                </aside>
            </div>
        }
    </>
  )
}

export default Drawer