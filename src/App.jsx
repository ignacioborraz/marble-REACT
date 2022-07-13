import {Route,Routes} from 'react-router-dom'

import Index from './pages/Index'
import VariantPage from './pages/VariantPage'
import GetCompanies from './pages/GetCompanies'
import CreateCompany from './pages/CreateCompany'
import GetPlates from './pages/GetPlates'
import CreatePlate from './pages/CreatePlate'

import NavBar from './components/NavBar'
import Footer from './components/Footer'
import MySnackBar from './components/MySnackBar'

import options from './media/options'
import optionsNav from './media/optionsNav'

import './styles/styles.css'

export default function App() {

    return (
        <div className='index'>
            <NavBar pages={optionsNav.non}/>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/getCompanies" element={<GetCompanies options={options.company} />} />
                <Route path="/createCompany" element={<CreateCompany options={options.company} />} />
                <Route path="/createdCompany" element={<VariantPage text={"COMPANY CREATED!"} back={{to: "getCompanies",text: "show companies"}} />} />
                <Route path="/getPlates" element={<GetPlates options={options.company} />} />
                <Route path="/createPlate" element={<CreatePlate options={options.company} />} />
                <Route path="/*" element={<VariantPage text={"NOT FOUND"}  back={{to: "",text: "back to home"}}/>} />
            </Routes>
            <MySnackBar />
            <Footer />
        </div>
    )
}