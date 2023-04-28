import { useState,useEffect,useRef } from 'react'
import AccesoryOneCheck from '../AccesoryOneCheck/AccesoryOneCheck'
import { useSelector,useDispatch } from 'react-redux'
import j_accesoryActions from '../../store/jhonson-2-acc/actions'
const { read_accesories } = j_accesoryActions

export default function ModalAccesory({
    selected,
    setSelected,
    modal,
    setModal
}) {

    const [reload,setReload] = useState(false)
    const inputText = useRef("")
    const check = useRef(null)
    useEffect(() => {
        if (accesories.length === 0) {
            dispatch(read_accesories({ token }))
        }
    }, [])
    const { accesories } = useSelector(store => store.accesories)
    const { token } = useSelector(store => store.auth)
	const dispatch = useDispatch()

    function handleChange() {
        setReload(!reload)
        //console.log(inputText?.current?.value)
    }

    function handleForm() {
        let list = Object.values(check.current)
        let selected_accesory
        for (let each of list) {
            if (each.checked) {
                selected_accesory = accesories.find(acc=> acc.name === each.value)
            }
        }
        //console.log(selected_accesory)
        setSelected(selected_accesory)
    }

    return (
        <div className={`accesory-form modal-${modal}`}>
            <form className={`acc-form modal-${modal}`}>
                <p className={`acc-options modal-${modal}`}>{selected?.name ?? 'seleccione uno'}</p>
                <input
                    className={`acc-options modal-${modal}`}
                    ref={inputText}
                    onChange={handleChange}
                    type="text"
                    placeholder='Buscar por codigo'
                />
                <p onClick={(()=>setModal(!modal))} className={`acc-options a-opt modal-${modal}`}>finalizar</p>
            </form>
            <form ref={check} className={`accesory-form-box modal-${modal}`} onChange={handleForm}>
                {accesories?.map(each => <AccesoryOneCheck
                    key={each._id}
                    accesory={each}
                    modal={modal}
                    selected={selected?.name}
                    inputText={inputText?.current?.value || ""}
                />)}
            </form>
        </div>
    )

}