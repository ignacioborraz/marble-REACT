import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
<<<<<<< HEAD
import { useParams } from 'react-router-dom'
=======
>>>>>>> 1ef42e8037f673d50ebf0c12ac530ec898c28d13
import j_codeActions from '../../store/jhonson-3-sink/actions'

import './stocks.css'

import CardCodes from './../../components/CardCodes/CardCodes'

export default function Stocks() {

    const { type } = useParams()
    const dispatch = useDispatch()
    const { get_stocks } = j_codeActions
    const { token } = useSelector(store => store.auth)
    const { all } = useSelector(store => store.codes)

    console.log(all)

    useEffect(() => {
        dispatch(get_stocks({ token,type }))
        // eslint-disable-next-line
    }, [])

    return (
        <div className='stock-container'>    
           {all?.map(each=> <CardCodes key={each._id} internal={each.internal} note={each.note} stock={each.stock} comments={each.comments} id={each._id} />)}
        </div>
    )

}