import { useEffect } from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import typeActions from '../redux/actions/typeActions'
import Container from '../components/Container'

export default function SelectType() {
    
    const company = useSelector(store => store.new.plate.company)
    const types = useSelector(store => store.typeReducer.types)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(typeActions.getTypes(company))
        dispatch(typeActions.newPlate(null))
        // eslint-disable-next-line
    }, [])
    
    function creatingPlate(event) { 
        dispatch(typeActions.newPlate(event.currentTarget.id))
    }
    return (
        <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)'>
            <Container width='100%' justify='space-evenly' align='center' wrap='wrap'>
                {types?.map(everyType => (
                    <LinkRouter className='linkTypes' to={'/nueva/color/tipo/datos'} onClick={creatingPlate} key={everyType._id} id={everyType._id}>
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