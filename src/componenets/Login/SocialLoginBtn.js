import React, { useState, useCallback } from 'react';
import { LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import jwt_dcode from 'jwt-decode';



const SocialLoginBtn = ({ handleLogin }) => {



    return (
        <div>
            <br />
            <LoginSocialFacebook

                appId={'606669034684433'}

                //appId={process.env.REACT_APP_FB_APP_ID || '1439052896903542'}
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
                client_id={ '690441400392-iaim9oh4p3bkbhbnlh0deabmq4v1biid.apps.googleusercontent.com'}
                //client_id={process.env.REACT_APP_GG_APP_ID || '121812674-ihun3omvgmd0udr8lgp54bnontmpuprj.apps.googleusercontent.com'}

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

// > git ls-files --stage -- /Users/timeless/Desktop/Freelance_works/AB Experiment/client/src/componenets/Login/SocialLoginBtn.js [38ms]