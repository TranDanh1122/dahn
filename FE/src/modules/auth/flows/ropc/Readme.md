# Legacy Auth Flow - Email & Password Based Authentication

This flow implements a basic legacy authentication flow using email and password.  
Feel free to clone or copy this logic — just replace the API endpoints and UI to fit your stack. I hope it saves you time!

---

### 🔐 Auth Flow Overview:

1. User submits email & password to the server
2. Server responds status and set an `access_token` and a `refresh_token` to cookies (HTTPOnly)
3. App stores tokens in cookies, handles authenticated requests
4. On token expiration → automatically refresh using `refresh_token`, implement with Axios interceptors
5. Users can verify their email through a verification email, but that not required

---

### 🧩 Specifics:

- **Register**: Call directly to Auth0 to create a new user
- **Login**: Goes through a serverless function → Auth0  
   ➤ Because we need HTTPOnly cookies (only backend can set those)
- **Forgot Password**: Call Auth0 directly → triggers reset email to user
- **Reset Password**: Goes through serverless  
   ➤ Required because it needs a client secret
    Step 1: Serverless gets management token via client ID + secret  
    Step 2: Searches user by email → gets user ID  
    Step 3: Calls Auth0 API to update password via user ID
  

---

### ⚠️ Notes:

- If you have a real backend → just call your own reset-password API  
  No need for this complexity.
- I've **removed the reset flow** for now.  
  → I didn’t have access to all the necessary Auth0 APIs,  
  → and allowing password change via only email was too risky.  
  (Yes, I was stuck 3 days on this 🔥😅)

---

### BTW:
This is a legacy flow for learning purposes, not production-ready.
Clone it, tweak it, and ship something fast 🚀
