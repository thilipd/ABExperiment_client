import React, { useState, useCallback } from 'react';
import { LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import jwt_dcode from 'jwt-decode';



const SocialLoginBtn = ({ handleLogin }) => {



    return (
        <div>
            <br />
            <LoginSocialFacebook

                appId={process.env.REACT_APP_FB_APP_ID || '1439052896903542'}

                onResolve={(response) => {
                    console.log(response)
                    handleLogin(response)
                }}
                onReject={(err) => {
                    console.log(err, "error")
                }}
            >
                <FacebookLoginButton />
            </LoginSocialFacebook>

            <br />

            <LoginSocialGoogle
                client_id={process.env.REACT_APP_GG_APP_ID || '121812674-ihun3omvgmd0udr8lgp54bnontmpuprj.apps.googleusercontent.com'}


                scope="openid profile email"
                discoveryDocs="claims_supported"
                access_type="offline"
                onResolve={(response) => {
                    console.log(response)
                    handleLogin(response)
                }}
                onReject={err => {
                    console.log(err);
                }}
            >
                <GoogleLoginButton />
            </LoginSocialGoogle>

        </div>
    )
}

export default SocialLoginBtn