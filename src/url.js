let apiUrl = 'http://localhost:8000/'
console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV==='production') {
    apiUrl = process.env.REACT_APP_URL
}
console.log(apiUrl)

export default apiUrl