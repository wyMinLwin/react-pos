import { useMutation } from "@tanstack/react-query";
import { supabase } from "../config/superbaseClient";
import { v4 as uuidv4 } from 'uuid';

export const useUploadImage = () => useMutation({
    mutationKey:['imageUpload'],
    mutationFn: async (uploadData:{file:File,databaseName:string}) => {
        const res = await supabase.storage.from(uploadData.databaseName).upload(`category_image_${uuidv4()}`,uploadData.file)
        if (res.data?.path) {
            const response = await supabase.storage.from(uploadData.databaseName).getPublicUrl(res.data?.path);
            return (response.data.publicUrl)
        }
    },
    
})
