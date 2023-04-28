import { useEffect,useState,useRef } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import j_codeActions from '../../../store/jhonson-4-notes/actions'

import './co04Stock.css'

import List from '../../../components/List/List'

export default function Co04Stock() {

    const { product } = useParams()
    const [view,setView] = useState(product)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { get_all } = j_codeActions
    const { token } = useSelector(store => store.auth)
    const { accesories_stock_1,accesories_stock_2,accesories_stock_3,ksinks_stock_1,ksinks_stock_2,ksinks_stock_3,plates } = useSelector(store => store.stock)
    const [reload,setReload] = useState(false)
    const text = useRef("")

    useEffect(() => {
        dispatch(get_all({ token,text:text?.current.value }))
        // eslint-disable-next-line
    }, [reload])

    function handleViews(event) {
        setView(event.target.id)
        navigate(`/all/${event.target.id}`)
    }

    //console.log({ accesories_stock_1,accesories_stock_2,accesories_stock_3,ksinks_stock_1,ksinks_stock_2,ksinks_stock_3,plates })
    return (
        <>
            <div className='co-stock-buttons'>
                <div className='co-stock-panel'>
                    <button onClick={handleViews} id='plate' className='co-stock-button-1'>placas</button>
                    <button onClick={handleViews} id='ksink' className='co-stock-button-2'>piletas</button>
                    <button onClick={handleViews} id='accesory' className='co-stock-button-3'>accesorios</button>
                </div>
                <div className='co-stock-panel-2'>
                    <input type="text" className='co-stock-size' placeholder='buscar' ref={text} onChange={()=>setReload(!reload)} />
                    <button onClick={()=> navigate('/stocks')} className='co-stock-button'>volver</button>
                </div>
            </div>
            <div className='co-stock-container' id='scroll'>
                <div className='co-stock-head'>
                    <h3 className='co-stock-headers fs w-40'>STOCK</h3>
                    <h3 className='co-stock-headers fs w-40'>FOTO</h3>
                    <h3 className='co-stock-headers fs w-200'>CODIGO</h3>
                    <h3 className='co-stock-headers fs w-20'>EE</h3>
                </div>
                <div className='co-stock-box'>
                    {view==='ksink' && (<>
                        {ksinks_stock_1?.map(each=><List reload={reload} setReload={setReload} product={product} id={each._id} stock={each.stock} name={`${each.type}-${each.name}`} photo={each.photo} key={each._id} color='red' />)}
                        {ksinks_stock_2?.map(each=><List reload={reload} setReload={setReload} product={product} id={each._id} stock={each.stock} name={`${each.type}-${each.name}`} photo={each.photo} key={each._id} color='pink' />)}
                        {ksinks_stock_3?.map(each=><List reload={reload} setReload={setReload} product={product} id={each._id} stock={each.stock} name={`${each.type}-${each.name}`} photo={each.photo} key={each._id} color='white' />)}
                    </>)}
                    {view==='accesory' && (<>
                        {accesories_stock_1?.map(each=><List reload={reload} setReload={setReload} product={product} id={each._id} stock={each.stock} name={each.name} photo={each.photo} key={each._id} color='red' />)}
                        {accesories_stock_2?.map(each=><List reload={reload} setReload={setReload} product={product} id={each._id} stock={each.stock} name={each.name} photo={each.photo} key={each._id} color='pink' />)}
                        {accesories_stock_3?.map(each=><List reload={reload} setReload={setReload} product={product} id={each._id} stock={each.stock} name={each.name} photo={each.photo} key={each._id} color='white' />)}
                    </>)}
                </div>
            </div>
        </>
    )

}