import {useEffect} from 'react'
import {Link as LinkRouter} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import plateActions from '../redux/actions/plateActions'
import Container from '../components/Container'
import Text from '../components/Text'

export default function Stock() {

    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(plateActions.getPlates())
    },[])

    const plates = useSelector(store => store.plateReducer.plates)
    console.log("🚀 ~ file: Stock-0.jsx ~ line 17 ~ Stock ~ plates", plates)
    
    return (
        <Container grow='1' bgColor='rgb(224,224,224)'>
             <div className='containerCardsMarca'>
                {plates?.map(everyPlate => (
                    <div className='linkColors' /* to={'/nueva/color/tipo/'+everyPlate._id} */ key={everyPlate._id}>
                        {/* <Text variant='h6' font='Paytone One' color='rgb(25,25,25)' padding='5px' id={everyPlate._id}>
                            {everyPlate.color.name}
                        </Text> */}
                        <h2 className='nameCards'>{everyPlate.color.name}</h2>
                        <img src={everyPlate.color.photo} alt={everyPlate._id} className='fitStock' id={everyPlate._id} />
                    </div>
                ))}
            </div>
        </Container>
    )
    
}