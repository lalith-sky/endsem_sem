# Portfolio Website - Full Stack Project

A complete full-stack portfolio website built with **React** (frontend), **Spring Boot** (backend), and **MySQL** (database). Includes CRUD operations, responsive design, and deployment instructions.

## 📁 Project Structure

```
portfolio-project/
├── frontend/                 # React Application
│   ├── public/
│   ├── src/
│   │   ├── components/       # React Components (Navbar)
│   │   ├── pages/           # Page Components (Home, About, Projects, Contact)
│   │   ├── services/        # API Service (api.js)
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .gitignore
│
├── backend/                  # Spring Boot Application
│   ├── src/main/java/com/portfolio/
│   │   ├── entity/          # Entity Classes (Student, Project)
│   │   ├── repository/      # Repository Interfaces
│   │   ├── service/         # Service Classes
│   │   ├── controller/      # REST Controllers
│   │   └── PortfolioBackendApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── pom.xml
│   └── .gitignore
│
├── database_schema.sql      # Database Schema
└── README.md
```

## 🚀 Features

### Frontend
- ✅ Clean and modern UI with gradient design
- ✅ Responsive layout (Mobile, Tablet, Desktop)
- ✅ Smooth navigation with React Router-like behavior
- ✅ Social media links (GitHub, LinkedIn, CodeChef)
- ✅ Contact form with validation
- ✅ Project showcase with tech stack display
- ✅ About section with skills listing
- ✅ Interactive animations and hover effects

### Backend
- ✅ RESTful API with full CRUD operations
- ✅ Spring Boot with JPA/Hibernate
- ✅ MySQL database integration
- ✅ CORS enabled for frontend communication
- ✅ Student management endpoints
- ✅ Project management endpoints
- ✅ Contact form handler
- ✅ Health check endpoint

### Database
- ✅ Two main tables: Students and Projects
- ✅ Timestamps for tracking creation/updates
- ✅ Sample data included

---

## 📋 Prerequisites

Before you start, ensure you have the following installed:

