import {FcShop} from 'react-icons/fc';
import {AiOutlineShopping,AiOutlineHeart} from 'react-icons/ai';
import {VscSearch} from 'react-icons/vsc';
import { useGetItems } from '../../../../hooks/useItems';
import { CartItemtype, ItemType } from '../../../../types/itemType';
import { useGetCategories } from '../../../../hooks/useCategories';
import ItemCard from '../components/ItemCard';
import { useAppSelector } from '../../../../store';
import { useMemo, useState } from 'react';
import CartItem from '../components/CartItem';


const ShopView = () => {
  const [cartDrawer,setCartDrawer] = useState(false);
  const getCategories = useGetCategories();
  const getItems = useGetItems();
  const cartItems = useAppSelector(state => state.purchaseCart);
  const [wishList,setWishList] = useState <Array<ItemType>>(JSON.parse(localStorage.getItem("react-pos") as string) || []);
  const addToWishlist = (item:ItemType) => {   
    localStorage.setItem('react-pos',JSON.stringify([...wishList,item]));
    setWishList(JSON.parse(localStorage.getItem("react-pos") as string) as Array<ItemType>);
  };
  const removeFromWishList = (id:number) => {
    localStorage.setItem('react-pos',JSON.stringify(wishList.filter(wish => wish.id !== id)));
    setWishList(JSON.parse(localStorage.getItem("react-pos") as string) as Array<ItemType>);
  }
  const cartItemsCount = useMemo(() => {
    let count = 0;
    cartItems.forEach(item => {
      count += item.quantity;
    })
    return count;
  },[cartItems]);
  return (
    <div className='w-full h-full flex flex-col gap-2'> 
      <nav className='flex justify-between items-center px-8 py-2 bg-lightgray-soft'>
        <FcShop size={42} />
        <span className='flex items-center justify-end gap-5'>
          <div className='hidden sm:flex justify-center items-center bg-lightgray-hard rounded-3xl py-1 px-4 gap-2 border-2'>
            <input placeholder='Search...' className='focus:outline-none bg-lightgray-hard' />
            <VscSearch size={20} />
          </div>
          <div className='relative select-none cursor-pointer '>
            <AiOutlineShopping onClick={() => setCartDrawer(true)} size={26} />
            {
              cartItemsCount > 0 && <span className='absolute -top-1/2 -right-1/2 translate-y-1/4 -translate-x-1/4 bg-grapefruit-soft text-lightgray-soft px-1 rounded-full text-sm'>{cartItemsCount}</span>
            }
          </div>
          <div className='relative select-none cursor-pointer '>
            <AiOutlineHeart onClick={() => {}} size={26} />
            {
              wishList.length > 0 && <span className='absolute -top-1/2 -right-1/2 translate-y-1/4 -translate-x-1/4 bg-grapefruit-soft text-lightgray-soft px-1 rounded-full text-sm'>{wishList.length}</span>
            }
          </div>      
        </span>
      </nav>
      <div className='grow overflow-y-scroll  bg-lightgray-soft rounded-t-md border-t-4 border-bittersweet-soft flex flex-col'>
        <div className=' w-3/4 mx-auto sm:hidden flex justify-between items-center bg-lightgray-hard rounded-3xl py-1 px-3 gap-2 border-2 mt-3'>
          <input placeholder='Search...' className='focus:outline-none bg-lightgray-hard' />
          <VscSearch size={20} />
        </div>
        {
          getItems.data?.data?.length && getItems.data?.data?.length > 0 ? 
          <div className='grow'>
            <div className='w-full h-fit overflow-y-scroll grid grid-cols-12 gap-4 gap-y-3 py-4 px-4 md:px-14 lg:px-10 xl:px-40 2xl:px-16'>
            {
              getItems.data?.data?.map((item:CartItemtype) => (
                <ItemCard 
                  key={item.id} 
                  item={item} 
                  category_name={getCategories.data?.data?.find(c => c.id === item.category_id).category_name} 
                  in_cart={!!cartItems.find(c => c.id === item.id && c.quantity > 0)} 
                  wishList={wishList} addToWishlist={(item:ItemType) => addToWishlist(item)} removeFromWishList={(id:number) => removeFromWishList(id)}
                  />
              ))
            }
            </div>
          </div>
          : <div className='grow flex flex-col justify-center items-center gap-2'>
              <p className=' text-xl md:text-3xl text-darkgray-soft'>There is no items at moments</p>
              {
                getItems.isLoading && <span className='simple-spinner'></span>
              }
          </div>
        }
      </div>
      <CartItem drawer={cartDrawer} closeDrawer={() => setCartDrawer(false)} />
    </div>
  )
}

export default ShopView