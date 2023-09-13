import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../store"
import {FiPlus,FiMinus} from 'react-icons/fi';
import { removeFromCart, resetCart, toogleQuantity } from "../../../store/purchaseCartSlice";
import { useCallback, useMemo, useState } from "react";
import Dialog from "../../../components/Dialog";
import { useCreatePurchase } from "../../../hooks/usePurchase";
import Loading from "../../../components/Loading";
const namePattern = /^[A-Za-z\s]+$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phonePattern = /^\+?\d+$/;

type PurchaseCartProps = {
  customerInfo: {
    name:string,
    email:string,
    phone:string,
  },
  errorUserInfoSetter: (value:boolean) => void,
  setDefaultPayload: () => void,
}

const PurchaseCart = ({customerInfo,errorUserInfoSetter,setDefaultPayload}:PurchaseCartProps) => {
    const dispatch = useDispatch();
    const cartItems = useAppSelector(state => state.purchaseCart); 
    const [loading,setLoading] = useState(false);
    const [purchaseDialog,setPurchaseDialog] = useState(false);
    const [error,setError] = useState('');
    const openPurchaseDialog = useCallback(() => {
      const {name,email,phone} = customerInfo;
      if (!namePattern.test(name)) {
        setError("Please enter a valid name...");
        errorUserInfoSetter(true);
        return
      }
      if (!emailPattern.test(email)) {
        setError("Please enter a valid email...");
        errorUserInfoSetter(true);
        return
      }
      if (!phonePattern.test(phone)) {
        setError("Please enter a valid phone number...");
        errorUserInfoSetter(true);
        return
      }
      setPurchaseDialog(true);
    },[customerInfo,errorUserInfoSetter]);
    const totalPrice = useMemo(() => {
      let price = 0; 
      cartItems.forEach(item => price += item.price);
      return price;
    },[cartItems]);

    const setBackToDefault = useCallback(() => {
      setDefaultPayload();
      setPurchaseDialog(false);
      setError("");
      setLoading(false);
      dispatch(resetCart());
    },[dispatch,setDefaultPayload])

    const createPurchase = useCreatePurchase();
    const purchaseNow = async () => {
      setLoading(true);
      createPurchase.mutate({
        'customer_name':customerInfo.name,
        'customer_email':customerInfo.email,
        'customer_phone':customerInfo.phone,
        'purchase_items':JSON.stringify(cartItems),
        'total_price':totalPrice,
      },
      {
        onSuccess: () => setBackToDefault(),
        onError: () => {setPurchaseDialog(false);setError("Error while purchasing...");setLoading(false)}
      });
    }
  return (
    <div className='grow overflow-y-scroll px-4 relative'>
        <div className='flex flex-row justify-between items-center py-1'>
          <div className='text-important'>Purchase Cart</div>
          <button onClick={() => openPurchaseDialog()} className='text-lightgray-soft bg-bluejeans-soft px-2 py-0.5 rounded-md click-effect'>Purchase Now</button>
        </div>
        {cartItems.length < 1 && <div className='text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-important text-darkgray-soft'>No items have been added yet.</div>}
        <div className='grid grid-cols-12 gap-4 py-1'>        
          {
            cartItems.length > 0 && cartItems.map(item => (
              <div className={`col-span-4 xl:col-span-3 p-1 flex flex-row justify-start items-start transition-all h-fit rounded-md cart-item-shadow`}   key={item.id}>
                  <div className='w-12 h-12 flex justify-center items-center my-auto bg-black select-none'>
                    <img src={item.url} className='w-full' alt={item.name} />
                  </div>
                  <div className='ml-3 flex flex-col grow justify-center items-start my-auto'>
                    <div>{item.name}</div>
                    <div className='text-sm'>{item.price} $</div>
                  </div>
                  <div className='flex flex-col justify-center items-center my-auto mr-2'>
                    <FiPlus className="active:opacity-50 transition-all cursor-pointer" disabled={item.quantity >= 99} onClick={() => dispatch(toogleQuantity({id:item.id,type:"ADD"}))} />
                    <div className='select-none'>{item.quantity}</div>
                    <FiMinus className="active:opacity-50 transition-all cursor-pointer" onClick={() => item.quantity > 1 ? dispatch(toogleQuantity({id:item.id,type:"REMOVE"})) : dispatch(removeFromCart(item.id))} />
                  </div>
              </div>
            ))
          }
        </div>
        <Dialog dialogModel={purchaseDialog} closeDialog={() => setPurchaseDialog(false)} >
            <div className="max-w-1/2 p-4 rounded-md font-thin bg-lightgray-soft flex flex-col justify-start items-center gap-3">
              <div className="text-lg font-normal text-important">Are you sure you want to purchase this items?</div>
            
              <div className="w-9/12">
                <div className="grid grid-cols-9 gap-3">
                    <div className="text-end col-span-4">Name</div><div className="col-span-1 text-center">:</div><div className="col-span-4 texts-start text-base font-normal">{customerInfo.name}</div>
                  </div>
                  <div className="grid grid-cols-9 gap-3">
                    <div className="text-end col-span-4">Email</div><div className="col-span-1 text-center">:</div><div className="col-span-4 texts-start text-base font-normal">{customerInfo.email}</div>
                  </div>
                  <div className="grid grid-cols-9 gap-3">
                    <div className="text-end col-span-4">Phone</div><div className="col-span-1 text-center">:</div><div className="col-span-4 texts-start text-base font-normal">{customerInfo.phone}</div>
                  </div>
              </div>
            
              <div className="grow  w-9/12 overflow-scroll max-h-72 ">
                {
                  cartItems.map(item => (
                    <div className="grid grid-cols-12 gap-3 border-b-2 mb-2 pb-2" key={item.id}>
                      <span className="col-span-9 text-start">{item.name}{item.name}{item.name} x {item.quantity}</span>
                      <span className="col-span-3 text-start text-base font-normal"> : {item.price*item.quantity} $</span>
                    </div>
                  ))
                }
              </div>

              <div className="w-9/12 grid grid-cols-12 gap-3">
                <span className="col-span-9 text-important font-normal">Total Price</span>
                <span className="col-span-3 text-base font-normal text-start"> : {totalPrice} $</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setPurchaseDialog(false)} className='text-lightgray-soft font-normal bg-grapefruit-soft px-2 py-0.5 rounded-md click-effect'>Cancel</button>
                <button onClick={() => purchaseNow()} className='text-lightgray-soft font-normal bg-bluejeans-soft px-2 py-0.5 rounded-md click-effect'>Purchase</button>   
              </div>
            </div>
        </Dialog>
        <Dialog dialogModel={!!error} closeDialog={() => setError("")}>
          <div className="max-w-1/3 text-center p-8 rounded-md text-grapefruit-soft bg-lightgray-soft"> 
            {error}
          </div>
        </Dialog>
        <Loading loadingModel={loading} />
    </div>
  )
}

export default PurchaseCart