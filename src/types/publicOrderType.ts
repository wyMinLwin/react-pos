export type publicOrderType = {
    id: number,
    customer_name: string,
    customer_phone: string,
    purchase_items: JSON,
    total_price: number,
    deli_price: number,
    paid_amount: number,
    payment_method: number,
    transition_id: string,
    kbz_payname: string,
    kbz_phno: string,
    order_status: number,
    created_at: Date
}