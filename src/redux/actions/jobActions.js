import axios from 'axios'
import apiUrl from '../../url'

const jobActions = {

    createJob: (nameJob,photoJob,detailJob,salaryJob) => {
        return async(dispatch,getState) => {
            try {
                await axios.post(apiUrl+'api/job',{nameJob,photoJob,detailJob,salaryJob})
            } catch(error) {
                console.log(error)
            }
        }
    },

    createJobByAdmin: (nameJob,photoJob,detailJob,salaryJob,company) => {
        return async(dispatch,getState) => {
            try {
                await axios.post(apiUrl+'api/jobByAdmin',{nameJob,photoJob,detailJob,salaryJob,company})
            } catch(error) {
                console.log(error)
            }
        }
    },

    getJobs: () => {
        return async(dispatch, getState) => {
            try {
                const res = await axios.get(apiUrl+`api/job`)
                dispatch({type:'GET_JOBS', payload:res.data.response})
            } catch(error) {
                console.log(error)
            }
        }
    },

    getOneJob: (id) => {
        return async(dispatch, getState) => {
            try {
                const res = await axios.get(apiUrl+`api/job/${id}`)
                dispatch({type:'GET_ONE_JOB', payload:res.data.response})
            } catch(error) {
                console.log(error)
            }
        }
    },

    putJob: (id,data) => {
        return async(dispatch, getState) => {
            try {
                await axios.put(apiUrl+`api/job/${id}`,data)
            } catch(error) {
                console.log(error)
            }
        }
    },

    deleteJob: (id) => {
        return async(dispatch, getState) => {
            try {
                await axios.delete(apiUrl+`api/job/${id}`)
            } catch(error) {
                console.log(error)
            }
        }
    },

    filterJobs: (input) => {
        return (dispatch,getState)=>{
            dispatch({type:'FILTER_JOBS', payload:input})
        }
    }

}

export default jobActions