import { Container, CssBaseline, List, ListItem, ListItemText } from "@mui/material";
// import {Typography} from "@mui/material";
import axios from "axios";

import { useEffect, useState } from "react"
import NavBar from "./NavBar";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // fetch('https://localhost:5001/api/Activities')
    // .then(response => response.json())
    // .then(data => setActivities(data))

    //return () => {}

    axios.get<Activity[]>('https://localhost:5001/api/Activities')
      .then(response => setActivities(response.data))

    return () => { }
  }, [])

  return (
    <>
      <CssBaseline />
      <NavBar />
      {/* <Typography variant='h3'>Reactivities</Typography> */}
      <Container maxWidth='xl' sx={{mt: 3}}>
        <List>
          {activities.map((actvity) => (
            <ListItem key={actvity.id}>
              <ListItemText>{actvity.title}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Container>

    </>
  )
}

export default App
