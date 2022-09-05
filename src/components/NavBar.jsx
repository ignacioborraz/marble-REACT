import {useState} from 'react'

import Container from './Container'
import Text from './Text'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import logo from '../media/Logo-Chico-Marmoleria-Portaro-Rosario.png'
import {useSelector,useDispatch} from 'react-redux'
import userActions from '../redux/actions/userActions'
import {Link as LinkRouter,useNavigate} from 'react-router-dom'

let userOptions = [
  {to: '/usuario', name: 'nuevo'},
  {to: '/ingresar', name: 'ingresar'}
]

export default function NavBar() {
  
  const user = useSelector(store => store.userReducer.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }

  async function signOut() {
    await dispatch(userActions.signOut(user.user.id))
      .then(navigate("/ingresar",{replace:true}))
  }

  return (
    <Container justify='space-between' bgColor='#0a0a0a' padding='10px'>
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIcon className='shadow-box' sx={{
          width: '40px',
          height: '40px',
          padding: '5px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#C82832',
          backgroundColor: 'rgb(230,230,230)',
          textDecoration: 'none',
          borderRadius: '5px'}} />
      </IconButton>

      <LinkRouter to={`/menu`} className='menu'>
      <img className='logo' src={logo} alt="logo" style={{ "height": "5rem"}} />
        
        {/* <Text variant='h5' font='Montserrat' color='rgb(230,230,230)' className='shadow-text'>
            Marmolería Giacomo Portaro
        </Text> */}
      </LinkRouter>

          {/* ---------- USER OPTIONS ---------- */}
          <Box sx={{ flexGrow: 0, display: 'flex' }}>
            <Tooltip title="OPEN">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar alt="photoUser" src={user.user.photo} className='onlyFit shadow-box' sx={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textDecoration: 'none',
                  borderRadius: '5px'}} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user ? (
                <Box>
                  <LinkRouter to={`/perfil/${user.user.id}`}>
                    <MenuItem sx={{'&:hover': {bgcolor: 'rgb(230,2230,230)'}}} onClick={handleCloseUserMenu}>
                      <Typography sx={{flexGrow: '1', padding: '2px', color: 'black', textAlign: 'right'}}>{user.user.nick.toUpperCase()}</Typography>
                    </MenuItem>
                  </LinkRouter>
                  <LinkRouter to={`/admin`}>
                    <MenuItem sx={{'&:hover': {bgcolor: 'rgb(230,2230,230)'}}} onClick={handleCloseUserMenu}>
                      <Typography sx={{flexGrow: '1', padding: '2px', color: 'black', textAlign: 'right'}}>nuevo admin</Typography>
                    </MenuItem>
                  </LinkRouter>
                  <LinkRouter to={`/user`}>
                    <MenuItem sx={{'&:hover': {bgcolor: 'rgb(230,2230,230)'}}} onClick={handleCloseUserMenu}>
                      <Typography sx={{flexGrow: '1', padding: '2px', color: 'black', textAlign: 'right'}}>nuevo user</Typography>
                    </MenuItem>
                  </LinkRouter>
                  <LinkRouter to={`/menu`}>
                    <MenuItem sx={{'&:hover': {bgcolor: 'rgb(230,2230,230)'}}} onClick={handleCloseUserMenu}>
                      <Typography sx={{flexGrow: '1', padding: '2px', color: 'black', textAlign: 'right'}}>menu</Typography>
                    </MenuItem>
                  </LinkRouter>
                  <MenuItem sx={{'&:hover': {bgcolor: 'rgb(230,2230,230)'}}} onClick={handleCloseUserMenu}>
                    <Typography sx={{flexGrow: '1', padding: '2px', color: 'black', textAlign: 'right'}} onClick={signOut}>salir</Typography>
                  </MenuItem>
                </Box>
              ) : userOptions.map((everyOption,index) => (
                <LinkRouter key={index} to={everyOption.to} onClick={handleCloseUserMenu}>
                  <MenuItem sx={{'&:hover': {bgcolor: 'rgb(230,2230,230)'}}}>
                        <Typography sx={{padding: '2px', color: 'black'}}>{everyOption.name}</Typography>
                  </MenuItem>
                </LinkRouter>
              ))}
            </Menu>
          </Box>
    </Container>
  )
}