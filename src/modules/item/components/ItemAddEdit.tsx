import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react"
import Dialog from "../../../components/Dialog"
import Loading from "../../../components/Loading";
import OutlineInput from "../../../components/OutlineInput";
import { BsUpload } from "react-icons/bs";
import { FaArrowsRotate } from "react-icons/fa6";
import { useUploadImage } from "../../../hooks/useUploadImage";
import { useAddItem, useUpdateItem } from "../../../hooks/useItems";
import { useGetCategoriesForSelect } from "../../../hooks/useCategories";
import { ItemType } from "../../../types/itemType";
import { useAppSelector } from "../../../store";
const namePattern = /^[a-zA-Z0-9\s]+$/
const codePattern = /^[a-zA-Z0-9\s-]+$/

type SelectCategory = {
    id: number,
    category_name: string
}

type ItemAddEditTypes = {
    dialog: boolean,
    closeDialog: () => void,
    isEdit: boolean,
    item?: ItemType
}

const ItemAddEdit = ({dialog,closeDialog,isEdit,item}:ItemAddEditTypes) => {
    const developerMode = useAppSelector(state => state.developerMode)
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const [itemName,setItemName] = useState("");
    const [itemCode,setItemCode] = useState("");
    const [price,setPrice] = useState(0);
    const [category,setCategory] = useState<number|undefined>(undefined);
    const [desc,setDesc] = useState("");
    const [imagePath,setImagePath] = useState("");
    const [imageFile,setImageFile] = useState<File|null>(null);
    const  fileUploadRef = useRef<HTMLInputElement>(null);

    const openFileUpload = useCallback(() => {
        setError("");
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
        setItemName("");
        setItemCode("");
        setPrice(0);
        setDesc("");
        setCategory(undefined)
        setImageFile(null);
        setImagePath("");
        closeTask();
    },[closeTask]);

    const categories = useGetCategoriesForSelect();

    const payload = useMemo(() => {
        return {
            name: itemName,
            code: itemCode,
            price: price,
            category_id: category,
            desc: desc
        }
    },[itemName,itemCode,price,category,desc]);

    const uploadImage = useUploadImage();
    const addItem = useAddItem();
    const updateItem = useUpdateItem()

    const uploadItem = async () => {
        
        setError("");
        if (!developerMode) {
            setError("You don't have access to do this operation");
            return;
        }

        if (!isEdit && imageFile === null) {
            setError("Please choose an image");
            return
        } 
        if (!namePattern.test(itemName)) {
            setError("Name can't be empty and can't contains special characters");
            return
        }

        if (!codePattern.test(itemCode)) {
            setError("Code can't be empty and can't contains special characters");
            return
        }

        if(Math.sign(Number(price)) === -1) {
            setError("Price should be a positive number");
            return
        } 

        if(!category) {
            setError("Please choose a category");
            return
        }
        
        if (imageFile !== null) {
            setLoading(true);
            uploadImage.mutateAsync({file:imageFile,databaseName:"items"},{
              onSuccess: (data) => {
                if ( !isEdit && data ) {
                    addItem.mutateAsync({...payload,url:data},
                        {
                          onSuccess: () => setBackToDefault(),
                          onError: () => {setError('Error While Adding Item');setLoading(false)}
                        }
                      )
                } 
                else if (isEdit && item) {
                    updateItem.mutateAsync({data:{...payload,url:data},id:item.id},
                        {
                            onSuccess: () => setBackToDefault(),
                            onError: () => {setError('Error While Updating Item');setLoading(false)}
                        }  
                    )
                }
              },
            onError: () => { setError("Error while uploading image please try again");}
            })
            return
        }
        if ( isEdit && item) {
            console.log('this is worked')
            setLoading(true);
            updateItem.mutate({data:{...payload},id:item.id},
                {
                    onSuccess:() => setBackToDefault(),
                    onError: () =>  setError('Error While Updating Item')
                }  
            )
        }
    }

    useEffect(() => {
        if (item) {
            const {name,category_id,code,price,desc,url} = item;
            setImagePath(url);
            setItemName(name);
            setItemCode(code);
            setPrice(price);
            setCategory(category_id);
            setDesc(desc);
        }
    },[item])

  return (
    <>
        <Dialog dialogModel={dialog} closeDialog={() => closeDialog()}>
            <div className="p-6 bg-lightgray-hard rounded-md flex flex-col justify-center items-center gap-4 min-w-96">
                <div className="text-lg">{!isEdit ? 'Add New Item' : 'Edit Item'}</div>
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
                
                {error && <div className="text-grapefruit-hard text-center w-11/12 text-sm">{error}</div>}
                <div className="grid grid-cols-2 gap-x-2">
                    <OutlineInput className="col-span-1" value={itemName} onChange={(v:string) => setItemName(v)} placeholder='Enter item name...'/>
                    <OutlineInput className="col-span-1" value={itemCode} onChange={(v:string) => setItemCode(v)} placeholder='Enter item code...'/>
                </div>
                <div className="grid grid-cols-2 gap-x-2">
                    <OutlineInput className="col-span-1" type="number" value={price} onChange={(v:string) => setPrice(Number(v))} placeholder='Enter item price...'/>
                    <select className="select-box" onChange={(e) => setCategory(Number(e.target.value))} value={category} >
                        <option>Categories</option>
                        {
                            categories.data?.data && categories.data?.data.map((c:SelectCategory) => (
                                <option key={c.id} value={c.id}>{c.category_name}</option>
                            ))
                        }
                    </select>
                </div>
                <textarea className="bg-transparent w-full rounded-md p-3 focus:outline-none" style={{border:'1px solid black'}} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Enter item description..."></textarea>
                <button onClick={() => uploadItem()} className="px-4 py-2 text-lightgray-soft bg-bluejeans-soft rounded-md">{ !isEdit ? 'Upload':'Save'}</button>
            </div>
        </Dialog>
        <Loading loadingModel={loading} />
    </>
  )
}

export default ItemAddEdit