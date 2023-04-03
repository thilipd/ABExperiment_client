import React from 'react'

import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';

const Dashboard = () => {

    const user = useSelector((state) => state.user.user);

    return (
        <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Hi, {user.first_name}. You have registered using {user.provider}
        </Grid>
    )
}
export default Dashboard