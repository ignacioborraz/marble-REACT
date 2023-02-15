import { useParams,Link as LinkRouter} from 'react-router-dom'

import './cardcodes.css'

export default function CardCodes({ id,client,products }) {
    
    const { type } = useParams()
    let stringId = id
    if (type === 'internal') {
        stringId = `I-000${id}`
    } else if (type === 'note') {
        stringId = `P-000${id}`
    } else {
        stringId = `E-000${id}`
    }

    return (
        <LinkRouter className='card-link' to={`/request/${id}`}>
            <h2 className='card-h'>{stringId}</h2>
            <h2 className='card-number'>{products}</h2>
            <p className='card-p'>{client}</p>
        </LinkRouter>
    )

}