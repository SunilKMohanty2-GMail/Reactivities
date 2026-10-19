import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material"
import { useActivities } from "../../../lib/hooks/useActivities"
import { Link } from "react-router";

type Props = {
    actvity: Activity
}

export default function ActivityCard({ actvity}: Props) {
    const { deleteActivity } = useActivities();
    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h5">{actvity.title}</Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1 }}>{actvity.date}</Typography>
                <Typography variant="body2">{actvity.description}</Typography>
                <Typography variant="subtitle1">{actvity.city} / {actvity.venue}</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
                <Chip label={actvity.category} variant="outlined" />
                <Box sx={{ display: 'flex', gap: 3 }}>
                    <Button                         
                        size="medium" 
                        variant="contained"
                        component={Link}
                        to={`/activities/${actvity.id}`}
                    >View</Button>
                    <Button                         
                        size="medium" 
                        variant="contained" 
                        color="error"
                        onClick={() => deleteActivity.mutate(actvity.id)} 
                        loading={deleteActivity.isPending}
                        // disabled={deleteActivity.isPending}
                    >Delete</Button>
                </Box>

            </CardActions>
        </Card>
    )
}
