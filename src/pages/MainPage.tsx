import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { TextField, InputAdornment, CssBaseline, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import Groups2Icon from '@mui/icons-material/Groups2';
import { Routes, Route, useNavigate } from 'react-router-dom';
import DashBoard from './DashBoard';
import ProductPage from './ProductPage';
import ProductDetails from './ProductDetails';
import Authentication from './Auth';
import ProductListByOwner from './ProductListByOwner';
import AddProducts from './AddProducts';
import ProductionQuantityLimitsOutlined from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import UserAccounts from './UserAccount';
import EditProduct from './EditProduct';
import SearchResults from './SearchPage';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MainPage() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSearch = (): void => {
    if (searchTerm) {
      navigate(`/search-results`,{state:searchTerm}); 
    } else {
      alert('Please enter a search term');
    }
  };

  const DrawerItems = [
    { name: 'Dashboard', icon: <DashboardIcon />, route: '/dashboard' },
    { name: 'All Products', icon: <Inventory2Icon />, route: '/product' },
    { name: 'My Products', icon: <Groups2Icon />, route: '/product-list' },
    { name: 'Add Product', icon: <ProductionQuantityLimitsOutlined />, route: '/add-product' },
    { name: 'User Account', icon: <PersonIcon />, route: '/user-account' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: 'transparent' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
          >
            <MenuIcon sx={{ color: '#000' }} />
          </IconButton>
          <Grid container sx={{ alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
            <Grid item xs={6}>
              <TextField
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSearch} aria-label="search">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: { height: '40px', padding: '0px' },
                }}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'gray' },
                    '&:hover fieldset': { borderColor: 'gray' },
                    '&.Mui-focused fieldset': { borderColor: 'gray' },
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Grid container sx={{ alignItems: 'center', width: '100%', justifyContent: 'flex-end', gap: 3 }}>
                <NotificationsIcon sx={{ color: '#000' }} />
                <Avatar sx={{ backgroundColor: '#1976d2', width: 30, height: 30 }}>
                  <PersonIcon sx={{ color: '#fff' }} />
                </Avatar>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {DrawerItems.map((item, index) => (
            <ListItem key={index} sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() => navigate(item.route)}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  backgroundColor: window.location.pathname === item.route ? '#ff4b2b' : null,
                  "&:hover": { backgroundColor: '#ff4b2b' },
                  justifyContent: open ? 'initial' : 'center',
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: window.location.pathname === item.route ? '#fff' : null }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{
                    color: window.location.pathname === item.route ? '#fff' : '#ff4b2b',
                    opacity: open ? 1 : 0,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, pt: 10, px: 3 }}>
        <Routes>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/user-account" element={<UserAccounts/>} />
          <Route path="/add-product" element={<AddProducts/>} />
          <Route path="/details" element={<ProductDetails/>} />
          <Route path="/product-list" element={<ProductListByOwner/>} />
          <Route path="/edit-product" element={<EditProduct/>} />
          <Route path="/search-results" element={<SearchResults/>} />
        </Routes>
      </Box>
    </Box>
  );
}
