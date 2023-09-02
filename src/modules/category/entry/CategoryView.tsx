import { useState } from "react";
import { useGetCategories } from "../../../hooks/useCategories"
import { CategoryType } from "../../../types/categoryType";
import CategoryCard from "../components/CategoryCard";
import CategoryAddEdit from "../components/CategoryAddEdit";
const CategoryView = () => {
  const categories = useGetCategories();
  const [addDialog,setAddDialog] = useState(false);
  
  return (
    <>
      <div className="text-end px-4">
        <button onClick={() => {setAddDialog(true)}} className="text-sm bg-bittersweet-soft text-lightgray-soft p-2 mt-2 rounded-md click-effect">Add New Category</button>
      </div>
      <div className="w-full grid grid-cols-12 gap-5 p-4 text-darkgray-hard">
        {
          categories.data?.data && categories.data?.data.length > 0
          ?categories?.data?.data?.map((category:CategoryType) => (
            <CategoryCard category={category} key={category.id} />
          ))
          : <div className="text-2xl col-span-12 text-darkgray-soft absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">There is no categories at moment...</div>
        }     
      </div>
      <CategoryAddEdit dialog={addDialog} closeDialog={() => setAddDialog(false)} isEdit={false} />
    </>
  )
}

export default CategoryView