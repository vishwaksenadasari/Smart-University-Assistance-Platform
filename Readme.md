open new terminal in vs code
git checkout develop
git pull origin develop

update the .env.example with recommended changes and create a new file as .env and paste the contents of .env.example

For EMAIL_PASS in .env follow:
go to google account login with your account
click manage your account
in left bar click on security and sign in
enable two step verification
after enabling two step verification in the search bar type
app passwords
click on app passwords
create app name as smart-university-assistance-platform on creation you will get a pop up with one password copy it and paste that password in .env EMAIL_PASS.

open mysqlworkbench(changed codes only)
execute the schema.sql codes
execute the seed.sql codes


open new terminal in vscode
cd backend
npm install
node index.js
keep this open
after that
open new terminal
cd frontend
npm install
npm run dev
click on the link shown in frontend terminal

try to login with your old accounts and check the signup feature with other account with valid email account since otp verification is needed