import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  AccountBalance,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  CenterFocusStrong,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";
import Logo from "assets/logo.png"
import Battery3BarRoundedIcon from '@mui/icons-material/Battery3BarRounded';


const navItems = [
  {
    text: "Dashboard",
    nav: "Dashboard",
    icon: <HomeOutlined />,
  },
  // {
  //   text: "Containers",
  //   nav: "Dashboard",
  //   icon: null,
  // },
  {
    text: "Pay",
    nav: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Invest",
    nav: "Customers",
    icon: <TrendingUpOutlined />,
  },
  {
    text: "Loan",
    nav: "Monthly",
    icon: <AccountBalance />,
  },
  {
    text: "Invoice",
    nav: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  // {
  //   text: "Container 4",
  //   nav: "Geography",
  //   icon: <PublicOutlined />,
  // },
  // {
  //   text: "Sales",
  //   nav: "Sales",
  //   icon: null,
  // },
  {
    text: "Varience",
    nav: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  // {
  //   text: "Container 6",
  //   nav: "Daily",
  //   icon: <TodayOutlined />,
  // },
  // {
  //   text: "Container 7",
  //   nav: "Monthly",
  //   icon: <CalendarMonthOutlined />,
  // },
  {
    text: "Portfolio",
    nav: "Breakdown",
    icon: <PieChartOutlined />,
  },
  // {
  //   text: "Management",
  //   nav: "Management",
  //   icon: null,
  // },
  {
    text: "Profile  ",
    nav: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "My Communities",
    nav: "Performance",
    icon: <Groups2Outlined />,
  },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
              <Box
              
                
                gap="0.5rem"
                component="img"
                alt="profile"
                src={Logo}
                height="120px"
                width="120px"
                borderRadius="50%"
                sx={{
                  objectFit: "cover",
                  marginLeft: "4rem", // Adjust this value as needed to move the image to the desired position
                  marginTop:"3rem"
                }}
              />
          <Box width="100%">

            <Box m="1.5rem 2rem 2rem 4.5rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h3" fontWeight="bold">
                    LendEase
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text,nav, icon }) => {
                if (!icon) {
                  return (
                    <Typography variant="h1" key={text} sx={{ m: "2.25rem 0 2rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = nav.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          {/* <Box position="relative" bottom="10rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  Location
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
              />
            </FlexBetween>
          </Box> */}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
