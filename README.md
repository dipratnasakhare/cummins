# Cummins Job Portal API Documentation

**Base URL:** `https://cummins.onrender.com`

---

## 1. User Registration
**POST** `/user/registerUser`  
Register a new user (normal or admin).  

**Normal User Request:**
```json
{ "rollNumber": "123456", "password": "yourPassword123", "isAdmin": false }
Admin User Request:

json
Copy code
{ "rollNumber": "admin", "password": "admin", "isAdmin": true }
Response:

json
Copy code
{ "_id": "68b0862d2dd650b8ca049edb", "rollNumber": "123456", "isAdmin": false, "token": "JWT_TOKEN_HERE" }
2. User Login
POST /user/loginUser
Login as user/admin.

Request Example:

json
Copy code
{ "rollNumber": "admin", "password": "admin" }
Response:

json
Copy code
{ "_id": "68b0867a2dd650b8ca049edf", "rollNumber": "admin", "isAdmin": true, "token": "JWT_TOKEN_HERE" }
3. Get All Users
GET /user/
Fetch all users. Response: [] (array of users)

4. Post a Job (Admin Only)
POST /adminPortal/post
Request:

json
Copy code
{
  "title": "Frontend Developer",
  "company": "Innovative Tech Solutions",
  "description": "React.js developer with 2+ years experience.",
  "location": "Nagpur, Maharashtra",
  "salary": "₹5,00,000 - ₹7,00,000 per year",
  "jobType": "Full-time",
  "createdBy": "68b05481de173a2fc8add16b"
}
Response:

json
Copy code
{
  "title": "Frontend Developer",
  "company": "Innovative Tech Solutions",
  "description": "React.js developer with 2+ years experience.",
  "location": "Nagpur, Maharashtra",
  "salary": "₹5,00,000 - ₹7,00,000 per year",
  "jobType": "Full-time",
  "createdBy": "68b05481de173a2fc8add16b",
  "isActive": true,
  "_id": "68b089b6801a586b41791117",
  "applicants": [],
  "createdAt": "2025-08-28T16:54:14.159Z",
  "updatedAt": "2025-08-28T16:54:14.159Z",
  "__v": 0
}
5. Apply for a Job (User)
POST /adminPortal/apply
Request:

json
Copy code
{ "userId": "68b0862d2dd650b8ca049edb", "jobId": "68b06a4dbd8507a86ecb0f9c" }
Response:

json
Copy code
{ "message": "Application submitted successfully", "jobId": "68b06a4dbd8507a86ecb0f9c", "userId": "68b0862d2dd650b8ca049edb" }
6. Get All Jobs / User Applications
GET /
Optional filter by user:

json
Copy code
{ "userId": "68b0862d2dd650b8ca049edb" }
Response: Array of jobs or applied jobs.

Notes
Auth: Include JWT token in headers:
Authorization: Bearer <your_token_here>

Roles:

isAdmin = true → Admin (can post jobs)

isAdmin = false → User (can apply for jobs)
