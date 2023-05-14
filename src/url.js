let apiUrl = 'http://localhost:8000/api/marble/'
console.log(import.meta.env.MODE)

if (import.meta.env.MODE==='production') {
    apiUrl = import.meta.env.VITE_URL
}
//console.log(apiUrl)

export default apiUrl