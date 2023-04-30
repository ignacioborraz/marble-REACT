let apiUrl = 'http://localhost:8000/api/marble/'
//console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV==='production') {
    apiUrl = import.meta.VITE_URL
}
//console.log(apiUrl)

export default apiUrl