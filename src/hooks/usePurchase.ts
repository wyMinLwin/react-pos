import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { supabase } from "../config/superbaseClient";

export const useCreatePurchase = () => {
    const queryClient = useQueryClient();    
    return useMutation({
        mutationKey: ["Create Purchase"],
        mutationFn: async (data:object) => {
            return await supabase.from('purchase_records').insert(data);
        },
        onSuccess: () => queryClient.invalidateQueries(["Purchase Data"])
    })
}

export const useGetPurchaseData = () => useQuery({
    queryKey:["Purchase Data"],
    queryFn: async () => {
        return await supabase.from('purchase_records').select('*');
    } 
})