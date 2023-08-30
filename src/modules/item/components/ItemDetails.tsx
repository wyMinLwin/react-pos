import Dialog from "../../../components/Dialog"
import { useClickOutside } from "../../../hooks/useClickOutside";
import { ItemType } from "../../../types/itemType"
import {IoClose} from "react-icons/io5"
type ItemDetailsProps = {
    dialog:boolean,
    closeFn:() => void,
    item: ItemType,
}
const ItemDetails = ({dialog,closeFn,item}:ItemDetailsProps) => {
    const ref = useClickOutside(() => closeFn());
  return (
    <Dialog dialogModel={dialog} closeDialog={() => closeFn()} >
        <div ref={ref} className="relative bg-white rounded-md overflow-hidden grid grid-cols-12" style={{'width':'50vw','height':'50vh'}}>
            <div className="col-span-4 bg-bluejeans-soft"></div>
            <div className="col-span-8 bg-lightgray-soft grid grid-cols-3">
                <div className="col-span-1"></div>
                <div className="col-span-2 p-3 h-full text-end">
                    <div className="text-xl">{item.name}</div>
                    <div className="font-semibold ">{item.price} $</div>
                    <div className="font-semibold text-darkgray-hard">{item.code}</div>
                    <div className="w-full h-60 overflow-y-scroll">{item.desc}</div>
                </div>
            </div>
            <div className="w-44 h-44 rounded-md overflow-hidden bg-black absolute left-1/4 -translate-x-1/4 top-1/2 -translate-y-1/2 flex justify-center items-center">
                <img src={item.url} className="w-full" />
            </div>
            <button onClick={() => closeFn()} className="absolute top-1 left-1 text-grapefruit-hard" role="dialog">
                <IoClose size={40} />
            </button>
        </div>
    </Dialog>
  )
}

export default ItemDetails