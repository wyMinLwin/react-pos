import { useGetCategories } from "../../../hooks/useGetCategories"
import { CategoryType } from "../../../types/categoryType";

const CategoryView = () => {
  const categories = useGetCategories();
  return (
    <div className="w-full grid grid-cols-12 gap-x-5 gap-5 p-4 text-darkgray-hard">
      {
        categories?.data?.data?.map((category:CategoryType) => (
          <div key={category.id} className="col-span-3 d-flex flex-col justify-center items-center py-4 bg-lightgray-soft h-fit card-shadow rounded-md">
            <div className="w-56 h-56 bg-black flex justify-center items-center overflow-hidden mx-auto">
              <img src={category.category_img} alt={category.category_name} />
            </div>
            <p className="text-center mt-2 text-ellipsis overflow-hidden whitespace-nowrap px-4">{category.category_name}</p>
          </div>
        ))
      }     
    </div>
  )
}

export default CategoryView