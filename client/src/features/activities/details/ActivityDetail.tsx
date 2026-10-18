import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { useActivities } from "../../../lib/hooks/useActivities"

type Props = {
    selectedActvity: Activity
    cancelSelectActivity: () => void
    openForm: (id: string) => void
}

export default function ActivityDetail({ selectedActvity, cancelSelectActivity, openForm }: Props) {
    const {activities} = useActivities();
    const actvity = activities?.find(x => x.id === selectedActvity.id);

    if(!actvity) return <Typography>Loading...</Typography>
    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardMedia
                component='img'
                src={`/images/categoryImages/${actvity.category}.jpg`}
            />
            <CardContent>
                <Typography variant="h5">{actvity.title}</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'light' }}>{actvity.date}</Typography>
                <Typography variant="body1">{actvity.description}</Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => openForm(actvity.id)} color="primary">Edit</Button>
                <Button onClick={cancelSelectActivity} color="inherit">Cancel</Button>
            </CardActions>
        </Card>
    )
}
