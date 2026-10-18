import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material"
import { useActivities } from "../../../lib/hooks/useActivities"

type Props = {
    actvity: Activity
    selectActivity: (id: string) => void
}

export default function ActivityCard({ actvity, selectActivity }: Props) {
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
                        onClick={() => selectActivity(actvity.id)} 
                    >View</Button>
                    <Button                         
                        size="medium" 
                        variant="contained" 
                        color="error"
                        onClick={() => deleteActivity.mutate(actvity.id)} 
                        disabled={deleteActivity.isPending}
                    >Delete</Button>
                </Box>

            </CardActions>
        </Card>
    )
}
