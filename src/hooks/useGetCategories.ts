import { useQuery } from "@tanstack/react-query";
import { supabase } from "../config/superbaseClient";

export const useGetCategories = () => useQuery({
    queryKey:["categories"],
    queryFn: async () => {
        return await supabase.from('categories').select('*')
    },
})