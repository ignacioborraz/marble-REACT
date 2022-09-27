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
import StockInternalPlates from './pages/Stock-1-internal'
import StockNotePlates from './pages/Stock-2-note'
import StockDonePlates from './pages/Stock-3-done'
import SelectCompanyEditPlate from './pages/EditPlate-1-Company'
import EditPlateType from './pages/EditPlate-2-type'
import EditPlate from './pages/EditPlate-3-plate'
import EditPlateTypeModif from './pages/EditPlate-4-modif'
import StockInternalDetail from './pages/Stock-1-Detail'
import JohnsonMenu from './pages/Johnson-0'
import JohnsonType from './pages/Johnson-1-type'
import JohnsonModel from './pages/Johnson-2-model'
import JohnsonAccesory from './pages/Johnson-3-accesory'
import JohnsonData from './pages/Johnson-4-Data'


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
                    <Route path="/stock/plates/internal" element={<StockInternalPlates />} />
                    <Route path="/stock/plates/internal/detail/:id" element={<StockInternalDetail/>} />
                    <Route path="/stock/plates/note" element={<StockNotePlates />} />
                    <Route path="/stock/plates/done" element={<StockDonePlates />} />
                    <Route path="/editPlate" element={<SelectCompanyEditPlate />} />
                    <Route path="/editPlate/type/:id" element={<EditPlateType />} />
                    <Route path='/editPlate/plate' element={<EditPlate/>}/>
                    <Route path="/editPlate/type/color/:id" element={<EditPlateTypeModif/>} />
                    <Route path="/johnson" element={<JohnsonMenu/>} />
                    <Route path="/johnson/new" element={<JohnsonType/>} />
                    <Route path="/johnson/new/:type" element={<JohnsonModel/>} />
                    <Route path="/johnson/new/accesory" element={<JohnsonAccesory/>} />
                    <Route path="/johnson/new/type/accesory/data" element={<JohnsonData/>} />
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