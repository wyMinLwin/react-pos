import { useState } from "react"
import PurchaseHistory from "../components/PurchaseHistory"
import PurchaseNewOrder from "../components/PurchaseNewOrder"

const PurchaseView = () => {
  const [purchasePage,setPurchasePage] = useState<'newOrder'|'history'>('history');
  return (
    <div className="flex flex-col h-full">
      <div className="text-end px-4">
        <button onClick={() => {setPurchasePage(prev => prev === 'newOrder' ? 'history': 'newOrder')}} className="text-sm bg-bittersweet-soft text-lightgray-soft p-2 mt-2 rounded-md click-effect">{ purchasePage === 'history' ? 'Purchase New Order' : 'Purchase History' }</button>
      </div>

      {purchasePage === 'newOrder' && <PurchaseNewOrder />}
      {purchasePage === 'history' && <PurchaseHistory />}
    </div>
  )
}

export default PurchaseView