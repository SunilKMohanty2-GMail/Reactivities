// There are two ways to write import statement
// Option 1
// import { Box } from "@mui/material";
// Option 2 
// import Box from "@mui/material/Box";
import { Box, AppBar, Toolbar, Typography, Container, MenuItem, MenuList, LinearProgress } from "@mui/material";
import { Group } from "@mui/icons-material";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";
import { useStore } from "../../lib/hooks/useStore";
import { Observer } from "mobx-react-lite";

export default function NavBar() {
  const { uiStore } = useStore();
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" 
      sx={{
        backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)', 
        position: 'relative'
      }}>
        <Container maxWidth='xl'>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <MenuList>
                <MenuItem sx={{ display: 'flex', gap: 2 }} component={NavLink} to='/'>
                  <Group fontSize="large" />
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Reactivities</Typography>
                </MenuItem>
              </MenuList>
            </Box>
            <Box>
              <MenuList sx={{ display: 'flex' }}>
                <MenuItemLink to='/activities'>
                  Activities
                </MenuItemLink>
                <MenuItemLink to='/createActivity'>
                  Create Activity
                </MenuItemLink> 
                <MenuItemLink to='/counter'>
                  Counter
                </MenuItemLink>   
                <MenuItemLink to='/errors'>
                  Errors
                </MenuItemLink>            
              </MenuList>
            </Box>
            <MenuList>
              <MenuItem>
                User Menu
              </MenuItem>
            </MenuList>
          </Toolbar>
        </Container>
        <Observer>
          {() => uiStore.isLoading ? (
            <LinearProgress 
            color='secondary'
            sx={{
              position:'absolute',
              bottom: 0,
              left:0,
              right:0,
              height:4
            }} />
          ) : null}
        </Observer>
      </AppBar>
    </Box>
  )
}
