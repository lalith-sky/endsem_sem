# 📊 Portfolio Project - Architecture & Flow Diagrams

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        PORTFOLIO WEBSITE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────┐          ┌──────────────────────┐    │
│  │   FRONTEND (React)   │◄────────►│  BACKEND (Spring)    │    │
│  │   Port: 3000         │  HTTP    │  Port: 8080          │    │
│  │                      │          │                      │    │
│  │ • Home               │          │ • Student Ctrl       │    │
│  │ • About              │◄────────►│ • Project Ctrl       │    │
│  │ • Projects           │  Axios   │ • Contact Ctrl       │    │
│  │ • Contact            │          │                      │    │
│  │ • Navbar             │          │ ┌──────────────────┐ │    │
│  │                      │          │ │  Business Logic  │ │    │
│  │ Styled with CSS3     │          │ │                  │ │    │
│  │ Icons from lib       │          │ │ StudentService   │ │    │
│  │                      │          │ │ ProjectService   │ │    │
│  │                      │          │ └──────────────────┘ │    │
│  │                      │          │                      │    │
│  │                      │          │ ┌──────────────────┐ │    │
│  │                      │          │ │  Data Access     │ │    │
│  │                      │          │ │                  │ │    │
│  │                      │          │ │ StudentRepository│ │    │
│  │                      │          │ │ ProjectRepository│ │    │
│  │                      │          │ └──────────────────┘ │    │
│  └──────────────────────┘          └──────────────────────┘    │
│                                             │                   │
│                                             │ SQL              │
│                                             ▼                   │
│                                      ┌──────────────────┐       │
│                                      │  MYSQL DATABASE  │       │
│                                      │  Port: 3306      │       │
│                                      │                  │       │
│                                      │ • students table │       │
│                                      │ • projects table │       │
│                                      └──────────────────┘       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Request Flow - Get All Students

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER INTERACTION FLOW                        │
├─────────────────────────────────────────────────────────────────┤

1. USER CLICKS "GET STUDENTS" BUTTON
   ↓
2. REACT COMPONENT (Projects.js)
   └─ componentDidMount() → axios.get('/students')
   ↓
3. AXIOS API CALL
   └─ POST to http://localhost:8080/api/students
   ↓
4. CORS MIDDLEWARE (in Spring Boot)
   └─ Validates origin and headers
   ↓
5. SPRING BOOT CONTROLLER
   └─ StudentController.getAllStudents()
   ↓
6. SERVICE LAYER
   └─ StudentService.getAllStudents()
   ↓
7. REPOSITORY LAYER
   └─ StudentRepository.findAll()
   ↓
8. JPA/HIBERNATE
   └─ Generates SQL: SELECT * FROM students;
   ↓
9. MYSQL DATABASE
   └─ Executes query, returns result
   ↓
10. HIBERNATE MAPPING
    └─ Maps rows to Student objects
    ↓
11. RESPONSE CHAIN
    └─ StudentService → StudentController → Spring Boot
    ↓
12. JSON SERIALIZATION
    └─ [{"id":1,"name":"John",...},...]
    ↓
13. HTTP RESPONSE (200 OK)
    └─ Axios receives JSON response
    ↓
14. REACT STATE UPDATE
    └─ setStudents(response.data)
    ↓
15. COMPONENT RE-RENDER
    └─ Display students in browser

```

---

## Request Flow - Create Student

```
┌─────────────────────────────────────────────────────────────────┐
│                    CREATE OPERATION FLOW                        │
├─────────────────────────────────────────────────────────────────┤

1. USER SUBMITS FORM
   {name, email, regNo, department, semester, bio, phone}
   ↓
2. REACT HANDLES SUBMIT
   └─ Contact.js → handleSubmit()
   ↓
3. AXIOS POST REQUEST
   └─ POST /api/students
   └─ Headers: Content-Type: application/json
   └─ Body: {studentData}
   ↓
4. SPRING BOOT RECEIVES REQUEST
   └─ @PostMapping("/students")
   ↓
5. VALIDATION (Optional - add @Valid)
   └─ Check required fields
   ↓
6. SERVICE LAYER PROCESSING
   └─ StudentService.createStudent(student)
   ↓
7. DATABASE SAVE
   └─ studentRepository.save(student)
   ├─ INSERT INTO students (...) VALUES (...)
   └─ Generate ID via AUTO_INCREMENT
   ↓
8. TIMESTAMP MANAGEMENT
   ├─ @PrePersist → Set createdAt
   └─ Set updatedAt
   ↓
9. DATABASE CONFIRMS
   └─ SQL INSERT SUCCESS
   ↓
10. OBJECT RETURNED
    └─ Student object with ID
    ↓
