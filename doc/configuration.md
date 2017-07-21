# Configuration

## GitHub to project 2

https://github.com/aceres/cas-fee-project2

(Tanja und André)

The user: Tanja should be added!

## Angular CLI

https://github.com/angular/angular-cli

### Installation

npm install -g @angular/cli

ng new project2
cd project2
ng serve

Navigate to http://localhost:4200/.

## The official Angular library for Firebase

https://github.com/angular/angularfire2

### Installation (local)

npm install firebase angularfire2 --save

## Style Framework

https://www.primefaces.org/primeng/#/

### Installation (local)

npm install primeng --save

## Firebase

https://firebase.google.com

### Firebase Console

https://firebase.google.com

https://console.firebase.google.com/?pli=1

### Configuration

Project name: project2

Country: Switzerland

Administration GUI: https://console.firebase.google.com/project/project2-60db1/overview

#### Real Database

URL: https://project2-60db1.firebaseio.com/

#### Setup Hosting

npm install -g firebase-tools

Domain: https://project2-60db1.firebaseapp.com/ (Type: Default)

Go to the directory: project2/

(/Users/andre.ceres/Projects/project2)

ng build
(ng build -prod)

Go to the directory: project2/dist/

Login to your Firebase account:

firebase login

(Allow Firebase to collect anonymous CLI usage information? Yes)
(Firebase CLI Login Successful)

firebase init

Default Firebase project for this directory: project2/ (project2-60db1)

a) Writing configuration info to firebase.json...
b) Writing project information to .firebaserc...

(Firebase initialization complete!)

I still haven't to start with these step:

The CLI will ask what folder to use as the public directory. For our project we want to use the dist/ directory instead of Firebase's default public/ directory. So type in the command line dist.

a) What do you want to use as your public directory? dist/
b) Configure as a single-page app (rewrite all urls to /index.html)? Yes
c) File dist//index.html already exists. Overwrite? No
d) Skipping write of dist//index.html

firebase deploy
(firebase deploy --only hosting)

Deploying to 'project2-60db1'...
i  deploying hosting
i  hosting: preparing dist/ directory for upload...
✔  hosting: 8 files uploaded successfully
i  starting release process (may take several minutes)...

Project Console: https://console.firebase.google.com/project/project2-60db1/overview
Hosting URL: https://project2-60db1.firebaseapp.com
Google Cloud Platform (Dashboard): https://console.cloud.google.com/home/dashboard?project=project2-60db1

#### Firebase: Permissions for project

The user: Tanja should be added!

https://console.cloud.google.com/iam-admin/iam/project?project=project2-60db1&authuser=0&consoleReturnUrl=https:%2F%2Fconsole.firebase.google.com%2Fproject%2Fproject2-60db1%2Fanalytics&consoleUI=FIREBASE

### More dependencies for this project

For the authentication:

npm install promise-polyfill --save-exact

URL: https://alligator.io/angular/firebase-authentication-angularfire2/

### Style with primeNG

The file: angular-cli.json

Add these lines:

"styles": [
  "../node_modules/primeng/resources/primeng.min.css",
  "../node_modules/primeng/resources/themes/omega/theme.css",
  "styles.css"
]

Rebuild and reserve the web application then!

### Installation: font-aewsome (locally and not globally)

FontAwesome is needed for the PrimeNG

npm install font-awesome --save
