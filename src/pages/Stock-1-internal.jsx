import { useEffect, useState } from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import plateActions from '../redux/actions/plateActions'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import typeActions from '../redux/actions/typeActions';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function StockInternalPlates() {
    const dispatch = useDispatch()
    const [inputSearch, setInputSearch] = useState("")
    const [reload, setReload] = useState(false)
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [openAlertEdit, setOpenAlertEdit] = useState(false);
    const [id, setId] = useState("")
    const [idDelet, setIdDelet] = useState("")
    const [idComp, setIdComp] = useState("")
    const [lote, setLote] = useState("")
    const [codigo, setCodigo] = useState("")
    const [esp, setEsp] = useState({})
    //const [type, setType] = useState("")
    const [valueSelect, setValueSelect] = useState('');

    useEffect(() => {
        dispatch(plateActions.internalPlate())
        // eslint-disable-next-line
    }, [reload])
    useEffect(() => {
        dispatch(plateActions.filterInternalPlates(inputSearch))
        // eslint-disable-next-line
    }, [inputSearch])
    let filterPlates = useSelector(store => store.plateReducer.filterInternalPlates)
    async function handleClickOpen  (id, codigo, idComp, lote, type ) {
        setOpen(true);
        setId(id);
        setCodigo(codigo);
        setIdComp(idComp)
        setLote(lote)
        setValueSelect("int")
        setEsp(type._id);
        setType(type)
        await dispatch(typeActions.getTypes(idComp))
    }
    const types = useSelector(store => store.typeReducer.types)
    const [type, setType] = useState(
        types.find((a) => a._id === esp._id)
    );
    const typeAct = (id) => {
        setType(types.find((a) => a._id === id));
    };
    function SortArray(x, y) {
        if (x.color.name < y.color.name) { return -1; }
        if (x.name > y.name) { return 1; }
        return 0;
    }
    var filterOrd = filterPlates.sort(SortArray);
    const handleClickOpenAlert = (id) => {
        setIdDelet(id)
        setOpenAlert(true)
    }
    const handleClickOpenAlertEdit = () => {
        setOpenAlertEdit(true)
    }
    const handleCloseEdit = () => {
        setOpenAlertEdit(false)
    };
    const handleCloseDelet = () => {
        setOpenAlert(false)
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event) => {
        setValueSelect(event.target.value);
    };
    const handleChangeType = (event) => {

        setEsp(event.target.value)
        typeAct(event.target.value);
        console.log(type)
        //setReload(!reload)
    };
    async function modify(id, op) {
        let data = {}
        if (op === "ped") {
            data = {
                internal: null,
                note: codigo,
                lot: lote,
                type: type
            }
        }
        else {
            data = {
                internal: codigo,
                lot: lote,
                type: type
            }
        }
        const res = await dispatch(plateActions.putPlate(id, data))
        console.log("🚀 ~ file: Stock-1-internal.jsx ~ line 67 ~ modify ~ res", res)
        setReload(!reload)
        setOpenAlertEdit(false)
        setOpen(false);
    }
    async function delet(id) {
        await dispatch(plateActions.deletePlate(id))
        setOpenAlert(false)
        setReload(!reload)
    }
    return (
        <div className='containerStock'>
            <div className='containerNameStock'>
                <h1 className='titleStock'>Disponibles</h1>
            </div>
            <div className='containerInput'>
                <input className='input inputStock' type="text" placeholder='Buscar por color, cod. o emp.' onChange={(e) => setInputSearch(e.target.value)} />
            </div>
            <div className='containerCardsMarca mt10'>
                {filterOrd?.map(everyPlate => (
                    <div className='cardStock linkColors' key={everyPlate._id}>
                        <div className='companyCardStock'>
                            <h2 className='nameCards'>{everyPlate.company?.nameCompany}</h2>
                            <h3 className='nameCards'>{everyPlate.color.name}</h3>
                            <img src={everyPlate.color.photo} alt={everyPlate._id} className='fitStock' id={everyPlate._id} />
                            <h3 className='nameCards'>{everyPlate.type.name} {everyPlate.state?.width} × {everyPlate.state.height} × {everyPlate.type.thickness}</h3>
                            {
                                everyPlate.internal ? (<h3 className='nameCards'>codInterno: {everyPlate.internal}</h3>)
                                    : <h3 className='nameCards'>codPedido: {everyPlate.note}</h3>
                            }
                            <div className='bntEditDelet'>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAcJJREFUaEPtmeFtAyEMhZ1N2k3SSZpO0nSSdpNmk3STVk8KEqIY7BPPcNL5V5Q7wftsgw9zkp3baef65QCYHcFeBJ5E5F1ELhOE/ojITUQ+RAS/q9YCgPj7BOHllBD/okG0AD4neb7mM0QCEP+sBQDvIworGKLw7AX4XUF5pqHq7FYEDgAlgmlRfjtTdIkI5LmM9eWBWAKgFOGBWAIARelapNb5EYnenjENIFXRtCXnEPgP9QYQPZsCkHK+TBVAfDnEAy4coCw+JQSeewplKIBWOT2LtkypMAC17D88bs35KQAs8SFrgCmeDsAWTwWIEE8DiBJPA9A+xz0VtleB03PKNloblCE+LAIs8SEATPE0AGv+jniPsgZGCLOOcQBYPcV6zx2BlRpbmxYxOgaWox7L4/m4OL29eTtzu2/uAhgQaK2/Oo9/I6KS2utVzze/LzbMjlYJ7hE8pqaFZ5DeBYd1rBQpK4TaLrdOODoCKd0s591h4tWtyeuF7P1e16F1ftg07agUyifXICAeCxIRGGYMgJRO5f0aroiGimekUO5ZbL9YEzCKeDYAxsf2itTBlkkxVgpRxNYGPQDCXK1MtPsI/AH6HWAxi76YJQAAAABJRU5ErkJggg==" alt='edit' className='iconEdit' onClick={() => handleClickOpen(everyPlate._id, everyPlate.internal, everyPlate.type.thickness, everyPlate.company._id, everyPlate.lot, everyPlate.type)} />
                                <LinkRouter className='iconVerMas' to={'/stock/plates/internal/detail/' + everyPlate._id}>
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAp9JREFUaEPtme1NAzEMht1JgEmASYBJgEmASWATYBLQK52rw7FjO/FRndRIVfvjzvFjv86He6Cdj8PO/aczwKkzWJmBSyK6J6ILIsJv/nwtkPjG55uIPpbPNP8sADt9tziccQgwb0T0uoBl3j0+OwPwRESPQ7P+fYlBYC89RgBuiOg9PZP/whBIFsCLOjsBjbPmITMMrgnIDUGwxjMRhbORAUDUtYlHIufVDuriwU8ahfcBy/lUtBSHGESrpRBEJAOabBB1RAhSqRgAQZBYbmzTDZAHoBUsnL+q8FrYsCAQKGRDHR7Ap4gKnL+dWbcdcA2iG7AegCYdOB+VzY9w1gsWPw4IBG49zHroGZUOuHoUk44CwAyOJC8re2bmLQC8DCPrEY0gvzMDoElJDaDllNR+t5AMXc8AWFloFg8LYHbyikVKq4WmBjUAqb/QhlLhsWJDbqCNjDQAqf8R+VTxyGBiBUQWjkMDkNSZpbPKcbYjN9IQgCxgFA7fqjIOVtSRrINmU9MyUDExQCvs7B7ADYSWgd1LqKqIKyQ0VMRyGc2egSqOEmzD3ZMiG1mzdAWXoooMSDU0e5IG4Fb+PwLIIDRLunUWcskDELMZcHdh+GAByMvMyDVyFkCuhuqZzAJI3Yo2OE5rt0H1RNC7pGi3okwnYjQDWiPBXAl7ANYFe+tLvbwP96TuNrZkFmBsq84EAoY9SHb/uqfhyD3XamxVZsJqGLubaAQAUbcg0N8PN2KNYrcaxqENNArQ62HONHet/xdCzneLIxktrg2G4dY6vtftdUjl+lTt9fUBC5GTjdjA5tx9ZKhhHJWQnLknqSzIiAS7l/qMAwziyUKzOeU4GxzNgOYQYFjj3t+sU/9MrievBMhkruzZM0BZKAcN7T4Dv8IIujGpGX+IAAAAAElFTkSuQmCC" className='iconVerMas' alt='info' />
                                </LinkRouter>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAglJREFUaEPtmeFNxDAMhX2bwCTAJMAkwCSwCWwCm4CehEUJcfzc2u2Vu/w66dL0fXZiO+5Bdj4OO9cvZ4CtPeh54EJEHkTkbgOhHyLyJiJPIoLf3TECgPj3DYS3r4T4GwtiBPC8keV7NoMnAPFnjABgfXjhGAa8cBkF+DwG5RMNXWOPPHBSAC8zzgu2RWSLlnng/jvcIdQi5DJDD+Vj4JkSAIiH9TFgTQaijSgsRDpAL7R5EFY4ZCJeOgCsDuvDC9NhQVjiX0Xkmth3JQAsxFLxeE8ZgAdxZWRR1vLqnFKAEUSvEIuKL/eAWql3JtrtPUf8agCWJxRirvhVAawD64VYLxCVnwEIMMveYLKjC8/MYs4Tr6LmeqLUA6M4jyjEJrvRNioDYJJUJGNbECUAjPhRiI1sp3QA65o3CpWWJ/CMdzdIB4Bl0fJAORyJ8y0E2zwoAZhCRJKUQrDiyxNZ9HoIQdFnyjzgZdCs/08PgLnmZVmXWSfsgcihZAQsmWOW6f+6uQuLaaa8JRLNEgv3ntX2eltH/ZrrfR9gRbG9nel6zO3NfX8WQKSmYe4NrnCdkAWg2w2Z1evxsPcGCiITQCFGhZnZ56fUdiZlA4wg9GIDD6SNCgCFaL+v4RNRqnizwksyDzrVOBMYJeKrAbA+wiu2jrbgk2zzs0zVFkoXai14BljN1MaLdu+BL7BifTHoT8MKAAAAAElFTkSuQmCC" alt='delete' className='iconDelete' onClick={() => handleClickOpenAlert(everyPlate._id)} />
                            </div>
                        </div>
                        <Dialog open={openAlert} onClose={handleClose}>
                            <DialogContent>
                                <DialogContentText>
                                    Esta seguro?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => delet(idDelet)}>Confirmar</Button>
                                <Button onClick={handleCloseDelet}>Cancelar</Button>
                            </DialogActions>
                        </Dialog>

                        <Dialog open={openAlertEdit} onClose={handleClose}>
                            <DialogContent>
                                <DialogContentText>
                                    Esta seguro?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => modify(id, valueSelect)}>Confirmar</Button>
                                <Button onClick={handleCloseEdit}>Cancelar</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                ))
                }
            </div>


            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <DialogContentText>
                        Editar campos
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        defaultValue={lote}
                        type="text"
                        fullWidth
                        label="Lote"
                        variant="standard"
                        onChange={(event) => setLote(event.target.value)}
                        id="nuevoLote"
                    />
                    <div className='selectCodigo'>
                        <InputLabel id="demo-simple-select-label2">Espesor:</InputLabel>
                        <Select

                            labelId="demo-simple-select-label2"
                            id="demo-simple-select2"
                            value={esp}
                            onChange={handleChangeType}
                            defaultValue={esp}
                        >
                            {types.map((t) => (
                                <MenuItem value={t._id} key={t._id}>
                                    {t.name} {t.width}x{t.height} : {t.thickness}
                                </MenuItem>
                            ))}
                        </Select>

                    </div>


                    <div className='selectCodigo'>
                        <InputLabel id="demo-simple-select-label">Codigo:</InputLabel>
                        <Select
                            displayEmpty
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={valueSelect}
                            onChange={handleChange}
                            defaultValue={"int"}
                        >
                            <MenuItem value={"int"}>Interno</MenuItem>
                            <MenuItem value={"ped"}>Pedido</MenuItem>
                        </Select>
                    </div>
                    <TextField
                        autoFocus
                        margin="dense"
                        defaultValue={codigo}
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(event) => setCodigo(event.target.value)}
                        id="nuevoCod"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickOpenAlertEdit}>Editar</Button>
                    <Button onClick={handleClose}>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}
