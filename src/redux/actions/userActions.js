import axios from 'axios'
import apiUrl from '../../url'

const userActions = {

    signUp: (data) => {
        return async(dispatch,getState) => {
            try {
                const res = await axios.post(apiUrl+'api/marble/auth/sign/up',data)
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
        console.log(data)
        return async(dispatch, getState) => {
            try {
                const res = await axios.post(apiUrl+'api/marble/auth/sign/in',data)
                console.log(res)
                if (res.data.success) {
                    localStorage.setItem('token',res.data.response.token)
                    //console.log(localStorage.getItem('token'))
                    dispatch({type: 'USER', payload: res.data.response})
                } else {
                    dispatch({type: 'MESSAGE',
                        payload: {
                            view: true,
                            message: res.data.message,
                            success: res.data.success
                        }
                    })
                    return res
                }
            } catch(error) {
                console.log(error)
            }
        }
    },

    signOut: (id) => {
        return async (dispatch, getState) => {
            await axios.post(apiUrl+'api/marble/auth/sign/out',{id})
            localStorage.removeItem('token')
            dispatch({
                type: 'USER',
                payload: null
            })
        }
    },

    verifyToken: (token) => {
        console.log(token)
        return async (dispatch, getState) => {
            try {
                const user = await axios.get(apiUrl+'api/marble/auth/sign/token', {headers: {'Authorization': 'Bearer '+token}} )
                console.log(user)
                if (user) {
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
                    dispatch({
                        type: 'MESSAGE',
                        payload: {
                            view: true,
                            message: user.data.message,
                            success: user.data.success
                        }
                    })
                }
            } catch(error) {
                console.log(error)
            }
        }            
    }

}

export default userActions