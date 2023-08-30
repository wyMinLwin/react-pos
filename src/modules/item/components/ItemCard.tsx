import {BiDotsHorizontalRounded} from "react-icons/bi"
import { ItemType } from "../../../types/itemType"
import ItemDetails from "./ItemDetails"
import { useState } from "react"
type ItemCardProps = {
    item: ItemType
}
const ItemCard = ({item}:ItemCardProps) => {
    const [viewDetailsDialog,setViewDetailsDialog] = useState(false);
  return (
    <>
        <div className="col-span-4 xl:col-span-3 2xl:col-span-2 bg-lightgray-soft h-fit card-shadow rounded-md relative overflow-hidden">
            <div className="w-full h-48 bg-black flex justify-center items-center overflow-hidden mx-auto">
                <img className='w-full' src={item.url} alt="some alter"/>
            </div>
            <div className="my-2 px-3 font-semibold">
                <div className="w-full text-ellipsis overflow-hidden whitespace-nowrap">{item.name}</div>
                <div className="text-darkgray-soft/90">{item.price} $</div>
            </div>     
            <div className="px-3 grid grid-cols-12 gap-x-2 mb-2 text-bluejeans-soft">
                <button onClick={() => setViewDetailsDialog(true)} className="click-effect col-span-9 py-0.5 rounded-md" style={{border: '1.3px solid #5D9CEC'}} role="dialog">View Details</button>
                <button className="click-effect col-span-3 py-0.5 rounded-md" role="dialog" style={{border: '1.3px solid #5D9CEC'}} >
                    <BiDotsHorizontalRounded className='text-center mx-auto' size={24} />
                </button>
            </div>           
        </div>
        <ItemDetails dialog={viewDetailsDialog} closeFn={() => setViewDetailsDialog(false)} item={item} />
    </>
  )
}

export default ItemCard