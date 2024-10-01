import { useEffect, useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Navigation from './navigation';
import ListItem from '@mui/material/ListItem';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import DashboardIcon from '@mui/icons-material/Dashboard';
import fraud2 from '../../../src/assets/fraud2.png';
import Report from '../../../src/assets/Report.png';
import Branch from '../../../src/assets/Branch.png';
import decision from '../../../src/assets/decision.png';
import home from '../../../src/assets/home.png';
import Search1 from '../../../src/assets/Search1.png'
import pending from '../../../src/assets/pending.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import detailsImage from '../../../src/assets/Details.png';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import entryImage from '../../../src/assets/Entry.png';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Drafts as DraftsIcon } from '@mui/icons-material';
import Testing from '../../../src/assets/Testing.png';
import AssessmentIcon from '@mui/icons-material/Assessment';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import BarChartIcon from '@mui/icons-material/BarChart';
import PageviewIcon from '@mui/icons-material/Pageview';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ChecklistIcon from '@mui/icons-material/Checklist';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { useDispatch } from 'react-redux';
import { removeQuestionnaire } from '../../pages/KYC_NEW/Insert/state/save-application-action';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import StorageIcon from '@mui/icons-material/Storage';
import BusinessIcon from '@mui/icons-material/Business';
import VerifiedIcon from '@mui/icons-material/Verified';
import SecurityIcon from '@mui/icons-material/Security';
import ReportIcon from '@mui/icons-material/Report';
import { Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { RiFlowChart } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import HomeIcon from '@mui/icons-material/Home';

interface SidebarProps {
  currentSection: string;
  selectedId: any;
};

const drawerWidth = 180;

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
  width: `calc(${theme.spacing(6)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
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
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  height: 50, // Reduced height
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

const Sidebar = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [detailsList, setDetailsList] = useState<{ name: string; code: string; link: string }[]>([]);
  const [isDetailsDropdownOpen, setIsDetailsDropdownOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [NpciTesting, setNpciTesting] = useState<{ name: string; code: string; link: string }[]>([]);
  const [npciselectedMasters, setNpciSelectedMasters] = useState([]);
  const [NpcimastersList, setNpciMastersList] = useState<{ name: string; code: string; link: string }[]>([]);
  const [isNpciMastersDropdownOpen, setIsNpciMastersDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const toggleNpciMastersDropdown = () => {
    setIsNpciMastersDropdownOpen(!isNpciMastersDropdownOpen);
  };

  const handleIdClick = (id: any) => {
    setSelectedId(id);
  };

  // useEffect(() => {
  //   return () => {
  //     sessionStorage.clear();
  //   };
  // }, []);

  const saveToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getFromLocalStorage = (key: string) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  };

  const removeDuplicates = (list: any[]) => {
    const uniqueList = list.filter((item, index, self) =>
      index === self.findIndex((t) => t.name === item.name)
    );
    return uniqueList;
  };

  const handleDetailsSelect = (From: any) => {
    setIsDetailsDropdownOpen(prevState => From !== selectedDetails || !prevState);
    setSelectedDetails(From);
    navigate('/From');
  };

  const toggleDetailsDropdown = () => {
    setIsDetailsDropdownOpen(!isDetailsDropdownOpen);
  };

  const handleDraftClick = () => {
    navigate('/Pending');
  };

  const handleScreeningReviewClick = () => {
    navigate('/PepReport');
  };

  const handleUitestingClick = () => {
    navigate('/BankReport');
  };

  const handleReviewClick = () => {
    navigate('/PepReport');
  };
  const handleScreensClick = () => {
    navigate('/ScreeningDetails');
  };
  const handleCmsLevelMappingClick = () => {
    navigate('/CmsLevelStatusMapping');
    handleMenuClose();
  };

  const handleCmsWorkflowClick = () => {
    navigate('/CmsWorkFlowMapping');
    handleMenuClose();
  };

  const handleMastersSelect = (Masters: any) => {
    setIsNpciMastersDropdownOpen(prevState => Masters !== npciselectedMasters || !prevState);
    setNpciSelectedMasters(Masters);
    navigate(Masters.link);
  };

  useEffect(() => {
    const accessPermissionData = location.state?.accessPermissionData;
    if (Array.isArray(accessPermissionData)) {
      const dashboarddata = accessPermissionData.filter((item) => item.header === '2');
      const adminData = accessPermissionData.filter((item) => item.header === '5');
      const detailsData = accessPermissionData.filter((item) => item.header === '3');
      const npcimastersData = accessPermissionData.filter((item) => item.header === '1');
      const NpciTesting = accessPermissionData.filter((item) => item.header === '4');
      setNpciTesting(NpciTesting);

      const mappedDetailsList: { name: string; code: string; link: string }[] = detailsData.map((details) => ({
        name: details.name,
        code: details.code,
        link: details.link,
      }));

      const mappedNpciMastersList: { name: string; code: string; link: string }[] = npcimastersData.map((master) => ({
        name: master.name,
        code: master.code,
        link: master.link,
      }));

      const uniqueNpciMastersList = removeDuplicates(mappedNpciMastersList);
      const uniqueDetailsList = removeDuplicates(mappedDetailsList);

      setDetailsList(uniqueDetailsList);
      setNpciMastersList(uniqueNpciMastersList);

      saveToLocalStorage('detailsList', uniqueDetailsList);
      saveToLocalStorage('NpcimastersList', uniqueNpciMastersList);
      saveToLocalStorage('mpciTesting', NpciTesting);

      const showDashboardButton = dashboarddata.length > 0;
      const showAdminButton = adminData.length > 0;

      if (showDashboardButton) {
        localStorage.setItem('showDashboardButton', 'true');
      } else {
        localStorage.removeItem('showDashboardButton');
      }

      if (showAdminButton) {
        localStorage.setItem('showAdminButton', 'true');
      } else {
        localStorage.removeItem('showAdminButton');
      }

    } else {

      const storedDetailsList = getFromLocalStorage('detailsList');
      const storedNpciMastersList = getFromLocalStorage('mastersList');
      const storednpciTesting = getFromLocalStorage('uiTesting');
      setDetailsList(storedDetailsList || []);
      setNpciMastersList(storedNpciMastersList || []);
      setNpciTesting(storednpciTesting || []);

    }
    return () => {
      setIsNpciMastersDropdownOpen(false);
      setIsDetailsDropdownOpen(false);
      setNpciSelectedMasters([]);
    };
  }, [location.state, setIsDetailsDropdownOpen, setIsNpciMastersDropdownOpen, setNpciSelectedMasters]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
    if (open) {
      setOpen(false);
    }
  };

  const handleLevel2SecReviewClick = () => {
    navigate('/SanLevel1secReview');
  };

  const handlefirstLevelpendingReviewClick = () => {
    navigate('/FirstLevelPending');
  };

  const handleLevel2SearchClick = () => {
    navigate('/SanLevel2Search');
  };

  const handleLevel3SearchClick = () => {
    navigate('/SanLevel3Search');
  };

  const handleSearchClick = () => {
    navigate('/Search');
  };
  const handleBulkData = () => {
    navigate('/BulkData');
  };

  const handleBulkUpload = () => {
    navigate('/BulkUpload');
  };
  const handleBulkTaskAssign = () => {
    navigate('/SanTaskAssign');
  };

  const handlePepLevel2SecReviewClick = () => {
    navigate('/PepLevel1secReview');
  };

  const handlePepLevel2SearchClick = () => {
    navigate('/PepLevel2Search');
  };

  const handlePepLevel3SearchClick = () => {
    navigate('/PepLevel3Search');
  };

  const handleCmsLevel2SecReviewClick = () => {
    navigate('/CmsLevel1secReview');
  };

  const handleCmsLevel2SearchClick = () => {
    navigate('/CmsLevel2Search');
  };

  const handleCmsLevel3SearchClick = () => {
    navigate('/CmsLevel3Search');
  };
  const handlefirstLevelpendingClick = () => {
    navigate('/CmsFirstLevelPending');
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLevelMappingClick = () => {
    navigate('/LevelStatusMapping');
    handleMenuClose();
  };

  const handleWorkflowClick = () => {
    navigate('/WorkFlowMapping');
    handleMenuClose();
  };
  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handlefirstLevelpeppendingClick = () => {
    navigate('/PepFirstLevelPending');
  };

  const { kycId, complaintId, uid } = useParams();
  const [currentSection, setCurrentSection] = useState(location.pathname);

  const handleItemClick = (path: any) => {
    sessionStorage.clear();
    localStorage.clear();
    dispatch(removeQuestionnaire());
    navigate(path);
    setCurrentSection(path);
    setOpen(true);
  };

  const renderHeadings = () => {
    switch (currentSection) {
      case '/Aml':
      case '/Amldetails':
      case '/QcViewdecision':
      case `/Amlteamview/${complaintId}/${uid}`:
        return (
          <>
            <List>
              {/* <Typography variant="h6" component="h6" style={{ color: '#1976d2' }}>
                AML
              </Typography> */}
              <ListItemButton sx={{ height: '40px' }} onClick={() => handleItemClick('/Amldetails')}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                  <Tooltip title="Aml Qry" placement="right" arrow>
                    <img src={Branch} alt="Default Preview" style={{ maxHeight: '27px', maxWidth: '300px' }} />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Aml Qry" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              <ListItemButton sx={{ height: '40px' }} onClick={() => handleItemClick('/QcViewdecision')}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                  <Tooltip title="Decision" placement="right" arrow>
                    <img src={decision} alt="Default Preview" style={{ maxHeight: '27px', maxWidth: '300px' }} />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Decision" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </List>
            <List>
              <ListItemButton sx={{ height: '40px' }} onClick={() => handleItemClick('/Amltemasdashboard')}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                  <Tooltip title="Aml Home" placement="right" arrow>
                    <img src={home} alt="Default Preview" style={{ maxHeight: '27px', maxWidth: '300px' }} />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Aml Home" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </List>
          </>

        );
      case '/QcViewaml':
      case '/QcViewaml':
        return (
          <>
            <List>
              <Typography variant="h6" component="h6" style={{ color: '#1976d2' }}>
                Branch
              </Typography>
              <ListItemButton sx={{ height: '40px' }} onClick={() => handleItemClick('/QcViewaml')}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                  <Tooltip title="Branch To Aml" placement="right" arrow>
                    <img src={Branch} alt="Default Preview" style={{ maxHeight: '27px', maxWidth: '300px' }} />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Branch To Aml" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </List>
            <List>
              <ListItemButton sx={{ height: '40px' }} onClick={() => handleItemClick('/Amltemasdashboard')}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                  <Tooltip title="Aml Home" placement="right" arrow>
                    <img src={home} alt="Default Preview" style={{ maxHeight: '27px', maxWidth: '300px' }} />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Aml Home" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </List>
          </>
        );
      case '/PepFirstLevelPending':
      case '/LevelFlow':
      case '/ReportSearch':
      case '/WorkFlowMapping':
      case '/LevelStatusMapping':
        // case '/PepFirstLevelPending':
        // case '/PepLevel1secReview':
        // case '/PepLevel2Search':
        // case '/PepLevel3Search':
        return (
          <List>
            {/* 
                <ListItemButton className='custom-list-item-button' sx={{ height: '40px' }} onClick={() => navigate('/PepLevel1FirstReview')}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Tooltip title="Level1 First Review" placement="right" arrow>
                      <FactCheckIcon style={{ fontSize: '16px' }} />
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText primary="Level1 First Review" sx={{ opacity: open ? 1 : 0 }} className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`} />
                </ListItemButton>
                */}
            <ListItemButton sx={{ height: '40px' }} onClick={() => navigate('/LevelFlow')}>
              <Tooltip title="Level Flow" placement="right" arrow>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <RiFlowChart style={{ fontSize: '16px' }} />
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary="Level Flow"
                sx={{ opacity: open ? 1 : 0 }}
                className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`}
              />
            </ListItemButton>

            <ListItemButton sx={{
              height: '40px', fontFamily: "Bookman Old Style",
              fontSize: "12px"
            }} onClick={handlefirstLevelpeppendingClick}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Tooltip title="First Level Pending" placement="right" arrow>
                  <HourglassTopIcon style={{ fontSize: '16px' }} />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="First Level Pending" sx={{ opacity: open ? 1 : 0 }} className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`} />
            </ListItemButton>
            {/* <ListItemButton sx={{ height: '40px' }} onClick={handlePepLevel2SecReviewClick}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Tooltip title="Level1 Sec Review" placement="right" arrow>
                      <ChecklistIcon style={{ fontSize: '16px' }} />
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText primary="Level1 Sec Review" sx={{ opacity: open ? 1 : 0 }} className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`} />
                </ListItemButton>
                <ListItemButton sx={{ height: '40px' }} onClick={handlePepLevel2SearchClick}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Tooltip title="Level2 Search" placement="right" arrow>
                      <PageviewIcon style={{ fontSize: '16px' }} />
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText primary="Level2 Search" sx={{ opacity: open ? 1 : 0 }} className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`} />
                </ListItemButton>
                <ListItemButton sx={{ height: '40px' }} onClick={handlePepLevel3SearchClick}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Tooltip title="Level3 Search" placement="right" arrow>
                      <ManageSearchIcon style={{ fontSize: '16px' }} />
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText primary="Level3 Search" sx={{ opacity: open ? 1 : 0 }} className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`} />
                </ListItemButton> */}
            <ListItemButton sx={{ height: '40px' }} onClick={() => navigate('/ReportSearch')}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Tooltip title="Report" placement="right" arrow>
                  <BarChartIcon style={{ fontSize: '16px' }} />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="Report" sx={{ opacity: open ? 1 : 0 }} className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`} />
            </ListItemButton>
            <ListItemButton
              sx={{ height: '40px' }}
              onClick={handleMenuOpen}
            >
              <Tooltip title="Master" placement="right" arrow>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <ArrowDropDownIcon style={{ fontSize: '16px' }} />
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary="Master"
                sx={{ opacity: open ? 1 : 0 }}
                className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`}
              />
            </ListItemButton>

            {/* Dropdown for Level Mapping and Workflow */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLevelMappingClick}>
                Level Mapping
              </MenuItem>
              <MenuItem onClick={handleWorkflowClick}>
                Workflow
              </MenuItem>
            </Menu>

          </List>
        );
      case '/Fraud':
        return (
          <List>
            {/* <Typography variant="h6" component="h6" style={{ color: '#1976d2' }}>
              Fraud CounterFeit Alert
            </Typography> */}
            <ListItemButton sx={{ height: '40px' }} onClick={() => navigate('/Fraud')}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Tooltip title="Fraud" placement="right" arrow>
                  <img src={fraud2} alt="Default Preview" style={{ maxHeight: '27px', maxWidth: '300px' }} />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="Fraud" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </List>
        );
      case '/AmlScam':
      case '/QcViewaml':
        return (
          <List>
            {/* <Typography variant="h6" component="h6" style={{ color: '#1976d2' }}>
              Scam
            </Typography> */}
            <ListItemButton sx={{ height: '40px' }} onClick={() => navigate('/AmlScam')}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Tooltip title="Branch Info To Aml Team" placement="right" arrow>
                  <SecurityIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="BranchInfo To AmlTeam" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            <ListItemButton sx={{ height: '40px' }} onClick={() => navigate('/QcViewaml')}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Tooltip title="Aml Decision" placement="right" arrow>
                  <ReportIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="Aml Decision" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </List>
        );
      case '/CmsLevelFlow':
      case '/CmsFirstLevelPending':
      case '/ReportSearchcms':
      case '/CmsWorkFlowMapping':
      case '/CmsLevelStatusMapping':
        // case '/CmsLevel1secReview':
        // case '/CmsLevel2Search':
        // case '/CmsLevel3Search':
        return (
          <List>
            <ListItemButton sx={{ height: '40px' }} onClick={() => navigate('/CmsLevelFlow')}>
              <Tooltip title="Level Flow" placement="right" arrow>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <RiFlowChart style={{ fontSize: '16px' }} />
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary="Level Flow"
                sx={{ opacity: open ? 1 : 0 }}
                className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`}
              />
            </ListItemButton>
            {/* <ListItemButton sx={{ height: '40px' }} onClick={() => navigate('/CmsLevel1FirstReview')}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Tooltip title="Level 1 First Review" placement="right" arrow>
                      <FactCheckIcon />
                    </Tooltip>
                  </ListItemIcon>
    
                  <ListItemText primary="Level 1 First Review" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton> */}
            <ListItemButton sx={{ height: '40px' }} onClick={handlefirstLevelpendingClick}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Tooltip title="First Level Pending" placement="right" arrow>
                  <HourglassTopIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="First Level Pending" sx={{ opacity: open ? 1 : 0 }}
                className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`} />
            </ListItemButton>
            {/* <ListItemButton sx={{ height: '40px' }} onClick={handleCmsLevel2SecReviewClick}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Tooltip title="Level 2 Sec Review" placement="right" arrow>
                      <ChecklistIcon />
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText primary="Level 2 Sec Review" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton> */}
            {/* <ListItemButton sx={{ height: '40px' }} onClick={handleCmsLevel2SearchClick}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Tooltip title="Level2 Search" placement="right" arrow>
                      <PageviewIcon />
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText primary="Level2 Search" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
                <ListItemButton sx={{ height: '40px' }} onClick={handleCmsLevel3SearchClick}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Tooltip title="Level 3 Search" placement="right" arrow>
                      <ManageSearchIcon />
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText primary="Level 3 Search" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton> */}
            <ListItemButton sx={{ height: '40px' }} onClick={() => navigate('/ReportSearchcms')}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Tooltip title="Report" placement="right" arrow>
                  <BarChartIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="Report" sx={{ opacity: open ? 1 : 0 }}
                className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`} />
            </ListItemButton>
            <ListItemButton
              sx={{ height: '40px' }}
              onClick={handleMenuOpen}
            >
              <Tooltip title="Master" placement="right" arrow>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <ArrowDropDownIcon style={{ fontSize: '16px' }} />
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary="Master"
                sx={{ opacity: open ? 1 : 0 }}
                className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`}
              />
            </ListItemButton>

            {/* Dropdown for Level Mapping and Workflow */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleCmsLevelMappingClick}>
                Level Mapping
              </MenuItem>
              <MenuItem onClick={handleCmsWorkflowClick}>
                Workflow
              </MenuItem>
            </Menu>
          </List>
        );
      case '/FlowLevel':
      case '/SanctionSearch':
      // case '/SanLevel1FirstReview':

      // case '/SanLevel1secReview':
      // case '/SanLevel2Search':
      // case '/SanLevel3Search':
      case '/FirstLevelPending':
      case '/Search':
      case '/BulkData':
      case '/BulkUpload':
      case '/SanTaskAssign':
        return (
          <List>
            {/* <Typography variant="h6" component="h6" style={{ color: '#1976d2', marginLeft: '26%' }}>
              SAN
            </Typography> */}
            <ListItemButton sx={{ height: '40px' }} onClick={() => navigate('/FlowLevel')}>
              <Tooltip title="Level Flow" placement="right" arrow>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <RiFlowChart style={{ fontSize: '16px' }} />
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary="Level Flow"
                sx={{ opacity: open ? 1 : 0 }}
                className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`}
              />
            </ListItemButton>
            {/* <ListItemButton sx={{ height: '40px' }} onClick={() => navigate('/SanLevel1FirstReview')}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Tooltip title="Level1 First Review" placement="right" arrow>
                  <FactCheckIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="Level1 First Review" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>

            <ListItemButton sx={{ height: '40px' }} onClick={handleLevel2SecReviewClick}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Tooltip title="Level1 Sec Review" placement="right" arrow>
                  <ChecklistIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="Level1 Sec Review" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>

            <ListItemButton sx={{ height: '40px' }} onClick={handleLevel2SearchClick}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Tooltip title="Level2 Search" placement="right" arrow>
                  <PageviewIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="Level2 Search" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>

            <ListItemButton sx={{ height: '40px' }} onClick={handleLevel3SearchClick}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Tooltip title="Level3 Search" placement="right" arrow>
                  <ManageSearchIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="Level3 Search" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton> */}

            <ListItemButton sx={{ height: '40px' }} onClick={handlefirstLevelpendingReviewClick}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Tooltip title="First Level Pending" placement="right" arrow>
                  <HourglassTopIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="First Level Pending" sx={{ opacity: open ? 1 : 0 }}
                className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`} />
            </ListItemButton>

            <ListItemButton sx={{ height: '40px' }} onClick={() => navigate('/SanctionSearch')}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Tooltip title="Report" placement="right" arrow>
                  <BarChartIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="Report" sx={{ opacity: open ? 1 : 0 }}
                className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`} />
            </ListItemButton>

            <ListItemButton sx={{ height: '40px' }} onClick={handleSearchClick}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Tooltip title="UI Testing Search" placement="right" arrow>
                  <SearchOffIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="UI Testing Search" sx={{ opacity: open ? 1 : 0 }}
                className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`} />
            </ListItemButton>

            <ListItemButton sx={{ height: '40px' }} onClick={handleBulkData}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Tooltip title="Bulk Data" placement="right" arrow>
                  <StorageIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="Bulk Data" sx={{ opacity: open ? 1 : 0 }}
                className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`} />
            </ListItemButton>
            <ListItemButton sx={{ height: '40px' }} onClick={handleBulkUpload}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Tooltip title="Bulk Upload" placement="right" arrow>
                  <StorageIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="Bulk Upload" sx={{ opacity: open ? 1 : 0 }}
                className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`} />
            </ListItemButton>

            <ListItemButton sx={{ height: '40px' }} onClick={handleBulkTaskAssign}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Tooltip title="Bulk Task Assign" placement="right" arrow>
                  <AssignmentIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="Bulk Task Assign" sx={{ opacity: open ? 1 : 0 }}
                className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`} />
            </ListItemButton>
          </List>
        );
      case '/From':
      case '/Pending':
      case `/Draft/${kycId}`:
        return (
          // <Drawer variant="permanent" open={open}>
          //   <DrawerHeader>
          //     <Typography variant="h4" component="h4" style={{ color: '#1976d2' }}>
          //       PONSUN
          //     </Typography>
          //     <IconButton onClick={() => { setOpen(!open) }}>
          //       {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          //     </IconButton>
          //   </DrawerHeader>

          <List>
            {/* <Typography variant="h6" component="h6" style={{ color: '#1976d2', marginLeft: '14%' }}>
                CLIENT FORM
              </Typography> */}


            <ListItemButton sx={{ height: '40px' }} onClick={() => handleItemClick('/DashboardKYC')}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>
                <Tooltip title="KYC Home" placement="right" arrow>
                  {/* <img src={home} alt="Default Preview" style={{ maxHeight: '27px', maxWidth: '300px' }} /> */}
                  <HomeIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="KYC Home" sx={{ opacity: open ? 1 : 0 }} className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`} />
            </ListItemButton>

            <List>
              <ListItemButton sx={{ height: '40px' }} onClick={handleDashboardClick}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>
                  <Tooltip title="Dashboard" placement="right" arrow>
                    {/* <img src={home} alt="Default Preview" style={{ maxHeight: '27px', maxWidth: '300px' }} /> */}
                    <DashboardIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`} />
              </ListItemButton>
            </List>


            {detailsList.length > 0 && (
              <List>
                <ListItem disablePadding sx={{ display: 'block' }} onClick={(e) => {
                  e.preventDefault();
                  toggleDetailsDropdown();
                }}>
                  <Tooltip title="Client form" placement="right" arrow>
                    <ListItemButton
                      sx={{ height: '40px' }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 2 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        <img src={detailsImage} alt="Default Preview" style={{ maxHeight: '20px', maxWidth: '50px' }} />
                      </ListItemIcon>
                      <ListItemText primary=" Client form " sx={{ opacity: open ? 1 : 0 }} className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`} />
                      {isDetailsDropdownOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
                <Collapse in={isDetailsDropdownOpen} timeout="auto" unmountOnExit>
                  {detailsList.map((details, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }} onClick={() => handleDetailsSelect(details)}>
                      <Tooltip title={details.name} placement="right" arrow>
                        <ListItemButton sx={{ height: '40px' }}

                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 2 : 'auto',
                              justifyContent: 'center',
                            }}
                          >
                            <AssignmentIcon />
                            {/* {index % 2 === 0 ? <img src={entryImage} alt="Default Preview" style={{ maxHeight: '27px', maxWidth: '300px' }} /> : <img src={clientviewImage} alt="Default Preview" style={{ maxHeight: '27px', maxWidth: '300px' }} />} */}
                          </ListItemIcon>
                          <ListItemText primary={details.name} sx={{ opacity: open ? 1 : 0 }} className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`} />
                        </ListItemButton>
                      </Tooltip>
                    </ListItem>
                  ))}
                </Collapse>
              </List>
            )}
            <List>
              <ListItem disablePadding sx={{ display: 'block' }} onClick={handleDraftClick}>
                <Tooltip title="Draft" placement="right" arrow>
                  <ListItemButton sx={{ height: '40px' }}

                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 2 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Draft" sx={{ opacity: open ? 1 : 0 }} className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`} />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            </List>
          </List>
          // </Drawer>
        );
      case '/BankReport':
      case `/BankHeader/${kycId}`:
      case '/PepReport':
      case `/Pep/${kycId}`:
      case '/ScreeningDetails':
      case '/pepSearchDetails':
      case '/cmsSearchDetails':
      case '/SancSearchDetails':
        return (
         
           
            <List>
              {/* <Typography variant="h6" component="h6" style={{ color: '#1976d2', marginLeft: '15%' }}>
                NPCI REVIEW
              </Typography> */}

              <List>
                <ListItemButton sx={{ height: '40px' }} onClick={() => handleItemClick('/DashboardKYC')}>
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>
                    <Tooltip title="KYC Home" placement="right" arrow>
                      <HomeIcon />
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText primary="KYC Home" sx={{ opacity: open ? 1 : 0 }} className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`} />
                </ListItemButton>
              </List>

              <List>
              <ListItemButton sx={{ height: '40px' }} onClick={handleDashboardClick}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>
                  <Tooltip title="Dashboard" placement="right" arrow>
                    {/* <img src={home} alt="Default Preview" style={{ maxHeight: '27px', maxWidth: '300px' }} /> */}
                    <DashboardIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`} />
              </ListItemButton>
            </List>
           

            <List>
              <ListItem disablePadding sx={{ display: 'block' }} onClick={handleUitestingClick}>
                <Tooltip title="NPCI Review" placement="right" arrow>
                  <ListItemButton
                   sx={{ height: '40px' }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 2 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <img src={Testing} alt="Default Preview" style={{ maxHeight: '20px', maxWidth: '50px' }} />
                    </ListItemIcon>
                    <ListItemText primary=" NPCI Review " sx={{ opacity: open ? 1 : 0 }} className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`}/>
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            </List>
            <List>
              {/* <ListItem disablePadding sx={{ display: 'block' }} onClick={handleReviewClick}>
                <Tooltip title="Screening Review" placement="right" arrow>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <AssessmentIcon sx={{ color: 'ash' }} />
                    </ListItemIcon>
                    <ListItemText primary="Screening Review" sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </Tooltip>
              </ListItem> */}

              <ListItem disablePadding sx={{ display: 'block' }} onClick={handleScreeningReviewClick}>
                <Tooltip title="Screening Review" placement="right" arrow>
                  <ListItemButton
                    sx={{ height: '40px' }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 2 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <img src={Testing} alt="Default Preview" style={{ maxHeight: '20px', maxWidth: '50px' }} />
                    </ListItemIcon>
                    <ListItemText primary="Screening Review" sx={{ opacity: open ? 1 : 0 }} className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`}/>
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            </List>
            <List>
              <ListItem disablePadding sx={{ display: 'block' }} onClick={handleScreensClick}>
                <Tooltip title="Screening Details" placement="right" arrow>
                  <ListItemButton
                     sx={{ height: '40px' }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 2 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <FindInPageIcon />
                    </ListItemIcon>
                    <ListItemText primary="Screening Details" sx={{ opacity: open ? 1 : 0 }} className={`custom-list-item-text ${open ? 'custom-list-item-text-open' : 'custom-list-item-text-closed'}`}/>
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            </List>
        
          </List>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ height: '50px' }}>

        <Toolbar>
          <Tooltip title="Menu">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Navigation />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography variant="h4" component="h4" className='allHeading' style={{ color: '#1976d2' }}>
            PONSUN
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {renderHeadings()}
        <Divider />
      </Drawer>
    </Box>
  );
}

export default Sidebar;