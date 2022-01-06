Steps to run project :-

1] Postgresql database is use
2] Database name is testdb
3] Run following query to create table 
    create table users(
	user_id serial primary key,
	fullname varchar,
	email varchar,
	passcode varchar,
	phone_number varchar,
	dob date,
	age int,
	profile_image varchar,
	registration_date date
    )

4] Run npm install om terminal
5] Swagger is implements and can be check on following link
        http://localhost:3000/api-docs/#/

---------------------------------------------------------------------------------------------------------------------------------------
Project Requirements :- 
1. create a user (name, email, phone and profile picture, dob, age),
2. Take as input only the dob and automatically calculate the age in the backend
3. Update details,
4. Login the user
5. The auth token should expire in 15 min.

--------------------------------------------------------------------------------------------------------------------------------------

Note :- Requirements are not cleared and specified so some assumption are taken.