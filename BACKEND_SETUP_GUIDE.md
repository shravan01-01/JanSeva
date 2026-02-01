# JanSeva Backend API Integration Guide
## Express.js + MongoDB Setup

### 📦 Recommended Backend Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── env.js
│   ├── controllers/
│   │   ├── complaintController.js
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── adminController.js
│   │   └── analyticsController.js
│   ├── models/
│   │   ├── Complaint.js
│   │   ├── User.js
│   │   ├── Officer.js
│   │   ├── SLA.js
│   │   └── AuditLog.js
│   ├── routes/
│   │   ├── complaints.js
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── admin.js
│   │   └── analytics.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   ├── validation.js
│   │   └── rateLimiter.js
│   ├── utils/
│   │   ├── emailService.js
│   │   ├── smsService.js
│   │   ├── fileUpload.js
│   │   └── logger.js
│   └── app.js
├── .env.example
├── package.json
└── README.md
```

---

## 🗄️ MongoDB Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  phone: String,
  password: String (hashed),
  role: Enum ['citizen', 'officer', 'admin'],
  department: String (for officers),
  profileImage: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Complaints Collection
```javascript
{
  _id: ObjectId,
  complaintId: String (unique, format: YYYY-XXXXX),
  citizenId: ObjectId (ref: Users),
  
  // Personal Details
  name: String,
  email: String,
  phone: String,
  location: String,
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  
  // Complaint Details
  department: String,
  subject: String,
  description: String,
  category: String,
  priority: Enum ['low', 'medium', 'high', 'critical'],
  
  // Status & Timeline
  status: Enum ['pending', 'assigned', 'in_progress', 'escalated', 'resolved'],
  assignedOfficerId: ObjectId (ref: Users),
  assignedAt: Date,
  
  // SLA Management
  registeredAt: Date,
  expectedResolutionDate: Date,
  slaHours: Number,
  slaRemainingHours: Number,
  slaBreached: Boolean,
  
  // Resolution
  resolutionNotes: String,
  resolutionDate: Date,
  
  // Attachments
  attachments: [{
    fileName: String,
    fileSize: Number,
    fileType: String,
    fileUrl: String,
    uploadedAt: Date
  }],
  
  // Timeline
  timeline: [{
    status: String,
    description: String,
    date: Date,
    updatedBy: ObjectId
  }],
  
  // Tracking
  views: Number,
  lastViewedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Officers Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  designation: String,
  department: String,
  officerId: String (unique),
  
  // Performance Metrics
  totalComplaints: Number,
  resolvedComplaints: Number,
  pendingComplaints: Number,
  avgResolutionTime: Number,
  slaCompliance: Number,
  
  // Assignment
  currentlyAssigned: Number,
  maxCapacity: Number,
  
  // Contact
  officeLocation: String,
  phone: String,
  email: String,
  
  createdAt: Date,
  updatedAt: Date
}
```

### SLA Configuration
```javascript
{
  _id: ObjectId,
  department: String,
  priority: String,
  targetHours: Number,
  escalationHours: Number,
  
  // Escalation Rules
  escalateToLevel: String,
  escalationEmail: String,
  
  createdAt: Date,
  updatedAt: Date
}
```

### Audit Log
```javascript
{
  _id: ObjectId,
  action: String,
  entityType: String,
  entityId: ObjectId,
  userId: ObjectId,
  
  // Details
  changes: {
    from: String,
    to: String
  },
  
  ipAddress: String,
  userAgent: String,
  status: Enum ['success', 'failed'],
  errorMessage: String,
  
  createdAt: Date
}
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register         - Register new user
POST   /api/auth/login            - User login
POST   /api/auth/logout           - User logout
POST   /api/auth/refresh-token    - Refresh JWT
POST   /api/auth/forgot-password  - Password reset
POST   /api/auth/reset-password   - Confirm password reset
```

### Complaints (Citizen)
```
POST   /api/complaints            - Register new complaint
GET    /api/complaints/:id        - Get complaint details
GET    /api/complaints/user/:userId - Get user's complaints
PUT    /api/complaints/:id        - Update complaint
DELETE /api/complaints/:id        - Delete complaint
POST   /api/complaints/:id/upload - Upload attachments
GET    /api/complaints/search     - Search complaints
GET    /api/complaints/filter     - Filter complaints
```

### Complaints (Officer)
```
GET    /api/officer/complaints    - Get assigned complaints
PUT    /api/officer/complaints/:id/status - Update status
POST   /api/officer/complaints/:id/notes - Add resolution notes
GET    /api/officer/dashboard     - Get dashboard data
GET    /api/officer/performance   - Performance metrics
```

### Admin
```
GET    /api/admin/dashboard       - System analytics
GET    /api/admin/departments     - Department statistics
PUT    /api/admin/sla/:id         - Update SLA config
GET    /api/admin/users           - List all users
POST   /api/admin/users           - Create user
PUT    /api/admin/users/:id       - Update user
DELETE /api/admin/users/:id       - Delete user
GET    /api/admin/logs            - Audit logs
GET    /api/admin/reports         - Generate reports
```

---

## 🔐 Authentication Strategy

### JWT Token Structure
```javascript
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "userId": "user_id",
    "email": "user@example.com",
    "role": "citizen|officer|admin",
    "iat": 1234567890,
    "exp": 1234567890
  }
}
```

### Token Lifespan
- **Access Token**: 15 minutes
- **Refresh Token**: 7 days
- **Password Reset Token**: 1 hour

---

## 📨 Notification Services

### Email Templates
```
1. Complaint Registration Confirmation
   - Complaint ID
   - Submission Date
   - Expected Resolution Date

