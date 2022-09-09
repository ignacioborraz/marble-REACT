import { useRef } from 'react'
import React, { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import plateActions from '../redux/actions/plateActions'
import Container from '../components/Container'

export default function SelectType() {

  const navigate = useNavigate()
  const lot = useRef()
  const comments = useRef()

  const dispatch = useDispatch()
  const [inputs, setInputs] = useState([
    {
      codigo: "",
      typeCode: "",
    }
  ]);

  const addInput = () => {

    if (inputs.length >= 10) {
      console.log("ya no se puede agregar mas")
    }
    else {
      setInputs([...inputs, {
        codigo: "",
        typeCode: "",
      }
      ])
    }
  }

  const deleteInput = (index) => {
    const fields = inputs
    fields.splice(index, 1)
    setInputs([...inputs])
  }

  const datos = (value, index, key) => {
    const fields = inputs
    fields[index][key] = value.target.value;
    setInputs([...inputs])
  }
  console.log("🚀 ~ file: New-4-Data.jsx ~ line 79 ~ SelectType ~ inputs", inputs)


  async function creatingPlate(event) {
    event.preventDefault()
    for (let i = 0; i < inputs.length; i++) {
      let plate = JSON.parse(localStorage.getItem('plate'))
      plate.lot = lot?.current.value.trim()
      plate.comments = comments?.current.value.trim()
      plate.done = false

      if (inputs[i].typeCode === "interno") {
        plate.internal = inputs[i].codigo
        plate.note = null
        console.log("es internoooo")
      }
      else if (inputs[i].typeCode === "pedido") {
        plate.note = inputs[i].codigo
        plate.internal = null
        console.log("es pedidooo")
      }

      localStorage.setItem('plate', JSON.stringify(plate))
      console.log(plate)
      await dispatch(plateActions.createPlate(plate))
    }
    (navigate("/", { replace: true }))
  }

  return (
    <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)' >
      <Container width='100%' justify='space-evenly' align='center' wrap='wrap'>
        <div className="containerForm">
          <div className='mask2'>
            <form onSubmit={creatingPlate} className="form" >
              <h1 className='titleForm'>CARGAR PLACA</h1>
              <div className='containerDatosForm'>

                <div className='mb10 '>
                  <label htmlFor='lote'>LOTE: </label>
                  <input id='lote' type='text' ref={lot} required />
                </div>
                <div className='mb10 '>
                  <label htmlFor='comentario'>COMENTARIO: </label>
                  <input id='comentario' type='text' ref={comments} />
                </div>
                <button type='button' className='btnAdd' onClick={addInput}>agregar codigo</button>

                {
                  inputs.map((cant, index) =>
                    <div key={index} className='mb10 cajaCheck' >
                      <div>
                        <label>{`Codigo${index + 1}`}</label>
                        <input className='inputCodigo' id={`codigo-${index + 1}`} name='codigo' value={cant.codigo} onChange={(e) => datos(e, index, 'codigo')} required />

                      </div>

                      <label className='ml10 labelCheck' >
                        <input type="radio" id={`interno-${index + 1}`} name={`typeCode${index + 1}`} value='interno' required onChange={(e) => datos(e, index, 'typeCode')} />Cod.Interno</label>
                      <label className='ml10 labelCheck' >
                        <input type="radio" id={`pedido-${index + 1}`} name={`typeCode${index + 1}`} value='pedido' required onChange={(e) => datos(e, index, 'typeCode')} />Nota del Pedido </label>
                      <button className='btnDelet' type='button' onClick={() => deleteInput(index)} ><DeleteForeverIcon className='iconDelet' /></button>

                    </div>
                  )
                }

              </div>
              <input type="submit" required value='ingresar' className='btnForm ' />
            </form>

          </div>

        </div>

      </Container>
    </Container >
  )

}