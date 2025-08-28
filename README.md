Cummins Job Portal API Documentation

Base URL: https://cummins.onrender.com

1. User Registration

Endpoint: POST /user/registerUser

Description: Register a new user (normal or admin).

Request Body (Normal User):

{
  "rollNumber": "123456",
  "password": "yourPassword123",
  "isAdmin": false
}


Request Body (Admin User):

{
  "rollNumber": "admin",
  "password": "admin",
  "isAdmin": true
}


Response (Normal User):

{
  "_id": "68b0862d2dd650b8ca049edb",
  "rollNumber": "123456",
  "isAdmin": false,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}


Response (Admin User):

{
  "_id": "68b0867a2dd650b8ca049edf",
  "rollNumber": "admin",
  "isAdmin": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

2. User Login

Endpoint: POST /user/loginUser

Description: Login as a user or admin.

Request Body (Example for Admin):

{
  "rollNumber": "admin",
  "password": "admin"
}


Response:

{
  "_id": "68b0867a2dd650b8ca049edf",
  "rollNumber": "admin",
  "isAdmin": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}


Works similarly for normal users.

3. Get All Users

Endpoint: GET /user/

Description: Fetch all users in the system.

Response Example:

[]


Returns an array of all registered users.

4. Post a Job (Admin Only)

Endpoint: POST /adminPortal/post

Description: Admin can create a new job posting.

Request Body:

{
  "title": "Frontend Developer",
  "company": "Innovative Tech Solutions",
  "description": "We are hiring a React.js developer with 2+ years of experience in building modern web applications.",
  "location": "Nagpur, Maharashtra",
  "salary": "₹5,00,000 - ₹7,00,000 per year",
  "jobType": "Full-time",
  "createdBy": "68b05481de173a2fc8add16b"
}


Response:

{
  "title": "Frontend Developer",
  "company": "Innovative Tech Solutions",
  "description": "We are hiring a React.js developer with 2+ years of experience in building modern web applications.",
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

Endpoint: POST /adminPortal/apply

Description: User can apply to a job.

Request Body:

{
  "userId": "68b0862d2dd650b8ca049edb",
  "jobId": "68b06a4dbd8507a86ecb0f9c"
}


Response:

{
  "message": "Application submitted successfully",
  "jobId": "68b06a4dbd8507a86ecb0f9c",
  "userId": "68b0862d2dd650b8ca049edb"
}

6. Get All Jobs or User Applications

Endpoint: GET /

Request Body (Optional filter by user):

{
  "userId": "68b0862d2dd650b8ca049edb"
}


Response Example:

[]


Returns all jobs or all jobs applied by the specified user.

✅ Notes:

Authentication: For protected routes (like posting jobs or applying), include the JWT token in headers:

Authorization: Bearer <your_token_here>


User Roles:

isAdmin = true → Admin user, can post jobs.

isAdmin = false → Normal user, can apply for jobs.
