# WIA'AM LABS Medical Laboratory Website

This project is a frontend medical laboratory management website designed to simplify test booking, result viewing, and laboratory operations.

Team members: 
- Ashraqat Ahmed (1230160)  
- Israa Mohamed (4240006) 
- Malak Mohamed (1230265) 
- Wessam Waleed (1230128)


 Date: May of 2026


##  Quick Start
Follow these steps to run the project locally:
```bash
-> git clone https://github.com/your-repository-link
cd WIAAM-LABS
```
or launch the project using VS Code Live Server:
```js
-> Install Live Server extension in VS Code
-> Right click index.html
-> Select "Open with Live Server"
```


## Demo Accounts

### Patient Login
Email: ahmed@example.com  
Password: ahmed123

### Specialist Login
Email: layla@novalab.com  
Password: doc123


## Main Features
- [ ] **Patient Dashboard:** Allows patients to access their personal laboratory information.
- [ ] **Specialist Portal:** Management portal for doctors and laboratory specialists.
- [ ] **Admin Panel:** Administrative panel for managing machines, bookings, specialists, inquiries, and laboratory operations.
- [ ] **Appointment Booking:** Enables scheduling and managing laboratory test appointments.
- [ ] **Lab Result Viewer:** Displays medical test reports and diagnostic results.
- [ ] **Machine Monitoring:** Tracks laboratory equipment status and maintenance.
- [ ]  **Authentication System:** Supports secure login for different user roles.
- [ ]  **Responsive Design:**  Optimized for desktop, tablet, and mobile devices.
- [ ]  **Interactive UI:** Simple and responsive interface with dynamic components.


## Navigating the Website
### Home Page
The landing page introduces WIA'AM LABS. Patients can read about services, browse popular tests, and meet the specialists. Use the navbar or the CTA buttons to move to other sections.

### Booking Appointments
Click **"Book a Test"** in the navbar on the home page. You must be logged in first. The booking flow has 3 steps:
1. Select one or more tests
2. Pick a date, time slot, and branch location
3. Review and confirm

```js
// A confirmed booking is stored as (cleaned up for simplification purposes):
const booking = {
  id: "B007",
  patientId: "P001",
  date: "2026-05-10",
  time: "09:00",
  tests: ["CBC Panel", "Lipid Panel"],
  status: "Confirmed",
  location: "Branch A"
};
```
### Viewing Test Results
After logging in, go to **My Portal -> My Results**. Each result row can be expanded to show individual test values, reference ranges, and colour-coded flags.

### Managing Your Profile + Bookings
Inside the Patient Portal, use the **My Bookings** tab to see upcoming appointments and the **My Profile** tab to review your personal information.

### Specialist Portal
Specialists log in using their clinic credentials. Their portal shows a weekly schedule calendar and a full list of upcoming patient appointments.

### Admin Portal
Admins access five management tabs:
- **Machine Status:** View lab equipment health across all branches.
- **Specialist Schedules:** Overview of all doctors' appointments.
- **Reschedule/Manage:** Modify or cancel existing bookings.
- **Manage Doctors:** Create or remove specialist accounts.
- **Inquiries:** Review and respond to contact form submissions.
  
### Submitting an Inquiry
If a user has a concern, they can go to the **Contact** page, select a category, *optionally* click a prompt to auto-fill your message, fill in the form, and hit **Send**. Your inquiry will appear instantly in the Admin Portal under Patient Inquiries.

## Work Distribution
| Member | Responsible for |
|---------|-----------------|
**Ashraqat**| Home page, About, Our Tests |
**Wessam** | Specialists, Book a Test, Contact |
**Malak** | Authentication, Patient Portal, DB|
**Israa** | Specialist Portal, Admin Portal, DB|

## Build order:
```js
Ashraqat and Wessam start working in parallel. Malak starts once the sign-in portal is ready. Finally, Israa starts whenever the patient portal is done. Israa and Malak work on the database once the whole frontend is complete.
```

## Built Using
- **Languages:** HTML / CSS / JavaScript
- **Storage:** Session Storage / Simulated JavaScript Database
- **Database:** PostgreSQL 
- **Tools:** VS Code / Live Server / Supabase

***

 *WIA'AM LABS group project - 2026*
