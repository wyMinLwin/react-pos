import { ItemType } from '../../../../types/itemType'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { HiOutlineShoppingCart,HiTrash } from 'react-icons/hi2'
import { useAppDispatch } from '../../../../store'
import { addToCart, removeFromCart } from '../../../../store/purchaseCartSlice'

type ItemCardType = {
    item:ItemType,
    category_name:string,
    in_cart: boolean,
    wishList: Array<ItemType >,
    addToWishlist: (item:ItemType) => void,
    removeFromWishList: (id:number) => void
}
const ItemCard = ({item,category_name,in_cart,wishList,addToWishlist,removeFromWishList}:ItemCardType) => {
  const dispatch = useAppDispatch();
  return (
    <div className='flex flex-col gap-2 col-span-6 md:col-span-4 lg:col-span-3 2xl:col-span-2 h-64 cart-item-shadow bg-lightgray-soft user-item-shadow mx-auto p-3 rounded-2xl'>
        {/* <AiFillHeart className="ml-auto text-grapefruit-hard" size={24} /> */}
        <div className='grid grid-cols-6'>
          <div className='col-span-5 text-ellipsis overflow-hidden text-darkgray-soft text-sm text-important font-semibold'>| {category_name}</div>
          {
            wishList.find(wish => wish.id === item.id) 
            ? <AiFillHeart onClick={() => removeFromWishList(item.id)} className="ml-auto text-grapefruit-hard" size={24} />
            :<AiOutlineHeart onClick={() => addToWishlist(item)} className="ml-auto col-span-1" size={24} />
          }
        </div>
        <div className='w-5/6 h-32 sm:w-36 sm:h-36 lg:w-52 lg:h-52 mx-auto overflow-hidden rounded-2xl flex justify-center items-center bg-grapefruit-soft/10'>
          <img className='w-full' src={item.url} alt={item.name} />
        </div>
        <div className='grid grid-cols-5 gap-1'>
          <div className='flex flex-col col-span-4'>
            <div className='text-sm text-important w-full text-ellipsis overflow-hidden'>{item.name}</div>
            <div className='text-sm text-important font-semibold'>{item.price} $</div>
          </div>
          <div className='col-span-1 flex justify-center items-start'>
            {
              in_cart
              ? <button className='bg-darkgray-soft w-6 h-6 md:w-8 md:h-8 rounded-full click-effect flex justify-center items-center'>
                  <HiTrash className="text-lightgray-soft" size={20} onClick={() => dispatch(removeFromCart(item.id))} />
                </button>
              : <button className='bg-grapefruit-soft w-6 h-6 md:w-8 md:h-8 rounded-full click-effect flex justify-center items-center'>
                  <HiOutlineShoppingCart className="text-lightgray-soft" size={20} onClick={() => dispatch(addToCart({...item,quantity:1}))}/>
                </button>
            }
            
          </div>
        </div>
    </div>
  )
}

export default ItemCard