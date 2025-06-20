#  Task Management Application
This is a full-stack Task Management Application designed to streamline task assignment and tracking.

# Admin can:

-- Create, assign, update, and delete tasks
-- Manage users and monitor task statuses

# User can:

-- View a list of tasks assigned to them
-- Track task status and details

The project is built with:

-  **Frontend**: React , Tailwind CSS.
-  **Backend**: ASP.NET Core Web API, Mongodb

---

##  Features

- Create, update, delete tasks
- Assign tasks to users
- Track task status (To Do, In Progress, Done)
- User authentication and role management
- Responsive and clean UI

---

## Project Structure

/client → React frontend (Tailwind CSS)
/server → ASP.NET Core Web API backend and mongodb database


---

## Getting Started

### Prerequisites

- Node.js and npm
- .NET 6 SDK or later
- Mongodb

---

## Frontend Setup (React + Tailwind)

1. Navigate to the frontend folder:

  cd fontend

2. Install dependencies:
   
   npm install

3. Start the development server:

   npm run dev

##  Backend Setup (ASP.NET Core)

1. Navigate to the backend folder:

 cd backend

2. Restore NuGet packages:

  dotnet restore

3. Update appsettings.json with your database connection string.
  
4. Run the API:

    dotnet watch run

