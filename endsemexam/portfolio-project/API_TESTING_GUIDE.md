# Portfolio Backend API Testing Guide

## Testing with cURL

### Health Check
```bash
curl http://localhost:8080/api/health
```

---

## STUDENT ENDPOINTS

### 1. Create a Student (POST)
```bash
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "regNo": "REG003",
    "department": "Computer Science",
    "semester": "6",
    "bio": "Full-stack developer passionate about learning",
    "phoneNumber": "9876543212"
  }'
```

**Response:**
```json
{
  "id": 3,
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "regNo": "REG003",
  "department": "Computer Science",
  "semester": "6",
  "bio": "Full-stack developer passionate about learning",
  "phoneNumber": "9876543212",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

### 2. Get All Students (GET)
```bash
curl http://localhost:8080/api/students
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    ...
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    ...
  }
]
```

### 3. Get Student by ID (GET)
```bash
curl http://localhost:8080/api/students/1
```

### 4. Get Student by Email (GET)
```bash
curl http://localhost:8080/api/students/email/alice@example.com
```

### 5. Get Student by Registration Number (GET)
```bash
curl http://localhost:8080/api/students/regno/REG003
```

### 6. Update Student (PUT)
```bash
curl -X PUT http://localhost:8080/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe Updated",
    "bio": "Updated bio"
  }'
```

### 7. Delete Student by ID (DELETE)
```bash
curl -X DELETE http://localhost:8080/api/students/1
```

### 8. Delete All Students (DELETE)
```bash
curl -X DELETE http://localhost:8080/api/students
```

---

## PROJECT ENDPOINTS

### 1. Create a Project (POST)
```bash
curl -X POST http://localhost:8080/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Task Management App",
    "description": "A simple yet effective task management application with full CRUD operations",
    "tech": "React,Spring Boot,MySQL,Axios",
    "github": "https://github.com/yourusername/task-app",
    "live": "https://task-app.example.com",
    "image": "https://example.com/images/task-app.png"
  }'
```

### 2. Get All Projects (GET)
```bash
curl http://localhost:8080/api/projects
```

### 3. Get Project by ID (GET)
```bash
curl http://localhost:8080/api/projects/1
```

### 4. Get Project by Title (GET)
```bash
curl http://localhost:8080/api/projects/title/E-Commerce%20Platform
```

### 5. Update Project (PUT)
```bash
curl -X PUT http://localhost:8080/api/projects/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Project Title",
    "description": "Updated description"
  }'
```

### 6. Delete Project by ID (DELETE)
```bash
curl -X DELETE http://localhost:8080/api/projects/1
```

### 7. Delete All Projects (DELETE)
```bash
curl -X DELETE http://localhost:8080/api/projects
```

---

## CONTACT ENDPOINT

### Submit Contact Form (POST)
```bash
curl -X POST http://localhost:8080/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "email": "john.smith@example.com",
    "subject": "Portfolio Inquiry",
    "message": "I loved your portfolio and would like to discuss opportunities"
  }'
```

**Response:**
```json
{
  "message": "Contact form submitted successfully",
  "status": "success"
}
```

---

## Testing with Postman

### Import Collection
1. Open Postman
2. Click "Import"
3. Create new requests for each endpoint

### Sample Collection JSON
```json
{
  "info": {
    "name": "Portfolio API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get All Students",
      "request": {
        "method": "GET",
        "url": "http://localhost:8080/api/students"
      }
    },
    {
      "name": "Create Student",
      "request": {
        "method": "POST",
        "url": "http://localhost:8080/api/students",
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Test User\",\n  \"email\": \"test@example.com\",\n  \"regNo\": \"REG999\"\n}"
        }
      }
    }
  ]
}
```

---

## Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created |
| 204 | No Content - Deletion successful |
| 400 | Bad Request - Invalid data |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal error |

---

## Error Handling

### Example Error Response
```json
{
  "error": "All fields are required",
  "timestamp": "2024-01-15T10:30:00",
  "status": 400
}
```

---

## Performance Tips

1. **Pagination** - Add pagination for large datasets
2. **Caching** - Implement caching for frequently accessed data
3. **Validation** - Validate inputs on both frontend and backend
4. **Error Messages** - Provide clear, actionable error messages

---

## Testing Checklist

- [ ] Create student
- [ ] Read student by ID
- [ ] Read student by email
- [ ] Update student details
- [ ] Delete student
- [ ] Create project
- [ ] Read all projects
- [ ] Update project
- [ ] Delete project
- [ ] Submit contact form
- [ ] Check health endpoint

---

Happy Testing! 🧪
