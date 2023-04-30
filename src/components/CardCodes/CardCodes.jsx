import { useParams,Link as LinkRouter} from 'react-router-dom'

import './cardcodes.css'

export default function CardCodes({ id,id_client,client,products }) {
    
    const { type } = useParams()
    let stringId = id
    if (type === 'internal') {
        stringId = `I-${id.toString().padStart(8,'0')}`
    } else if (type === 'note') {
        stringId = `P-${id.toString().padStart(8,'0')}`
    } else {
        stringId = `E-${id.toString().padStart(8,'0')}`
    }

    return (
        <LinkRouter className='card-link' to={`/request/${id}/${id_client}`}>
            <h2 className='card-h'>{stringId}</h2>
            <h2 className='card-number'>{products}</h2>
            <p className='card-p'>{client}</p>
        </LinkRouter>
    )

}