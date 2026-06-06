use SUAPDB;

insert into users  (userId,name,email,password) values
('24011A6618','Punnam Chandra','punnamchandra@gmail.com',12345),
('24011A6637','Vishwaksena','vishwaksena@gamil.com',12345),
('24011A6652','Tashvith','tashvith@gmail.com',12345),
('25015A6605','Rakesh','Rakesh@gmail.com',12345);

INSERT INTO departments
(department_id, department_name, name, description, contact_email, phone, office_location)
VALUES
(1,'CSE','CSE1','faculty at cse','cse1@gmail.com',1234567890,'CSE department'),
(2,'CSE','CSE2','faculty at cse','cse2@gmail.com',1234567891,'CSE department'),
(3,'CSE','CSE3','faculty at cse','cse3@gmail.com',1234567892,'CSE department'),
(4,'Examination','Exam1' ,'Student Portal Staff','Exam1@gmail.com',1234567893,'Examination Department'),
(5,'Examination', 'Exam2' ,'Student Portal Staff','Exam2@gamil.com',1234567894,'Examination Department'),
(6,'Library', 'Lib1', 'Library Staff','Library@gmail.com',1234567895,'University Library');


insert into notices (title,description) values
('Example notice title', 'Example notice description');



INSERT INTO complaints (student_id, title, description)
VALUES ('24011A6618', 'Example title', 'Example description');


insert into departments values(1,'CSE'),(2,'Examination'),(3,'Library');

INSERT INTO faculty
(department_id, department_name, name, description, contact_email, phone, office_location)
VALUES
(1,'CSE','CSE1','faculty at cse','cse1@gmail.com',1234567890,'CSE department'),
(1,'CSE','CSE2','faculty at cse','cse2@gmail.com',1234567891,'CSE department'),
(1,'CSE','CSE3','faculty at cse','cse3@gmail.com',1234567892,'CSE department'),
(2,'Examination','Exam1' ,'Student Portal Staff','Exam1@gmail.com',1234567893,'Examination Department'),
(2,'Examination', 'Exam2' ,'Student Portal Staff','Exam2@gamil.com',1234567894,'Examination Department'),
(3,'Library', 'Lib1', 'Library Staff','Library@gmail.com',1234567895,'University Library');

INSERT INTO help_articles (article_id, title, content, category, created_at) VALUES
(9, "How to submit a new complaint", "To file a complaint, go to the Complaints page, choose 'Create Complaint', enter a clear title and description, then submit. Your complaint will be tracked automatically and you can check its status later.", "Complaints", "2026-06-06 14:52:25"),
(10, "How to track complaint status", "Open the Track Complaints page, enter your complaint ID or login credentials, and review status updates. The system will show Pending, In Progress, Resolved, or Rejected states.", "Complaints", "2026-06-06 14:52:25"),
(11, "How to view university notices", "Navigate to the Notices page to see the latest announcements from departments and administration. Use filters or search to find notices by title or department.", "Notices", "2026-06-06 14:52:25"),
(12, "Reset your account password", "If you forgot your password, go to Forgot Password, enter your registered email, and follow the OTP verification steps. Then choose a new secure password.", "Accounts", "2026-06-06 14:52:25"),
(13, "How to verify OTP during signup", "After signing up, you will receive a one-time password in your email. Enter the OTP on the verification page to activate your account and access student services.", "Accounts", "2026-06-06 14:52:25"),
(14, "Access library resources", "Visit the Library section to search for books, journals, and digital materials. If you need help, contact the library staff using the contact information listed on the Department page.", "Library", "2026-06-06 14:52:25"),
(15, "Contact your department office", "Open the Departments page, select your department, and view the office location, email, and phone number. Use these details for department-specific queries or support.", "Departments", "2026-06-06 14:52:25"),
(16, "How to give feedback", "To share feedback, go to the Feedback page and submit your suggestions or concerns. Your input helps improve the university assistance platform.", "Feedback", "2026-06-06 14:52:25"),
(17, "Manage your student account details", "Update your personal information, email, and profile settings through the Manage Account page. Keep your contact details current for notices and communication.", "Accounts", "2026-06-06 14:52:25"),
(18, "Understanding exam schedules", "Check the Exams or Notices page for exam announcements, dates, and venue details. Contact the Examination department if you have questions about your timetable.", "Exams", "2026-06-06 14:52:25"),
(26, "Request a library book", "If a title is unavailable, submit a book request through the Library page. Provide the book name, author, and reason for the request so staff can process it faster.", "Library", "2026-06-06 15:13:02"),
(27, "How to submit feedback", "Use the Feedback page to share suggestions, report issues, or request improvements. Your feedback helps improve services for all students and staff.", "Feedback", "2026-06-06 15:13:02"),
(29, "Find exam schedule announcements", "Check the Notices page for official exam schedules and venue updates. Look for exam notices from the Examination department to confirm dates and reporting times.", "Exams", "2026-06-06 15:13:02"),
(30, "Prepare for campus events", "Review event notices on the university homepage and register if RSVP is required. Event details often include venue, agenda, and any documents you need to bring.", "Notices", "2026-06-06 15:13:02"),
(31, "How to manage student profile settings", "Navigate to Manage Account to change your profile photo, name display, and notification preferences. This ensures your account reflects your correct details.", "Accounts", "2026-06-06 15:13:02"),
(32, "Using the search feature", "Enter keywords in the search box to quickly find help articles, notices, and support guides. The search works across titles, content, and categories for faster results.", "General", "2026-06-06 15:13:02"),
(33, "Report a technical issue", "If the platform is not loading or a feature fails, submit a complaint with detailed steps and screenshots if possible. The IT support team will investigate and update your complaint status.", "Complaints", "2026-06-06 15:13:02"),
(34, "Understand department approval workflows", "If your request needs departmental approval, review the department-specific instructions on the Departments page. Some requests require email confirmation or additional documentation.", "Departments", "2026-06-06 15:13:02"),
(35, "Apply for library access", "Students can request extended library access by submitting a library access form available on the Library page. Approved students receive an email with access instructions.", "Library", "2026-06-06 15:13:02"),
(36, "Frequently asked account questions", "This article explains common account issues such as password recovery, email updates, and account verification. Use the Support page if your issue is not resolved here.", "Accounts", "2026-06-06 15:13:02"),
(37, "Campus safety notice overview", "Read campus safety notices for emergency alerts, health guidance, and safety protocol changes. These notices are posted immediately when there is important information for students or staff.", "Notices", "2026-06-06 15:13:02");
