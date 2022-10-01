import { useEffect } from 'react'
import { Link as LinkRouter, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import typeActions from '../redux/actions/typeActions'
import Container from '../components/Container'
export default function SelectType() {
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(typeActions.getTypes(id))
    }, [id])

    const types = useSelector(store => store.typeReducer.types)
    
    function creatingPlate(event) {
        let plate = JSON.parse(localStorage.getItem('plate'))
        plate.type = event.currentTarget.id 
        localStorage.setItem('plate', JSON.stringify(plate))
    }
    return (
        <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)'>
            <Container width='100%' justify='space-evenly' align='center' wrap='wrap'>
                {types?.map(everyType => (
                    <LinkRouter className='linkTypes  mr10 mb10' to={'/nueva/color/tipo/' + everyType._id} onClick={creatingPlate} key={everyType._id} id={everyType._id}>
                        <div className={` ${everyType.name} bgType` }>
                            <div className='mask'>
                                <h1 className='titleCard'>{everyType.name}</h1>
                                <h2 className='subtCard'>{everyType.width} × {everyType.height}</h2>
                                <h2 className='subtCard'>{everyType.thickness} <small>esp</small></h2>
                            </div>
                        </div>
                    </LinkRouter>
                ))}
                
            </Container>
        </Container>
    )

}