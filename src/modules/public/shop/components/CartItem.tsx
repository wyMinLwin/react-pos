import Drawer from '../../../../components/Drawer';
import {FiPlus,FiMinus} from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from "../../../../store";
import { removeFromCart, resetCart, toogleQuantity } from '../../../../store/purchaseCartSlice';
import { useState } from 'react';
import Dialog from '../../../../components/Dialog';
import { useClickOutside } from '../../../../hooks/useClickOutside';
import OutlineInput from '../../../../components/OutlineInput';
import {FaCheck} from 'react-icons/fa6'
type CartItemProps = {
    drawer: boolean;
    closeDrawer: () => void;
}
const CartItem = ({drawer,closeDrawer}:CartItemProps) => {
    const cartItems = useAppSelector(state => state.purchaseCart);
    const dispatch = useAppDispatch();
    const [orderConfirmDialog,setOrderConfrimDialog] = useState(false);
    const clickOutsideRef = useClickOutside(() => setOrderConfrimDialog(false));
    const [kbzPayName,setKbzPayName] = useState('');
    const [paymentMethod,setPaymentMethod] = useState<number>(null!);
  return (
    <>
        <Drawer unClick={orderConfirmDialog} drawer={drawer} closeDrawer={() => closeDrawer()}>
            <div className='w-full h-full flex flex-col px-4 py-2'>
                <h2 className='text-lg grow-0 text-important'>Your Cart</h2>
                <div className='grow overflow-y-scroll py-2 w-full'>
                    {
                        cartItems.length < 1 &&
                        <div className='flex justify-center items-center h-full'>
                            <p className='text-xl text-important text-darkgray-soft'>No cart item yet. Add some!</p>
                        </div>
                    }
                    {
                    cartItems?.map((item) => (
                        <div key={item.id} className='flex py-2 px-3 user-item-shadow rounded-md w-11/12 mx-auto my-3'>
                            <div className='w-20 h-20 bg-grapefruit-soft/10 rounded-md flex justify-center items-center overflow-hidden'>
                                <img className='w-full' src={item.url} alt={item.name} />
                            </div>
                            <div className='flex flex-col grow px-2'>
                                <span className='text-important'>{item.name}</span>
                                <span className='text-important font-semibold'>{item.price} $</span>
                            </div>
                            <div className='w-8 flex flex-col items-center justify-between py-1'>
                                <button onClick={() => dispatch(toogleQuantity({id:item.id,type:"ADD"}))}><FiPlus /></button>
                                <span className='text-center'>{item.quantity}</span>
                                <button onClick={() => item.quantity > 1 ? dispatch(toogleQuantity({id:item.id,type:"REMOVE"})) : dispatch(removeFromCart(item.id))}><FiMinus /></button>
                            </div>
                        </div>
                    ))
                    }
                </div>
                <div className='grow-0 grid grid-cols-2 gap-x-2 px-6'>
                    <button onClick={() => dispatch(resetCart())} className='col-span-1 rounded-md text-lightgray-soft py-1 click-effect bg-grapefruit-soft'>Remove All</button>
                    <button onClick={() => setOrderConfrimDialog(true)} className='col-span-1 rounded-md text-lightgray-soft py-1 click-effect bg-bluejeans-soft'>Order Now</button>
                </div>
            </div>
            <Dialog dialogModel={orderConfirmDialog} closeDialog={() => setOrderConfrimDialog(false)} >    
                <div className='w-screen h-screen bg-transparent py-5 flex justify-center items-start z-30'>
                    <div ref={clickOutsideRef} className={`w-11/12 h-fit max-h-full my-auto sm:w-5/12 md:w-1/2 ${ paymentMethod === 2 ? 'lg:w-7/12 xl:w-5/12' : 'lg:w-2/5 xl:w-3/12'} transition-all duration-100 p-4 z-40 rounded-md bg-lightgray-soft flex flex-col justify-start items-center gap-2 overflow-y-scroll`}>
                        <div className={`grid ${ paymentMethod === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-5`}>
                            <div className='cols-span-1 transition-all duration-100'>
                                <h2 className='text-lg text-start w-full'>Customer Info</h2>
                                <OutlineInput className='w-full' value={kbzPayName} onChange={(value) => setKbzPayName(value) } placeholder='Enter Customer Name...' />
                                <OutlineInput className='w-full' value={kbzPayName} onChange={(value) => setKbzPayName(value) } placeholder='Enter Customer Phone...' />
                                <OutlineInput className='w-full' disabled value={3000} onChange={() => {}} placeholder='Delivery Price...' />
                                <select className="select-box" style={{'color':"#7D7E7F"}} value={paymentMethod} onChange={(e) => setPaymentMethod(Number(e.target.value))} >
                                    <option>Select Payment Method</option>
                                    <option value={1}>COD</option>
                                    <option value={2}>KBZ Pay</option>
                                </select>
                            </div>
                            {
                                paymentMethod === 2 &&
                                <div className='cols-span-1 transition-all duration-100'>
                                    <h2 className='text-lg text-start w-full'>Payment Info</h2>
                                    <OutlineInput className='w-full' value={kbzPayName} onChange={(value) => setKbzPayName(value) } placeholder='Enter KBZPay Name...' />
                                    <OutlineInput type='number' className='w-full' value={kbzPayName} onChange={(value) => setKbzPayName(value) } placeholder='Enter KBZPay Number...' />
                                    <OutlineInput type='number' className='w-full' value={kbzPayName} onChange={(value) => setKbzPayName(value) } placeholder='Enter Payment Transition Id...' />
                                    <OutlineInput type='number' className='w-full' value={kbzPayName} onChange={(value) => setKbzPayName(value) } placeholder='Enter Paid Amount...' />
                                </div>
                            }
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 w-full gap-2'>
                            <div className='flex justify-end sm:justify-start items-center gap-1'>
                                <div>Save Info</div>
                                <span className='w-6 h-6 border-2 border-darkgray-soft rounded-sm flex justify-center items-center'>
                                    <FaCheck size={16} className="text-darkgray-soft" />
                                </span>
                            </div>
                            <div className='flex justify-end items-center gap-x-1 w-full'>
                                <button onClick={() => {}} className='rounded-md w-fit text-lightgray-soft px-2 py-1 click-effect bg-grapefruit-soft'>Cancel</button>
                                <button onClick={() => {}} className='rounded-md w-fit text-lightgray-soft px-2 py-1 click-effect bg-bluejeans-soft'>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Drawer>
    </>
  )
}

export default CartItem