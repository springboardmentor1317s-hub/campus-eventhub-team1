# 🎓 CampusEventHub
### Inter-College Event Management Platform

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green.svg)](https://www.mongodb.com/)

---

## 📖 Abstract

CampusEventHub is a **full-stack web application** that digitalizes and streamlines inter-college event management. It serves as a centralized hub where colleges can host cultural fests, hackathons, workshops, and sports competitions, while students can explore, register, and participate seamlessly.

The platform ensures **secure authentication**, **role-based access control**, and intuitive interfaces for both event creation and browsing, fostering transparency and enhanced student engagement across institutions.

---

## 🎯 Key Features

- 🔐 **Secure Authentication** with JWT and role-based access control
- 👨‍🎓 **Student Dashboard** for event browsing and registration
- 👩‍💼 **College Admin Panel** for event and user management
- 👑 **Super Admin Dashboard** with system-wide control
- 📊 **Registration Management** with approval workflow
- 💳 **Secure Payment Integration** with Stripe for paid events
- 🎫 **QR-Based Ticket System** with automatic generation and email delivery
- 📈 **Real-time Analytics** with interactive charts
- ⭐ **Feedback & Rating System** with detailed comments and analytics
- 📋 **Excel Data Export** with comprehensive registration details and ticket information
- 🔍 **Advanced Filtering** and search capabilities
- 📱 **Responsive Design** across all devices
- 📋 **Activity Logging** for audit trails
- 📧 **Email Notifications** for approvals and password resets

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-F46519?style=for-the-badge&logo=files&logoColor=white)
![PDFKit](https://img.shields.io/badge/PDFKit-FF6B6B?style=for-the-badge&logo=pdf&logoColor=white)
![QRCode](https://img.shields.io/badge/QRCode-000000?style=for-the-badge&logo=qrcode&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-22B573?style=for-the-badge&logo=mail&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-008C45?style=for-the-badge&logo=stripe&logoColor=white)
![XLSX](https://img.shields.io/badge/XLSX-217346?style=for-the-badge&logo=microsoftexcel&logoColor=white)

### Development Tools
![VS Code](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)

---

## 🏗️ Architecture & Design

### System Architecture

![System Architecture](./docs/system-architecture.png)

*Overall system architecture showing the interaction between frontend, backend, and database components*

### Architecture Overview
- **Frontend**: React.js with responsive design and real-time event listing
- **Backend**: Node.js + Express.js with RESTful APIs
- **Database**: MongoDB for scalable data storage
- **Authentication**: JWT-based secure authentication with role-based access
- **Payments**: Stripe integration for secure payment processing
- **Deployment**: Cloud-ready with environment-based configuration

### Use Case Diagram

![Use Case Diagram](./docs/usecase-diagram.png)

*Use case diagram illustrating the interactions between different user roles and system functionalities*

### Sequence Diagram

![Sequence Diagram](./docs/sequence-diagram.png)

*Sequence diagram showing the flow of operations for key user interactions and system processes*

---

## 📊 Database Schema

### Core Models

#### 👤 Users
```javascript
{
  name: String,
  email: String (validated),
  password: String (hashed with bcrypt),
  college: String,
  role: ['student', 'college_admin', 'super_admin'],
  approval_status: ['pending', 'approved', 'rejected'],
  isActive: Boolean,
  createdAt: Date
}
```

#### 🎪 Events
```javascript
{
  title: String,
  description: String,
  category: ['Technical', 'Cultural', 'Sports', 'Workshop', 'Hackathon'],
  location: String,
  college_name: String,
  start_date: Date,
  end_date: Date,
  registration_limit: Number,
  current_registrations: Number,
  price: Number, // Registration fee (0 for free events)
  created_by: ObjectId,
  image: String,
  status: ['upcoming', 'active', 'completed']
}
```

#### 📝 Registrations
```javascript
{
  event_id: ObjectId,
  user_id: ObjectId,
  status: ['pending', 'approved', 'rejected'],
  timestamp: Date,
  stripe_payment_id: String, // For paid events
  payment_status: ['paid', 'pending', 'failed']
}
```

#### 📋 Activity Logs
```javascript
{
  user_id: ObjectId,
  action: String,
  description: String,
  details: Object,
  timestamp: Date
}
```

---

## 🎨 UI Screenshots

### 🔐 Authentication

#### Login Page
![Login Page](./docs/screenshots/login.png)

*Secure login interface with email validation, password requirements, and forgot password functionality*

#### Registration Page
![Registration Page](./docs/screenshots/register.png)

*User registration with college selection, role assignment, and real-time form validation*

---

### 👨‍🎓 Student Interface

#### Student Dashboard
![Student Dashboard](./docs/screenshots/student-dashboard.png)

*Personalized dashboard showing registered events, quick stats, and recent registrations with status tracking*

#### Browse Events Page
![Browse Events](./docs/screenshots/browse-events.png)

*Comprehensive event listing with advanced filters by category, date, and search functionality across all colleges*

#### Event Registration Form
![Registration Form](./docs/screenshots/registration-form.png)

*Detailed event registration interface with event information, capacity tracking, and confirmation dialog*

#### Event Feedback & Rating
![Feedback Interface](./docs/screenshots/event-feedback.png)

*Interactive feedback system allowing students to rate events, provide detailed comments, and engage in discussions with event organizers and other participants*

---

### 👩‍💼 College Admin Interface

#### Admin Dashboard
![Admin Dashboard](./docs/screenshots/admin-dashboard.png)

*College admin dashboard with event management, analytics charts, and quick actions panel featuring blue theme*

#### Event Creation Form
![Event Creation Form](./docs/screenshots/event-creation-form.png)

*Multi-step event creation form with college selection, event details, schedule configuration, and registration settings for seamless event setup*

#### Registration Management
![Registration Management](./docs/screenshots/registration-management.png)

*Registration approval interface for managing student applications with pending, approved, and rejected status workflow*

#### Feedback Analysis
![Feedback Analysis](./docs/screenshots/admin-feedback-analysis.png)

*Comprehensive feedback analysis dashboard providing event organizers with statistical insights, sentiment analysis, and detailed user comments for continuous improvement*

---

### 👑 Super Admin Interface

#### User Management
![User Management](./docs/screenshots/user-management.png)

*Comprehensive user management page where super admin can view, manage, and filter both college admins and students across all institutions*

#### Admin Approval
![Admin Approval](./docs/screenshots/admin-approval.png)

*College admin approval interface for super admin to review and approve/reject college admin registration requests*


#### Activity Logs
![Activity Logs](./docs/screenshots/activity-logs.png)

*Complete audit trail showing all administrative actions with timestamps, user details, and action descriptions for accountability and monitoring*

---

### 🎫 QR-Based Ticket System

![Event Ticket](./docs/screenshots/event-ticket.png)

*Professional PDF ticket (600×280px) with blue-themed design featuring event details on the left and scannable QR code on the right for quick verification at event entrance*


#### Ticket System Features
- ✅ **Automatic Generation**: Tickets created instantly upon admin approval
- ✅ **QR Code**: Unique scannable QR code for each registration
- ✅ **Compact Design**: Small PDF size (~50KB) perfect for mobile and email
- ✅ **Email Delivery**: Beautiful HTML emails with ticket download links
- ✅ **Multi-Download**: Students can re-download tickets anytime
- ✅ **Verification API**: Admins can verify ticket authenticity via QR scan
- ✅ **Security**: 15-minute expiration for password resets, one-time use tokens

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/campus-eventhub-team1.git
   cd campus-eventhub-team1
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   cp .env.example .env  # Configure your environment variables
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Create Super Admin (Optional)**
   ```bash
   cd Backend
   node scripts/createSuperAdmin.js
   ```
   **Note**: Configure super admin credentials in your `.env` file before running the script. See `.env.example` for required variables.

5. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:4000`

---

## 🧪 Testing

### API Testing
- **Tool**: Postman for comprehensive API endpoint testing
- **Coverage**: Authentication flows, event CRUD operations, user management
- **Test Cases**: Registration/login validation, role-based access, event filtering

### System Testing
- ✅ User registration with email validation
- ✅ Three-tier role-based access control
- ✅ Event CRUD operations with image upload
- ✅ Registration approval workflow
- ✅ Secure payment processing with Stripe
- ✅ QR ticket generation and download
- ✅ Email notifications (approval & password reset)
- ✅ Real-time analytics and charts
- ✅ Activity logging system
- ✅ Super admin approval management
- ✅ Responsive design across devices
- ✅ PDF ticket generation with QR codes
- ✅ Multi-location ticket download access
- ✅ Excel export functionality with comprehensive registration data
- ✅ Role-based data export permissions

---

## 📦 Deployment

### Backend Deployment
```bash
# Build and deploy backend
cd Backend
npm run build
# Deploy to cloud platform (Render/Heroku)
```

### Frontend Deployment
```bash
# Build React application
cd frontend
npm run build
# Deploy to Netlify/Vercel
```

---

## 👥 User Guide

### For Students 🎓
1. **Register/Login** → Access your student dashboard
2. **Browse Events** → View events from all colleges with filters
3. **View Details** → Get comprehensive event information
4. **Register** → Submit registration (Free events) or proceed to payment (Paid events)
5. **Secure Payment** → Complete Stripe checkout for paid events
6. **Track Status** → Monitor your registration status (Pending/Approved/Rejected)
7. **Download Ticket** → Get QR-coded PDF ticket after approval
8. **Email Notification** → Receive approval email with event details and ticket download link
9. **Submit Feedback** → Rate events and share detailed experiences through the star rating and comment system

### For College Admins 👩‍💼
1. **Admin Login** → Access college-specific admin dashboard
2. **View Analytics** → See registration statistics and charts
3. **Create Events** → Add new events for your college
4. **Manage Registrations** → Approve or reject student applications
5. **Excel Data Export** → Download comprehensive registration data with ticket information
6. **Automatic Tickets** → System generates and emails tickets upon approval
7. **Monitor Students** → View and manage students from your college
8. **Activity Logs** → Track all administrative actions
9. **Feedback Analysis** → Review student ratings and comments for event improvement

### For Super Admin 👑
1. **Super Admin Login** → Access system-wide dashboard with red theme
2. **Global Access** → View all events and users across all colleges
3. **Approve Admins** → Manage college admin approval requests
4. **System Analytics** → View comprehensive registration analytics
5. **Full Control** → Complete access to all system features

---

## 🎯 Project Milestones

### ✅ Milestone 1: Authentication & Authorization
- Secure user registration with email validation
- JWT token-based authentication
- Role-based access control (Student, College Admin, Super Admin)
- Password encryption with bcrypt

### ✅ Milestone 2: Event Management System
- College admin event creation with image upload
- Student event browsing with category filters
- Event capacity management
- Responsive UI with Tailwind CSS
- Real-time event status updates

### ✅ Milestone 3: Advanced Admin Features & Analytics
- **Three-tier role system**: Student, College Admin, Super Admin
- **Registration workflow**: Pending → Approved/Rejected status
- **Super Admin dashboard**: System-wide control with unique red theme
- **College Admin approval**: Super admin manages college admin accounts
- **Real-time analytics**: Chart.js bar graphs showing student participation
- **Activity logging**: Complete audit trail of admin actions
- **Data isolation**: College admins see only their college data
- **Registration management**: Dedicated tab for approval workflow
- **User management**: Role-based user viewing and filtering
- **Excel data export**: Comprehensive registration data export with ticket information

### ✅ Milestone 4: Feedback & Interaction System
- **Star rating system**: Five-star rating with visual indicators
- **Feedback submission**: Form for detailed event experience sharing
- **Rating distribution**: Visual analytics showing rating breakdown
- **Event discussions**: Comment section for participant interaction
- **Feedback analytics**: Admin dashboard with quantitative analysis of ratings and feedback
- **Comment moderation**: Tools for managing user discussions
- **Statistical insights**: Quantitative analysis of event performance
- **Feedback integration**: Ratings displayed on event cards


### 🔄 Future Enhancements
- **Real-time push notifications** (WebSocket integration for instant updates)
- **QR code scanner mobile app** for event check-ins and attendance tracking
- **Event certificate generation** with customizable templates and automatic distribution
- **Multi-language support** for international college participation
- **Social media integration** for event sharing and promotion
- **Video streaming integration** for hybrid events and virtual participation
- **AI-powered event recommendations** based on student preferences and history
- **Automated event reminders** via SMS and push notifications

---

## 📈 Results & Impact

CampusEventHub successfully demonstrates a **functional, secure, and scalable** event management ecosystem. The platform provides:

- **Enhanced Accessibility**: Students discover events across all colleges
- **Streamlined Administration**: Intuitive dashboards for event and user management
- **Data-Driven Insights**: Real-time analytics for better decision making
- **Secure Workflows**: Approval-based registration system
- **Role-Based Control**: Three-tier access system with proper isolation
- **Automated Ticketing**: QR-based tickets with email delivery
- **Professional Communication**: Beautiful HTML email templates
- **Audit Trail**: Complete activity logging for accountability
- **Scalable Architecture**: Ready for enterprise deployment

### Key Achievements
- ✅ **100% Role-Based Access** control implementation
- ✅ **Secure Payment Processing** with Stripe integration
- ✅ **QR Ticket System** with automatic generation and email delivery
- ✅ **Real-time Analytics** with Chart.js integration
- ✅ **Email Integration** for approvals and password resets
- ✅ **Complete CRUD** operations for all entities
- ✅ **Responsive Design** for mobile and desktop
- ✅ **Secure Authentication** with JWT and bcrypt
- ✅ **PDF Generation** with professional ticket design
- ✅ **Excel Export System** with comprehensive registration analytics and ticket data
- ✅ **Data Export Security** with role-based access control for sensitive information

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Team

**CampusEventHub - Team 1**

- **GitHub Repository**: [CampusEventHub Project](https://github.com/your-username/campus-eventhub-team1)
- **Documentation**: Complete project documentation available in `/docs`

---

<div align="center">

### 🌟 Star this repository if you found it helpful!

**Built with ❤️ for better campus event management**

</div>