import React, { useState } from 'react';
import TwitterLogin from 'react-twitter-auth';
//File to get API KEY
export const Twitter = () => {
    const onSuccess = (response) => {
        response.json().then(body => {
          const data = {
              oauth_token: body.oauth_token,
              oauth_token_secret: body.oauth_token_secret
          }
          console.log(data);
       });
      }
    
     const onFailed = (error) => {
        alert("An error occurred");
        console.log(error);
      }
    return (
        <TwitterLogin loginUrl="https://mywishlistbot.herokuapp.com/api/v1/auth/twitter"
        onFailure={onFailed}
        onSuccess={onSuccess}
        showIcon={true}
        requestTokenUrl="https://mywishlistbot.herokuapp.com/api/v1/auth/twitter/reverse"
        style={{backgroundColor:'transparent', borderWidth:0}}
        >
      <p className="button" >Authenticate</p>
    </TwitterLogin>
    )
}