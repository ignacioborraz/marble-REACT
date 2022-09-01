import {useEffect} from 'react'
import {Route,Routes} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'

import NavBar from './components/NavBar'
import MySnackBar from './components/MySnackBar'

import Index from './pages/Index'
import VariantPage from './pages/VariantPage'
import SignIn from './pages/User-2-SignIn'
import NewUser from './pages/User-1-NewUser'
import PutUser from './pages/User-3-Put'
import SelectCompany from './pages/New-1-Company'
import SelectColor from './pages/New-2-Color'
import SelectType from './pages/New-3-Type'
import SelectData from './pages/New-4-Data'
import Stock from './pages/Stock-0'

import userActions from './redux/actions/userActions'

import './styles/styles.css'


export default function App() {

    const user = useSelector(store => store.userReducer.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if(localStorage.getItem('token')!== null) {
            const token = localStorage.getItem("token")
            //console.log(token)
            dispatch(userActions.verifyToken(token))
        }
        // eslint-disable-next-line
    },[])

    return (
        <div className='index'>
            {user && <NavBar />}
            <Routes>
                {user ? (<>
                    <Route path="/" element={<Index />} />
                    <Route path="/menu" element={<Index />} />
                    <Route path="/admin" element={<NewUser role='admin' />} />
                    <Route path="/user" element={<NewUser role='user' />} />
                    <Route path="/perfil/:id" element={<PutUser />} />
                    <Route path="/nueva" element={<SelectCompany />} />
                    <Route path="/nueva/:id" element={<SelectColor />} />
                    <Route path="/nueva/color/:id" element={<SelectType />} />
                    <Route path="/nueva/color/tipo/:id" element={<SelectData />} />
                    <Route path="/stock" element={<Stock />} />
                </>) : (
                    <Route path="/" element={<SignIn />} />
                )}
                <Route path="/ingresar" element={<SignIn />} />
                <Route path="/*" element={<VariantPage />} />
                {/*             
                    <Route path="/nueva/placa" element={<NewPlate />} />
                    <Route path="/signin" element={<SignIn options={options.signIn} />} />
                    <Route path="/getCompanies" element={<GetCompanies options={options.company} />} />
                    <Route path="/createCompany" element={<CreateCompany options={options.company} />} />
                    <Route path="/createdCompany" element={<VariantPage text={"COMPANY CREATED!"} back={{to: "getCompanies",text: "show companies"}} />} />
                    <Route path="/getPlates" element={<GetPlates options={options.company} />} />
                    <Route path="/createPlate" element={<CreatePlate options={options.company} />} />
                */}
            </Routes>
            <MySnackBar />
        </div>
    )
}