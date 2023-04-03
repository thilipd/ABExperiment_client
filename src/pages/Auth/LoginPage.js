import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import SocialLoginBtn from '../../componenets/Login/SocialLoginBtn';
import { Divider } from '@mui/material';
import { toast } from 'react-toastify';
import axios from '../../axios';
import { useDispatch } from 'react-redux';


// ** Third Party Imports
import * as yup from 'yup'
import { FormikErrors, useFormik } from 'formik'
import {
    Box,
    Stack,
    Typography,
    Card,
    CardContent,
    Button,
    FormControl,
    InputAdornment,
    FormHelperText,
    IconButton,
    InputLabel,
    OutlinedInput,
    Alert,
    AlertTitle
} from '@mui/material'
import { EyeOutline, EyeOffOutline } from 'mdi-material-ui'
import { Link, useNavigate } from 'react-router-dom'
import { dispatchLogin, dispatchUser } from '../../redux/actions/userAction';






// ** Layout Import

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('This field is required'),
    password: yup.string().min(5, 'Invalid password').required('This field is required')
})



const LoginPage = ({ setData }) => {
    const theme = useTheme()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false)

    const [error, setError] = useState({ status: false, msg: '' })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            provider: 'local'
        },

        validationSchema: schema,
        onSubmit: (values) => {
            handleLogin(values)
        }
    })

    const handleLogin = async (data) => {

        console.log(data)



        if (data.provider === 'local') {

            await axios.post('/api/v1/auth/login', {
                email: data.email,
                password: data.password,
                provider: 'local'
            })
                .then((res) => {
                    toast.success(res.data.msg);
                    const user = (localStorage.setItem('user', JSON.stringify(res.data.user)));
                    const token = (localStorage.setItem('token', JSON.stringify(res.data.accessToken)));

                    dispatch(dispatchLogin(res.data))
                    setData(res.data.user)
                    formik.resetForm();
                    navigate('/')
                }).catch((err) => {
                    console.log(err)
                    toast.error(err.response.data.msg)
                })
        } else {
            if (data.provider == 'facebook') {

                await axios.post('/api/v1/auth/login', {
                    email: data.data.email,
                    provider: data.provider,
                    first_name: data.data.first_name,
                    last_name: data.data.last_name || '',
                    role: 1,
                    avatar: data.data.picture.data.url
                }).then((res) => {
                    toast.success(res.data.msg);
                    const user = (localStorage.setItem('user', JSON.stringify(res.data.user)));
                    const token = (localStorage.setItem('token', JSON.stringify(res.data.accessToken)));

                    dispatch(dispatchLogin(res.data))
                    setData(res.data.user)
                    formik.resetForm();
                    navigate('/')
                }).catch((err) => {
                    console.log(err)
                    toast.error(err.response.data.msg)
                })
            } else if (data.provider == 'google') {

                console.log(data.data.email, "google")

                await axios.post('/api/v1/auth/login', {
                    email: data.data.email,
                    provider: data.provider,
                    first_name: data.data.given_name,
                    last_name: data.data.family_name || '',
                    role: 1,
                    avatar: data.data.picture

                }).then((res) => {
                    toast.success(res.data.msg);
                    const user = (localStorage.setItem('user', JSON.stringify(res.data.user)));
                    const token = (localStorage.setItem('token', JSON.stringify(res.data.accessToken)));

                    dispatch(dispatchLogin(res.data))
                    setData(res.data.user)
                    formik.resetForm();
                    navigate('/')
                }).catch((err) => {
                    console.log(err)
                    toast.error(err.response.data.msg)
                })
            }
        }
    }

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        formik.setFieldValue(id, value.trim());
    };

    return (
        <Box
            className='content-center'
            sx={{
                backgroundImage: `linear-gradient( 50%,#FFF 50%)`,
                color: 'darkred',
                position: 'relative'
            }}
        >
            {/* <img alt="login-shadow" src={loginshadow} className='login-img' /> */}
            <Box sx={{ width: '50vw !important' }}>
                <Stack>
                    <Typography
                        sx={{
                            fontWeight: '600',
                            fontSize: { xs: '40px', sm: '45px', md: '50px' },
                            textAlign: 'left',
                            color: 'white',
                            fontFamily: 'Mazzard-regular'
                        }}
                    >
                        Welcome back
                    </Typography>
                    <Typography
                        sx={{
                            color: '#D5DBF5',
                            weight: '400',
                            fontSize: { xs: '20px', sm: '24px', md: '24px' },
                            lineHeight: '38px',
                            fontFamily: 'Mazzard-regular'
                        }}
                    >
                        Welcome back! Please enter your details.
                    </Typography>
                </Stack>

                <Card sx={{ mt: 5, pt: 5, pb: 5, borderRadius: '11px' }}>
                    <CardContent
                        className='form-main-div'
                        sx={{
                            pt: 10,
                            pl: 5,
                            pr: 5
                        }}
                    >
                        {/* ERROR COMPONENT */}
                        {error.status && (
                            <Box sx={{ mb: 2, position: 'absolute', bottom: 10, right: 20, m: 5 }}>
                                <Alert severity='error' sx={{ width: 300 }}>
                                    <AlertTitle>Error</AlertTitle>
                                    {error.msg}
                                </Alert>
                            </Box>
                        )}
                        <form
                            noValidate
                            autoComplete='off'
                            onSubmit={formik.handleSubmit}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <FormControl fullWidth sx={{ mb: 10 }}>
                                <InputLabel htmlFor='email' sx={{ color: '#2A3A51' }}>
                                    Email*
                                </InputLabel>
                                <OutlinedInput
                                    sx={{ height: '60px', color: 'rgba(27, 11, 43, 0.79)', fontSize: '17px' }}
                                    autoFocus
                                    label='Email'
                                    id='email'
                                    className='admin-login'
                                    placeholder='Enter Email address'
                                    value={formik.values.email}
                                    fullWidth
                                    onBlur={formik.handleBlur}
                                    onChange={(e) => handleInputChange(e, formik.setFieldValue)}
                                />
                                {formik.errors.email && formik.touched.email && (
                                    <FormHelperText sx={{ color: 'error.main', fontSize: '15px !important', marginLeft: '2px!important' }}>
                                        {formik.errors.email}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <InputLabel htmlFor='password' sx={{ color: '#2A3A51' }}>
                                    Password*
                                </InputLabel>
                                <OutlinedInput
                                    sx={{ height: '60px', color: 'rgba(27, 11, 43, 0.79)', fontSize: '17px' }}
                                    value={formik.values.password}
                                    label='Password'
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    placeholder='Enter Password'
                                    className='admin-login'
                                    id='password'
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                edge='end'
                                                onMouseDown={e => e.preventDefault()}
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                {formik.errors.password && formik.touched.password && (
                                    <FormHelperText sx={{ color: 'error.main', fontSize: '15px !important', marginLeft: '2px!important' }} id=''>
                                        {formik.errors.password}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <p style={{ textAlign: 'right', width: '100%', marginTop: '-30px' }}>
                                {/* <Link
                                    to='/userForgotPassword'
                                    style={{
                                        textDecoration: 'none',
                                        color: '#2d4acd',
                                        fontSize: '15px',
                                        fontWeight: '500',
                                        fontFamily: 'Mazzard',
                                        marginRight: '10px'
                                    }}
                                >
                                    Forgot Password?
                                </Link> */}
                                <Link
                                    to='/register'
                                    style={{
                                        textDecoration: 'none',
                                        color: '#2d4acd',
                                        fontSize: '15px',
                                        fontWeight: '500',
                                        fontFamily: 'Mazzard'
                                    }}
                                >
                                    Not Registerd?
                                </Link>
                            </p>

                            <Button
                                size='large'
                                type='submit'
                                variant='contained'
                                sx={{
                                    textTransform: 'capitalize',
                                    width: '140.21px !important',
                                    height: '60px',
                                    padding: '10px !important',
                                    marginTop: '16px',
                                    borderRadius: '9px',
                                    fontSize: '16px'
                                }}
                            >
                                Sign in
                            </Button>
                        </form>
                        <Box>
                            <SocialLoginBtn handleLogin={handleLogin} />
                        </Box>
                    </CardContent>
                </Card>
                <Divider />

            </Box>

        </Box>
    )
}

// LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage