# Blood Bank Management System

A fully functional Blood Bank Management System web application built with Node.js, Express, and MySQL.

### Features
- **Authentication**: JWT-based admin login system.
- **Dashboard**: Overview of total donors, available blood units, pending requests, and expiring units.
- **Donor Module**: Add, view, and delete donors.
- **Donation Module**: Record blood donations and automatically generate blood bags with a 42-day expiry.
- **Blood Inventory Module**: View and filter blood bags by type and status.
- **Testing Module**: Add test results linked to laboratories to mark blood as Available or Unsafe.
- **Patient Module**: Add and view patients needing blood.
- **Blood Request Module**: Create requests, assign compatible available blood bags, and mark as Approved.
- **Hospital & Staff Modules**: Manage hospitals and staff details.

### Database Setup to be done..

1. Open your MySQL client (e.g., MySQL Workbench).
2. Execute the `schema.sql` file provided in the root directory. This will:
   - Create the `blood_bank_db` database.
   - Create all necessary tables.
   - Insert a default admin account.

**Default Admin Credentials:**
- **Username**: ``` admin ```
- **Password**: ``` admin123 ```

## Configuration

1. Copy the `.env` file or make sure the values inside match your MySQL setup.
   - `DB_HOST=localhost`
   - `DB_USER=root`
   - `DB_PASSWORD=your_mysql_password`
   - `DB_NAME=blood_bank_db`

## Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   node server.js
   ```

3. Open your browser and navigate to:
   [http://localhost:3000](http://localhost:3000)

## Architecture
- **MVC Pattern**: Separated into `models/` (via db configs and direct querying), `controllers/`, and `routes/`.
- **Frontend**: Vanilla HTML/CSS/JS served statically. UI styled with modern aesthetics.
- **API**: RESTful endpoints using Express. Database integration uses parameterized queries to prevent SQL injection. Connection pooling is used for efficiency.
