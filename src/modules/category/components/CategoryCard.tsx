import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { CategoryType } from '../../../types/categoryType'
import {BiDotsVerticalRounded} from "react-icons/bi";
import Dialog from '../../../components/Dialog';
import {LazyLoadImage } from 'react-lazy-load-image-component'
import Loading from '../../../components/Loading';
import { FaArrowsRotate } from 'react-icons/fa6';
import { useUploadImage } from '../../../hooks/useUploadImage';
import {useDeleteCategory, useUpdateCategory} from '../../../hooks/useCategories';
const namePattern = /^[a-zA-Z0-9\s]+$/

type CategoryCardProps = {
    category: CategoryType
}
const CategoryCard = ({category}:CategoryCardProps) => {
    const [toolButtons,setToolButtons] = useState(false);
    const ref = useClickOutside(() => setToolButtons(false));
    const [editDialog,setEditDialog] = useState(false);
    const [loading,setLoading] = useState(false);
    const [imageFile,setImageFile] = useState<File|null>(null);
    const [categoryName,setCategoryName] = useState(category.category_name);
    const [imagePath,setImagePath] = useState(category.category_img);
    const [nameError,setNameError] = useState("");
    const [imageError,setImageError] = useState("");
    const  fileUploadRef = useRef<HTMLInputElement>(null);
    const [deleteDialog,setDeleteDialog] = useState(false);
  

    const handleImageSelect = (e:ChangeEvent<HTMLInputElement>) => {
        setImageFile(e.target.files?.[0] as File);
        setImagePath(URL.createObjectURL(e.target.files?.[0] as File))
    }

    const resetError = () => {
        setImageError("");
        setNameError("");
    }

    const openFileUpload = useCallback(() => {
        resetError();
        fileUploadRef.current?.click();
    },[]);

    const setBackToDefault = useCallback(() => {
        setCategoryName("");
        setImageFile(null);
        setEditDialog(false);
        setLoading(false);
        setImagePath("");
      },[])

    const uploadImage = useUploadImage();
    const updateCategory = useUpdateCategory();
    const deleteCategory = useDeleteCategory();

    const deleteCategoryHandel = () => {
        setLoading(true);
        deleteCategory.mutateAsync(category.id,{
            onSuccess: () => setLoading(false),
            onError: () => setLoading(false),
        });

    }
    const uploadCategory = async () => {
        resetError();
        !namePattern.test(categoryName) && setNameError("Name can't be empty and Only allowed characters and numbers");
        if (imageFile !== null && categoryName) {
            setLoading(true);
            uploadImage.mutateAsync({file:imageFile,databaseName:"categories"},{
            onSuccess: (data) => {
                updateCategory.mutate({categoryImg:data,categoryName:categoryName,id:category.id},
                {
                    onSuccess: () => setBackToDefault(),
                    onError: () => setLoading(false),
                }  
                )
            },
            onError: () => {
                setImageError("Error while uploading please try again");
                setLoading(false);
            }
            })
        }
        if (categoryName) {
            setLoading(true);
            updateCategory.mutate({categoryName:categoryName,id:category.id},
                {
                    onSuccess:() => setBackToDefault(),
                    onError: () =>  setLoading(false)
                }  
            )
        }
        
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
        <Dialog dialogModel={editDialog} closeDialog={() => setEditDialog(false)} >
            <div className="p-6 bg-lightgray-hard rounded-md flex flex-col justify-center items-center gap-4 w-80">
                <div className="text-lg">Edit Category</div>
                <div className="w-40 h-40 bg-lightgray-soft rounded-full flex flex-col justify-center items-center gap-3 overflow-hidden">
                    {
                        imagePath && <img className="w-full" src={imagePath} alt="chosen image" />
                    }
                    <input 
                    accept="image/jpeg,image/png" ref={fileUploadRef} type="file" className="hidden"
                    onChange={(e) => handleImageSelect(e)} 
                    />
                </div>
                <div onClick={() => openFileUpload()} className="flex flex-row justify-center items-center text-darkgray-soft text-sm gap-x-1 cursor-pointer">
                    <div>Change image</div>
                    <FaArrowsRotate  />
                </div>
                {
                    imageError && <div className=" text-grapefruit-hard font-thin text-sm">{imageError}</div>
                }
                <input className="bg-lightgray-soft px-4 py-2 rounded-md focus:outline-none" type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Enter category name..." />
                {nameError && <div className="w-40 text-grapefruit-hard font-thin text-sm">{nameError}</div>}
                <button onClick={() => {uploadCategory()}} className="px-4 py-2 text-lightgray-soft bg-bluejeans-soft rounded-md">Save</button>
            </div>
        </Dialog>
        <Dialog dialogModel={deleteDialog} closeDialog={() => setDeleteDialog(false)}>
            <div className='flex flex-col justify-center items-center bg-lightgray-soft px-6 py-3 rounded-md gap-5'>
                <div>Are you sure you want to delete this category?</div>
                <div className='flex gap-5 justify-center items-center'>
                    <button onClick={() => setDeleteDialog(false)} className='bg-darkgray-soft text-lightgray-soft px-2 rounded-md click-effect'>Cancel</button>
                    <button onClick={() => deleteCategoryHandel()} className='bg-grapefruit-soft text-lightgray-soft px-2 rounded-md click-effect'>Delete</button>
                </div>
            </div>
        </Dialog>
        <Loading loadingModel={loading} />
    </>
  )
}

export default CategoryCard