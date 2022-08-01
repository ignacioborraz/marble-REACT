import {useEffect} from 'react'
import {Link as LinkRouter,useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import typeActions from '../redux/actions/typeActions'
import Container from '../components/Container'
import Text from '../components/Text'

export default function SelectType() {
    
    const {id} = useParams()
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(typeActions.getTypes(id))
    },[id])

    const types = useSelector(store => store.typeReducer.types)

    function creatingPlate(event) {
        let plate = JSON.parse(localStorage.getItem('plate'))
        plate.type = event.target.id
        localStorage.setItem('plate',JSON.stringify(plate))
        console.log(JSON.parse(localStorage.getItem('plate')))
    }
    
    return (
        <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)'>
            <Container width='100%' justify='space-evenly' align='center' wrap='wrap'>
                {types?.map(everyType => (
                    <LinkRouter className='linkTypes' to={'/nueva/color/tipo/'+everyType._id} onClick={creatingPlate} key={everyType._id} id={everyType._id}>
                        <Text variant='h4' font='Paytone One' color='rgb(25,25,25)' padding='5px' id={everyType._id}>
                            {everyType.name}
                        </Text>
                        <Text variant='h6' color='rgb(25,25,25)' padding='5px' id={everyType._id}>
                            {everyType.width} × {everyType.height}
                        </Text>
                    </LinkRouter>
                ))}
            </Container>
        </Container>
    )
    
}