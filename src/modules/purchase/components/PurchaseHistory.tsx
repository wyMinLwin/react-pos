import { supabaseToUiTime } from "../../../helper/supaBaseToUiTime";
import { useGetPurchaseData } from "../../../hooks/usePurchase"
import { CartItemtype } from "../../../types/itemType";
import { PurchaseDataType } from "../../../types/purchaseDataType";
import {FaEye} from 'react-icons/fa';
const PurchaseHistory = () => {
  const purchaseData = useGetPurchaseData();
  return (
    <div className='w-full grow h-5/6 flex flex-col gap-y-2 py-2 px-4 '>
      {/* Table Header */}
      <div className="bg-lightgray-hard h-full rounded-md py-3 flex flex-col">
        <div className="grid grid-cols-12 px-4 pb-3">
          <div className="col-span-1 text-center"></div>
          <div className="col-span-2 text-center">Purchase ID</div>
          <div className="col-span-2 text-center">Name</div>
          <div className="col-span-2 text-center">Total Items</div>
          <div className="col-span-2 text-center">Total Price</div>
          <div className="col-span-3 text-center">Purchased At</div>
        </div>
        <div className="grow px-4 overflow-y-scroll">  
          {
            purchaseData.data?.data?.map((purchase:PurchaseDataType) => (
              <div className="grid grid-cols-12 bg-lightgray-soft py-3 rounded-md my-2" key={purchase.id}>
                <div className="col-span-1 flex justify-center items-center">
                  <FaEye size={24} />
                </div>
                <div className="col-span-2 text-center">{purchase.id}</div>
                <div className="col-span-2 text-center">{purchase.customer_name}</div>
                <div className="col-span-2 text-center">{(JSON.parse(purchase.purchase_items) as Array<CartItemtype>).length}</div>
                <div className="col-span-2 text-center">{purchase.total_price}</div>
                <div className="col-span-3 text-center">{supabaseToUiTime(purchase.created_at)}</div>
              </div>         
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default PurchaseHistory