import OrderList from "../components/OrderList"

const OrdersView = () => {
    
  return (
    <div className="h-full w-full pt-3 md:px-4 lg:px-20 flex flex-col">
        <div className="grid grid-cols-12 py-2 bg-lightgray-hard rounded-md mb-2">
            <div className="col-span-1 text-center"></div>
            <div className="col-span-3 text-center">Customer Name</div>
            <div className="col-span-2 text-center">Customer Phone</div>
            <div className="col-span-2 text-center">Payment Method</div>
            <div className="col-span-2 text-center">Total Amount</div>
            <div className="col-span-2 text-center"></div>
        </div>
        <div className="grow flex flex-col gap-3">
            <OrderList />
        </div>
    </div>
  )
}

export default OrdersView