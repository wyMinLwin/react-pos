import Drawer from '../../../../components/Drawer';
import {FiPlus,FiMinus} from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from "../../../../store";
import { removeFromCart, resetCart, toogleQuantity } from '../../../../store/purchaseCartSlice';
type CartItemProps = {
    drawer: boolean;
    closeDrawer: () => void;
}
const CartItem = ({drawer,closeDrawer}:CartItemProps) => {
    const cartItems = useAppSelector(state => state.purchaseCart);
    const dispatch = useAppDispatch();
  return (
    <>
        <Drawer drawer={drawer} closeDrawer={() => closeDrawer()}>
            <div className='w-full h-full flex flex-col px-4 py-2'>
                <h2 className='text-lg text-important'>Your Cart</h2>
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
                <div className='grid grid-cols-2 gap-x-2 px-6'>
                    <button onClick={() => dispatch(resetCart())} className='col-span-1 rounded-md text-lightgray-soft py-1 click-effect bg-grapefruit-soft'>Remove All</button>
                    <button className='col-span-1 rounded-md text-lightgray-soft py-1 click-effect bg-bluejeans-soft'>Order Now</button>
                </div>
            </div>
        </Drawer>
    </>
  )
}

export default CartItem