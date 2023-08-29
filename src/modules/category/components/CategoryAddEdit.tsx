import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import Dialog from '../../../components/Dialog'
import { CategoryType } from '../../../types/categoryType'
import { useUploadImage } from '../../../hooks/useUploadImage'
import { useAddCategory, useUpdateCategory } from '../../../hooks/useCategories'
import { BsUpload } from 'react-icons/bs'
import { FaArrowsRotate } from 'react-icons/fa6'
import Loading from '../../../components/Loading'
const namePattern = /^[a-zA-Z0-9\s]+$/

type CategoryAddEditTypes = {
    isEdit: boolean,
    category?: CategoryType,
    dialog: boolean,
    closeDialog: () => void
}
const CategoryAddEdit = ({category,isEdit,dialog,closeDialog}:CategoryAddEditTypes) => {

    const [loading,setLoading] = useState(false);
    const [imageFile,setImageFile] = useState<File|null>(null);
    const [categoryName,setCategoryName] = useState(category?.category_name ?? '');
    const [imagePath,setImagePath] = useState(category?.category_img ?? '');
    const [nameError,setNameError] = useState("");
    const [imageError,setImageError] = useState("");
    const  fileUploadRef = useRef<HTMLInputElement>(null);

    const resetError = () => {
        setImageError("");
        setNameError("");
    }

    const openFileUpload = useCallback(() => {
        resetError();
        fileUploadRef.current?.click();
    },[]);

    const handleImageSelect = (e:ChangeEvent<HTMLInputElement>) => {
        setImageFile(e.target.files?.[0] as File);
        setImagePath(URL.createObjectURL(e.target.files?.[0] as File))
    }

    const closeTask = useCallback(() => {
        setLoading(false);
        closeDialog();
    },[closeDialog]);

    const setBackToDefault = useCallback(() => {
        setCategoryName("");
        setImageFile(null);
        setImagePath("");
        closeTask();
    },[closeTask]);

    const uploadImage = useUploadImage();
    const updateCategory = useUpdateCategory();
    const addCategory = useAddCategory();
    
    const uploadCategory = async () => {
        resetError();
        !namePattern.test(categoryName) ? setNameError("Name can't be empty and Only allowed characters and numbers") : setNameError('');
        !isEdit &&  imageFile === null ? setImageError("Please choose an image") : setImageError('');
        if ( !namePattern.test(categoryName) ) return;
        
        if (imageFile !== null && categoryName) {
            setLoading(true);
            uploadImage.mutateAsync({file:imageFile,databaseName:"categories"},{
              onSuccess: (data) => {
                if ( !isEdit ) {
                    addCategory.mutateAsync({categoryImg:data,categoryName:categoryName},
                        {
                          onSuccess: () => setBackToDefault(),
                          onError: () => closeTask()
                        }  
                      )
                } else if (isEdit && category) {
                    updateCategory.mutateAsync({categoryImg:data,categoryName:categoryName,id:category.id},
                        {
                            onSuccess: () => setBackToDefault(),
                            onError: () => closeTask(),
                        }  
                    )
                }
              },
              onError: () => { setImageError("Error while uploading please try again");closeTask();}
            })
        }
        if (categoryName && isEdit && category) {
            setLoading(true);
            updateCategory.mutate({categoryName:categoryName,id:category.id},
                {
                    onSuccess:() => setBackToDefault(),
                    onError: () =>  closeTask()
                }  
            )
        }
    }

    useEffect(() => {
        if (dialog) {
            resetError();
            setCategoryName(category?.category_name ?? '')
            setImagePath(category?.category_img ?? '')
        }
    },[dialog,category?.category_name,category?.category_img])

  return (
    <>
        <Dialog dialogModel={dialog} closeDialog={() => closeDialog()}>
            <div className="p-6 bg-lightgray-hard rounded-md flex flex-col justify-center items-center gap-4 w-80">
            <div className="text-lg">{!isEdit ? 'Add New Category' : 'Edit Category'}</div>
            <div className="w-40 h-40 bg-lightgray-soft rounded-full flex flex-col justify-center items-center gap-3 overflow-hidden">
                {
                imagePath
                ?<img className="w-full" src={imagePath} alt="chosen image" />
                : !isEdit && <>
                    <BsUpload className="cursor-pointer" onClick={() => openFileUpload()} size={30} />
                    <div onClick={() => openFileUpload()} className="text-center cursor-pointer font-light text-sm w-10/12">Upload the category cover image</div>
                </>
                }
                
                <input 
                accept="image/jpeg,image/png" ref={fileUploadRef} type="file" className="hidden"
                onChange={(e) => handleImageSelect(e)} 
                />
            </div>
            {
                imageFile ?
                <div onClick={() => openFileUpload()} className="flex flex-row justify-center items-center text-darkgray-soft text-sm gap-x-1 cursor-pointer">
                    <div>Change image</div>
                    <FaArrowsRotate  />
                </div>
                : isEdit && <div onClick={() => openFileUpload()} className="flex flex-row justify-center items-center text-darkgray-soft text-sm gap-x-1 cursor-pointer">
                                <div>Change image</div>
                                <FaArrowsRotate  />
                            </div>
            }
            {
                imageError && <div className=" text-grapefruit-hard font-thin text-sm">{imageError}</div>
            }
            <input className="bg-lightgray-soft px-4 py-2 rounded-md focus:outline-none" type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Enter category name..." />
            {nameError && <div className="w-40 text-grapefruit-hard font-thin text-sm">{nameError}</div>}
            <button onClick={() => uploadCategory()} className="px-4 py-2 text-lightgray-soft bg-bluejeans-soft rounded-md">{ !isEdit ? 'Upload':'Save'}</button>
            </div>
        </Dialog>
        <Loading loadingModel={loading} />
    </>
  )
}

export default CategoryAddEdit