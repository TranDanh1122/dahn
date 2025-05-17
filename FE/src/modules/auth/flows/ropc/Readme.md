# This is legacy auth flow, user input email/password for auth
## Feel free to clone/copy this flow/code, just replace you API and UI, i hope it save your time!
1. Send Email-Username/Pass to server
2. Server response accesstoken - refresh token
3. Process Auth, when token exprire, refetch with refresh token
4. User can check their email and make email verify

## Resiger: Call directly to autho, create new user
## Login : Call to serverless -> auth0, because we need HTTPOnly cookies, only backend can set it
## Forgot : Call directly to auth0 -> send mail to user
## Reset : Call to serverless, because it have client secret
### + Serverless get token by client id and secret
### + Serverless search user by email end get user id
### + Serverless call user update password by user id

# You no need to do this if you have a real backend, just call a simple endpoint

### Note: removed reset flow, just using auth0, because i dont have enought API i need, so very danger if we can change password with only email (3 day stuck here)
