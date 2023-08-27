import React from 'react'
import Dialog from './Dialog'
import './loader.css'
const Loading:React.FunctionComponent<{loadingModel:boolean}> = React.memo(({loadingModel}) => {
  return (
    <Dialog dialogModel={loadingModel} zIndex='z-50'>
        <span className="loader"></span>
    </Dialog>
  )
})

export default Loading