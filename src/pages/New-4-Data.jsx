import {useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import plateActions from '../redux/actions/plateActions'
import Container from '../components/Container'
import Text from '../components/Text'

export default function SelectType() {
    
    const navigate = useNavigate()
    const lot = useRef()
    const comments = useRef()
    const dispatch = useDispatch()
    //let inputs = []

    //const types = useSelector(store => store.typeReducer.types)

/*     function charge(event) {
        setNumber(event.target.value)
        inputs = []
        for (let i=0; i<number; i++) {
            inputs.push(i)
        }
    } */

    async function creatingPlate(event) {
        event.preventDefault()
        let plate = JSON.parse(localStorage.getItem('plate'))
        plate.lot = lot?.current.value.trim()
        plate.comments = comments?.current.value.trim()
        //localStorage.setItem('plate',JSON.stringify(plate))
        //console.log(JSON.parse(localStorage.getItem('plate')))
        await dispatch(plateActions.createPlate(plate))
            .then(navigate("/",{replace:true}))
    }
    
    return (
        <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)'>
            <Container width='100%' justify='space-evenly' align='center' wrap='wrap'>
                <form onSubmit={creatingPlate}>
                    {/* <input type='number' onChange={charge}/> */}
                    <label htmlFor='lote'>LOTE: </label>
                    <input id='lote' type='text' ref={lot} />
                    <label htmlFor='comentario'>COMENTARIO: </label>
                    <input id='comentario' type='text' ref={comments}/>
                    <input type="submit" required value='ingresar' />
                </form>
                
                
{/*                 <LinkRouter className='linkTypes' to={'/listo'} onClick={creatingPlate} key={everyType._id} id={everyType._id}>
                        <Text variant='h4' font='Paytone One' color='rgb(25,25,25)' padding='5px' id={everyType._id}>
                            {everyType.name}
                        </Text>
                        <Text variant='h6' color='rgb(25,25,25)' padding='5px' id={everyType._id}>
                            {everyType.width} × {everyType.height}
                        </Text>
                    </LinkRouter> */}
            </Container>
        </Container>
    )
    
}