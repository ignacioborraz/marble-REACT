import {useEffect} from 'react'
import jwt_decode from 'jwt-decode'
import {useDispatch} from 'react-redux'
import userActions from '../redux/actions/userActions'

export default function GoogleSignIn() {
    
    const dispatch = useDispatch()

    async function handleCallbackResponse(response) {
        //console.log(response.credential)
        let userObject = jwt_decode(response.credential)
        //console.log(userObject)
        dispatch(userActions.signIn({
            mail: userObject.email, 
            password: userObject.jti,
            from: 'google',
        }))
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: '571106448222-1bnjpoq960346dcu4vcgd1uqhd4r5os0.apps.googleusercontent.com',
            callback: handleCallbackResponse})
        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme: "outline", size: "medium" })
    })

    return (
        <div>
            <div id='buttonDiv'>
{/*                 <IconButton sx={{bgcolor: 'rgb(165, 126, 196)', color: 'white', height: '40px', '&:hover': {bgcolor: 'rgba(0, 0, 0, 0.5)'}}}>
                    <GoogleIcon />
                </IconButton> */}
            </div>
        </div>
    )
}

