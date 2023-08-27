import { ChangeEvent, useCallback, useRef, useState } from "react";
import { useAddCategory, useGetCategories } from "../../../hooks/useCategories"
import { CategoryType } from "../../../types/categoryType";
import CategoryCard from "../components/CategoryCard";
import Dialog from "../../../components/Dialog";
import {BsUpload} from "react-icons/bs";
import { useUploadImage } from "../../../hooks/useUploadImage";
import Loading from "../../../components/Loading";
import {FaArrowsRotate} from "react-icons/fa6";
const namePattern = /^[a-zA-Z0-9\s]+$/
const CategoryView = () => {
  const categories = useGetCategories();
  const [addDialog,setAddDialog] = useState(false);
  const [categoryName,setCategoryName] = useState("");
  const [imageFile,setImageFile] = useState<File|null>(null);
  const [imagePath,setImagePath] = useState("");
  const [nameError,setNameError] = useState("");
  const [imageError,setImageError] = useState("");
  const [loading,setLoading] = useState(false);
  const  fileUploadRef = useRef<HTMLInputElement>(null);
  

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
    setAddDialog(false);
    setLoading(false);
    setImagePath("");
  },[])

  const uploadImage = useUploadImage();
  const addCategory = useAddCategory();

  const uploadCategory = async () => {
    resetError();
    !namePattern.test(categoryName) && setNameError("Name can't be empty and Only allowed characters and numbers");
    imageFile === null && setImageError("Please choose an image")
    if (imageFile !== null && categoryName) {
      setLoading(true);
      uploadImage.mutateAsync({file:imageFile,databaseName:"categories"},{
        onSuccess: (data) => {
          addCategory.mutate({categoryImg:data,categoryName:categoryName},
            {
              onSuccess: () => setBackToDefault(),
              onError: () => {
                setLoading(false);
              }
            }  
          )
        },
        onError: () => {
          setImageError("Error while uploading please try again");
          setLoading(false);
        }
      })
    }
  }

  return (
    <>

      <div className="text-end px-4">
        <button onClick={() => {setAddDialog(true);resetError()}} className="text-sm bg-bittersweet-soft text-lightgray-soft p-2 mt-2 rounded-md click-effect">Add New Category</button>
      </div>
      <div className="w-full grid grid-cols-12 gap-x-5 gap-5 p-4 text-darkgray-hard">
        {
          categories?.data?.data?.map((category:CategoryType) => (
            <CategoryCard category={category} key={category.id} />
          ))
        }     
      </div>
      <Dialog dialogModel={addDialog} closeDialog={() => setAddDialog(false)}>
        <div className="p-6 bg-lightgray-hard rounded-md flex flex-col justify-center items-center gap-4 w-80">
          <div className="text-lg">Add New Category</div>
          <div className="w-40 h-40 bg-lightgray-soft rounded-full flex flex-col justify-center items-center gap-3 overflow-hidden">
            {
              imagePath
              ?<img className="w-full" src={imagePath} alt="chosen image" />
              :<>
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
            imageFile &&
            <div onClick={() => openFileUpload()} className="flex flex-row justify-center items-center text-darkgray-soft text-sm gap-x-1 cursor-pointer">
              <div>Change image</div>
              <FaArrowsRotate  />
            </div>
          }
          {
            imageError && <div className=" text-grapefruit-hard font-thin text-sm">{imageError}</div>
          }
          <input className="bg-lightgray-soft px-4 py-2 rounded-md focus:outline-none" type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Enter category name..." />
          {nameError && <div className="w-40 text-grapefruit-hard font-thin text-sm">{nameError}</div>}
          <button onClick={() => uploadCategory()} className="px-4 py-2 text-lightgray-soft bg-bluejeans-soft rounded-md">Upload</button>
        </div>
      </Dialog>
      <Loading loadingModel={loading} />
    </>
  )
}

export default CategoryView