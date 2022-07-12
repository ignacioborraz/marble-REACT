import {useState} from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import PersonIcon from '@mui/icons-material/Person'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'

import {useSelector,useDispatch} from 'react-redux'
import userActions from '../redux/actions/userActions'
import {Link as LinkRouter,useNavigate} from 'react-router-dom'

let userOptions = [
  {to: '/signIn', name: 'Login'},
  {to: '/signUp', name: 'Register'}
]

export default function NavBar({pages}) {
  
  const user = useSelector(store => store.userReducer.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }

  async function signOut() {
    await dispatch(userActions.signOut(user.user.mail))
      .then(navigate("/",{replace:true}))
  }

  return (
    <AppBar position="static" sx={{backgroundColor: 'rgb(105,24,152)'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* ---------- LABEL TITLE ---------- */}
          <Typography noWrap component="a" href="/"
            sx={{
              width: '40px',
              height: '40px',
              display: {xs: 'none', sm: 'flex'},
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '20px',
              fontWeight: 700,
              backgroundColor: 'rgb(224,224,224)',
              textDecoration: 'none',
              fontFamily: 'Paytone One',
              borderRadius: '20px'}}>
              rJ</Typography>

          {/* ---------- BUTTON OPTIONS ---------- */}
          <Box sx={{ flexGrow: 1, display: {xs: 'flex', sm: 'none'} }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu} sx={{p: 0}}>
              <MenuIcon sx={{
                width: '40px',
                height: '40px',
                padding: '8px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'rgb(105,24,152)',
                backgroundColor: 'rgb(224,224,224)',
                borderRadius: '20px'}} />
              </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{display: {xs: 'block', md: 'none'}}}>
                {pages.map((everyPage,index) => (
                <LinkRouter key={index} to={everyPage.to} onClick={handleCloseNavMenu}>
                    <MenuItem sx={{'&:hover': {bgcolor: 'rgb(224,224,224)'}}}>
                        <Typography sx={{padding: '2px', paddingLeft: '6px', paddingRight: '6px', color: 'rgb(2,0,3)'}}>{everyPage.name}</Typography>
                    </MenuItem>
                </LinkRouter>))}
            </Menu>
          </Box>

          {/* ---------- BUTTON TITLE ---------- */}
          <Typography variant="h5" noWrap component="a" href="/" sx={{
            display: { xs: 'flex', sm: 'none' },
            flexGrow: 1,
            fontFamily: 'Paytone One',
            color: 'rgb(224,224,224)'}}>
            portaro</Typography>

          {/* ---------- LABEL OPTIONS ---------- */}
          <Box sx={{flexGrow: 1, display: {xs: 'none', sm: 'flex'}}}>
            {pages.map((page,index) => (
            <Button key={index} onClick={handleCloseNavMenu} sx={{color: 'white', display: 'block'}}>
              <LinkRouter to={page.to}>
                <Typography variant='h6' sx={{
                  color: 'white',
                  padding: '2px',
                  paddingLeft: '6px',
                  paddingRight: '6px',
                  '&:hover': {bgcolor: 'rgb(2,0,3)'}}}>
                  {page.name}</Typography>
              </LinkRouter>
            </Button>))}
          </Box>

          {/* ---------- USER OPTIONS ---------- */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="OPEN">
              <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                {user ? <Avatar alt="photoUser" src={user.user.photoUser} sx={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'rgb(105,24,152)',
                  backgroundColor: 'rgb(224,224,224)',
                  textDecoration: 'none',
                  borderRadius: '20px'}} /> :
                <PersonIcon sx={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'rgb(105,24,152)',
                  backgroundColor: 'rgb(224,224,224)',
                  textDecoration: 'none',
                  borderRadius: '20px'}} />}
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
                    <MenuItem sx={{'&:hover': {bgcolor: 'rgb(224,224,224)'}}} onClick={handleCloseUserMenu}>
                      <Typography sx={{padding: '2px', paddingLeft: '6px', paddingRight: '6px', color: 'rgb(2,0,3)'}}>{user.user.nameUser.charAt(0).toUpperCase()+user.user.nameUser.slice(1).toLowerCase()}</Typography>
                    </MenuItem>
                  </LinkRouter>
                  <MenuItem sx={{'&:hover': {bgcolor: 'rgb(224,224,224)'}}} onClick={handleCloseUserMenu}>
                    <Typography sx={{padding: '2px', paddingLeft: '6px', paddingRight: '6px', color: 'rgb(2,0,3)'}} onClick={signOut}>Sign Out</Typography>
                  </MenuItem>
                </Box>
              ) : userOptions.map((everyOption,index) => (
                <LinkRouter key={index} to={everyOption.to} onClick={handleCloseUserMenu}>
                  <MenuItem sx={{'&:hover': {bgcolor: 'rgb(224,224,224)'}}}>
                        <Typography sx={{padding: '2px', paddingLeft: '6px', paddingRight: '6px', color: 'rgb(2,0,3)'}}>{everyOption.name}</Typography>
                  </MenuItem>
                </LinkRouter>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}