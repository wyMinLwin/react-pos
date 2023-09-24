import {FcShop} from 'react-icons/fc';
import {AiOutlineShopping,AiOutlineHeart,AiFillHeart} from 'react-icons/ai';
import {HiMiniPlus} from 'react-icons/hi2'
import {VscSearch} from 'react-icons/vsc';
const ShopView = () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];

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
        <div className='grow overflow-y-scroll grid grid-cols-12 gap-4 pt-4 px-3 md:px-7 lg:px-28'>
          {
            arr.map(item => (
              <div key={item} className='flex flex-col gap-2 col-span-6 md:col-span-4 lg:col-span-3 2xl:col-span-2 h-64 cart-item-shadow bg-lightgray-soft user-item-shadow mx-auto p-3 rounded-2xl'>
                <AiFillHeart className="ml-auto text-grapefruit-hard" size={24} />
                <div className='w-36 h-36 md:w-44 md:h-44 mx-auto overflow-hidden rounded-2xl bg-red-200'></div>
                <div className='grid grid-cols-5'>
                  <div className='flex flex-col col-span-4'>
                    <div className='text-sm text-important'>Name</div>
                    <div className='text-sm text-important font-semibold'>1234 $</div>
                  </div>
                  <div className='col-span-1 flex justify-center items-center'>
                    <button className='bg-grapefruit-soft w-8 h-8 rounded-full click-effect flex justify-center items-center'>
                      <HiMiniPlus className="text-lightgray-soft" size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ShopView