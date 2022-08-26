import {useState} from 'react'

import Container from './Container'
import Text from './Text'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import PersonIcon from '@mui/icons-material/Person'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'

import {useSelector,useDispatch} from 'react-redux'
import userActions from '../redux/actions/userActions'
import {Link as LinkRouter,useNavigate} from 'react-router-dom'

let userOptions = [
  {to: '/signIn', name: 'Login'},
  {to: '/signUp', name: 'Register'}
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
    await dispatch(userActions.signOut(user.user.mail))
      .then(navigate("/",{replace:true}))
  }

  return (
    <Container justify='space-between' bgColor='#C82832' padding='10px'>
      <IconButton onClick={() => navigate(-1)} sx={{p: 0}}>
        <ArrowBackIcon sx={{
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
      <Text variant='h5' font='Paytone One' color='rgb(230,230,230)' padding='5px'>
        PORTARO
      </Text>

          {/* ---------- USER OPTIONS ---------- */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="OPEN">
              <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                {user ? <Avatar alt="photoUser" src={user.user.photoUser} sx={{
                  width: '40px',
                  height: '40px',
                  padding: '5px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textDecoration: 'none',
                  borderRadius: '5px'}} /> :
                <PersonIcon sx={{
                  width: '40px',
                  height: '40px',
                  padding: '5px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#C82832',
                  backgroundColor: 'rgb(230,230,230)',
                  textDecoration: 'none',
                  borderRadius: '5px'}} />}
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
                  <LinkRouter to={`/profile/${user.user.id}`}>
                    <MenuItem sx={{'&:hover': {bgcolor: 'rgb(230,2230,230)'}}} onClick={handleCloseUserMenu}>
                      <Typography sx={{padding: '2px', paddingLeft: '6px', paddingRight: '6px', color: 'black'}}>{user.user.nameUser.charAt(0).toUpperCase()+user.user.nameUser.slice(1).toLowerCase()}</Typography>
                    </MenuItem>
                  </LinkRouter>
                  <MenuItem sx={{'&:hover': {bgcolor: 'rgb(230,2230,230)'}}} onClick={handleCloseUserMenu}>
                    <Typography sx={{padding: '2px', paddingLeft: '6px', paddingRight: '6px', color: 'black'}} onClick={signOut}>Sign Out</Typography>
                  </MenuItem>
                </Box>
              ) : userOptions.map((everyOption,index) => (
                <LinkRouter key={index} to={everyOption.to} onClick={handleCloseUserMenu}>
                  <MenuItem sx={{'&:hover': {bgcolor: 'rgb(230,2230,230)'}}}>
                        <Typography sx={{padding: '2px', paddingLeft: '6px', paddingRight: '6px', color: 'black'}}>{everyOption.name}</Typography>
                  </MenuItem>
                </LinkRouter>
              ))}
            </Menu>
          </Box>
    </Container>
  )
}