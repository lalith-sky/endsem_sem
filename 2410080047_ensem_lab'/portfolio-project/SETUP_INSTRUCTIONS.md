# Complete Step-by-Step Setup Instructions

## 🎯 Goal
Create and run a complete full-stack portfolio website with React frontend, Spring Boot backend, and MySQL database locally, then deploy to Render.

---

## PART 1: LOCAL SETUP

### Phase 1A: Environment Setup (10 minutes)

#### Step 1: Verify Java Installation
```bash
java -version
```
Should show: `java 17.0.x` or higher

If not installed:
- Download from: https://www.oracle.com/java/technologies/downloads/
- Install Java 17

#### Step 2: Verify Maven Installation
```bash
mvn -version
```
Should show: `Apache Maven 3.9.x` or higher

If not installed:
- Download from: https://maven.apache.org/download.cgi
- Extract to a folder
- Add to PATH: `C:\path\to\maven\bin`

#### Step 3: Verify Node.js Installation
```bash
node -v
npm -v
```
Should show: `v16.x.x` or higher

If not installed:
- Download from: https://nodejs.org/
- Install (LTS version recommended)

#### Step 4: Verify MySQL Installation
```bash
mysql --version
```
Should show: `mysql Ver X.X.X`

If not installed:
- Download from: https://dev.mysql.com/downloads/mysql/
- Install and note your password
- Start MySQL service

---

### Phase 1B: Database Configuration (5 minutes)

#### Step 1: Open MySQL Command Line
**On Windows:**
```bash
mysql -u root -p
```
Enter your MySQL password

#### Step 2: Create Database
```bash
# Navigate to the project folder
cd portfolio-project

# Run the database schema
mysql -u root -p < database_schema.sql
```

#### Step 3: Verify Tables
```bash
mysql -u root -p
> USE portfolio_db;
> SHOW TABLES;
> SELECT * FROM students;
```

---

### Phase 1C: Backend Setup (15 minutes)

#### Step 1: Navigate to Backend Directory
```bash
cd backend
```

#### Step 2: Update Database Credentials
Edit: `src/main/resources/application.properties`

```properties
# Change these lines if needed:
spring.datasource.url=jdbc:mysql://localhost:3306/portfolio_db
spring.datasource.username=root
spring.datasource.password=yourMySQLPassword  # Replace with your password
```

#### Step 3: Build Backend
```bash
mvn clean install
```

Wait for: `BUILD SUCCESS`

#### Step 4: Run Backend
```bash
mvn spring-boot:run
```

Wait for this message:
```
Started PortfolioBackendApplication in X.XXX seconds
```

✅ Backend is now running at: **http://localhost:8080**

#### Step 5: Test Backend
Open in browser or terminal:
```bash
curl http://localhost:8080/api/health
```

Should return:
```json
{"status":"UP","message":"Portfolio Backend is running"}
```

**Keep this terminal open!** Don't close it.

---

### Phase 1D: Frontend Setup (15 minutes)

#### Step 1: Open New Terminal/Command Prompt
(Keep backend terminal open)

#### Step 2: Navigate to Frontend Directory
```bash
cd frontend
```

#### Step 3: Install Dependencies
```bash
npm install
```

Wait for: `added XXX packages`

#### Step 4: Start Frontend Dev Server
```bash
npm start
```

Wait for:
```
Compiled successfully!
Local: http://localhost:3000
```

✅ Frontend will automatically open in your browser

---

### Phase 1E: Testing Local Setup (10 minutes)

#### Test 1: Check Frontend
1. Browser opens at: `http://localhost:3000`
2. See portfolio website with:
   - ✅ Navbar with Home, About, Projects, Contact
   - ✅ Home section with hero content
   - ✅ About section with skills
   - ✅ Projects section
   - ✅ Contact form

#### Test 2: Check Responsiveness
1. Press `F12` to open Developer Tools
2. Click device toggle (mobile icon)
3. Select different devices
4. Verify layout adjusts properly

#### Test 3: Test Backend APIs
```bash
# In a new terminal/command prompt
# Get all students
curl http://localhost:8080/api/students

# Create a student
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","regNo":"TEST001"}'

# Get all projects
curl http://localhost:8080/api/projects
```

#### Test 4: Test Contact Form
1. Go to Contact section in browser
2. Fill in the form:
   - Name: Your Name
   - Email: your@email.com
   - Subject: Test Subject
   - Message: Test message
3. Click "Send Message"
4. Should see: "Message sent successfully!"

---

## PART 2: CUSTOMIZATION

### Step 1: Update Personal Information
Edit: `frontend/src/components/Navbar.js`
```javascript
// Update social links
<a href="https://github.com/YOUR_GITHUB_USERNAME" target="_blank" rel="noopener noreferrer">
```

Edit: `frontend/src/pages/Home.js`
```javascript
// Update greeting and intro text
<h1>Hi, I'm YOUR_NAME</h1>
```

Edit: `frontend/src/pages/About.js`
```javascript
// Update about content and skills
<h2>YOUR NAME - Student Developer</h2>
```

### Step 2: Update Projects
Edit: `frontend/src/pages/Projects.js`

