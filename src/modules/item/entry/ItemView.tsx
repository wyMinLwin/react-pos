import {BiDotsHorizontalRounded} from "react-icons/bi"
const ItemView = () => {
  return (
    <>
        <div className="text-end px-4">
            <button className="text-sm bg-bittersweet-soft text-lightgray-soft p-2 mt-2 rounded-md click-effect">Add New Item</button>
        </div>
        <div className="w-full grid grid-cols-12 p-4 text-darkgray-hard">
            <div className="col-span-4 xl:col-span-3 2xl:col-span-2 bg-lightgray-soft h-fit card-shadow rounded-md relative overflow-hidden">
                <div className="w-full h-40 bg-black flex justify-center items-start overflow-hidden mx-auto">
                    <img className='w-full h-full' src="https://m.media-amazon.com/images/I/71vFKBpKakL._AC_SL1500_.jpg" alt="some alter"/>
                </div>
                <div className="my-2 px-3 font-semibold">
                    <div className="w-full text-ellipsis overflow-hidden whitespace-nowrap">A very very very very very very very very very long string</div>
                    <div className="text-darkgray-soft/70">120 $</div>
                </div>     
                <div className="px-3 grid grid-cols-12 gap-x-2 mb-2 text-bluejeans-soft">
                    <button className="col-span-9 py-0.5 rounded-md" style={{border: '1.3px solid #5D9CEC'}} role="dialog">View Details</button>
                    <button className="col-span-3 py-0.5 rounded-md" role="dialog" style={{border: '1.3px solid #5D9CEC'}} >
                        <BiDotsHorizontalRounded className='text-center mx-auto' size={24} />
                    </button>
                </div>           
            </div>
            {/* <div className="col-span-4 xl:col-span-3 2xl:col-span-2 d-flex flex-col justify-center items-center bg-lightgray-soft h-fit card-shadow rounded-md relative overflow-hidden">
                <div className="w-full h-44 bg-black flex justify-center items-start overflow-hidden mx-auto">
                    <img className='w-full' src="https://www.kamalwatch.com/cdn/shop/products/MP000000015772689_658Wx734H_202212202012422_1.jpg?v=1685410099&width=658" alt="some alter"/>
                </div>
                <div className="my-2 px-3 font-semibold">
                    <div className="w-full text-ellipsis overflow-hidden whitespace-nowrap">A very very very very very very very very very long string</div>
                    <div className="text-darkgray-soft/70">120 $</div>
                </div>     
                <div className="px-3 grid grid-cols-12 gap-x-2 mb-2 text-bluejeans-soft">
                    <button className="col-span-9 py-0.5 rounded-md" style={{border: '1.3px solid #5D9CEC'}} role="dialog">View Details</button>
                    <button className="col-span-3 py-0.5 rounded-md" role="dialog" style={{border: '1.3px solid #5D9CEC'}} >
                        <BiDotsHorizontalRounded className='text-center mx-auto' size={24} />
                    </button>
                </div>           
            </div> */}
        </div>
    </>
  )
}
export default ItemView