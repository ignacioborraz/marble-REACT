import { useState,useEffect,useRef } from 'react'
import AccesoryCheck from '../AccesoryCheck/AccesoryCheck'
import { useSelector,useDispatch } from 'react-redux'
import j_accesoryActions from '../../store/jhonson-2-acc/actions'
const { read_accesories } = j_accesoryActions

export default function ModalAccesories({
    currentAccesories,
    setCurrentAccesories,
    modal,
    setModal
}) {

    const [reload,setReload] = useState(false)
    const [quantity,setQuantity] = useState(currentAccesories.length || 0)
    const inputText = useRef("")
    const checks = useRef([])
    useEffect(() => {
        if (accesories.length === 0) {
            dispatch(read_accesories({ token }))
        }
    }, [])
    const { accesories } = useSelector(store => store.accesories)
    const { token } = useSelector(store => store.auth)
	const dispatch = useDispatch()

    function handleChange(event) {
        setReload(!reload)
        //console.log(inputText?.current?.value)
    }

    function handleForm() {
        let list = Object.values(checks?.current)
        let selected_accesories = []
        for (let each of list) {
            if (each.checked) {
                selected_accesories.push(accesories.find(acc=> acc.name === each.value))
            }
        }
        setQuantity(selected_accesories?.length)
        setCurrentAccesories(selected_accesories)
    }

    return (
        <div className={`accesory-form modal-${modal}`}>
            <div className={`acc-form modal-${modal}`}>
                <p className={`acc-options modal-${modal}`}>{quantity || 0} accesorios</p>
                <input
                    className={`acc-options modal-${modal}`}
                    ref={inputText}
                    onChange={handleChange}
                    type="text"
                    placeholder='Buscar por codigo'
                />
                <p onClick={(()=>setModal(!modal))} className={`acc-options a-opt modal-${modal}`}>finalizar</p>
            </div>
            <form ref={checks} className={`accesory-form-box modal-${modal}`} onChange={handleForm}>
                {accesories?.map(each => <AccesoryCheck
                    key={each._id}
                    accesory={each}
                    modal={modal}
                    selected={currentAccesories.map(each => each.name)}
                    inputText={inputText?.current?.value || ""}
                />)}
            </form>
        </div>
    )

}