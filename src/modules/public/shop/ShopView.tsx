import {FcShop} from 'react-icons/fc';
import {AiOutlineShopping,AiOutlineHeart,AiFillHeart} from 'react-icons/ai';
import {HiMiniPlus} from 'react-icons/hi2'
import {VscSearch} from 'react-icons/vsc';
import { useGetItems } from '../../../hooks/useItems';
import { CartItemtype } from '../../../types/itemType';
import { useGetCategories } from '../../../hooks/useCategories';
const ShopView = () => {
  const getCategories = useGetCategories();
  const getItems = useGetItems();
  return (
    <div className='w-full h-full flex flex-col gap-2'> 
      <nav className='flex justify-between items-center px-8 py-2 bg-lightgray-soft'>
        <FcShop size={42} />
        <span className='flex items-center justify-end gap-5'>
          <div className='hidden sm:flex justify-center items-center bg-lightgray-hard rounded-3xl py-1 px-4 gap-2 border-2'>
            <input placeholder='Search...' className='focus:outline-none bg-lightgray-hard' />
            <VscSearch size={20} />
          </div>
          <AiOutlineShopping size={26} />
          <AiOutlineHeart size={26} />
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
            <div className='w-full h-fit overflow-y-scroll grid grid-cols-12 gap-1 md:gap-4 gap-y-3 py-4 px-1 sm:px-3 md:px-14 lg:px-44'>
            {
              getItems.data?.data?.map((item:CartItemtype) => (
                <div key={item.id} className='flex flex-col gap-2 col-span-6 md:col-span-4 lg:col-span-3 2xl:col-span-2 h-64 cart-item-shadow bg-lightgray-soft user-item-shadow mx-auto p-3 rounded-2xl'>
                  {/* <AiFillHeart className="ml-auto text-grapefruit-hard" size={24} /> */}
                  <div className='grid grid-cols-6'>
                    <div className='col-span-5 text-ellipsis overflow-hidden text-darkgray-soft text-sm text-important font-semibold'>| {getCategories.data?.data?.find(c => c.id === item.category_id).category_name}</div>
                    <AiOutlineHeart className="ml-auto col-span-1" size={24} />
                  </div>
                  <div className='w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 mx-auto overflow-hidden rounded-2xl flex justify-center items-center bg-grapefruit-soft/10'>
                    <img className='w-full' src={item.url} alt={item.name} />
                  </div>
                  <div className='grid grid-cols-5 gap-1'>
                    <div className='flex flex-col col-span-4'>
                      <div className='text-sm text-important'>{item.name}</div>
                      <div className='text-sm text-important font-semibold'>{item.price} $</div>
                    </div>
                    <div className='col-span-1 flex justify-center items-center'>
                      <button className='bg-grapefruit-soft w-6 h-6 md:w-8 md:h-8 rounded-full click-effect flex justify-center items-center'>
                        <HiMiniPlus className="text-lightgray-soft" size={24} />
                      </button>
                    </div>
                  </div>
                </div>
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
    </div>
  )
}

export default ShopView