import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../config/superbaseClient";
export const useGetItems = () => useQueries({
    queries:[
        {
            queryKey:["items"],
            queryFn: async () => {
                return await supabase.from('items').select('*').neq('status','FALSE');
            }
        },
        {
            queryKey:["categoriesSelect"],
            queryFn: async () => {
                return await supabase.from('categories').select('id,category_name').neq('status','FALSE')
            },
        }
    ]
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