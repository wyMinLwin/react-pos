import { useGetPublicOrders } from "../../../hooks/usePublicOrders"
import { publicOrderType } from "../../../types/publicOrderType";
import {FaEye} from 'react-icons/fa6'
const OrderList = () => {
    const getPublicOrders = useGetPublicOrders();
    const paymentMethods = ['COD','KBZ Pay']
  return (
    <>
        {
            getPublicOrders.data?.data && getPublicOrders.data.data.length > 0
            ? getPublicOrders.data?.data?.map((order:publicOrderType) => (
                <div className="grid grid-cols-12 bg-lightgray-hard py-2 rounded-md" key={order.id}>
                    <div className="col-span-1 text-center flex justify-center items-center pl-2">
                        <button className="click-effect-nshd"><FaEye /></button>
                    </div>
                    <div className="col-span-3 text-center">{order.customer_name}</div>
                    <div className="col-span-2 text-center">{order.customer_phone}</div>
                    <div className="col-span-2 text-center">{paymentMethods[order.payment_method-1]}</div>
                    <div className="col-span-2 text-center">{order.total_price}</div>
                    <div className="col-span-2 text-center flex justify-center items-center gap-x-4">
                        <button className="text-grapefruit-soft click-effect-nshd">Decline</button>
                        <button className="text-bluejeans-soft click-effect-nshd">Accept</button>
                    </div>
                </div>
            ))
            : <></>    
        }
    </>
  )
}

export default OrderList