# Cummins Job Portal API

Base URL: `https://cummins.onrender.com` — This API allows users and admins to register, login, post jobs, and apply for jobs.  

**1. User Registration:** `POST /user/registerUser` 
- Normal User: `{"rollNumber":"123456","password":"yourPassword123","isAdmin":false}` 
- Admin User: `{"rollNumber":"admin","password":"admin","isAdmin":true}` 
- Response: `{"_id":"68b0862d2dd650b8ca049edb","rollNumber":"123456","isAdmin":false,"token":"JWT_TOKEN_HERE"}`  

**2. User Login:** `POST /user/loginUser` — 
Request: `{"rollNumber":"admin","password":"admin"}` — 
Response: `{"_id":"68b0867a2dd650b8ca049edf","rollNumber":"admin","isAdmin":true,"token":"JWT_TOKEN_HERE"}`  

**3. Get All Users:** `GET /user/` — Response: `[]`  

**4. Post a Job (Admin/User):** `POST /adminPortal/post` — 
Request: `{"title":"Frontend Developer","company":"Innovative Tech Solutions","description":"We are hiring a React.js developer with 2+ years of experience in building modern web applications.","location":"Nagpur, Maharashtra","salary":"₹5,00,000 - ₹7,00,000 per year","jobType":"Full-time","createdBy":"68b05481de173a2fc8add16b"}` — 
Response: `{"title":"Frontend Developer","company":"Innovative Tech Solutions","description":"We are hiring a React.js developer with 2+ years of experience in building modern web applications.","location":"Nagpur, Maharashtra","salary":"₹5,00,000 - ₹7,00,000 per year","jobType":"Full-time","createdBy":"68b05481de173a2fc8add16b","isActive":true,"_id":"68b089b6801a586b41791117","applicants":[],"createdAt":"2025-08-28T16:54:14.159Z","updatedAt":"2025-08-28T16:54:14.159Z","__v":0}`  

**5. Apply for a Job:** `POST /adminPortal/apply` — 
Request: `{"userId":"68b0862d2dd650b8ca049edb","jobId":"68b06a4dbd8507a86ecb0f9c"}` —
Response: `{"message":"Application submitted successfully","jobId":"68b06a4dbd8507a86ecb0f9c","userId":"68b0862d2dd650b8ca049edb"}`  

**6. Get All Applications for a User:** `GET /` — 
Request: `{"userId":"68b0862d2dd650b8ca049edb"}` — 
Response: `[]`  

**Notes:** `isAdmin` determines admin privileges, `token` is JWT for authentication, `createdBy` is `_id` of user creating job, all endpoints return JSON.
