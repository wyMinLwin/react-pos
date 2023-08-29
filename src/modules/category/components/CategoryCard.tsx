import { useState } from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { CategoryType } from '../../../types/categoryType'
import {BiDotsVerticalRounded} from "react-icons/bi";
import Dialog from '../../../components/Dialog';
import {LazyLoadImage } from 'react-lazy-load-image-component'
import Loading from '../../../components/Loading';
import {useDeleteCategory} from '../../../hooks/useCategories';
import CategoryAddEdit from './CategoryAddEdit';

type CategoryCardProps = {
    category: CategoryType
}

const CategoryCard = ({category}:CategoryCardProps) => {

    const [toolButtons,setToolButtons] = useState(false);
    const ref = useClickOutside(() => setToolButtons(false));
    const [editDialog,setEditDialog] = useState(false);
    const [deleteDialog,setDeleteDialog] = useState(false);
    const [loading,setLoading] = useState(false);

    const deleteCategory = useDeleteCategory();

    const deleteCategoryHandle = () => {
        setLoading(true);
        deleteCategory.mutateAsync(category.id,{
            onSuccess: () => setLoading(false),
            onError: () => setLoading(false),
        });

    }
  return (
    <>
        <div key={category.id} className="col-span-4 xl:col-span-3 2xl:col-span-2 d-flex flex-col justify-center items-center py-4 bg-lightgray-soft h-fit card-shadow rounded-md relative">
            <div className="w-56 h-56 bg-black flex justify-center items-center overflow-hidden mx-auto">
                <LazyLoadImage effect="opacity" className='w-full' src={category.category_img} alt={category.category_name}/>
            </div>
            <p className="text-center mt-2 text-ellipsis overflow-hidden whitespace-nowrap px-4">{category.category_name}</p>
            <button className="absolute right-1 bottom-2" onClick={() => setToolButtons(true)}>
                <BiDotsVerticalRounded size={24} />
            </button>
            {
                toolButtons &&
                <div ref={ref} className="absolute z-10 bg-lightgray-hard bottom-2 right-2 px-4 py-2 rounded-md  flex flex-col justify-center items-center">
                    <button onClick={() => setEditDialog(true)}>Edit</button>
                    <button onClick={() => setDeleteDialog(true)}>Delete</button>
                </div>
            }
        </div>
        <CategoryAddEdit category={category} dialog={editDialog} closeDialog={() => setEditDialog(false)} isEdit={true} />
        <Dialog dialogModel={deleteDialog} closeDialog={() => setDeleteDialog(false)}>
            <div className='flex flex-col justify-center items-center bg-lightgray-soft px-6 py-3 rounded-md gap-5'>
                <div>Are you sure you want to delete this category?</div>
                <div className='flex gap-5 justify-center items-center'>
                    <button onClick={() => setDeleteDialog(false)} className='bg-darkgray-soft text-lightgray-soft px-2 rounded-md click-effect'>Cancel</button>
                    <button onClick={() => deleteCategoryHandle()} className='bg-grapefruit-soft text-lightgray-soft px-2 rounded-md click-effect'>Delete</button>
                </div>
            </div>
        </Dialog>
        <Loading loadingModel={loading} />
    </>
  )
}

export default CategoryCard