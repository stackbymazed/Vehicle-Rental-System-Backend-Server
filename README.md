🚗 Vehicle Rental System – Backend API
Live Server: https://assignment-2-azure-alpha.vercel.app/

A fully featured backend API for a Vehicle Rental Management System built with Node.js, TypeScript, Express.js, and PostgreSQL.
This project follows a modular, feature-based architecture with clear separation of concerns (Routes → Controllers → Services → Database).

✨ Features
🔐 Authentication & Authorization

Secure Signup & Login with hashed passwords (bcrypt)

JWT-based authentication (Bearer <token>)

Role-based access control: Admin & Customer

👥 User Management

Register, login & manage user profiles

Admin can update/delete any user

Customers can update only their own profile

🚘 Vehicle Management

Admin can add, update, delete vehicles

Public can view all available vehicles

Prevent deletion if active bookings exist

📦 Booking System

Create bookings with automatic:

Date validation

Price calculation

Vehicle availability update

Role-based booking viewing

Cancel bookings (customer)

Mark bookings returned (admin)

🛠️ Technology Stack
Layer	Technology
Runtime	Node.js
Language	TypeScript
Framework	Express.js
Database	PostgreSQL
ORM/Query Tool	pg (or Prisma/Knex depending on your codebase)
Auth	bcrypt, jsonwebtoken
Architecture	Modular Feature-Based (auth, users, vehicles, bookings)
📁 Project Structure (Feature-Based Modular Architecture)
src/
 ├── config/
 │    └── db.ts
 ├── modules/
 │    ├── auth/
 │    │     ├── auth.routes.ts
 │    │     ├── auth.controller.ts
 │    │     └── auth.service.ts
 │    ├── users/
 │    │     ├── user.routes.ts
 │    │     ├── user.controller.ts
 │    │     └── user.service.ts
 │    ├── vehicles/
 │    │     ├── vehicle.routes.ts
 │    │     ├── vehicle.controller.ts
 │    │     └── vehicle.service.ts
 │    ├── bookings/
 │    │     ├── booking.routes.ts
 │    │     ├── booking.controller.ts
 │    │     └── booking.service.ts
 ├── middleware/
 │    ├── auth.middleware.ts
 │    └── role.middleware.ts
 ├── utils/
 │    └── helpers.ts
 ├── app.ts
 └── server.ts

📊 Database Models
Users
Field	Description
id	Auto-generated
name	Required
email	Unique, lowercase
password	Hashed
phone	Required
role	'admin' or 'customer'
Vehicles
Field	Description
vehicle_name	Required
type	car / bike / van / SUV
registration_number	Unique
daily_rent_price	Positive
availability_status	available / booked
Bookings
Field	Description
customer_id	FK → Users
vehicle_id	FK → Vehicles
rent_start_date	Required
rent_end_date	After start date
total_price	Auto-calculated
status	active / cancelled / returned
🚀 Installation & Setup
1. Clone the repository
git clone <repo-url>
cd vehicle-rental-system

2. Install dependencies
npm install

3. Create .env file
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/vehiclerental
JWT_SECRET=your_jwt_secret_key

4. Run database migrations (if using SQL scripts/Prisma/Knex)

(Adjust according to your implementation)

5. Start development server
npm run dev

6. Build production
npm run build
npm start

🌐 API Endpoints
🔐 Authentication
Method	Endpoint	Access
POST	/api/v1/auth/signup	Public
POST	/api/v1/auth/signin	Public
🚘 Vehicles
Method	Endpoint	Access
POST	/api/v1/vehicles	Admin
GET	/api/v1/vehicles	Public
GET	/api/v1/vehicles/:vehicleId	Public
PUT	/api/v1/vehicles/:vehicleId	Admin
DELETE	/api/v1/vehicles/:vehicleId	Admin
👥 Users
Method	Endpoint	Access
GET	/api/v1/users	Admin
PUT	/api/v1/users/:userId	Admin or Owner
DELETE	/api/v1/users/:userId	Admin
📦 Bookings
Method	Endpoint	Access
POST	/api/v1/bookings	Customer/Admin
GET	/api/v1/bookings	Role-Based
PUT	/api/v1/bookings/:bookingId	Role-Based
🔐 Authorization Logic
Role	Permissions
Admin	Manage all vehicles, users, bookings
Customer	Manage own bookings & profile

JWT Required in:

Authorization: Bearer <token>
