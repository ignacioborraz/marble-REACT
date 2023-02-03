import { Link as LinkRouter} from 'react-router-dom'

export default function CardJhonson({type}) {
  return (
    <LinkRouter className='model-link' to={`/johnson/acce/${type._id}`} key={type._id} id={type._id}>
        <h2 className='model-h'>{type.code}</h2>
        <img src={type.photo} alt={type._id} className='model-img' id={type._id} />
        <h2 className='model-h'>{type.x} x {type.y} × {type.z} </h2>
    </LinkRouter>
  )
}