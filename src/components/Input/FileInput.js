import React from 'react'
import Dropzone from 'react-dropzone-uploader'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'

const FILE_STORAGE_URL = process.env.REACT_APP_FILE_STORAGE_URL

const CustomInput = ({ setImage }) => {
  const handleSubmit = (files, allFiles) => {
    allFiles.forEach((f) => f.remove())
  }

  const getFilesFromEvent = (e) => {
    return new Promise((resolve) => {
      getDroppedOrSelectedFiles(e).then((chosenFiles) => {
        resolve(chosenFiles.map((f) => f.fileObject))
      })
    })
  }

  const handleChangeStatus = (props, status) => {
    const { meta, xhr, remove } = props

    if (status === 'done') {
      const { path } = JSON.parse(xhr.response)
      setImage(`${FILE_STORAGE_URL}/${path}`)

      // remove()
    }

    if (status === 'headers_received') {
      // remove()
    } else if (status === 'aborted') {
      alert(`${meta.name}, upload failed...`)
    }
  }

  return (
    <Dropzone
      accept="image/*"
      onChangeStatus={handleChangeStatus}
      getUploadParams={() => ({
        url: `https://cors-anywhere.herokuapp.com/${FILE_STORAGE_URL}/files`,
      })}
      onSubmit={handleSubmit}
      getFilesFromEvent={getFilesFromEvent}
      maxFiles={1}
      multiple={false}
      canCancel={false}
      inputContent=""
      SubmitButtonComponent={() => <div />}
    />
  )
}
// PreviewComponent={() => <div />}

// InputComponent={Input}

export default CustomInput
