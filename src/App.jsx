import {useEffect} from 'react'
import {Route,Routes} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'

import NavBar from './components/NavBar'
import MySnackBar from './components/MySnackBar'

import Index from './pages/Index'
import VariantPage from './pages/VariantPage'
import SelectCompany from './pages/New-1-Company'
import SelectColor from './pages/New-2-Color'
import SelectType from './pages/New-3-Type'
import SelectData from './pages/New-4-Data'
import Stock from './pages/Stock-0'
/* import NewType from './pages/NewType'
import SignIn from './pages/SignIn'
import GetCompanies from './pages/GetCompanies'
import CreateCompany from './pages/CreateCompany'
import GetPlates from './pages/GetPlates'
import CreatePlate from './pages/CreatePlate'  */

import userActions from './redux/actions/userActions'

import './styles/styles.css'

export default function App() {

    const user = useSelector(store => store.userReducer.user)
    console.log(user)
    const dispatch = useDispatch()

    useEffect(() => {
        if(localStorage.getItem('token')!== null) {
            const token = localStorage.getItem("token")
            dispatch(userActions.verifyToken(token))
        }
    },[])

    return (
        <div className='index'>
            <NavBar />
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/nueva" element={<SelectCompany />} />
                <Route path="/nueva/:id" element={<SelectColor />} />
                <Route path="/nueva/color/:id" element={<SelectType />} />
                <Route path="/nueva/color/tipo/:id" element={<SelectData />} />
                <Route path="/stock" element={<Stock />} />
{/*                <Route path="/nueva/placa" element={<NewPlate />} />
                <Route path="/signin" element={<SignIn options={options.signIn} />} />
                <Route path="/getCompanies" element={<GetCompanies options={options.company} />} />
                <Route path="/createCompany" element={<CreateCompany options={options.company} />} />
                <Route path="/createdCompany" element={<VariantPage text={"COMPANY CREATED!"} back={{to: "getCompanies",text: "show companies"}} />} />
                <Route path="/getPlates" element={<GetPlates options={options.company} />} /> */}
                {/* <Route path="/createPlate" element={<CreatePlate options={options.company} />} /> */}
                <Route path="/*" element={<VariantPage text={"NOT FOUND"}  back={{to: "",text: "back to home"}}/>} />
            </Routes>
            <MySnackBar />
        </div>
    )
}