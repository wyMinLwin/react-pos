import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../config/superbaseClient";
export const useGetItems = () => useQuery({
    queryKey:["items"],
    queryFn: async () => {
        return await supabase.from('items').select('*').neq('status','FALSE');
    }
})

export const useGetItemsByCategory = (categoryId:number|null) => useQuery({
    queryKey:["Items By Category"],
    queryFn: async () => {
        return await supabase.from('items').select('*').eq('category_id',categoryId);
    },
    enabled: typeof categoryId === 'number',
})

export const useAddItem = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey:["add items"],
        mutationFn: async (data:object) => {
            return await supabase.from('items').insert(data)
        },
        onSuccess: () => queryClient.invalidateQueries(["items"])
    })
}

export const useUpdateItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:['Update Items'],
        mutationFn: async (body:{data:object,id:number}) => {
            return await supabase.from('items').update([{...body.data}]).eq('id',body.id) 
        },
        onSuccess: () => queryClient.invalidateQueries(["items"])
    });
}

export const useDeleteItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:['Delete Items'],
        mutationFn: async (id:number) => {
            return await supabase.from('items').update([
                {status: 'FALSE'}
            ]).eq('id',id)
        },
        onSuccess: () => queryClient.invalidateQueries(['items'])
    })
}