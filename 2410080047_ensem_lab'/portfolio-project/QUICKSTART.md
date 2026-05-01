# Quick Start Guide

## 📌 Quick Setup (5 minutes)

### 1. Database Setup
```bash
mysql -u root -p < database_schema.sql
```

### 2. Backend (Terminal 1)
```bash
cd backend
mvn spring-boot:run
```
✅ Backend running at: `http://localhost:8080`

### 3. Frontend (Terminal 2)
```bash
cd frontend
npm install
npm start
```
✅ Frontend running at: `http://localhost:3000`

---

## 🧪 Test Locally

### Add a Student
```bash
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Student Name","email":"student@example.com","regNo":"REG123"}'
```

### Get All Students
```bash
curl http://localhost:8080/api/students
```

### Visit Frontend
Open: `http://localhost:3000`

---

## 🚀 Deployment on Render

### Backend
1. Push to GitHub
2. New Web Service on Render
3. Connect your repository
4. Set build: `mvn clean install`
5. Set start: `java -jar target/portfolio-backend-1.0.0.jar`

### Frontend
1. Update API URL in `frontend/src/services/api.js`
2. Push to GitHub
3. New Static Site on Render
4. Set build: `npm run build`
5. Set publish: `build`

---

## 📚 API Quick Reference

### Students
- `POST /api/students` - Create
- `GET /api/students` - Get all
- `GET /api/students/{id}` - Get one
- `PUT /api/students/{id}` - Update
- `DELETE /api/students/{id}` - Delete

### Projects
- `POST /api/projects` - Create
- `GET /api/projects` - Get all
- `GET /api/projects/{id}` - Get one
- `PUT /api/projects/{id}` - Update
- `DELETE /api/projects/{id}` - Delete

---

## 🆘 Common Issues

| Problem | Solution |
|---------|----------|
| Port 8080 taken | Edit `application.properties`: `server.port=8081` |
| MySQL error | Check credentials in `application.properties` |
| npm install fails | Run `npm install --legacy-peer-deps` |
| CORS errors | Backend CORS is enabled by default |

Enjoy your portfolio! 🎉
