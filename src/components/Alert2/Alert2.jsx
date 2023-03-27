import Swal from 'sweetalert2'

export default function Alert2({ visible,setVisible,title,text,showConfirmButton,confirmButtonText,fnConfirmed,showDenyButton,denyButtonText,fnDenied,showCancelButton,cancelButtonText }) {
    //console.log(visible)
    if(visible) {
        Swal.fire({
            title,
            text: text || null,
            showConfirmButton: showConfirmButton || false,
            showDenyButton: showDenyButton || false,
            showCancelButton: showCancelButton || false,
            confirmButtonText,
            denyButtonText,
            cancelButtonText
        }).then((result) => {
            if (result.isConfirmed) { fnConfirmed();setVisible(false) }
            else if (result.isDenied) { fnDenied();setVisible(false) }
            else { setVisible(false) }
        })
    }

    return <></>

}