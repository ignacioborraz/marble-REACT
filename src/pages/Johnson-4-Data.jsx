import { useRef } from 'react'
import React, { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import johnsonActions from '../redux/actions/johnsonActions';
import Container from '../components/Container'

export default function JohnsonData() {

  const navigate = useNavigate()
  const comments = useRef()
  let sink = JSON.parse(localStorage.getItem('sink'))
  const johnson = sink.johnson
  console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 16 ~ JohnsonData ~ johnson", johnson)
  const dispatch = useDispatch()
  const [codigo, setCodigo] = useState("")
  const [instalation, setInstalation] = useState("instalacion lateral")
  console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 20 ~ JohnsonData ~ instalation", instalation)
  console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 18 ~ JohnsonData ~ codigo", codigo)
  const [typeCode, setTypeCode] = useState("")
  console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 19 ~ JohnsonData ~ type", typeCode)
  const [inputs, setInputs] = useState([
    {
      codigo: "",
      typeCode: "",
    }
  ]);
  useEffect(() => {
    dispatch(johnsonActions.getOneJohnson(johnson))
    // eslint-disable-next-line
  }, [])

  const johnsonSelect = useSelector(store => store.johnsonReducer.oneJohnson)
  console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 34 ~ JohnsonData ~ johnsonSelect", johnsonSelect)

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


  async function creatingSink(event) {
    event.preventDefault()
    let sink = JSON.parse(localStorage.getItem('sink'))
    sink.comments = comments?.current.value.trim()
    sink.done = false
    sink.instalation = instalation
    if (typeCode === "interno") {
      sink.internal = codigo
      sink.note = null
      console.log("es internoooo")
    }
    else if (typeCode === "pedido") {
      sink.note = codigo
      sink.internal = null
      console.log("es pedidooo")
    }

    localStorage.setItem('sink', JSON.stringify(sink))
    console.log(sink)
    await dispatch(johnsonActions.createSink(sink))

    // (navigate("/", { replace: true }))
  }

  return (
    <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)' >
      <Container width='100%' justify='space-evenly' align='center' wrap='wrap'>
        <div className="containerForm formSink">
          <div className='mask2'>
            <form onSubmit={creatingSink} className="form" >
              <h1 className='titleForm'>CARGAR PILETA</h1>
              <div className='containerDatosForm'>

                <div className='mb10 cajaCheck' >
                  <div>
                    <label>Codigo</label>
                    <input className='inputCodigo' id={"codigo"} name='codigo' onChange={(e) => setCodigo(e.target.value)} required />
                  </div>
                  <label className='ml10 labelCheck' >
                    <input type="radio" id={`interno`} name={`typeCode`} value='interno' required onChange={(e) => setTypeCode(e.target.value)} />Cod.Interno</label>
                  <label className='ml10 labelCheck' >
                    <input type="radio" id={`pedido`} name={`typeCode`} value='pedido' required onChange={(e) => setTypeCode(e.target.value)} />Nota del Pedido </label>

                </div>
                {
                  johnsonSelect.instalation.length > 0 ?
                    (
                      <div className='mb10 cajaCheck' >

                        <div>
                          <label>Instalacion:</label>
                        </div>
                        {
                          johnsonSelect.instalation?.map((op, index) =>
                            <label key={index} className='ml10 labelCheck' >
                              <input type="radio" id={`instalation-${index + 1}`} name={`instalation`} value={op} required onChange={(e) => setInstalation(e.target.value)} />{op}
                            </label>
                          )
                        }

                      </div>

                    ) : null
                }


                <div className='mb10 '>
                  <label htmlFor='comentario'>COMENTARIO: </label>
                  <input className='inputCodigo' id='comentario' type='text' ref={comments} />
                </div>

                {/* <button type='button' className='btnAdd' onClick={addInput}>agregar codigo</button>

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
                } */}

              </div>
              <input type="submit" required value='ingresar' className='btnForm ' />
            </form>

          </div>

        </div>

      </Container>
    </Container >
  )

}