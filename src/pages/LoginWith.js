import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';


// import LogoImage from 'src/assets/Images/logo.svg'

function LoginWith() {
    const navigate = useNavigate()

    return (
        <div style={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid sx={{ width: 'fit-content', height: 'fit-content' }}>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    {/* <img alt='logo' src={LogoImage} style={{ height: '100px' }} /> */}
                </Grid>
                <Grid item sx={{ display: 'flex', justifyContent: 'center', marginTop: '10%' }} xs={12}>
                    <Grid>
                        <Button
                            variant='contained'
                            size='large'
                            onClick={() => {
                                navigate('/login')
                            }}
                        >
                            login
                        </Button>
                    </Grid>


                </Grid>
            </Grid>
        </div>
    )
}

export default LoginWith