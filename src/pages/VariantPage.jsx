import Text from '../components/Text'
import {Link as LinkRouter} from 'react-router-dom'

export default function VariantPage() {

    return (
        <LinkRouter to={'/'} className='form-container'>
            <Text variant='h3' width='75%' font='Montserrat' color='white' bgColor='#C82832' padding='15px' margin='0 0 10px 0' radius='5px'>
                PORTARO
            </Text>
        </LinkRouter>
    )
    
}