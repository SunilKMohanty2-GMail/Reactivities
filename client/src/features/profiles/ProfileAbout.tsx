import { useProfile } from "../../lib/hooks/useProfile.ts";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import ProfileEdit from "./ProfileEdit.tsx";

export default function ProfileAbout() {
    const { id } = useParams();
    const { profile, isCurrentUser } = useProfile(id);
    const [editMode, setEditMode] = useState(false);

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5">About {profile?.displayName}</Typography>
                {isCurrentUser && !editMode &&
                    <Button onClick={() => setEditMode(true)}>
                        Edit profile
                    </Button>
                }
                {editMode && (
                    <Button onClick={() => setEditMode(false)}>
                        Cancel
                    </Button>
                )}
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ overflow: 'auto', maxHeight: 350 }}>
                {!editMode && (
                    <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }}>
                        {profile?.bio || 'No description added yet'}
                    </Typography>
                )}

                {editMode && (
                    <ProfileEdit setEditMode={setEditMode} />
                )}
            </Box>
        </Box>
    );
}