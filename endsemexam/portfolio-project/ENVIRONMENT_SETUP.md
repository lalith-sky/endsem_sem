# Environment Configuration Guide

## Local Development Environment

### Frontend - `.env` (Optional for frontend)
Create `frontend/.env` if you want to use environment variables:

```env
# React API Configuration
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_ENV=development
REACT_APP_DEBUG=true
```

If using this, update `frontend/src/services/api.js`:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
```

---

### Backend - Database Configuration

#### Local Development (application.properties)
```properties
# Server Port
server.port=8080

# Database Configuration - LOCAL
spring.datasource.url=jdbc:mysql://localhost:3306/portfolio_db
spring.datasource.username=root
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false

# Logging
logging.level.root=INFO
logging.level.com.portfolio=DEBUG
```

#### Production Environment (application-prod.properties)
Create: `backend/src/main/resources/application-prod.properties`

```properties
# Server Configuration
server.port=8080

# Database Configuration - PRODUCTION
spring.datasource.url=${SPRING_DATASOURCE_URL}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false

# Logging
logging.level.root=WARN
logging.level.com.portfolio=INFO

# Connection Pool
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=2
spring.datasource.hikari.connection-timeout=30000
```

---

### How to Use Environment Variables

#### Method 1: Using System Environment Variables
```bash
# On Windows (PowerShell)
$env:SPRING_DATASOURCE_URL="jdbc:mysql://db-host:3306/portfolio_db"
$env:SPRING_DATASOURCE_USERNAME="root"
$env:SPRING_DATASOURCE_PASSWORD="password"

# Or on Windows (Command Prompt)
set SPRING_DATASOURCE_URL=jdbc:mysql://db-host:3306/portfolio_db
set SPRING_DATASOURCE_USERNAME=root
set SPRING_DATASOURCE_PASSWORD=password

# On Linux/Mac
export SPRING_DATASOURCE_URL=jdbc:mysql://db-host:3306/portfolio_db
export SPRING_DATASOURCE_USERNAME=root
export SPRING_DATASOURCE_PASSWORD=password
```

#### Method 2: Using .env file in Backend
Create `backend/.env`:
```env
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/portfolio_db
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=mypassword
```

Then run with:
```bash
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.config.additional-location=file:./.env"
```

---

## Different MySQL Configurations

### 1. Local MySQL (Default)
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/portfolio_db
spring.datasource.username=root
spring.datasource.password=
```

### 2. Remote MySQL on ClearDB
```properties
spring.datasource.url=jdbc:mysql://db-host.cleardb.com/db_name
spring.datasource.username=username
spring.datasource.password=password
```

### 3. AWS RDS MySQL
```properties
spring.datasource.url=jdbc:mysql://your-rds-endpoint.rds.amazonaws.com:3306/portfolio_db
spring.datasource.username=admin
spring.datasource.password=your-secure-password
```

### 4. Azure Database for MySQL
```properties
spring.datasource.url=jdbc:mysql://your-server.mysql.database.azure.com:3306/portfolio_db
spring.datasource.username=username@your-server
spring.datasource.password=password
```

---

## Render Deployment Environment Variables

For Render Web Service (Backend), add these environment variables:

```
# Database
SPRING_DATASOURCE_URL=jdbc:mysql://[host]:[port]/portfolio_db
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=your_password

# Application
SPRING_JPA_HIBERNATE_DDL_AUTO=validate
SERVER_PORT=8080

# Logging
LOGGING_LEVEL_COM_PORTFOLIO=INFO
```

---

## Frontend Deployment on Render

For Render Static Site, set these:

```
# Build Command
npm install && npm run build

# Publish Directory
build

# Environment (if using)
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

---

## Local Development with Docker (Optional)

### Create docker-compose.yml for Local MySQL

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: portfolio_mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: portfolio_db
    ports:
      - "3306:3306"
    volumes:
      - ./database_schema.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - portfolio

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: portfolio_backend
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/portfolio_db
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: root
    depends_on:
      - mysql
    networks:
      - portfolio

networks:
  portfolio:
    driver: bridge
```

Run with:
```bash
docker-compose up -d
```

---

## Development vs Production Settings

| Setting | Development | Production |
|---------|-------------|------------|
| Port | 8080 (flexible) | 8080 (fixed) |
| Show SQL | false | false |
| DDL Auto | update | validate |
| Log Level | DEBUG | INFO |
| CORS | All origins | Specific origin |
| Connection Pool | 5 | 20 |

---

## Switching Between Profiles

### Run with Production Profile
```bash
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=prod"
```

### Or set profile in Maven
```bash
mvn install -Dspring.profiles.active=prod
java -Dspring.profiles.active=prod -jar target/portfolio-backend-1.0.0.jar
```

---

## Security Considerations

### Passwords
- **Never** commit passwords to Git
- Use `.env` files (add to `.gitignore`)
- Use environment variables in production
- Use Render Secrets for sensitive data

### CORS
```java
// Configure allowed origins in PortfolioBackendApplication.java
registry.addMapping("/api/**")
    .allowedOrigins("https://your-frontend.onrender.com")  // Specific domain
    .allowedMethods("GET", "POST", "PUT", "DELETE")
```

### Database
- Use strong passwords
- Limit database user permissions
- Use SSL for database connections

---

## Debugging Environment Issues

### Check Java Version
```bash
java -version
```

### Check Maven Config
```bash
mvn -v
```

### Check Node Version
```bash
node -v
npm -v
```

### Check MySQL Connection
```bash
mysql -h localhost -u root -p
```

### Verify Spring Boot Config
```bash
mvn spring-boot:run --debug
```

---

## Common Configuration Errors

### Error: Unknown database 'portfolio_db'
**Solution:** Run database_schema.sql first

### Error: Access denied for user 'root'@'localhost'
**Solution:** Check password in application.properties matches MySQL password

### Error: Can't connect to MySQL server on localhost (10061)
**Solution:** 
- Start MySQL service
- Check MySQL is installed
- Verify port 3306 is not blocked

### Error: No suitable driver found
**Solution:** Ensure MySQL driver is in pom.xml dependencies

---

## Environment Variables Checklist

### For Local Development
- [ ] Java 17 installed
- [ ] Maven installed
- [ ] MySQL running
- [ ] Node.js installed
- [ ] application.properties configured

### For Render Deployment - Backend
- [ ] SPRING_DATASOURCE_URL set
- [ ] SPRING_DATASOURCE_USERNAME set
- [ ] SPRING_DATASOURCE_PASSWORD set
- [ ] Repository pushed to GitHub
- [ ] Build command correct

### For Render Deployment - Frontend
- [ ] REACT_APP_API_URL updated
- [ ] Repository pushed to GitHub
- [ ] Build command: npm run build
- [ ] Publish directory: build

---

**Tip:** Always use this file as reference when setting up new environments!
