import Drawer from "../../../../components/Drawer";
import { ItemType } from "../../../../types/itemType";
import {FaCartPlus} from 'react-icons/fa';
import {IoTrashBinSharp} from 'react-icons/io5'
import { useAppDispatch, useAppSelector } from "../../../../store";
import { addToCart, toogleQuantity } from "../../../../store/purchaseCartSlice";
import { useCallback } from "react";
type WishItemsType = {
    drawer: boolean;
    closeDrawer: () => void;
    removeFromWishList: (id:number) => void;
    wishList: Array<ItemType>;
    clearWishList: () => void
}
const WishItems = ({drawer,closeDrawer,removeFromWishList,wishList,clearWishList}:WishItemsType) => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(state => state.purchaseCart);

    const addFromWishList = useCallback((items:Array<ItemType>) => {
        items.forEach(item => {
            const foundItem = cartItems.find(i => i.id == item.id);
            if (foundItem) {
                dispatch(toogleQuantity({id:item.id,type:"ADD"}))
            } else {
                dispatch(addToCart({...item,quantity:1}));
            }
        });
        if (items.length < 2 ) {
            removeFromWishList(items[0]?.id);
        } else {
            clearWishList();
        }
    },[dispatch,removeFromWishList,cartItems,clearWishList])
    
  return (
    <>
        <Drawer drawer={drawer} closeDrawer={() => closeDrawer()}>
            <div className="w-full h-full flex flex-col px-4 py-2">
                <h2 className='text-lg text-important'>Your Wishlist</h2>
                <div className="grow">
                    {
                        wishList?.map((item) => (
                            <div key={item.id} className='flex transition-all py-2 px-3 user-item-shadow rounded-md w-11/12 mx-auto my-3'>
                                <div className='w-20 h-20 bg-grapefruit-soft/10 rounded-md flex justify-center items-center overflow-hidden'>
                                    <img className='w-full' src={item.url} alt={item.name} />
                                </div>
                                <div className='flex flex-col grow px-2'>
                                    <span className='text-important'>{item.name}</span>
                                    <span className='text-important font-semibold'>{item.price} $</span>
                                </div>
                                <div className='w-8 flex flex-col items-end justify-center gap-y-5 py-1'>
                                    <button onClick={() => addFromWishList([item]) } className="click-effect-nshd"><FaCartPlus className="text-bluejeans-soft" size={22} /></button>
                                    <button onClick={() => removeFromWishList(item.id)} className="click-effect-nshd"><IoTrashBinSharp className="text-grapefruit-soft" size={20} /></button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='grid grid-cols-2 gap-x-2 px-6'>
                    <button onClick={() => clearWishList()} className='col-span-1 rounded-md text-lightgray-soft py-1 click-effect bg-grapefruit-soft'>Remove All</button>
                    <button onClick={() => addFromWishList(wishList)} className='col-span-1 rounded-md text-lightgray-soft py-1 click-effect bg-bluejeans-soft'>Add All To Cart</button>
                </div>
            </div>
        </Drawer>
    </>
  )
}

export default WishItems