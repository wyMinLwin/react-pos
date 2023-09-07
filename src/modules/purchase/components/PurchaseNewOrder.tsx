import { useCallback, useEffect, useState } from 'react'
import OutlineInput from '../../../components/OutlineInput'
import { useGetCategories } from '../../../hooks/useCategories';
import { CategoryType } from '../../../types/categoryType';
import { ItemType } from '../../../types/itemType';
import { supabase } from '../../../config/superbaseClient';
import {IoMdAdd,} from 'react-icons/io';
import {IoTrashBin} from 'react-icons/io5';
import './app.css';
import { useAppDispatch, useAppSelector } from '../../../store';
import { addToCart, removeFromCart, toogleQuantity } from '../../../store/purchaseCartSlice';
import {FiPlus,FiMinus} from 'react-icons/fi';
const PurchaseNewOrder = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.purchaseCart);
  const [customerName,setCustomerName] = useState('');
  const [customterEmail,setCustomerEmail] = useState('');
  const [customerPhone,setCustomerPhone] = useState('');
  const [currentCategory,setCurrentCategory] = useState<number|null>(null);
  const [currentItem,setCurrentItem] = useState<number|null>(null);
  const [items,setItems] = useState<Array<ItemType>>([]);
  const getCategories = useGetCategories();
  const [itemLoading,setItemLoading] = useState(false);
  const [selected,setSelected] = useState(false);

  const selectItemsByCategory = useCallback( async (id:number) => {
    setItemLoading(true);
    const response = await supabase.from('items').select('*').eq('category_id',id);
    if (response.data) {
      setItems(response.data)
    }
    setItemLoading(false);
  },[]);

  const handleSelectCategory = async (id:number) => {
    setItems([]);
    setCurrentCategory(id);
    setCurrentItem(null);
    await selectItemsByCategory(id);
  }

  useEffect(() => {
    if (cartItems.find(item => item.id === currentItem)) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  },[currentItem,cartItems]);
  
  return (
    <div className='w-full grow h-5/6 flex flex-col gap-y-2 pt-2'>
      <div className='h-56 grid grid-cols-3 gap-x-4 px-4'>
        <div className=' flex flex-col justify-start px-4 py-2 purchase-box-shadow rounded-md'>
          <div className='text-sm text-important'>Customer's Information</div>
          <OutlineInput value={customerName} onChange={(e) => setCustomerName(e)} placeholder='Enter Customer Name...' />
          <OutlineInput value={customterEmail} onChange={(e) => setCustomerEmail(e)} placeholder='Enter Customer Email...' />
          <OutlineInput value={customerPhone} onChange={(e) => setCustomerPhone(e)} placeholder='Enter Customer Phone...' />
        </div>
        <div className='flex flex-col justify-start h-full overflow-y-scroll gap-2 cursor-pointer px-4 py-2 purchase-box-shadow rounded-md'>
          {
            getCategories.data?.data && getCategories.data?.data.map((category:CategoryType) => (
              <div onClick={() => handleSelectCategory(category.id)} className={`flex flex-row justify-start items-start transition-all h-fit rounded-md border-2 ${category.id === currentCategory ? 'border-bluejeans-soft ' : 'border-lightgray-hard'}`}   key={category.id}>
                <div className='w-12 h-12 flex justify-center items-center bg-black m-1'>
                  <img src={category.category_img} className='w-full' alt={category.category_name} />
                </div>
                <div className='ml-3'>{category.category_name}</div>
              </div>
            ))
          }
        </div>
        <div className='flex flex-col justify-start h-full overflow-y-scroll gap-2 cursor-pointer px-4 py-2 purchase-box-shadow rounded-md'>
          {
            itemLoading &&
            <div className='w-full h-full flex justify-center items-center'>
              <span className ="simple-spinner"></span>
            </div>  
          }
          {
            !itemLoading && items.length < 1 
            ? <div className='w-full h-full flex justify-center items-center'>
                <div className ="text-lg text-darkgray-soft">There is no item yet.</div>
              </div>  
            : items?.map((item:ItemType) => (
              <div onClick={() => setCurrentItem(item.id)} className={`flex flex-row justify-start items-start transition-all h-fit rounded-md border-2 ${item.id === currentItem ? 'border-bluejeans-soft ' : 'border-lightgray-hard'}`} key={item.id}>
                <div className='w-12 h-12 flex justify-center items-center bg-black p-0 m-1'>
                  <img src={item.url} className='w-full' alt={item.name} />
                </div>
                <div className='ml-3 flex flex-col grow justify-between items-start'>
                  <div>{item.name}</div>
                  <div className='text-sm'>{item.price} $</div>
                </div>
                {
                  currentItem === item.id &&
                  <div className='my-auto mr-2'>
                    {
                      !selected ? 
                      <IoMdAdd size={24} color={'#5D9CEC'} onClick={() => dispatch(addToCart({...item,quantity:1}))} />
                      :<IoTrashBin size={24} color={'#ED5565'} onClick={() => dispatch(removeFromCart(item.id))} />
                    }
                  </div>
                }
              </div>
            ))
          }
        </div>
      </div>
      <div className='grow overflow-y-scroll px-4 relative'>
        <div className='text-sm text-important'>Purchase Cart</div>
        {cartItems.length < 1 && <div className='text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-important text-darkgray-soft'>No items have been added yet.</div>}
        <div className='grid grid-cols-12 gap-4 py-1'>        
          {
            cartItems.length > 1 && cartItems.map(item => (
              <div className={`col-span-4 xl:col-span-3 p-1 flex flex-row justify-start items-start transition-all h-fit rounded-md cart-item-shadow`}   key={item.id}>
                  <div className='w-12 h-12 flex justify-center items-center my-auto bg-black select-none'>
                    <img src={item.url} className='w-full' alt={item.name} />
                  </div>
                  <div className='ml-3 flex flex-col grow justify-center items-start my-auto'>
                    <div>{item.name}</div>
                    <div className='text-sm'>{item.price} $</div>
                  </div>
                  <div className='flex flex-col justify-center items-center my-auto mr-2'>
                    <FiPlus className="active:opacity-50 transition-all cursor-pointer" disabled={item.quantity >= 99} onClick={() => dispatch(toogleQuantity({id:item.id,type:"ADD"}))} />
                    <div className='select-none'>{item.quantity}</div>
                    <FiMinus className="active:opacity-50 transition-all cursor-pointer" onClick={() => item.quantity > 1 ? dispatch(toogleQuantity({id:item.id,type:"REMOVE"})) : dispatch(removeFromCart(item.id))} />
                  </div>
              </div>
            ))
          }
        </div>
      </div>
      
    </div>
  )
}

export default PurchaseNewOrder