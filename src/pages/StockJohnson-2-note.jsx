import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import sinkActions from "../redux/actions/sinkActions";
import companyActions from "../redux/actions/companyActions";
import Chip from "@mui/material/Chip";
import johnsonActions from "../redux/actions/johnsonActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import stockActions from "../redux/actions/stockActions";
import codeActions from "../redux/actions/codeActions";
import colorActions from "../redux/actions/colorActions";
import plateActions from "../redux/actions/plateActions";
import Container from "../components/Container";

export default function StockNoteJohnson() {
  const dispatch = useDispatch();
  const [inputSearch, setInputSearch] = useState("");
  const [reload, setReload] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAcc, setOpenAcc] = useState(false);
  const [typeA, setTypeA] = useState(false);
  const [typePlate, setTypePlate] = useState(false);
  const [openJson, setOpenJson] = useState(false);
  const [instalationType, setInstalationType] = useState(false);

  const [itemModif, setItemModif] = useState(""); //index sink
  const [indexStock, setIndexStock] = useState("");
  const [idDelet, setIdDelet] = useState("");
  const [id, setId] = useState(""); //id stock
  const [sinks, setSinks] = useState([]);
  const [comment, setComment] = useState("");
  const [accesories, setAccesories] = useState([]);
  const [accesorysAdd, setAccesorysAdd] = useState([]);
  const [instalation, setInstalation] = useState([]);
  const [typeInstalation, setTypeInstalation] = useState([]);
  const [clase, setClase] = useState([]); //clase para btn editar
  const [clasePlaca, setClasePlacas] = useState([]); //clase para ver placas
  const [newJohnson, setNewJohnson] = useState("");
  const [idDeletStock, setIdDeletStock] = useState("");
  const [cantStockDelet, setCantStockDelet] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newColor, setNewColor] = useState("");
  const [openColorModal, setOpenColorModal] = useState(false);

  console.log(
    "🚀 ~ file: StockJohnson-2-note.jsx ~ line 32 ~ StockNoteJohnson ~ sinks",
    sinks
  );
  useEffect(() => {
    dispatch(codeActions.noteCode());
    dispatch(johnsonActions.getAccesory());
    dispatch(companyActions.getCompanies());
    // eslint-disable-next-line
  }, [reload]);
  useEffect(() => {
    dispatch(codeActions.filterNoteCode(inputSearch));
    // eslint-disable-next-line
  }, [inputSearch, reload]);

  let noteCode = useSelector((store) => store.codeReducer.internalCode);
  let filterNoteCode = useSelector((store) => store.codeReducer.filterNoteCode);
  const accesoriesList = useSelector((store) => store.johnsonReducer.accesorys);
  const companies = useSelector((store) => store.companyReducer.companies);

  const handleClickOpenAlert = (idCode, idStock, cantStock) => {
    setIdDelet(idCode);
    setIdDeletStock(idStock);
    setCantStockDelet(cantStock);
    setOpenAlert(true);
  };
  const handleCloseDelet = () => {
    setOpenAlert(false);
  };
  const handleClose = () => {
    setOpen(false);
    //setOpenAcc(false)
  };
  const handleChangeInsta = (event) => {
    const {
      target: { value },
    } = event;
    setInstalation(typeof value === "string" ? value.split(",") : value);
  };
  //Activa y setea datos
  const editFields = (item, itemStock, id, listSinks, comments) => {
    console.log(
      "🚀 ~ file: StockJohnson-2-note.jsx ~ line 142 ~ editFields ~ item",
      item
    );
    let list = [];
    for (let i = 0; i < filterNoteCode.length; i++) {
      list.push({ listaClases: [] });
      filterNoteCode[i].stock.map(() =>
        list[i].listaClases.push({ clase: "" })
      );
    }

    console.log("🍄~ list", list);
    for (let i = 0; i < list.length; i++) {
      if (i === item) {
        list[i].listaClases[itemStock].clase = "divEdit";
      }
    }
    setIndexStock(item);
    setClase(list);
    setId(id);
    setSinks(listSinks);
    setComment(comments);
    setReload(!reload);
  };
  const verPlacas = (item) => {
    let list = [];
    filterNoteCode.map((elem) => list.push({ clase: "" }));
    for (let i = 0; i < list.length; i++) {
      if (i === item) {
        if (clasePlaca[i]?.clase === "edi") {
          setClasePlacas([]);
        } else {
          list[i].clase = "edi";
        }
      }
    }
    setClasePlacas(list);
    setReload(!reload);
  };
  console.log("clasePlaca======>", clasePlaca);
  //captura y guarda datos en sinks
  const datos = (value, position, key) => {
    console.log(
      "🚀 ~ file: StockJohnson-2-note.jsx ~ line 116 ~ datos ~ position",
      position
    );
    console.log(
      "🚀 ~ file: Johnson-4-Data.jsx ~ line 129 ~ datos ~ value",
      value
    );
    let fields = sinks;
    if (key === "jhonson" || key === "accesories" || key === "instalation") {
      fields[position].sink[key] = value;
    } else if (key === "color" || key === "company") {
      fields[position].plate[key] = value;
    } else {
      fields[position][key] = value?.target?.value || value;
    }

    setSinks([...sinks]);
    setOpenJson(false);
    setInstalationType(false);
    setOpenColorModal(false);
    setReload(!reload);
  };
  //elimina item Stock o Code
  async function delet(idCode, idStock, cantStock) {
    if (cantStock === 1) {
      await dispatch(codeActions.deleteCode(idCode));
    } else {
      await dispatch(stockActions.deleteStock(idStock));
    }
    setOpenAlert(false);
    setReload(!reload);
  }
  //tipo de acero
  const openType = (position, johnson) => {
    setItemModif(position);
    setNewJohnson(johnson);
    setTypeA(true);
  };
  ////plate
  const openTypePlate = (itemStock, typeComp, color) => {
    setItemModif(itemStock);
    setNewCompany(typeComp);
    setNewColor(color);
    setTypePlate(true);
  };
  const modifColor = (idCompany, color, itemStock) => {
    setItemModif(itemStock);
    setNewColor(color);
    openColor(idCompany);
  };
  async function openColor(type) {
    await dispatch(colorActions.getColors(type, ""));
    setOpenColorModal(true);
    setTypePlate(false);
    setReload(!reload);
  }
  const listColor = useSelector((store) => store.colorReducer?.colors);

  const cargaPlate = () => {
    if (newCompany !== "") {
      datos(newCompany, itemModif, "company");
    }
    datos(newColor, itemModif, "color");
    setOpenColorModal(false);
    setReload(!reload);
  };
  ///////////////////////
  const closeType = () => {
    setTypeA(false);
  };
  //piletas johnson
  async function openJohnson(type) {
    console.log(
      "🚀 ~ file: Johnson-4-Data.jsx ~ line 112 ~ openJohnson ~ type",
      type
    );
    await dispatch(johnsonActions.getJohnsonType(type));
    setOpenJson(true);
    setTypeA(false);
    setReload(!reload);
  }
  const listJSON = useSelector((store) => store.johnsonReducer.johnsonType);
  // console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 152 ~ StockNoteJohnson ~ listJSON", listJSON)
  //Modif. instalacion
  //Instalacion tipos
  const cargaJohnson = () => {
    datos(newJohnson, itemModif, "jhonson");
    setOpenAcc(false);
    setReload(!reload);
  };
  const openInstalationType = (position, listInstalacion) => {
    setItemModif(position);
    setInstalationType(true);
    setInstalation(listInstalacion);
    setTypeInstalation(sinks[position].sink.jhonson.instalation); //carga los tipos disponibles de instalacion que tenga ese sink
  };
  //agragar Accesorios
  const handleClickAccesorios = (ind, listAcc) => {
    setOpenAcc(true);
    setItemModif(ind);
    setAccesories(listAcc);
    let ac = [];
    listAcc.forEach((element) => {
      ac.push(element._id);
    });
    console.log(ac);
    setAccesorysAdd(ac); //solo los id de los accesorios
  };
  const addAccesory = (id, elem) => {
    if (accesorysAdd.includes(id)) {
      console.log("ya esta en la lista");
      setAccesorysAdd(accesorysAdd.filter((x) => x !== id));
      setAccesories(accesories.filter((x) => x._id !== elem._id));
    } else {
      setAccesorysAdd([...accesorysAdd, id]);
      setAccesories([...accesories, elem]);
      console.log("agregado");
    }
  };
  const cargaAccSinks = (listaAcc, position) => {
    datos(listaAcc, position, "accesories");
    setOpenAcc(false);
    setReload(!reload);
  };
  async function modificar(key, indexSink) {
    console.log(
      "🚀 ~ file: StockJohnson-1-internal.jsx ~ line 253 ~ modificar ~ indexSink",
      indexSink
    );
    console.log(
      "🚀 ~ file: StockJohnson-1-internal.jsx ~ line 253 ~ modificar ~ key",
      key
    );
    let data = {};
    data = {
      comments: comment,
    };
    if (key === "sink") {
      if (sinks[indexSink].sink?.jhonson?.instalation?.length === 0) {
        datos(["instalacion lateral"], indexSink, "instalation");
      }
      datos(sinks[indexSink].sink?.jhonson?._id, indexSink, "jhonson"); //me pasa solo el id de jhonson
      const listaIdAccesories = [];
      sinks[indexSink].sink.accesories.map((acc) =>
        listaIdAccesories.push(acc._id)
      );
      datos(listaIdAccesories, indexSink, "accesories"); //me pasa solo los id de accesories
      await dispatch(
        sinkActions.putSink(sinks[indexSink].sink._id, sinks[indexSink].sink)
      );
      let dataStock = {
        stock: sinks[indexSink].stock,
      };
      await dispatch(stockActions.putStock(sinks[indexSink]._id, dataStock));
      await dispatch(codeActions.putCode(id, data));
      setReload(!reload);
    }

    if (key === "plate") {
      datos(sinks[indexSink].plate?.company?._id, indexSink, "company");
      datos(sinks[indexSink].plate?.color?._id, indexSink, "color");
      await dispatch(
        plateActions.putPlate(
          sinks[indexSink].plate._id,
          sinks[indexSink].plate
        )
      );
      let dataStock = {
        stock: sinks[indexSink].stock,
      };
      await dispatch(stockActions.putStock(sinks[indexSink]._id, dataStock));
      await dispatch(codeActions.putCode(id, data));
    }
    setClase([]);
    setReload(!reload);
  }
  async function entregarStock(idCode) {
    console.log(
      "🚀 ~ file: StockJohnson-2-note.jsx ~ line 208 ~ entregarStock ~ idStock",
      idCode
    );
    let data = {
      done: true,
    };
    await dispatch(codeActions.putCode(idCode, data));
    setClase([]);
    setReload(!reload);
  }

  return (
    <div className="containerStock">
      <div className="containerNameStock vendidas">
        <h1 className="titleStock">Vendidas</h1>
      </div>

      <div className="containerInput">
        <input
          className="input inputStock inputSink  inputAlignCenter"
          type="text"
          placeholder="Buscar por codigo"
          onChange={(e) => setInputSearch(e.target.value)}
        />
      </div>
      {filterNoteCode.map((code, index) => (
        <div key={code._id} className="boxStockCard">
          {
            code.stock[0]?.sink || code.stock[1]?.sink ?
              (<div className='boxStockCard-note'>
                <h3>Nota</h3>
                <h3 className='h3Nota'>{code.note}</h3>
              </div>)
              : null

          }
          <div className="boxStockCard-containerSink">
            {code.stock.map((stock, indexSink) =>
              stock.sink ? (
                <div key={stock._id} className="boxStockCard-sink">
                  <img
                    src={stock.sink?.jhonson?.photo}
                    alt={stock._id}
                    className="boxStockCard-photo"
                    id={stock._id}
                  />
                  <div className="boxStockCard-data">
                    <table className="table-fill">
                      <tbody className="table-hover">
                        <tr>
                          <td className="text-left1">Cantidad</td>
                          <td className="text-left">
                            <div
                              className={
                                clase[index]?.listaClases[indexSink].clase
                              }
                              onInput={(event) =>
                                datos(
                                  event.currentTarget.textContent,
                                  indexSink,
                                  "stock"
                                )
                              }
                              contentEditable
                              suppressContentEditableWarning={true}
                            >
                              {stock.stock}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-left1">Modelo</td>
                          <td className="text-left">
                            <div className="divBtntdEdit">
                              <div>{stock.sink?.jhonson?.code}</div>
                              <button
                                className={
                                  clase[index]?.listaClases[indexSink].clase
                                    ? "btnModificar"
                                    : "displeyNone"
                                }
                                onClick={() =>
                                  openType(indexSink, stock.sink.jhonson)
                                }
                              >
                                Cambiar
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-left1">Accesorios</td>
                          <td className="text-left">
                            <div className="divBtntdEdit">
                              <div>
                                {stock.sink?.accesories?.map((i, index) => (
                                  <span key={index}>{i.code + " - "}</span>
                                ))}
                              </div>
                              <button
                                className={
                                  clase[index]?.listaClases[indexSink].clase
                                    ? "btnModificar"
                                    : "displeyNone"
                                }
                                onClick={() =>
                                  handleClickAccesorios(
                                    indexSink,
                                    stock.sink.accesories
                                  )
                                }
                              >
                                Agregar
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-left1">Instalacion</td>
                          <td className="text-left">
                            <div className="divBtntdEdit">
                              <div>
                                {stock.sink?.instalation?.map((i, index) => (
                                  <span key={index}>{i + " - "}</span>
                                ))}
                              </div>
                              <button
                                className={
                                  clase[index]?.listaClases[indexSink].clase
                                    ? "btnModificar"
                                    : "displeyNone"
                                }
                                onClick={() =>
                                  openInstalationType(
                                    indexSink,
                                    stock.sink.instalation
                                  )
                                }
                              >
                                Cambiar
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-left1">Comentarios</td>
                          <td className="text-left">
                            <div
                              className={
                                clase[index]?.listaClases[indexSink].clase
                              }
                              onInput={(event) =>
                                setComment(event.currentTarget.textContent)
                              }
                              contentEditable
                              suppressContentEditableWarning={true}
                            >
                              {code.comments}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="boxStockCard-botones">
                      <button
                        onClick={() => modificar("sink", indexSink)}
                        className={
                          clase[index]?.listaClases[indexSink].clase
                            ? "btnModificarGuardar"
                            : "displeyNone"
                        }
                      >
                        Guardar Cambios
                      </button>
                      <button
                        onClick={() =>
                          editFields(
                            index,
                            indexSink,
                            code._id,
                            code.stock,
                            code.comments,
                            code.note
                          )
                        }
                        className={
                          clase[index]?.listaClases[indexSink].clase
                            ? "displeyNone"
                            : "btnEditar"
                        }
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => entregarStock(code._id)}
                        className="btnEntregar"
                        type="button"
                      >
                        Entregar
                      </button>
                      <button
                        onClick={() =>
                          handleClickOpenAlert(
                            code._id,
                            stock._id,
                            code.stock.length
                          )
                        }
                        className="btnEliminar"
                        type="button"
                      >
                        Eliminar
                      </button>
                      {code.stock.map((e, i) =>
                        e.plate ? (
                          <button
                            key={i}
                            onClick={() => verPlacas(index)}
                            className="btnEditar"
                            type="button"
                          >
                            {clasePlaca[index]?.clase
                              ? "Ocultar placas"
                              : "Ver placas"}{" "}
                          </button>
                        ) : null
                      )}
                    </div>
                  </div>
                </div>
              ) : stock.plate ? (
                <div
                  className={
                    clasePlaca[index]?.clase
                      ? " boxStockCard-sink"
                      : "displeyNone boxStockCard-sink"
                  }
                >
                  <img
                    src={stock.plate?.color?.photo}
                    alt={stock._id}
                    className="boxStockCard-photo"
                    id={stock._id}
                  />
                  <div className="boxStockCard-data">
                    <table className="table-fill">
                      <tbody className="table-hover">
                        <tr>
                          <td className="text-left1">Cantidad</td>
                          <td className="text-left">
                            <div
                              className={
                                clase[index]?.listaClases[indexSink].clase
                              }
                              onInput={(event) =>
                                datos(
                                  event.currentTarget.textContent,
                                  indexSink,
                                  "stock"
                                )
                              }
                              contentEditable
                              suppressContentEditableWarning={true}
                            >
                              {stock.stock}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-left1">Tipo</td>
                          <td className="text-left">
                            <div className="divBtntdEdit">
                              <div>{stock.plate?.company?.nameCompany}</div>
                              <button
                                className={
                                  clase[index]?.listaClases[indexSink].clase
                                    ? "btnModificar"
                                    : "displeyNone"
                                }
                                onClick={() =>openTypePlate(indexSink,stock.plate.company,stock.plate.color)
                                }
                              >
                                Cambiar
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-left1">Color</td>
                          <td className="text-left">
                            <div className="divBtntdEdit">
                              <div>{stock.plate?.color?.name}</div>
                              <button
                                className={
                                  clase[index]?.listaClases[indexSink].clase
                                    ? "btnModificar"
                                    : "displeyNone"
                                }
                                onClick={() =>
                                  modifColor(
                                    stock.plate?.company._id,
                                    stock.plate.color,
                                    indexSink
                                  )
                                }
                              >
                                Cambiar
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-left1">Estado</td>
                          <td className="text-left">
                            <div className="divBtntdEdit">
                              <div>
                                {stock.plate?.state?.state}{" "}
                                {stock.plate?.state?.width} x{" "}
                                {stock.plate?.state?.height}
                              </div>
                              {/* <button className={clase[index]?.listaClases[indexSink].clase ? 'btnModificar' : 'displeyNone'} onClick={() => openInstalationType(indexSink, stock.sink.instalation)}>Cambiar</button> */}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-left1">Comentarios</td>
                          <td className="text-left">
                            <div
                              className={
                                clase[index]?.listaClases[indexSink].clase
                              }
                              onInput={(event) =>
                                setComment(event.currentTarget.textContent)
                              }
                              contentEditable
                              suppressContentEditableWarning={true}
                            >
                              {code.comments}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="boxStockCard-botones">
                      <button
                        onClick={() => modificar("plate", indexSink)}
                        className={
                          clase[index]?.listaClases[indexSink].clase
                            ? "btnModificarGuardar"
                            : "displeyNone"
                        }
                      >
                        Guardar Cambios
                      </button>
                      <button
                        onClick={() =>
                          editFields(
                            index,
                            indexSink,
                            code._id,
                            code.stock,
                            code.comments,
                            code.note
                          )
                        }
                        className={
                          clase[index]?.listaClases[indexSink].clase
                            ? "displeyNone"
                            : "btnEditar"
                        }
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => entregarStock(code._id)}
                        className="btnEntregar"
                        type="button"
                      >
                        Entregar
                      </button>
                      <button
                        className="btnEliminar"
                        type="button"
                        onClick={() =>
                          handleClickOpenAlert(
                            code._id,
                            stock._id,
                            code.stock.length
                          )
                        }
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>

          <Dialog
            className="dialogDelet"
            open={openAlert}
            onClose={handleClose}
          >
            <DialogContent>
              <DialogContentText>
                Esta seguro que desea eliminar?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => delet(idDelet, idDeletStock, cantStockDelet)}
              >
                Confirmar
              </Button>
              <Button onClick={handleCloseDelet}>Cancelar</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={typeA}>
            <DialogContent>
              <DialogContentText>{`Modificar pileta${
                index + 1
              }:`}</DialogContentText>
              <h4>Tipo de acero:</h4>
              <Container
                width="100%"
                justify="space-evenly"
                align="center"
                wrap="wrap"
              >
                <button
                  onClick={() => openJohnson("A304")}
                  className="linkTypes  typesDialog"
                >
                  <div className="bgType bgA304">
                    <div className="mask">
                      <h1 className="titleCard johnsonTypeh1">A304</h1>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => openJohnson("A430")}
                  className="linkTypes  typesDialog"
                >
                  <div className="bgType bgA430">
                    <div className="mask">
                      <h1 className="titleCard johnsonTypeh1">A430</h1>
                    </div>
                  </div>
                </button>
              </Container>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => closeType(index)}>Cancelar</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={openJson}>
            <DialogContent>
              <DialogContentText>{`Johnson${index + 1}:`}</DialogContentText>
              <div className="itemsEditAcc">
                {listJSON.map((item) => (
                  <button
                    // onClick={() => datos(item, itemModif, 'jhonson')}
                    onClick={() => setNewJohnson(item)}
                    key={item._id}
                    className="boxItemAcc"
                    style={{
                      backgroundImage: `url(${item.photo})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      objectFit: "cover",
                    }}
                  >
                    <div className="maskAcc">
                      <div className="nameIcon">
                        <h5 className="h5DescAcc codejson">{item?.code}</h5>
                        {newJohnson._id?.includes(item._id) ? (
                          <CheckCircleIcon className="addIconAcc" />
                        ) : (
                          <RadioButtonUncheckedIcon className="deletIconAcc" />
                        )}
                      </div>
                      <p className="pDescAcc pxyz">
                        {item.x} x {item.y} x {item.z}{" "}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => cargaJohnson()}>Listo</Button>
              {/* <Button onClick={() => datos(newJohnson, itemModif, "jhonson")}>Listo</Button> */}
              <Button onClick={() => setOpenJson(false)}>Cancelar</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={instalationType}>
            <DialogContent>
              <DialogContentText>{`Modificar Instalación${
                index + 1
              }:`}</DialogContentText>
              {typeInstalation.length > 0 ? (
                <div className="instalacionBox">
                  <InputLabel id="demo-multiple-chip-label">
                    Instalación:
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip-label"
                    multiple
                    value={instalation}
                    onChange={handleChangeInsta}
                    input={
                      <OutlinedInput
                        id="select-multiple-chip"
                        label="Instalacion"
                      />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {typeInstalation.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                    <MenuItem value={"instalacion lateral"}>
                      instalacion lateral
                    </MenuItem>
                  </Select>
                </div>
              ) : (
                <h4>Este modelo solo tiene inst. lateral</h4>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => datos(instalation, itemModif, "instalation")}
              >
                Listo
              </Button>
              <Button onClick={() => setInstalationType(false)}>
                Cancelar
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={openAcc}>
            <DialogContent>
              <DialogContentText>{`ACCESORIOS Pileta${indexStock + 1} - ${
                itemModif + 1
              }:`}</DialogContentText>
              <div className="itemsEditAcc">
                {accesoriesList.map((item) => (
                  <button
                    onClick={() => addAccesory(item._id, item)}
                    key={item._id}
                    className="boxItemAcc"
                    style={{
                      backgroundImage: `url(${item.photo})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      objectFit: "cover",
                    }}
                  >
                    <div className="maskAcc">
                      <div className="nameIcon">
                        <h5 className="h5DescAcc">{item.code}</h5>
                        {accesorysAdd?.includes(item._id) ? (
                          <CheckCircleIcon className="addIconAcc" />
                        ) : (
                          <RadioButtonUncheckedIcon className="deletIconAcc" />
                        )}
                      </div>
                      <p className="pDescAcc">{item.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => cargaAccSinks(accesories, itemModif)}>
                Listo
              </Button>
              <Button onClick={() => setOpenAcc(false)}>Cancelar</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={typePlate}>
            <DialogContent>
              <DialogContentText>{`Modificar placa:`}</DialogContentText>
              <h4>Plate:</h4>
              <Container
                width="100%"
                justify="space-evenly"
                align="center"
                wrap="wrap"
              >
                {companies.map((item) => (
                  <button
                    key={item._id}
                    onClick={() => openColor(item._id)}
                    className="linkTypes  typesDialog"
                  >
                    <div className={item.nameCompany}>
                      <div className="mask">
                        <h1 className="titleCard plateType1">
                          {item.nameCompany}
                        </h1>
                      </div>
                    </div>
                  </button>
                ))}
              </Container>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setTypePlate(false)}>Cancelar</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={openColorModal}>
            <DialogContent>
              <DialogContentText>{`Color:`}</DialogContentText>
              <div className="itemsEditAcc">
                {listColor.map((item) => (
                  <button
                    // onClick={() => datos(item, itemModif, 'jhonson')}
                    onClick={() => setNewColor(item)}
                    key={item._id}
                    className="boxItemAcc"
                    style={{
                      backgroundImage: `url(${item.photo})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      objectFit: "cover",
                    }}
                  >
                    <div className="maskAcc">
                      <div className="nameIcon">
                        <h5 className="h5DescAcc codejson">{item?.name}</h5>
                        {newColor._id?.includes(item._id) ? (
                          <CheckCircleIcon className="addIconAcc" />
                        ) : (
                          <RadioButtonUncheckedIcon className="deletIconAcc" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => cargaPlate()}>Listo</Button>
              {/* <Button onClick={() => datos(newJohnson, itemModif, "jhonson")}>Listo</Button> */}
              <Button onClick={() => setOpenColorModal(false)}>Cancelar</Button>
            </DialogActions>
          </Dialog>
        </div>
      ))}
    </div>
  );
}

