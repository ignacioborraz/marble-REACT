import { useEffect } from 'react'
import { Link as LinkRouter, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import typeActions from '../redux/actions/typeActions'
import Container from '../components/Container'
import Text from '../components/Text'

export default function SelectType() {

    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(typeActions.getTypes(id))
    }, [id])

    const types = useSelector(store => store.typeReducer.types)
    console.log("🚀 ~ file: New-3-Type.jsx ~ line 18 ~ SelectType ~ types", types)

    function SortArray(x, y){
        if (x.name < y.name) {return -1;}
        if (x.name > y.name) {return 1;}
        return 0;
    }
    var filterOrd = types.sort(SortArray);
    console.log(filterOrd);

    function creatingPlate(id) {
        let plate = JSON.parse(localStorage.getItem('plate'))
        plate.type = id
        localStorage.setItem('plate', JSON.stringify(plate))
        console.log(JSON.parse(localStorage.getItem('plate')))
    }

    return (
        <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)'>
            <Container width='100%' justify='space-evenly' align='center' wrap='wrap'>
                {types?.map(everyType => (
                    <LinkRouter className='linkTypes link linkEmp link2 mr10 mb10' to={'/nueva/color/tipo/' + everyType._id} onClick={creatingPlate(everyType._id)} key={everyType._id} id={everyType._id}>
                        <div className={everyType.name}>
                            <div className='mask'>
                                <h1 className='titleCard'>{everyType.name}</h1>
                                <h2 className='subtCard'>{everyType.width} × {everyType.height}</h2>
                                <h2 className='subtCard'>{everyType.thickness} <small>esp</small></h2>
                            </div>

                        </div>
                        {/* <Text variant='h4' font='Paytone One' color='rgb(25,25,25)' padding='5px' id={everyType._id}>
                            {everyType.name}
                        </Text>
                        
                        <Text variant='h6' color='rgb(25,25,25)' padding='5px' id={everyType._id}>
                            {everyType.width} × {everyType.height}
                        </Text>
                        <Text variant='h5' font='Paytone One' color='rgb(25,25,25)' padding='5px' id={everyType._id}>
                            {everyType.thickness} <small className='ml10'>esp</small>
                        </Text> */}
                    </LinkRouter>
                ))}
                
            </Container>
        </Container>
    )

}