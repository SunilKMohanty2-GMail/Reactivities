import { Avatar, Box, Button, Chip, Divider, Grid, Paper, Stack, Typography } from "@mui/material";

type Props = {
  profile: Profile
}
export default function ProfileHeader({profile} : Props) {
  const following = true;
  const followersCount = 5;
  const followingCount = 42;

  return (
    <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
      <Grid container spacing={2}>
        <Grid size={8}>
          <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
            <Avatar
              src={profile?.imageUrl}
              alt="User Image"
              sx={{ width: 150, height: 150 }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} >
              <Typography variant="h4">{profile?.displayName}</Typography>
              {following &&
                <Chip variant='outlined' color='secondary' label='Following' sx={{ borderRadius: 1 }} />}
            </Box>
          </Stack>
        </Grid>
        <Grid size={4}>
          <Stack spacing={2} sx={{ alignItems: "center" }} >
            <Box sx={{ display: "flex", justifyContent: "space-around", width: "100%" }} >
              <Box sx={{ textAlign: "center" }} >
                <Typography variant="h6">Followers</Typography>
                <Typography variant="h3">{followersCount}</Typography>
              </Box>
              <Box sx={{ textAlign: "center" }} >
                <Typography variant="h6">Following</Typography>
                <Typography variant="h3">{followingCount}</Typography>
              </Box>
            </Box>
            <Divider sx={{ width: '100%' }} />
            <Button
              fullWidth
              variant="outlined"
              color={following ? 'error' : 'success'}
            >
              {following ? 'Unfollow' : 'Follow'}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  )
}
