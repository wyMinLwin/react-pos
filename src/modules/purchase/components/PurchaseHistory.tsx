import { useState } from "react";
import { supabaseToUiTime } from "../../../helper/supaBaseToUiTime";
import { useGetPurchaseData } from "../../../hooks/usePurchase"
import { CartItemtype } from "../../../types/itemType";
import { PurchaseDataType } from "../../../types/purchaseDataType";
import {FaEye} from 'react-icons/fa';
import Dialog from "../../../components/Dialog";
import { useClickOutside } from "../../../hooks/useClickOutside";
const PurchaseHistory = () => {
  const purchaseData = useGetPurchaseData();
  const [viewDetailDialog,setViewDetailDialog] = useState(false);
  const [detailData,setDetailData] = useState<PurchaseDataType|null>(null);
  const ref = useClickOutside(() => setViewDetailDialog(false));
  const selectDetail = (detail:PurchaseDataType) => {
    setDetailData(detail);  
    setViewDetailDialog(true);
  }
  
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
                  <FaEye size={24} onClick={() => selectDetail(purchase)}/>
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
      {detailData != null && <Dialog dialogModel={viewDetailDialog} closeDialog={() => setViewDetailDialog(false)} >
          <div className="w-screen h-screen flex flex-col justify-center items-center">
            <div ref={ref} className="flex flex-col justify-start items-center lg:w-4/6 2xl:w-5/12 max-h-1/2 p-4 overflow-y-scroll bg-lightgray-soft rounded-md">
              <div className="flex flex-row w-full justify-between items-center pb-4">
                <div className="text-2xl text-important my-auto">Purchase ID #{detailData?.id}</div>
                <div className="my-auto text-lg text-end">{detailData?.created_at}</div>
              </div>
              <div className="flex flex-row w-full justify-between text-lg items-center">
                <div>{detailData?.customer_name}</div>
                <div>{detailData?.customer_email}</div>
                <div>{detailData?.customer_phone}</div>
              </div>
              <div className="grow bg-lightgray-hard p-4 rounded-md w-full grid grid-cols-2">
                {
                  (JSON.parse(detailData?.purchase_items) as Array<CartItemtype>).map(item => (
                    <div className="grid grid-cols-6 h-20 gap-2 my-2" key={item.id}>
                      <div className="col-span-5 bg-lightgray-soft rounded-md grid grid-cols-6 px-4 gap-2">
                        <div className='w-14 h-14 flex justify-center items-center my-auto bg-black select-none col-span-2'>
                          <img src={item.url} className='w-full' alt={item.name} />
                        </div>
                        <div className='col-span-4 flex flex-col grow justify-center items-start my-auto'>
                          <div>{item.name}</div>
                          <div className='text-sm'>{item.price} $</div>
                        </div>
                      </div>
                      <div className="col-span-1 text-3xl text-darkgray-soft my-auto">X {item.quantity}</div>
                    </div>
                  ))
                }
              </div>
              <div className="w-full text-end text-lg">{detailData?.total_price} $</div>
            </div>
          </div>
      </Dialog>}
    </div>
  )
}

export default PurchaseHistory