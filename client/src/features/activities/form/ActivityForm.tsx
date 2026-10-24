import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useEffect } from 'react';
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { activitySchema, type ActivitySchema } from "../../../lib/schemas/activitySchema";
import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";

export default function ActivityForm() {
    const {control, reset, handleSubmit } = useForm<ActivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchema)
    });
    const { id } = useParams();
    const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);

    useEffect(() => {
        if (activity) {
            reset({
                ...activity,
                location: {
                    city: activity.city,
                    venue: activity.venue,
                    latitude: activity.latitude,
                    longitude: activity.longitude
                }
            });
        }
    }, [activity, reset]);

    const navigate = useNavigate();

    const handleCancel = () => {
        if (id)
            navigate(`/activities/${id}`);
        else
            navigate(`/activities`);
    };

    const onSubmit = async (data: ActivitySchema) => {
        const { location, ...rest } = data;
        const flattenedData = { ...rest, ...location };
        try {
            if (activity) {
                updateActivity.mutate({ ...activity, ...flattenedData } as Activity, {
                    onSuccess: () => navigate(`/activities/${activity.id}`)
                });
            } else {
                createActivity.mutate(flattenedData as Activity, {
                    onSuccess: (id) => {
                        navigate(`/activities/${id}`);
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (isLoadingActivity) return <Typography>Loading activity ...</Typography>

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {activity ? 'Edit Activity' : 'Create Activity'}
            </Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextInput label='Title' control={control} name='title' />
                <TextInput label='Description' control={control} name='description' multiline rows={3} />                
                <Box sx={{display:'flex', gap:3}}>
                    <SelectInput label='Category' control={control} name='category' items={categoryOptions} />
                    <DateTimeInput label='Date' control={control} name='date' />
                </Box>                
                <LocationInput control={control} label='Enter the location' name='location'/>
                <Box sx={{ display: 'flex', justifyContent: 'end', gap: 4 }}>
                    <Button color='inherit' onClick={handleCancel}>Cancel</Button>
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
