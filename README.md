# CampusEventHub – Inter-College Event Management Platform

## Objective

CampusEventHub provides a centralized platform for colleges to host and manage various events such as sports competitions, hackathons, cultural fests, and workshops. Students from different colleges can browse upcoming events, register for participation, and track event details seamlessly.

## Outcomes

- Enable students to view and register for inter-college events.
- Allow colleges to manage event listings, registrations, and schedules efficiently.
- Provide real-time updates on event statuses and registrations.
- Foster engagement through event feedback and discussions.


## Database Schema

### Users
- `id`: Unique identifier
- `name`: Student/admin full name
- `email`: Email address
- `password`: Hashed authentication password
- `college`: Associated college
- `role`: Role (student, college_admin, super_admin)

### Events
- `id`: Unique event identifier
- `college_id`: ID of the hosting college
- `title`: Event title
- `description`: Event details
- `category`: Type of event (sports, hackathon, cultural, etc.)
- `location`: Event venue
- `start_date`: Event start date/time
- `end_date`: Event end date/time
- `created_at`: Creation timestamp

### Registrations
- `id`: Unique registration identifier
- `event_id`: Event reference
- `user_id`: Registering student ID
- `status`: Registration status (pending, approved, rejected)
- `timestamp`: Registration time

### Feedback
- `id`: Unique feedback identifier
- `event_id`: Associated event
- `user_id`: Feedback provider
- `rating`: Event rating (numeric scale)
- `comments`: Feedback comments
- `timestamp`: Feedback submission time

### AdminLogs
- `id`: Log identifier
- `action`: Description of admin action
- `user_id`: Admin user ID
- `timestamp`: Log entry time

## Mockups

- Login/Register Page
- User Dashboard
- Event Form
- Event Listing Page
- Admin Participant Management Dashboard
- All Events Dashboard Admin Panel
- Admin Dashboard (Manage platform activities and monitor performance)
- Overview: User Management, Event Management, Registrations, Admin Logs

## Responsive Design

CampusEventHub is designed to be fully responsive and accessible across devices.

---
