import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";

import { useEffect, useState } from "react"

function App() {
  const[activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // fetch('https://localhost:5001/api/Activities')
    // .then(response => response.json())
    // .then(data => setActivities(data))
    
    //return () => {}

    axios.get<Activity[]>('https://localhost:5001/api/Activities')
      .then(response => setActivities(response.data))

    return () => {}
  }, [])

  return (
      <>
        <Typography variant='h3'>Reactivities</Typography>
        <List>
          {activities.map((actvity) => (
            <ListItem key={actvity.id}>
              <ListItemText>{actvity.title}</ListItemText>
            </ListItem>
          ))}
        </List>
      </>
  )
}

export default App
