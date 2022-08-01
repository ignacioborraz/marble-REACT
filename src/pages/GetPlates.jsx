import React, {useEffect} from 'react'
import {Link as LinkRouter} from 'react-router-dom'

import Container from '../components/Container'
import Text from '../components/Text'

import {useDispatch,useSelector} from 'react-redux'
import plateActions from '../redux/actions/plateActions'

export default function GetPlates() {

    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(plateActions.getPlates())
    },[])

    const plates = useSelector(store => store.plateReducer.plates)

    return (
        <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)' padding='20px 0'>
            {plates.map(everyPlate => (
                <Container  key={everyPlate._id} direction='column' margin='0 10px 20px 10px'>
                    <Text variant='h5' width='280px' padding='10px' bgColor='rgb(204,21,23)' color='rgb(224,224,224)' font='Paytone One'>
                        {everyPlate.name}</Text>
                    <Text variant='h5' width='280px' padding='10px'>
                        {everyPlate.type}</Text>
                    <Text variant='h5' width='280px' padding='10px'>
                        {everyPlate.height} X {everyPlate.width} X {everyPlate.thickness}</Text>
                    <img src={everyPlate.photo} alt={everyPlate.name} className="list" />
                    <LinkRouter to={`/detailPlate/${everyPlate._id}`}>
                        <Text width='280px' padding='10px' bgColor='rgb(25,25,25)'color='rgb(224,224,224)'  hover='rgb(204,21,23)'  font='Paytone One'>
                            +info</Text>
                    </LinkRouter>
                </Container >
            ))}
        </Container >
    )

}