11. HTTP RESPONSE (201 CREATED)
    └─ Location: /api/students/{id}
    └─ Body: {id, name, email, ...}
    ↓
12. REACT RECEIVES RESPONSE
    └─ setSubmitted(true)
    ↓
13. DISPLAY SUCCESS MESSAGE
    └─ "Message sent successfully!"

```

---

## Component Hierarchy - Frontend

```
App.js (Main)
├── Navbar.js (Fixed at top)
│   ├── Nav Links (Home, About, Projects, Contact)
│   ├── Social Icons (GitHub, LinkedIn, CodeChef)
│   └── Mobile Menu Toggle
│
├── Home.js (Hero Section)
│   ├── Title & Subtitle
│   ├── CTA Buttons
│   ├── Avatar Animation
│   └── Feature Cards (3 items)
│
├── About.js (About Section)
│   ├── Introduction Text
│   ├── Skills Grid
│   │   ├── Frontend Skills
│   │   ├── Backend Skills
│   │   └── Tools & Technologies
│   └── Stats Display
│
├── Projects.js (Projects Display)
│   ├── API Call (Axios)
│   ├── Project Cards Grid
│   │   ├── Title
│   │   ├── Description
│   │   ├── Tech Tags
│   │   └── Links (GitHub, Live)
│   └── Loading/Error States
│
└── Contact.js (Contact Form)
    ├── Contact Info Cards
    ├── Form Inputs
    │   ├── Name
    │   ├── Email
    │   ├── Subject
    │   └── Message
    ├── Submit Button
    └── Success/Error Messages
```

---

## Backend Layer Structure

```
HTTP Request
     ↓
┌────────────────────────────────────┐
│  CONTROLLER LAYER                  │
│  (Handle HTTP requests/responses)  │
├────────────────────────────────────┤
│ • StudentController                │
│ • ProjectController                │
│ • ContactController                │
└────────────────────┬───────────────┘
                     ↓
┌────────────────────────────────────┐
│  SERVICE LAYER                     │
│  (Business logic & validation)     │
├────────────────────────────────────┤
│ • StudentService                   │
│ • ProjectService                   │
└────────────────────┬───────────────┘
                     ↓
┌────────────────────────────────────┐
│  REPOSITORY LAYER                  │
│  (Data access abstraction)         │
├────────────────────────────────────┤
│ • StudentRepository (JPA)          │
│ • ProjectRepository (JPA)          │
└────────────────────┬───────────────┘
                     ↓
┌────────────────────────────────────┐
│  HIBERNATE (ORM)                   │
│  (Object-Relational Mapping)       │
└────────────────────┬───────────────┘
                     ↓
┌────────────────────────────────────┐
│  MYSQL DRIVER                      │
│  (Database connection)             │
└────────────────────┬───────────────┘
                     ↓
             DATABASE QUERY
                     ↓
                  MySQL
```

---

## Database Relationships

```
┌─────────────────────────────────┐
│      STUDENTS TABLE             │
├─────────────────────────────────┤
│ id (PK)                         │
│ name                            │
│ email (UNIQUE)                  │
│ reg_no (UNIQUE)                 │
│ department                      │
│ semester                        │
│ bio                             │
│ phone_number                    │
│ created_at                      │
│ updated_at                      │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│      PROJECTS TABLE             │
├─────────────────────────────────┤
│ id (PK)                         │
│ title (UNIQUE)                  │
│ description                     │
│ tech (CSV format)               │
│ github                          │
│ live                            │
│ image                           │
│ created_at                      │
│ updated_at                      │
└─────────────────────────────────┘

Note: No foreign key relationship
(Each table is independent)
```

---

## API Endpoint Structure

```
/api/
├── /students
│   ├── POST              (Create)
│   ├── GET               (Read All)
│   ├── /{id}
│   │   ├── GET           (Read One)
│   │   ├── PUT           (Update)
│   │   └── DELETE        (Delete)
│   ├── /email/{email}
│   │   └── GET           (Search by email)
│   ├── /regno/{regNo}
│   │   └── GET           (Search by registration)
│   └── (root)
│       └── DELETE        (Delete All)
│
├── /projects
│   ├── POST              (Create)
│   ├── GET               (Read All)
│   ├── /{id}
│   │   ├── GET           (Read One)
│   │   ├── PUT           (Update)
│   │   └── DELETE        (Delete)
│   ├── /title/{title}
│   │   └── GET           (Search by title)
│   └── (root)
│       └── DELETE        (Delete All)
│
├── /contact
│   └── POST              (Submit form)
│
└── /health
    └── GET               (Health check)
```

---

## Data Flow Diagram - Contact Form

```
┌─────────────────────────────────────────────────────────────────┐
│                  CONTACT FORM SUBMISSION                        │
└─────────────────────────────────────────────────────────────────┘

