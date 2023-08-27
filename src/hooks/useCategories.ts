import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../config/superbaseClient";
export const useGetCategories = () => useQuery({
    queryKey:["categories"],
    queryFn: async () => {
        return await supabase.from('categories').select('*')
    },
})

export const useAddCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["Add Category"],
        mutationFn: async (data:{categoryName:string,categoryImg:string|undefined}) => {
            await supabase
                .from('categories')
                .insert([
                    { category_name: data.categoryName, category_img: data.categoryImg},
                ])
        },

        onSuccess:() => queryClient.invalidateQueries({queryKey:['categories']})
    })
}

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:["Update Category"],
        mutationFn: async (data:{categoryName:string,categoryImg?:string,id:number}) => {
            await supabase
                .from('categories')
                .update([
                    { category_name: data.categoryName, category_img: data.categoryImg},
                ])
                .eq("id",data.id)
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey:['categories']})
    })
}

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:["Delete Category"],
        mutationFn: async (id:number) => {
            await supabase
            .from('categories')
            .delete()
            .eq('id', id)
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey:['categories']})
    })
}