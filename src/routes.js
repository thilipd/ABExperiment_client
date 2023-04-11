import { lazy, useEffect, Suspense, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NProgress from 'nprogress';
import { useSelector } from 'react-redux';
import axios from './axios';




const LoginWith = lazy(() => import('./pages/LoginWith'));
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const AppBar = lazy(() => import('./pages/Home/AppBar'));
const RegistrationPage = lazy(() => import('./pages/Auth/RegistrationPage'));


function SuspenseLoader() {
    useEffect(() => {
        NProgress.start();

        return () => {
            NProgress.done();
        };
    }, []);

    return <></>;
}

const AppRoutes = () => {

    const [data, setData] = useState({});
    const userData = useSelector(state => state.user.user);


    const connectSever=async()=> {

        await axios.get('/api/v1/auth/').then(res=>console.log(res.data.msg)).catch(err=> console.log(err))

    }
    

    useEffect(() => {
        connectSever();
        setData(userData);
    }, [data])


    return (
        <Suspense fallback={<SuspenseLoader />} >

            <Routes>

                <Route path='/' element={<Navigate to={Object.keys(data).length ? '/home' : '/loginWith'} />} />
                <Route path='/loginWith' element={<LoginWith />} />
                <Route path='/login' element={<LoginPage setData={setData} />} />
                <Route path='/register' element={<RegistrationPage />} />
                <Route path='/home' element={<AppBar setData={setData} />} />


            </Routes>

        </Suspense>
    )
}

export default AppRoutes