Replace sample projects with your projects:
```javascript
const staticProjects = [
  {
    id: 1,
    title: 'Your Project Title',
    description: 'Your project description',
    tech: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/your-profile/project',
    live: 'https://your-project.com',
  },
];
```

### Step 3: Update Contact Information
Edit: `frontend/src/pages/Contact.js`
```javascript
<p>your.email@example.com</p>
<p>+1 (234) 567-8900</p>
<p>Your City, Country</p>
```

---

## PART 3: BACKEND CRUD OPERATIONS

### Test Create Operation
```bash
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Your Name",
    "email": "your@email.com",
    "regNo": "REG123",
    "department": "Computer Science",
    "semester": "6",
    "bio": "Passionate developer",
    "phoneNumber": "9876543210"
  }'
```

### Test Read Operation
```bash
# Get all students
curl http://localhost:8080/api/students

# Get specific student
curl http://localhost:8080/api/students/1
```

### Test Update Operation
```bash
curl -X PUT http://localhost:8080/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{"bio": "Updated bio"}'
```

### Test Delete Operation
```bash
curl -X DELETE http://localhost:8080/api/students/1
```

---

## PART 4: DEPLOYMENT ON RENDER

### Phase 4A: Prepare for Deployment

#### Step 1: Create GitHub Repositories

**Backend Repository:**
```bash
cd backend
git init
git add .
git commit -m "Initial backend commit"
git remote add origin https://github.com/YOUR_USERNAME/portfolio-backend.git
git push -u origin main
```

**Frontend Repository:**
```bash
cd ../frontend
git init
git add .
git commit -m "Initial frontend commit"
git remote add origin https://github.com/YOUR_USERNAME/portfolio-frontend.git
git push -u origin main
```

#### Step 2: Create Render Account
- Go to: https://render.com
- Sign up with GitHub account
- Authorize Render to access your repositories

---

### Phase 4B: Deploy Backend

#### Step 1: Create Web Service
1. Go to https://dashboard.render.com
2. Click "+ New"
3. Select "Web Service"
4. Connect GitHub
5. Select `portfolio-backend` repository

#### Step 2: Configure Backend
| Field | Value |
|-------|-------|
| Name | portfolio-backend |
| Environment | Docker |
| Build Command | `mvn clean install` |
| Start Command | `java -jar target/portfolio-backend-1.0.0.jar` |
| Instance Type | Free (for now) |

#### Step 3: Set Environment Variables
Click "Environment" and add:

```
SPRING_DATASOURCE_URL=jdbc:mysql://your-mysql-host:3306/portfolio_db
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=your_password
```

Or use a MySQL service like:
- MySQL @ Render (if available)
- ClearDB
- AWS RDS

#### Step 4: Deploy
- Click "Create Web Service"
- Wait for deployment (5-10 minutes)
- Note the URL: `https://your-backend.onrender.com`

✅ Backend deployed!

---

### Phase 4C: Deploy Frontend

#### Step 1: Update API URL
Edit: `frontend/src/services/api.js`
```javascript
const API_BASE_URL = 'https://your-backend.onrender.com/api';
```

#### Step 2: Push Changes
```bash
cd frontend
git add .
git commit -m "Update API URL for production"
git push
```

#### Step 3: Create Static Site
1. Go to https://dashboard.render.com
2. Click "+ New"
3. Select "Static Site"
4. Connect GitHub
5. Select `portfolio-frontend` repository

#### Step 4: Configure Frontend
| Field | Value |
|-------|-------|
| Name | portfolio-frontend |
| Build Command | `npm run build` |
| Publish Directory | `build` |

#### Step 5: Deploy
- Click "Create Static Site"
- Wait for deployment (2-3 minutes)
- Your site is live at: `https://your-frontend.onrender.com`

✅ Frontend deployed!

---

## PART 5: VERIFICATION

### Check Deployment
1. Open: `https://your-frontend.onrender.com`
2. Test all pages load
3. Test contact form
4. Test API endpoints
5. Check console for errors (F12)

### Fix Common Deployment Issues

#### 504 Gateway Timeout
- Check if backend is still running
- Increase timeout settings
- Check logs in Render dashboard

#### CORS Errors
- Verify CORS is enabled in backend
- Check origin URL in `application.properties`

#### Database Connection Issues
- Verify credentials
- Check database is accessible
- Test connection string

---

## 🎉 SUCCESS CHECKLIST

- ✅ Database created with tables
- ✅ Backend running locally on port 8080
- ✅ Frontend running locally on port 3000
- ✅ All API endpoints tested
- ✅ Contact form working
- ✅ Responsive design verified
- ✅ Backend deployed on Render
- ✅ Frontend deployed on Render
- ✅ Live site accessible
- ✅ API calls working from deployed frontend

---

## 📞 Quick Help

| Problem | Solution |
|---------|----------|
| Port already in use | Change port: `server.port=8081` |
| Database not found | Run: `mysql -u root -p < database_schema.sql` |
| npm install fails | Run: `npm install --legacy-peer-deps` |
| Backend won't start | Check Java is installed and MySQL is running |
| CORS errors | Verify CORS in `PortfolioBackendApplication.java` |
| Frontend can't reach backend | Update API URL in `api.js` |

---

**You're all set! Enjoy your portfolio! 🚀**
