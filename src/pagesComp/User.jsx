import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import {Grid} from '@mui/material'

import StyledGrid from '../components/StyledGrid'
import StyledGridImg from '../components/StyledGridImg'
import StyledInput from '../components/StyledInput'
import Text from '../components/Text'

import userActions from '../redux/actions/userActions'

export default function User({options}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const allInputs = {} //objeto que va a contener los datos capturados de TODOS los inputs del formulario
    
    async function handleCreation(event) {
        event.preventDefault()
        //agrego parámetros que el usuario NO INGRESA
        allInputs['from'] = 'signUpForm'
        let res = await dispatch(userActions.signUp(allInputs)) //llamado AXIOS con REDUX
        if (res.data.success) {
            try {
                navigate("/createdUser",{replace:true}) //redirecciona
            } catch(error) {
                console.log(error)
            }
        } else {
            console.log(res) //para ver las validaciones en la consola
            return allInputs //debo retornar los datos para no perderlos
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
                    <input type="submit" className='buttonForm' required value='create!' />
                </form>
            </StyledGrid>
        </Grid>
    )
    
}