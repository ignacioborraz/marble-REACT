import {useEffect} from 'react'
import {Link as LinkRouter,useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import colorActions from '../redux/actions/colorActions'
import Container from '../components/Container'

export default function SelectColor() {

    const {id} = useParams()
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(colorActions.getColors(id))
    },[id])

    const colors = useSelector(store => store.colorReducer.colors)

    function creatingPlate(event) {
        let plate = JSON.parse(localStorage.getItem('plate'))
        plate.color = event.target.id
        localStorage.setItem('plate',JSON.stringify(plate))
        console.log(JSON.parse(localStorage.getItem('plate')))
    }
    
    return (
        <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)'>
            <Container width='100%' wrap='wrap'>
                {colors?.map(everyColor => (
                    <LinkRouter className='linkColors' to={'/nueva/'+everyColor._id} onClick={creatingPlate} key={everyColor._id} id={everyColor._id}>
                        <img src={everyColor.photo} alt={everyColor._id} className='fitColors' id={everyColor._id} />
                    </LinkRouter>
                ))}
            </Container>
        </Container>
    )
    
}