### Required Software
- **Java 17+** - [Download](https://www.oracle.com/java/technologies/downloads/)
- **Maven 3.9+** - [Download](https://maven.apache.org/download.cgi)
- **MySQL 8.0+** - [Download](https://dev.mysql.com/downloads/mysql/)
- **Node.js 16+** - [Download](https://nodejs.org/)
- **npm 8+** - Comes with Node.js

### Verify Installation
```bash
# Check Java version
java -version

# Check Maven version
mvn -version

# Check Node.js and npm
node -v
npm -v

# Check MySQL
mysql --version
```

---

## 🛠️ Setup Instructions

### Step 1: Set Up MySQL Database

#### On Windows:
1. Open MySQL Command Line Client or MySQL Workbench
2. Copy and paste the contents of `database_schema.sql` file
3. Execute the script

#### Using Command Line:
```bash
mysql -u root -p < database_schema.sql
```

Verify the database was created:
```bash
mysql -u root -p
> USE portfolio_db;
> SHOW TABLES;
```

**Expected Output:**
```
+------------------------+
| Tables_in_portfolio_db |
+------------------------+
| projects               |
| students               |
+------------------------+
```

### Step 2: Configure Backend

#### Configure Database Connection
Edit `backend/src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/portfolio_db
spring.datasource.username=root
spring.datasource.password=yourPassword  # Enter your MySQL password
```

#### Build Backend
```bash
cd backend
mvn clean install
```

**Expected Output:**
```
[INFO] BUILD SUCCESS
```

#### Run Backend
```bash
# Using Maven
mvn spring-boot:run

# Or run the JAR file
java -jar target/portfolio-backend-1.0.0.jar
```

**Expected Console Output:**
```
Started PortfolioBackendApplication in X.XXX seconds (JVM running for X.XXX)
```

The backend will be available at: **http://localhost:8080**

### Step 3: Set Up Frontend

#### Install Dependencies
```bash
cd frontend
npm install
```

**Expected Output:**
```
added XXX packages, audited XXX packages in XXs
```

#### Run Frontend Development Server
```bash
npm start
```

**Expected Output:**
```
Compiled successfully!
You can now view portfolio-frontend in the browser.
Local: http://localhost:3000
```

The frontend will automatically open at: **http://localhost:3000**

---

## 📡 API Endpoints

### Base URL
```
http://localhost:8080/api
```

### Student Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/students` | Create a new student |
| GET | `/students` | Get all students |
| GET | `/students/{id}` | Get student by ID |
| GET | `/students/email/{email}` | Get student by email |
| GET | `/students/regno/{regNo}` | Get student by registration number |
| PUT | `/students/{id}` | Update student |
| DELETE | `/students/{id}` | Delete student |

### Project Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/projects` | Create a new project |
| GET | `/projects` | Get all projects |
| GET | `/projects/{id}` | Get project by ID |
| GET | `/projects/title/{title}` | Get project by title |
| PUT | `/projects/{id}` | Update project |
| DELETE | `/projects/{id}` | Delete project |

### Other Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/contact` | Submit contact form |
| GET | `/health` | Health check |

### Example Requests

#### Create Student
```bash
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "regNo": "REG003",
    "department": "Computer Science",
    "semester": "6",
    "bio": "Passionate developer",
    "phoneNumber": "9876543212"
  }'
```

#### Get All Students
```bash
curl http://localhost:8080/api/students
```

#### Update Student
```bash
curl -X PUT http://localhost:8080/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson Updated",
    "bio": "Full-stack developer"
  }'
```

#### Delete Student
```bash
curl -X DELETE http://localhost:8080/api/students/1
```

---

## 🔗 Frontend Integration with Axios

The frontend uses Axios to communicate with the backend. The API service is located in `frontend/src/services/api.js`.

### Using API in React Components

```javascript
import { studentAPI, projectAPI } from '../services/api';

// In a React component
const [students, setStudents] = useState([]);

useEffect(() => {
  // Fetch all students
  studentAPI.getAllStudents()
    .then(response => setStudents(response.data))
    .catch(error => console.error('Error:', error));
}, []);
```

### Error Handling
```javascript
try {
  const response = await studentAPI.createStudent(studentData);
  console.log('Success:', response.data);
} catch (error) {
  console.error('Error:', error.response.data);
}
```

---

## 🚀 Deployment on Render

### Prerequisites
- GitHub account with repository pushed
- Render account ([Sign up free](https://render.com))

### Step 1: Deploy Backend on Render

1. **Push Backend to GitHub**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/portfolio-backend.git
   git push -u origin main
   ```

2. **Create Render Web Service**
   - Go to [render.com](https://render.com)
   - Click "New +"
   - Select "Web Service"
   - Connect GitHub repository (portfolio-backend)
   - Configure:
     - **Name**: portfolio-backend
     - **Environment**: Java 17
     - **Build Command**: `mvn clean install`
     - **Start Command**: `java -jar target/portfolio-backend-1.0.0.jar`

3. **Add Environment Variables**
   - `SPRING_DATASOURCE_URL`: Your remote MySQL URL
   - `SPRING_DATASOURCE_USERNAME`: Database username
   - `SPRING_DATASOURCE_PASSWORD`: Database password

### Step 2: Deploy Frontend on Render

1. **Push Frontend to GitHub**
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/portfolio-frontend.git
   git push -u origin main
   ```

2. **Update API Base URL in `frontend/src/services/api.js`**
   ```javascript
   const API_BASE_URL = 'https://your-backend-url.onrender.com/api';
   ```

3. **Create Render Static Site**
   - Go to [render.com](https://render.com)
   - Click "New +"
   - Select "Static Site"
   - Connect GitHub repository (portfolio-frontend)
   - Configure:
     - **Name**: portfolio-frontend
     - **Build Command**: `npm run build`
     - **Publish Directory**: `build`

### Step 3: Configure Database for Production

#### Option 1: Use Render PostgreSQL (Recommended)
- Create a Render PostgreSQL database
- Update `application.properties` for production

#### Option 2: Use External MySQL Service
- Use services like ClearDB or AWS RDS
- Update connection strings accordingly

---

## 🧪 Testing the Application

### Manual Testing

1. **Test Student CRUD**
   ```bash
   # Create
   curl -X POST http://localhost:8080/api/students \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","regNo":"TEST001"}'
   
   # Read
   curl http://localhost:8080/api/students
   
   # Update
   curl -X PUT http://localhost:8080/api/students/1 \
     -H "Content-Type: application/json" \
     -d '{"name":"Updated"}'
   
   # Delete
   curl -X DELETE http://localhost:8080/api/students/1
   ```

2. **Test Frontend**
   - Open http://localhost:3000
   - Navigate through all pages
   - Test responsive design (use browser DevTools)
   - Try contact form submission

---

## 🐛 Troubleshooting

### Backend Issues

| Issue | Solution |
|-------|----------|
| Port 8080 already in use | Change port in `application.properties`: `server.port=8081` |
| MySQL connection error | Verify credentials in `application.properties` |
| Maven build failure | Run `mvn clean install -DskipTests` |
| Class not found errors | Ensure Java 17 is installed |

### Frontend Issues

| Issue | Solution |
|-------|----------|
| Module not found | Run `npm install` again |
| Port 3000 already in use | Run `PORT=3001 npm start` |
| API connection errors | Check if backend is running on port 8080 |
| CORS errors | Verify CORS is enabled in `PortfolioBackendApplication.java` |

### Database Issues

| Issue | Solution |
|-------|----------|
| Database doesn't exist | Run `database_schema.sql` script |
| Can't connect to MySQL | Check if MySQL service is running |
| Tables not created | Clear tables and run schema script again |

---

## 📚 Technology Stack

### Frontend
- React 18
- CSS3 with Flexbox & Grid
- Axios for HTTP requests
- React Icons for icons

### Backend
- Spring Boot 3.1.5
- Spring Data JPA
- Hibernate ORM
- MySQL Connector/J

### Database
- MySQL 8.0

### Tools
- Maven for build management
- Git for version control
- Postman for API testing

---

## 📝 Sample Data

### Students
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "regNo": "REG001",
  "department": "Computer Science",
  "semester": "6",
  "bio": "Passionate developer",
  "phoneNumber": "9876543210"
}
```

### Projects
```json
{
  "title": "E-Commerce Platform",
  "description": "Full-stack e-commerce application",
  "tech": "React,Spring Boot,MySQL,Axios",
  "github": "https://github.com/yourprofile/project",
  "live": "https://project-url.com"
}
```

---

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

---

## 📄 License

This project is open source and available under the MIT License.

---

## 💡 Tips for Students

1. **Customize the Portfolio**
   - Update social links in `Navbar.js`
   - Replace sample projects with your actual projects
   - Update about section with your information

2. **Add More Features**
   - Add testimonials section
   - Implement blog functionality
   - Add image galleries
   - Implement dark mode

3. **Performance Optimization**
   - Use React.memo for components
   - Implement code splitting
   - Optimize images
   - Use lazy loading

4. **Security**
   - Validate all inputs
   - Sanitize form submissions
   - Use HTTPS in production
   - Never expose sensitive data

---

## 📞 Support

For issues or questions, feel free to:
- Open GitHub Issues
- Send pull requests with improvements
- Contact the developer

---

## 🎯 Next Steps

1. ✅ Set up the project locally
2. ✅ Customize with your information
3. ✅ Add your projects and skills
4. ✅ Test all functionality
5. ✅ Deploy on Render
6. ✅ Share your portfolio with the world!

Happy Coding! 🚀
