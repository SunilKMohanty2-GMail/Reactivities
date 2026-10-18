import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { SubmitEvent } from 'react';
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
    actvity?: Activity
    closeForm: () => void
}

export default function ActivityForm({actvity, closeForm}: Props) {
    const {updateActivity, createActivity} = useActivities();

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        //console.log(event);
        const formData = new FormData(event.currentTarget);
        const data: {[key: string]: FormDataEntryValue} = {}

        formData.forEach((value, key) => {
            data[key] = value;
        });

        if(actvity) {
            data.id = actvity.id;
            await updateActivity.mutateAsync(data as unknown as Activity);
            closeForm();
        } else {
            await createActivity.mutateAsync(data as unknown as Activity);
            closeForm();
        }
        console.log(data);
    }

  return (
    <Paper sx={{borderRadius: 3, padding: 3}}>
        <Typography variant="h5" gutterBottom color="primary">
            Create Activity
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{display:'flex', flexDirection: 'column', gap: 3}}>
            <TextField name='title' label='Title' defaultValue={actvity?.title} />
            <TextField name='description' label='Description' multiline rows={3} defaultValue={actvity?.description} />
            <TextField name='category' label='Category' defaultValue={actvity?.category} />
            <TextField name='date' label='Date' type="date" 
                defaultValue={actvity?.date
                    ? new Date(actvity.date).toISOString().split('T')[0]
                    : new Date().toISOString().split('T')[0]} 
            />
            <TextField name='city' label='City' defaultValue={actvity?.city} />
            <TextField name='venue' label='Venue' defaultValue={actvity?.venue} />
            <Box sx={{display: 'flex', justifyContent: 'end', gap: 4}}>
                <Button onClick={closeForm} color='inherit'>Cancel</Button>
                <Button 
                    type="submit" 
                    color='success' 
                    variant="contained"                    
                    loading={updateActivity.isPending || createActivity.isPending}
                    // disabled={updateActivity.isPending || createActivity.isPending}
                >Submit</Button>
            </Box>
        </Box>
    </Paper>
  )
}
