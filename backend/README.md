# Backend API for Bokku Job Applications

A secure Node.js/Express backend API that handles job application submissions, bypassing Supabase RLS issues.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Get your **Service Role Key** from Supabase:
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **API**
4. Copy the **`service_role`** key (NOT the `anon` key)
5. Paste it in the `.env` file below

Create a `.env` file in the `backend` folder:
```env
SUPABASE_URL=https://xxftuszzrjqmtxyhhuyu.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
PORT=3001
```

### 3. Start the Backend Server
```bash
npm start
```

The server will run on `http://localhost:3001`

### 4. Start the Frontend
In a separate terminal:
```bash
cd bokku
npm run dev
```

## API Endpoints

### POST /api/submit-application
Submit a job application.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+234 812 000 0000",
  "resumeUrl": "https://drive.google.com/...",
  "message": "I'm interested in this role",
  "roleId": "operations-manager",
  "roleTitle": "Operations Manager"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": { ... }
}
```

### GET /api/health
Health check endpoint.

## Security Features

✅ **Service Role Key** - Uses Supabase service role to bypass RLS  
✅ **Server-side validation** - Validates email and required fields  
✅ **CORS enabled** - Allows frontend to make requests  
✅ **Error handling** - Proper error messages for debugging  

## Deployment

For production, deploy the backend to:
- **Vercel** (recommended for Next.js apps)
- **Railway** (easy Node.js deployment)
- **Render** (free tier available)
- **Heroku**

Update `VITE_BACKEND_API_URL` in the frontend `.env` with your production backend URL.
