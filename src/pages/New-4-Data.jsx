import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import plateActions from "../redux/actions/plateActions";
import stockActions from "../redux/actions/stockActions";
import codeActions from "../redux/actions/codeActions";
import Container from "../components/Container";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function SelectData() {
  let plate = useSelector((store) => store.new.plate);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lot = useRef();
  const comments = useRef();
  const [inputs, setInputs] = useState([{ codigo: "", typeCode: "" }]);

  const addInput = () => {
    if (inputs.length <= 10) {
      setInputs([...inputs, { codigo: "", typeCode: "" }]);
    }
  };

  const deleteInput = (index) => {
    const fields = inputs;
    fields.splice(index, 1);
    setInputs([...inputs]);
  };

  const datos = (value, index, key) => {
    const fields = inputs;
    fields[index][key] = value.target.value;
    setInputs([...inputs]);
  };

  async function creatingPlate(event) {
    event.preventDefault();
    const listaIdPlate = [];
    for (let i = 0; i < inputs.length; i++) {
      plate.lot = lot?.current.value.trim();
      plate.done = false;
      console.log("plate<<<<<<<<<", plate);
      const resPlate = await dispatch(plateActions.createPlate(plate));
      console.log(
        "🚀 ~ file: New-4-Data.jsx ~ line 53 ~ creatingPlate ~ resPlate",
        resPlate
      );
      // .then(()=>navigate("/", { replace: true }))
      listaIdPlate.push(resPlate._id);
      console.log("listaaIdPLATE", listaIdPlate);
      creatingStock(listaIdPlate);
    }
  }
  async function creatingStock(lis) {
    console.log(
      "🚀 ~ file: Johnson-4-Data.jsx ~ line 181 ~ creatingStock ~ l",
      lis
    );
    let dataPlate = [{ plate: "", stock: "" }];
    const dataStockId = [];
    for (let i = 0; i < lis.length && lis.length; i++) {
      dataPlate[i] = {
        plate: lis[i],
        stock: 1,
      };
      console.log(
        "🚀 ~ file: Johnson-4-Data.jsx ~ line 234 ~ creatingStock ~ dataPLATE",
        dataPlate
      );
      const idStock = await dispatch(stockActions.createStock(dataPlate[i]));
      console.log(
        "🚀 ~ file: New-4-Data.jsx ~ line 72 ~ creatingStock ~ idPlate",
        idStock
      );

      dataStockId.push(idStock);
      console.log(
        "🚀 ~ file: New-4-Data.jsx ~ line 75 ~ creatingStock ~ dataStockId",
        dataStockId
      );
    }
    creatingCode(dataStockId);
  }
  async function creatingCode(dataStockId) {
    let dataCode = {};
    for (let i = 0; i < dataStockId.length; i++) {
      if (inputs[i].typeCode === "interno") {
        dataCode = {
        internal : inputs[i].codigo,
        note : null,
        stock: dataStockId[i],
        comments : comments?.current?.value.trim(),
        done: false
      }
      } else if (inputs[i].typeCode === "pedido") {
        dataCode = {
          internal :null ,
          note :inputs[i].codigo,
          stock: dataStockId[i],
          comments : comments?.current?.value.trim(),
          done: false
        }
      }
      await dispatch(codeActions.createCode(dataCode));
      console.log("dataCode", dataCode);
    }
    navigate("/", { replace: true });
  }

  return (
    <Container grow="1" wrap="wrap" bgColor="rgb(224,224,224)">
      <Container width="100%" justify="space-evenly" align="center" wrap="wrap">
        <div className="containerForm">
          <div className="mask2">
            <form onSubmit={creatingPlate} className="form">
              <h1 className="titleForm">CARGAR PLACA</h1>
              <div className="containerDatosForm">
                <div className="mb10 flex">
                  <label htmlFor="lote" className="input-label">
                    LOTE:{" "}
                  </label>
                  <input
                    className="inputCodigo inputGrow"
                    id="lote"
                    type="text"
                    ref={lot}
                    required
                  />
                </div>
                <button
                  type="button"
                  className="btnAdd mb10"
                  onClick={addInput}
                >
                  agregar codigo
                </button>
                {inputs.map((cant, index) => (
                  <div key={index} className="cajaCheck mb10">
                    <div className="flex inputGrow mb10-lit">
                      <label className="input-label">{`ID${index + 1}`}</label>
                      <input
                        className="inputCodigo inputGrow"
                        id={`codigo-${index + 1}`}
                        name="codigo"
                        value={cant.codigo}
                        onChange={(e) => datos(e, index, "codigo")}
                        required
                      />
                    </div>
                    <div className="flex inputGrow center">
                      <label className="ml10 labelCheck">
                        <input
                          type="radio"
                          id={`interno-${index + 1}`}
                          name={`typeCode${index + 1}`}
                          value="interno"
                          required
                          onChange={(e) => datos(e, index, "typeCode")}
                        />
                        Cod Interno
                      </label>
                      <label className="ml10 labelCheck">
                        <input
                          type="radio"
                          id={`pedido-${index + 1}`}
                          name={`typeCode${index + 1}`}
                          value="pedido"
                          required
                          onChange={(e) => datos(e, index, "typeCode")}
                        />
                        Nota de Pedido
                      </label>
                      <button
                        className="ml10 btnDelet"
                        type="button"
                        onClick={() => deleteInput(index)}
                      >
                        <DeleteForeverIcon className="iconDelet" />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mb10 flex">
                  <label htmlFor="comentario" className="input-label">
                    COMENTARIO:{" "}
                  </label>
                  <input
                    className="inputCodigo inputGrow"
                    id="comentario"
                    type="text"
                    ref={comments}
                  />
                </div>
              </div>
              <input
                type="submit"
                required
                value="ingresar"
                className="btnForm "
              />
            </form>
          </div>
        </div>
      </Container>
    </Container>
  );
}
