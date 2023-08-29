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
          categories?.data?.data?.map((category:CategoryType) => (
            <CategoryCard category={category} key={category.id} />
          ))
        }     
      </div>
      <CategoryAddEdit dialog={addDialog} closeDialog={() => setAddDialog(false)} isEdit={false} />
    </>
  )
}

export default CategoryView