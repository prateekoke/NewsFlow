# Local MongoDB Setup Guide

This guide will help you set up MongoDB locally on your computer and configure it for use with NewsFlow.

## Step 1: Install MongoDB

### Windows Installation

1. **Download MongoDB Community Server:**
   - Visit: https://www.mongodb.com/try/download/community
   - Select:
     - Version: Latest stable version (recommended)
     - Platform: Windows
     - Package: MSI
   - Click "Download"

2. **Run the Installer:**
   - Run the downloaded `.msi` file
   - Choose "Complete" installation
   - Check "Install MongoDB as a Service"
   - Check "Install MongoDB Compass" (GUI tool - optional but recommended)
   - Click "Install"

3. **Verify Installation:**
   - MongoDB should start automatically as a Windows service
   - Open Command Prompt or PowerShell
   - Run: `mongod --version` (should show MongoDB version)
   - Run: `mongo --version` (MongoDB shell version)

### Alternative: Using MongoDB via Docker

If you prefer using Docker:

```bash
docker run -d -p 27017:27017 --name mongodb -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password mongo:latest
```

Connection string: `mongodb://admin:password@localhost:27017/`

## Step 2: Configure MongoDB Connection

1. **Default Connection:**
   - MongoDB runs on `localhost:27017` by default
   - No authentication required for local development (default setup)

2. **Create Environment File:**
   - Create a `.env` file in the project root (if it doesn't exist)
   - Add the following:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/newsflow
MONGODB_DB_NAME=newsflow
```

3. **For Production/Secure Setup (Optional):**
   - To enable authentication, you'll need to configure MongoDB with users
   - Connection string format: `mongodb://username:password@localhost:27017/newsflow?authSource=admin`

## Step 3: Start MongoDB Service

### Windows Service:
MongoDB should start automatically. To manually control:

```powershell
# Start MongoDB service
net start MongoDB

# Stop MongoDB service
net stop MongoDB
```

### Using Docker:
```bash
docker start mongodb
```

## Step 4: Verify MongoDB is Running

1. **Check Service Status (Windows):**
   - Open Services (Win + R, type `services.msc`)
   - Look for "MongoDB" service - should be "Running"

2. **Test Connection:**
   - Open MongoDB Compass (if installed)
   - Connect to: `mongodb://localhost:27017`
   - Or use MongoDB Shell:
     ```bash
     mongosh
     # or
     mongo
     ```

3. **Create Database and Test:**
   ```javascript
   use newsflow
   db.test.insertOne({ name: "test" })
   db.test.find()
   ```

## Step 5: Install MongoDB Dependencies

Run the following command to install MongoDB client for Node.js:

```bash
npm install mongoose
```

Or if you prefer the native MongoDB driver:

```bash
npm install mongodb
```

## Step 6: Update Your Application

The project includes MongoDB connection utilities in `src/lib/mongodb.ts`. Update your environment variables as needed.

## Troubleshooting

### MongoDB won't start:
- Check if port 27017 is already in use: `netstat -ano | findstr :27017`
- Check MongoDB logs: `C:\Program Files\MongoDB\Server\<version>\log\mongod.log`
- Ensure MongoDB service has proper permissions

### Connection refused:
- Ensure MongoDB service is running
- Check firewall settings (MongoDB uses port 27017)
- Verify connection string is correct

### Authentication errors:
- If you enabled authentication, ensure username/password in connection string are correct
- Check MongoDB user permissions

## Useful Commands

```bash
# MongoDB Shell (mongosh)
mongosh                          # Connect to local MongoDB
show dbs                         # List databases
use newsflow                     # Switch to newsflow database
show collections                 # List collections
db.collectionName.find()         # Query collection

# Windows Service Management
net start MongoDB                # Start MongoDB
net stop MongoDB                 # Stop MongoDB
sc query MongoDB                 # Check service status
```

## Next Steps

After MongoDB is set up:
1. The MongoDB connection utility is ready in `src/lib/mongodb.ts`
2. You can start using MongoDB in your backend/API routes
3. Consider setting up MongoDB Atlas (cloud) for production deployments


