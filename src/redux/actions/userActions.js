import axios from 'axios'
import apiUrl from '../../url'

const userActions = {

    signUp: (data) => {
        return async(dispatch,getState) => {
            try {
                const res = await axios.post(apiUrl+'api/auth/signUp',data)
                //console.log(res)
                dispatch({type: 'MESSAGE',
                    payload: {
                        view: true,
                        message: res.data.message,
                        success: res.data.success
                    }
                })
                return res
            } catch(error) {
                console.log(error)
            }
        }
    },

    signIn: (data) => {
        //console.log(data)
        return async(dispatch, getState) => {
            try {
                const res = await axios.post(apiUrl+'api/auth/signIn',data)
                //console.log(res)
                if (res.data.success) {
                    localStorage.setItem('token',res.data.response.token)
                    console.log(localStorage.getItem('token'))
                    dispatch({type: 'USER', payload: res.data.response})
                } else {
                    dispatch({type: 'MESSAGE',
                        payload: {
                            view: true,
                            message: res.data.message,
                            success: res.data.success
                        }
                    })
                }
                return res
            } catch(error) {
                console.log(error)
            }
        }
    },

    signOut: (mail) => {
        return async (dispatch, getState) => {
            await axios.post(apiUrl+'api/auth/signOut',{mail})
            localStorage.removeItem('token')
            dispatch({
                type: 'USER',
                payload: null
            })
        }
    },

    verifyToken: (token) => {
        return async (dispatch, getState) => {
            console.log(token)
            const user = await axios.get(apiUrl+'api/token', {headers: {'Authorization': 'Bearer '+token}} )
            console.log(user)
            if (user.data.success) {
                dispatch({
                    type: 'USER',
                    payload: user.data.response
                })
                dispatch({
                    type: 'MESSAGE',
                    payload: {
                        view: true,
                        message: user.data.message,
                        success: user.data.success
                    }
                })
            } else {
                localStorage.removeItem('token')
            }
        }
    }

}

export default userActions