import { useRef } from 'react'
import React, { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import plateActions from '../redux/actions/plateActions'
import Container from '../components/Container'
import Text from '../components/Text'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
export default function SelectType() {

   const navigate = useNavigate()
   const lot = useRef()
   const comments = useRef()
   // const codigo = useRef()
   const dispatch = useDispatch()
   //let inputs = []
   const [cant, setCant] = useState("");
   const [cantData, setData] = useState([]);
   console.log("🚀 ~ file: New-4-Data.jsx ~ line 23 ~ SelectType ~ cantData", cantData)
   //const types = useSelector(store => store.typeReducer.types)

   /*     function charge(event) {

           setNumber(event.target.value)
           inputs = []
           for (let i=0; i<number; i++) {
               inputs.push(i)
           }
       } */


   console.log("🚀 ~ file: New-4-Data.jsx ~ line 31 ~ SelectType ~ cant", cant)

   const handleChange = (event) => {
      setCant(event.target.value);
      checksCant(event.target.value)

   };
   const checksCant = (cant) => {
      let lista = [];
      for (let i = 1; i <= cant; i++) {
         lista.push({i})
         console.log("🚀 ~ file: New-4-Data.jsx ~ line 48 ~ checksCant ~ i", i.value)
         setData(lista)
         console.log(lista)
         
      }

   }
   async function creatingPlate(event) {
      console.log(event)
      const dataCodigos = {
         codigo: event.target[3].value,
         cbox1: event.target[4].value,

      }
      console.log("🚀 ~ file: New-4-Data.jsx ~ line 60 ~ creatingPlate ~ dataCodigos", dataCodigos)
      event.preventDefault()
      let plate = JSON.parse(localStorage.getItem('plate'))
      plate.lot = lot?.current.value.trim()
      plate.comments = comments?.current.value.trim()
      //plate.codigo = codigo?.current.value.trim()
      //localStorage.setItem('plate',JSON.stringify(plate))
      //console.log(JSON.parse(localStorage.getItem('plate')))
      await dispatch(plateActions.createPlate(plate))
      console.log("🚀 ~ file: New-4-Data.jsx ~ line 60 ~ creatingPlate ~ plate", plate)
         .then(navigate("/", { replace: true }))
   }

   return (
      <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)' >
         <Container width='100%' justify='space-evenly' align='center' wrap='wrap'>
            <div className="containerForm">
               <div className='mask2'>
                  <form onSubmit={creatingPlate} className="form" >
                     <h1 className='titleForm'>CARGAR PLACA</h1>
                     <div className='containerDatosForm'>


                        {/* <input type='number' onChange={charge}/> */}
                        <div className='mb10'>
                           <label htmlFor='lote'>LOTE: </label>
                           <input id='lote' type='text' ref={lot} />
                        </div>
                        <div className='mb10'>
                           <label htmlFor='comentario'>COMENTARIO: </label>
                           <input id='comentario' type='text' ref={comments} />
                        </div>

                        <Box className='hidden md:block'>

                           <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                              <InputLabel id="demo-simple-select-label" className='inputMui' >CANTIDAD</InputLabel>
                              <Select
                                 labelId="demo-simple-select-label"
                                 id="demo-simple-select"
                                 value={cant}
                                 label="Cantidad"
                                 onChange={handleChange}
                                 className="selectCant"
                              >
                                 <MenuItem value=""><em>None</em></MenuItem>
                                 <MenuItem value={1}>1</MenuItem>
                                 <MenuItem value={2}>2</MenuItem>
                                 <MenuItem value={3}>3</MenuItem>
                                 <MenuItem value={4}>4</MenuItem>
                                 <MenuItem value={5}>5</MenuItem>
                                 <MenuItem value={6}>6</MenuItem>
                                 <MenuItem value={7}>7</MenuItem>
                                 <MenuItem value={8}>8</MenuItem>
                                 <MenuItem value={9}>9</MenuItem>
                                 <MenuItem value={10}>10</MenuItem>
                              </Select>
                           </FormControl>
                        </Box>

                        {
                           cantData.map((cant, index) =>
                              <div key={index} className='mb10' >
                                 <label htmlFor='comentario'>CODIGO: </label>
                                 <input id='codigo' type='text' />
                                 <label className='ml10 labelCheck'><input type="checkbox" id="cbox1" value={true} />Cod.Interno</label>
                                 <label className='ml10 labelCheck'><input type="checkbox" id="cbox2" value={true} />Nota del Pedido </label>
                              </div>
                           )
                        }

                     </div>
                     <input type="submit" required value='ingresar' className='btnForm ' />
                  </form>

               </div>

            </div>


            {/*                 <LinkRouter className='linkTypes' to={'/listo'} onClick={creatingPlate} key={everyType._id} id={everyType._id}>
                        <Text variant='h4' font='Paytone One' color='rgb(25,25,25)' padding='5px' id={everyType._id}>
                            {everyType.name}
                        </Text>
                        <Text variant='h6' color='rgb(25,25,25)' padding='5px' id={everyType._id}>
                            {everyType.width} × {everyType.height}
                        </Text>
                    </LinkRouter> */}
         </Container>
      </Container >
   )

}