import { useCallback, useState } from 'react'
import OutlineInput from '../../../components/OutlineInput'
import { useGetCategories } from '../../../hooks/useCategories';
import { CategoryType } from '../../../types/categoryType';
import { ItemType } from '../../../types/itemType';
import { supabase } from '../../../config/superbaseClient';
import {IoMdAdd} from 'react-icons/io'
import './app.css';

const PurchaseNewOrder = () => {
  const [customerName,setCustomerName] = useState('');
  const [customterEmail,setCustomerEmail] = useState('');
  const [customerPhone,setCustomerPhone] = useState('');
  const [currentCategory,setCurrentCategory] = useState<number|null>(null);
  const [items,setItems] = useState<Array<ItemType>>([]);
  const getCategories = useGetCategories();
  const [itemLoading,setItemLoading] = useState(false);

  const selectItemsByCategory = useCallback( async (id:number) => {
    setItemLoading(true);
    const response = await supabase.from('items').select('*').eq('category_id',id);
    if (response.data) {
      setItems(response.data)
    }
    setItemLoading(false);
  },[]);

  const handleSelect = async (id:number) => {
    setItems([]);
    setCurrentCategory(id);
    await selectItemsByCategory(id);
  }

  return (
    <div className='w-full h-full pt-2'>
      <div className='h-1/3 grid grid-cols-3 gap-x-4 px-4'>
        <div className=' flex flex-col justify-start px-4 py-2 purchase-box-shadow'>
          <div className='text-lg text-important'>Customer's Information</div>
          <OutlineInput value={customerName} onChange={(e) => setCustomerName(e)} placeholder='Enter Customer Name...' />
          <OutlineInput value={customterEmail} onChange={(e) => setCustomerEmail(e)} placeholder='Enter Customer Email...' />
          <OutlineInput value={customerPhone} onChange={(e) => setCustomerPhone(e)} placeholder='Enter Customer Phone...' />
        </div>
        <div className='flex flex-col justify-start h-full overflow-y-scroll gap-2 cursor-pointer px-4 py-2 purchase-box-shadow'>
          {
            getCategories.data?.data && getCategories.data?.data.map((category:CategoryType) => (
              <div onClick={() => handleSelect(category.id)} className={`flex flex-row justify-start items-start transition-all h-fit rounded-sm ${category.id === currentCategory && 'border-darkgray-hard'}`}  style={{'borderWidth':'1px'}} key={category.id}>
                <div className='w-12 h-12 flex justify-center items-center bg-black m-1'>
                  <img src={category.category_img} className='w-full' alt={category.category_name} />
                </div>
                <div className='ml-3'>{category.category_name}</div>
              </div>
            ))
          }
        </div>
        <div className='flex flex-col justify-start h-full overflow-y-scroll gap-2 cursor-pointer px-4 py-2 purchase-box-shadow'>
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
              <div onClick={() => {}} className={`flex flex-row justify-start items-start transition-all h-fit rounded-sm`}  style={{'borderWidth':'1px'}} key={item.id}>
                <div className='w-12 h-12 flex justify-center items-center bg-black p-0 m-1'>
                  <img src={item.url} className='w-full' alt={item.name} />
                </div>
                <div className='ml-3 flex flex-col grow justify-between items-start'>
                  <div>{item.name}</div>
                  <div className='text-sm'>{item.price} $</div>
                </div>
                <div className='my-auto mr-3'>
                  <IoMdAdd />
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