User fills form in browser
         ↓
React Component captures input
         ↓
Form state updated (useState)
         ↓
User clicks "Send Message"
         ↓
handleSubmit() triggered
         ↓
Validation check
├─ name ✓
├─ email ✓
├─ subject ✓
└─ message ✓
         ↓
Axios POST request
└─ http://localhost:8080/api/contact
└─ Content-Type: application/json
└─ {name, email, subject, message}
         ↓
Spring Boot receives
         ↓
ContactController.handleContact()
         ↓
Process data (console log, etc.)
         ↓
Return success response (HTTP 200)
         ↓
React receives response
         ↓
setSubmitted(true)
         ↓
Display success message
         ↓
Clear form fields
         ↓
Auto-hide message after 3 seconds
```

---

## Authentication Flow (Future Enhancement)

```
Login Request
    ↓
Spring Security Filter
    ↓
Validate Credentials
    ↓
Generate JWT Token
    ↓
Return Token to Frontend
    ↓
Store in localStorage
    ↓
Add to API Request Headers
    ↓
Backend validates token
    ↓
Grant/Deny Access
```

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────┐
│           RENDER.COM (Cloud Platform)               │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────────────┐                       │
│  │  Static Site Service    │                       │
│  │  (Frontend)             │                       │
│  │                         │                       │
│  │ Build: npm run build    │                       │
│  │ Publish: /build         │                       │
│  │ URL: frontend.onrender. │                       │
│  │      com                │                       │
│  └───────────┬─────────────┘                       │
│              │                                     │
│              │ HTTPS                               │
│              ▼                                     │
│  ┌─────────────────────────┐                       │
│  │  Web Service            │                       │
│  │  (Backend)              │                       │
│  │                         │                       │
│  │ Build: mvn build        │                       │
│  │ Start: java -jar        │                       │
│  │ URL: backend.onrender.  │                       │
│  │      com                │                       │
│  └───────────┬─────────────┘                       │
│              │                                     │
│              │ Database Connection                 │
│              ▼                                     │
│  ┌─────────────────────────┐                       │
│  │  MySQL Database         │                       │
│  │  (External Service)     │                       │
│  │                         │                       │
│  │ ClearDB / AWS RDS       │                       │
│  │ Azure Database          │                       │
│  └─────────────────────────┘                       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Local Development Setup

```
Your Computer
│
├─ Terminal 1
│  └─ mvn spring-boot:run
│     └─ Backend runs on :8080
│
├─ Terminal 2
│  └─ npm start
│     └─ Frontend runs on :3000
│
└─ MySQL Service
   └─ Database runs on :3306
```

---

## Responsive Design Breakpoints

```
Mobile (< 768px)          Tablet (768px-1024px)      Desktop (> 1024px)
┌────────────┐           ┌──────────────────┐       ┌──────────────────────┐
│            │           │        │  │       │       │  │        │  │       │
│  Single    │           │  Two   │  │  Two  │       │  │ Three  │  │ Three│
│  Column    │           │ Column │  │ Column│       │  │ Column │  │ Column│
│            │           │        │  │       │       │  │        │  │       │
│  Font      │           │ Larger │  │ Font  │       │  │ Large  │  │ Font │
│  14-16px   │           │ Font   │  │       │       │  │ Font   │  │ size │
│            │           │        │  │       │       │  │        │  │      │
│ Menu:      │           │ Menu:  │  │       │       │  │ Menu:  │  │      │
│ Hamburger  │           │ Inline │  │       │       │  │Inline  │  │      │
└────────────┘           └────────────────────┘       └──────────────────────┘

Media Query: @media (max-width: 768px)
Media Query: @media (max-width: 1024px)
```

---

## Performance Optimization Areas

```
FRONTEND
├─ Code Splitting
├─ Lazy Loading Images
├─ Minification (production)
├─ Caching Headers
└─ CDN Delivery

BACKEND
├─ Database Indexing
├─ Connection Pooling
├─ Pagination for large datasets
├─ Caching (Redis)
└─ API Response Compression

DATABASE
├─ Proper Indexing
├─ Query Optimization
├─ Connection Pool Sizing
└─ Regular Backups
```

---

## Security Considerations

```
Frontend
├─ Input Validation
├─ XSS Protection
└─ HTTPS Only

Backend
├─ Input Validation
├─ SQL Injection Prevention (JPA)
├─ CORS Configuration
├─ Rate Limiting (Future)
└─ Authentication/Authorization (Future)

Database
├─ User Permissions
├─ Encrypted Passwords (Future)
├─ SSL Connections
└─ Regular Backups
```

---

**This architecture provides a solid foundation for a scalable portfolio website!**
