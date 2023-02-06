import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import j_codeActions from '../../store/jhonson-3-sink/actions'

import './stocks.css'

import CardCodes from './../../components/CardCodes/CardCodes'

export default function Stocks() {

    const dispatch = useDispatch()
    const { get_stocks } = j_codeActions
    const { token } = useSelector(store => store.auth)
    const { all } = useSelector(store => store.codes)

    console.log(all)

    useEffect(() => {
        dispatch(get_stocks({ token }))
        // eslint-disable-next-line
    }, [])

    return (
        <div className='stock-container'>    
           {all?.map(each=> <CardCodes key={each._id} internal={each.internal} note={each.note} stock={each.stock} comments={each.comments} id={each._id} />)}
        </div>
    )

}