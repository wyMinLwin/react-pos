import Switch from 'react-switch'
import { useAppDispatch, useAppSelector } from '../../../store';
import { toggleDeveloperMode } from '../../../store/developeModeSlice';
import {IoChevronBack} from 'react-icons/io5'
import { Link } from 'react-router-dom';
const SettingView = () => {
  const dispatch = useAppDispatch();
  const developerMode = useAppSelector(state => state.developerMode)
  return (
    <div className="w-screen h-screen bg-lightgray-hard flex justify-center items-center">
      <div className="w-1/4 p-5 rounded-md">
        <div className="text-2xl text-semibold mb-3 flex justify-start items-center gap-x-3">
          <Link to={'/'}>
          <IoChevronBack />
          </Link>
          <div>Settings</div>
        </div>
        <div className='bg-lightgray-soft p-5 rounded-md'  style={{border:'1px solid #C5C6D0'}}>
          <div className="grid grid-cols-4 py-2">
            <div className="text-lg col-span-3 my-auto">Developer Mode</div>
            <div className="col-span-1 my-auto flex justify-center items-center">
              <Switch
                onColor="#5D9CEC"
                checkedIcon={false}
                uncheckedIcon={false}
                checked={developerMode}
                className="react-switch"
                onChange={() => dispatch(toggleDeveloperMode()) }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingView