// There are two ways to write import statement
// Option 1
// import { Box } from "@mui/material";
// Option 2 
// import Box from "@mui/material/Box";
import { Box, AppBar, Toolbar, Typography, Button, Container, MenuItem, MenuList } from "@mui/material";
import { Group } from "@mui/icons-material";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{
        backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)'
      }}>
        <Container maxWidth='xl'>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <MenuList>
                <MenuItem sx={{ display: 'flex', gap: 2 }}>
                  <Group fontSize="large" />
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Reactivities</Typography>
                </MenuItem>
              </MenuList>
            </Box>
            <Box>
              <MenuList sx={{display:'flex'}}>
                <MenuItem sx={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                  Activities
                </MenuItem>
                <MenuItem sx={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                  About
                </MenuItem>
                <MenuItem sx={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                  Contact
                </MenuItem>
              </MenuList>
            </Box>
            <Button size="large" variant="contained" color="warning">
              Create Activity
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}
