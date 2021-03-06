import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useState} from "react";
import CocktailTypes from "./CocktailList/CocktailTypes";
import CocktailList from "./CocktailList/CocktailList";
import CocktailType from "./CocktailList/CocktailType";

const drawerWidth = 240;

export default function Dashboard() {
    const [cocktailType, setCocktailType] = useState<CocktailType>(CocktailTypes[2]);

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Cocktail App
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
                }}
            >
                <Toolbar/>
                <Box sx={{overflow: 'auto'}}>
                    <List>
                        {CocktailTypes.map((cocktail, index) => (
                            <ListItem key={cocktail.name} id={cocktail.name} button
                                      onClick={() => setCocktailType(cocktail)}
                                      disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <ListItemIcon/> : <ListItemIcon/>}
                                    </ListItemIcon>
                                    <ListItemText primary={cocktail.name}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
                <CocktailList type={cocktailType.name}/>
            </Box>
        </Box>
    );
}
