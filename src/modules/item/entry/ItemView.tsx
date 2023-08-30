import { useGetItems } from "../../../hooks/useItems"
import ItemCard from "../components/ItemCard"
import { ItemType } from "../../../types/itemType"
import ItemAddEdit from "../components/ItemAddEdit";
import { useState } from "react";

const ItemView = () => {
    const getItems = useGetItems();
    const [addDialog,setAddDialog] = useState(false);
  return (
    <>
        <div className="text-end px-4">
            <button onClick={() => setAddDialog(true)} className="text-sm bg-bittersweet-soft text-lightgray-soft p-2 mt-2 rounded-md click-effect">Add New Item</button>
        </div>
        <div className="w-full grid grid-cols-12 p-4 text-darkgray-hard gap-5">
            {
                getItems[0].data?.data?.map((item:ItemType) => (
                    <ItemCard item={item} key={item.id} />
                ))
            }
        </div>
        <ItemAddEdit isEdit={false} dialog={addDialog} closeDialog={() => setAddDialog(false)} categories={getItems[1].data?.data || []} />
    </>
  )
}
export default ItemView                  