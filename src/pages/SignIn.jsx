import {useDispatch} from 'react-redux'

import {Grid} from '@mui/material'

import StyledGrid from '../components/StyledGrid'
import StyledGridImg from '../components/StyledGridImg'
import StyledInput from '../components/StyledInput'
import Text from '../components/Text'

import userActions from '../redux/actions/userActions'

export default function SignIn({options}) {

    const dispatch = useDispatch()

    const allInputs = {}
    
    async function handleCreation(event) {
        event.preventDefault()
        console.log(allInputs)
        let res = await dispatch(userActions.signIn(allInputs))
        if (!res.data.success) {
            return allInputs //debo returnarlos para no perder los datos
        }
    }

    let classN = 'backGroundStyle '+options.bgImage

    return (
        <Grid container sx={{flexGrow: '1', backgroundColor: 'rgb(25,25,25)'}}>
            <StyledGridImg bgColor='rgb(224,224,224)' className={classN} />
            <StyledGrid bgColor='rgb(224,224,224)' direction='column'>
                <Text variant='h3' width='75%' font='Paytone One' color='rgb(224,224,224)' bgColor='rgb(204,21,23)' padding='15px' margin='0 0 15px 0'>
                    {options.title}
                </Text>
                <form onSubmit={handleCreation} className='newForm'>
                    {options.data.map(everyData => (
                        <StyledInput key={everyData.id} everyData={everyData} allInputs={allInputs} label={true} />
                    ))}
                    <input type="submit" className='buttonForm' required value='enter!' />
                </form>
            </StyledGrid>
        </Grid>
    )
    
}