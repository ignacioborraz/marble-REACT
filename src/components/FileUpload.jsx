import { useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

export default function FileUpload() {
    const [value, setValue] = useState(0)
    const [picture, setPicture] = useState(null)
    const handleUpload = (event) => {
        const file = event.target.files[0]
        const storageRef = ref(getStorage(), `/users/${new Date().getFullYear()}${new Date().getMonth()}${file.name}`)
        const task = uploadBytesResumable(storageRef, file, { contentType: 'image/png' })
        task.on('state_changed',
            (snapshot) => setValue(100 * (snapshot.bytesTransferred / snapshot.totalBytes)),
            (error) => console.log(error.message),
            async () => setPicture(await getDownloadURL(task.snapshot.ref))
        )
    }
    return (
        <span className='inputUpload' >
            <progress value={value} max='100' name='file' />
            <span className='inputs'>
                <input type='file' className='load' onChange={handleUpload} accept=".png, .jpg, .jpeg" />
                <input type='hidden' name='file' id={picture} />
            </span>
        </span>
    )
}