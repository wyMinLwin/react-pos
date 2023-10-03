import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "../config/superbaseClient";

export const useCreatePublicOrders = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:["Create Public Orders"],
        mutationFn: async (data:object) => {
            return await supabase.from('public_orders').insert(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["Public Orders"])
        }
    })
}