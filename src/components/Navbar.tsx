import { FunctionComponent, memo } from "react"

const Navbar:FunctionComponent = memo(() => {
    
  return (
    <div className="flex justify-between items-center px-8 py-2 bg-lightgray-soft">
        <div className="text-important text-lg">React POS</div>
        <div className="w-10 h-10 bg-gray-500 rounded-full overflow-hidden border-2">
            <img src="https://hips.hearstapps.com/hmg-prod/images/robert-pattinson-as-bruce-wayne-batman-in-the-batman-1645187114.jpg?crop=0.468xw:1.00xh;0.510xw,0&resize=1200:*" alt="profile avarter" />
        </div>
    </div>
  )
})

export default Navbar