import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import axios from '../../axios'
import { toast } from 'react-toastify';


// ** Third Party Imports
import * as yup from 'yup'
import { useFormik } from 'formik'
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
import { useNavigate } from 'react-router-dom'



// ** Layout Import

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('This field is required'),
    password: yup.string().min(5, 'Invalid password').required('This field is required'),
    fname: yup.string().required('This field is required'),
    lname: yup.string().required('This field is required'),
    confirm: yup.string().required('This field is required')
})



const RegistrationPage = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const [error, setError] = useState({ status: false, msg: '' })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            fname: '',
            lname: '',
            confirm: ''
        },

        validationSchema: schema,
        onSubmit: (values) => {
            handleRegistration(values)
        }
    });


    const handleRegistration = async (data) => {

        const { fname, lname, password, confirm, email } = data;


        if (password === confirm) {

            await axios.post('/api/v1/auth/register', {
                first_name: fname,
                last_name: lname,
                password: password,
                email: email,
                role: 1,
                provider: 'local'
            }).then((res) => {
                toast.success(res.data.msg);
                formik.resetForm();
                navigate('/login')
            }).catch((err) => toast.error(err.response.data.msg))

        } else {
            return toast.error('Password and confirm password must be same')
        }

    }



    const handleInputChange = (event) => {
        const { id, value, checked } = event.target;
        const newValue = event.target.type === 'checkbox' ? checked : value;
        formik.setFieldValue(id, newValue);
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
                        Welcome ! Please enter your details.
                    </Typography>
                </Stack>

                <Card sx={{ mt: 5, pt: 5, pb: 5, borderRadius: '11px', maxHeight: '75vh !important' }}>
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
                                justifyContent: 'center',

                            }}
                        >
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel htmlFor='fname' sx={{ color: '#2A3A51' }}>
                                    First Name*
                                </InputLabel>
                                <OutlinedInput
                                    sx={{ height: '60px', color: 'rgba(27, 11, 43, 0.79)', fontSize: '17px' }}
                                    autoFocus
                                    label='First Name'
                                    id='fname'
                                    className='admin-login'
                                    placeholder='Enter First Name'
                                    value={formik.values.fname}
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
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel htmlFor='lname' sx={{ color: '#2A3A51' }}>
                                    Last Name*
                                </InputLabel>
                                <OutlinedInput
                                    sx={{ height: '60px', color: 'rgba(27, 11, 43, 0.79)', fontSize: '17px' }}
                                    autoFocus
                                    label='LastName'
                                    id='lname'
                                    className='admin-login'
                                    placeholder='Enter Last Name'
                                    value={formik.values.lname}
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
                            <FormControl fullWidth sx={{ mb: 2 }}>
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
                            <FormControl fullWidth sx={{ mb: 2 }}>
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
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel htmlFor='confirm' sx={{ color: '#2A3A51' }}>
                                    Confirm Password*
                                </InputLabel>
                                <OutlinedInput
                                    sx={{ height: '60px', color: 'rgba(27, 11, 43, 0.79)', fontSize: '17px' }}
                                    value={formik.values.confirm}
                                    label='confirm'
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    placeholder='Re-Enter Password'
                                    className='admin-login'
                                    id='confirm'
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
                                        {formik.errors.confirm}
                                    </FormHelperText>
                                )}
                            </FormControl>

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
                                Sign Up
                            </Button>
                        </form>
                    </CardContent>
                </Card>

            </Box>

        </Box>
    )
}

// RegistrationPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default RegistrationPage