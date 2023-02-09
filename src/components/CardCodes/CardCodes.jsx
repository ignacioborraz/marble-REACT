import { Link as LinkRouter} from 'react-router-dom'

import './cardcodes.css'

export default function CardCodes({ internal,note,stock,id,comments }) {
  return (
    <LinkRouter className='card-link' to={`/request/${id}`}>
        <h2 className='card-h'>{(internal && `I-000${internal}`) || (note && `P-000${note}`)}</h2>
        <h2 className='card-h'>productos: {stock?.length}</h2>
        <p className='card-p'>{comments}</p>
    </LinkRouter>
  )
}