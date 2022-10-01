import { useEffect } from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import companyActions from '../redux/actions/companyActions'
import Container from '../components/Container'
export default function EditPlateType() {
    function creatingPlate(event) {
        let plate = JSON.parse(localStorage.getItem('editPlate'))
        plate.type = event.currentTarget.id
        localStorage.setItem('editPlate', JSON.stringify(plate))
    }
    return (
        <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)'>
            <Container width='100%' justify='space-evenly' align='center' wrap='wrap'>
            
                    <LinkRouter className='linkTypes  mr10 mb10' to={'/editPlate/plate'} onClick={creatingPlate} id="placaEntera">
                        <div className="Standard bgType">
                            <div className='mask'>
                                <h1 className='titleCard'>Placa Entera</h1>
                                
                            </div>
                        </div>
                    </LinkRouter>
                    <LinkRouter className='linkTypes  mr10 mb10' to={'/editPlate/plate'} onClick={creatingPlate} id="escuadra">
                        <div className="Jumbo bgType">
                            <div className='mask'>
                                <h1 className='titleCard'>Escuadra</h1>
                                
                            </div>
                        </div>
                    </LinkRouter>
                    <LinkRouter className='linkTypes  mr10 mb10' to={'/editPlate/plate'} onClick={creatingPlate} id="mayor50">
                        <div className="Jumbo bgType">
                            <div className='mask'>
                                <h1 className='titleCard'>Mayor a 50cm</h1>
                                
                            </div>
                        </div>
                    </LinkRouter>
                    <LinkRouter className='linkTypes  mr10 mb10' to={'/editPlate/plate'} onClick={creatingPlate} id="menor50">
                        <div className="Standard bgType">
                            <div className='mask'>
                                <h1 className='titleCard'>Menor a 50cm</h1>
                                
                            </div>
                        </div>
                    </LinkRouter>
                    
            
                
            </Container>
        </Container>
    )

}