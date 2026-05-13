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
