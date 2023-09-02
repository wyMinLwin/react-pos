import {BiDotsHorizontalRounded} from "react-icons/bi"
import { ItemType } from "../../../types/itemType"
import ItemDetails from "./ItemDetails"
import { useCallback, useState } from "react"
import { useClickOutside } from "../../../hooks/useClickOutside"
import ItemAddEdit from "./ItemAddEdit"
import DeleteDialog from "../../../components/DeleteDialog"
import { useDeleteItem } from "../../../hooks/useItems"
import Loading from "../../../components/Loading"
type ItemCardProps = {
    item: ItemType
}
const ItemCard = ({item}:ItemCardProps) => {
    const [viewDetailsDialog,setViewDetailsDialog] = useState(false);
    const [toolButtons,setToolButtons] = useState(false);
    const [editDialog,setEditDialog] = useState(false);
    const [deleteDialog,setDeleteDialog] = useState(false);
    const [loading,setLoading] = useState(false);
    const ref = useClickOutside(() => setToolButtons(false));
    const deleteItem = useDeleteItem();

    const deleteItemHandler = useCallback(() => {
        setLoading(true);
        deleteItem.mutateAsync(item.id,{
            onSuccess: () => setLoading(false),
            onError: () => setLoading(false),
        });
    },[item,deleteItem])
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
                <button onClick={() => setToolButtons(true)} className="click-effect col-span-3 py-0.5 rounded-md" role="dialog" style={{border: '1.3px solid #5D9CEC'}} >
                    <BiDotsHorizontalRounded className='text-center mx-auto' size={24} />
                </button>
            </div>       
            {
                toolButtons &&
                <div ref={ref} className="absolute z-10 bg-lightgray-hard bottom-2 right-2 px-4 py-2 rounded-md  flex flex-col justify-center items-center">
                    <button onClick={() => setEditDialog(true)}>Edit</button>
                    <button onClick={() => setDeleteDialog(true)}>Delete</button>
                </div>
            }    
        </div>
        <ItemDetails dialog={viewDetailsDialog} closeFn={() => setViewDetailsDialog(false)} item={item} />
        <ItemAddEdit dialog={editDialog} closeDialog={() => setEditDialog(false)} item={item} isEdit={true} />
        <DeleteDialog dialog={deleteDialog} closeFn={() => setDeleteDialog(false)} deleteFn={() => deleteItemHandler()} >
            <div className='text-lg'>Are you sure you want to delete this item?</div>
        </DeleteDialog>
        <Loading loadingModel={loading} />
    </>
  )
}

export default ItemCard