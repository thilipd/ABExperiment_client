import React, { useState } from 'react';
import StripeChekout from 'react-stripe-checkout';
import axios from '../../axios';
import { Box, Button, Grid, CardContent, Card, Typography, CardActions } from '@mui/material';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const style = {
    width: '300px',
    height: '200px'
}

const Dashboard = () => {

    const [service, setService] = useState({
        name: "Basic",
        price: 2000 * 100
    })
    const user = useSelector((state) => state.user.user);

    const makePayment = async (token) => {


        await axios.post('/api/v1/payment/stripe', { token, service })
            .then((res) => {

             if(res.status ===200){
                toast.success('payment successfull');
             }
            }).catch((err) => {
                toast.error(err)
            })


    }

    return (
        <>
            <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Hi, {user.first_name}. You have registered using {user.provider}
            </Grid>
            <Box  sx={{display:'flex', marginTop:10, gap:10}}>


                <Card sx ={style}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Stripe Payment
                        </Typography>

                    </CardContent>
                    <CardActions>
                        <StripeChekout
                            stripeKey='pk_test_51MuC3qSCACHCuQoferL8IpFj9BlKSUJjxZ60dejLu0uJdzauxbQpd2wxVErKfWJ7upvgfr3xOnGPYbXcKvTMkTJF00i28htyyP'
                            name='stripe test'
                            currency='USD'
                            amount={200000}
                            token={makePayment}>
                            <Button size="small">Pay here</Button>
                        </StripeChekout>

                    </CardActions>
                </Card>

                <Card sx ={style}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Paypal Payment
                        </Typography>

                    </CardContent>
                    <CardActions>
                   
                   < PayPalScriptProvider options={{'client-id':'AQ68SzmxrtrdJqNE4-zLxSmJpoBSGyUMOvRXphokO2Xkc1DMUbQAGj-OM1o_yF0ldanu-KiFUqKc_J0Y'}}>
                   < PayPalButtons  createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: 'USD',
                                        value: "2000",
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={(data,actions) =>{
                    return actions.order.capture().then((details)=>{
                        alert(details.payer.name.given_name)
                    })
                }} />
                   </PayPalScriptProvider>
                    </CardActions> 
                </Card>

            </Box>
        </>

    )
}
export default Dashboard