2. Status Update Notification
   - Status Change
   - Updated By (Officer Name)
   - New Expected Date

3. SLA Warning
   - Remaining Time
   - Complaint ID
   - Action Required

4. Complaint Resolved
   - Resolution Details
   - Satisfaction Survey Link
```

### SMS Integration
```
- Registration: "Your complaint has been registered: #ID"
- Status Update: "Complaint #ID status: [status]"
- SLA Warning: "Urgent: Complaint #ID deadline approaching"
- Resolution: "Complaint #ID has been resolved. Rate: [survey-link]"
```

---

## 📁 File Upload Configuration

```javascript
const uploadConfig = {
  maxFileSize: 5242880, // 5MB
  maxFiles: 5,
  allowedTypes: [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'application/pdf',
    'application/msword'
  ],
  uploadPath: '/uploads/complaints/'
}
```

---

## 🔍 Search & Filter Implementation

### Complaint Search
```javascript
// MongoDB aggregation pipeline
db.complaints.aggregate([
  {
    $match: {
      $or: [
        { complaintId: { $regex: query } },
        { subject: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    }
  },
  { $sort: { createdAt: -1 } },
  { $limit: 20 }
])
```

### Filter Options
- By Status
- By Priority
- By Department
- By Date Range
- By Officer
- By SLA Status

---

## 📊 Analytics Queries

### Dashboard Statistics
```javascript
// Total Complaints
db.complaints.countDocuments()

// Resolution Rate
(resolved_count / total_count) * 100

// Average Resolution Time
db.complaints.aggregate([
  { $match: { status: 'resolved' } },
  { $group: {
    _id: null,
    avgTime: { $avg: { $subtract: ['$resolutionDate', '$registeredAt'] } }
  }}
])

// SLA Breaches
db.complaints.countDocuments({ slaBreached: true })

// Department-wise Distribution
db.complaints.aggregate([
  { $group: {
    _id: '$department',
    count: { $sum: 1 }
  }},
  { $sort: { count: -1 } }
])
```

---

## 🚀 Development Setup

### Install Dependencies
```bash
npm install express mongoose dotenv cors bcryptjs jsonwebtoken
npm install express-validator multer nodemailer
npm install --save-dev nodemon
```

### Environment Variables (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/janseva
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=15m
REFRESH_TOKEN_EXPIRE=7d

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# SMS Configuration
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=+1234567890

# Frontend URL
FRONTEND_URL=http://localhost:8080
```

---

## 🔒 Security Best Practices

1. **Password Hashing**: Use bcrypt with 10 salt rounds
2. **CORS**: Configure allowed origins
3. **Rate Limiting**: 100 requests per 15 minutes
4. **Input Validation**: Sanitize all inputs
5. **SQL Injection Prevention**: Use parameterized queries
6. **XSS Protection**: Sanitize HTML content
7. **HTTPS**: Enforce in production
8. **CSRF Tokens**: Implement for form submissions

---

## 📈 Performance Optimization

### Database Indexes
```javascript
// Create indexes for faster queries
db.complaints.createIndex({ complaintId: 1 })
db.complaints.createIndex({ citizenId: 1 })
db.complaints.createIndex({ status: 1 })
db.complaints.createIndex({ department: 1 })
db.complaints.createIndex({ createdAt: -1 })
db.complaints.createIndex({ slaBreached: 1 })
```

### Caching Strategy
- Cache user profile for 1 hour
- Cache department list for 24 hours
- Cache analytics for 1 hour
- Cache SLA configuration for 6 hours

---

## 🧪 API Testing Examples

### Register Complaint
```bash
POST /api/complaints
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "department": "Water Supply",
  "subject": "Water leakage in pipeline",
  "description": "Major water leakage causing street damage",
  "location": "Sector 15, Block C",
  "latitude": 28.5356,
  "longitude": 77.3910
}
```

### Track Complaint
```bash
GET /api/complaints/2025-12346
Authorization: Bearer token
```

### Update Status (Officer)
```bash
PUT /api/officer/complaints/2025-12346/status
Content-Type: application/json

{
  "status": "in_progress",
  "notes": "Team deployed for investigation"
}
```

---

## 📋 Deployment Checklist

- [ ] Environment variables configured
- [ ] Database backups automated
- [ ] Error logging implemented
- [ ] API documentation complete
- [ ] Security headers configured
- [ ] Rate limiting active
- [ ] CORS properly configured
- [ ] SSL/TLS enabled
- [ ] Monitoring and alerts set up
- [ ] Backup and recovery plan ready
- [ ] Load balancing configured
- [ ] CDN for static assets

---

## 📞 Support

For backend integration support, ensure:
1. API endpoints match specified format
2. Response format is JSON
3. Error codes are standardized
4. Documentation is maintained
5. Tests are comprehensive

---

**Backend Setup Version**: 1.0.0  
**Framework**: Express.js  
**Database**: MongoDB  
**Status**: Ready for Implementation
