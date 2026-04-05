<p align="center">
  <img src="/public/img/wander-wise-banner-b-anamorphic.jpg" alt="wanderwise-logo" height="300" />
</p>

<h1 align="center">WanderWise</h1>

<div align="center">
WanderWise

</div>

# DOCUMENTATION

> Base url of this service is: https://wander-wise-rest-api-cc-2-7mqffet5fa-as.a.run.app/api/v1

> REST API full documentation is here: https://wander-wise-rest-api-cc-2-7mqffet5fa-as.a.run.app/api-docs/

The service available:
## AUTH
- Login
  <pre>POST /auth/login</pre>

- Register
  <pre>POST /auth/register</pre>

- Logout
  <pre>GET /auth/logout</pre>

- Get User Profile
  <pre>GET /auth/user</pre>

- Delete User Profile
  <pre>POST /auth/user</pre>

- Update Data User
  <pre>PUT /auth/user</pre>

- Update Username User
  <pre>PUT /auth/username</pre>

- Update Email User
  <pre>PUT /auth/useremail</pre>

## POSTS

- Get All Posts
  <pre>GET /posts/home</pre>

- Get All Posts User
  <pre>GET /posts</pre>

- Create a Post
  <pre>POST /posts</pre>

- Get Post
  <pre>GET /posts/:postId</pre>

- Delete a Post
  <pre>GET /posts/:postId</pre>

- Update a Post
  <pre>GET /posts/:postId</pre>



# Quick Look

## Architecture

<p align="center">
  <img src="/public/img/wander-wise-architecture.jpg" alt="wanderwise-logo" />
</p>

# Authentication

This service is using firebase authentication to managing user function, firebase authentication store user data including uid, displayname, photourl, email, phone number, refresh token, and access token. With this feature we don't need to store user data to database.

In order to use POST service, user need to register and login to access it. The user will recieve access token if authenticated is valid, if you don't have there will be error message 401 (unauthenticated).

# Environment

In order to run this project, you need to follow this set-up steps:

#### INSTALL NODE_MODULES DEPENDENCIES
```bash
  npm install
```

#### CREATE FIREBASE PROJECT
* go to firebase console https://console.firebase.google.com
* sign up account
* click create `CREATE NEW PROJECT`
* fill `project name`
* choose `country/region`
* Add your Firebase to your Android app/Web app/ iOS app
* Go to project settings > general > your apps > SDK setup and configuration > NPM
* Copy firebase config to notepad and keep it for next steps

#### CREATE .ENV FILE
* create `.env` file in them same level as app.js
* copy this text bellow to `.env` file
```bash
  FIREBASE_API_KEY= your_firebase_api_key
  FIREBASE_AUTH_DOMAIN= your_firebase_auth_domain
  PROJECT_ID= your_firebase_project_id
  STORAGE_BUCKET= your_firebase_storage_bucket
  MESSAGING_SENDER_ID= your_firebase_sender_id
  APP_ID= your_firebase_app_id
  MEASUREMENT_ID= your_firebase_measurment_id
```
* paste firebase config secret key and replace it.
* done

#### DOWNLOAD SERVICE ACCOUNT JSON
* in project settings https://console.firebase.google.com
* go to service accounts > generate new private key and you will automatically download service-account.json
* move service-account.json to db folder
* in `firebase.js` , change `const serviceAccount = require('./ww-service-account.json');` to your filename service account you download before
* save file
* done

#### GENERATE SECRET KEY FOR EXPRESS SESSION
* go to `.env` file
* copy this code below to your `.env`
```bash
# secret session key
  SESSION_SECRET= your_session_secret_key
```
* you can use just random number
* save > done

#### CLOUDINARY FILE SERVER SET-UP
* go to https://cloudinary.com/ and sign up
* go to settings > access keys
* copy this settings to `.env` file
```bash
  CLOUD_NAME= your_cloudinary_id_name
  CLOUD_API_KEY= your_cloudinary_api_key
  CLOUD_API_SECRET= your_cloudinary_api_secret
```
* replace the variable with your cloudinary keys
* save > done

#### RUNNING SERVER
* Start server with nodemon `npm run test`
* Start server with node `npm run start`


# Known Issues

* count likes where post is not specify by postId, if we have already login, we can take uid from decoded token. In this case, the idea is get all posts and count how many likes where postId is equal as idPost. WITHOUT using postId paramater like getPost by postId.
The alternative is, we need to target post with postId, and from that, we can count how many likes post they have. So in posts document, they have sub-collection likes.

# Pull Requests

I'd be happy to review any pull requests that may better the WanderWise project, in particular if you have a bug fix, enhancement, or a new idea, you can contact us.

## Contributors

### CC Member (Master Contributor)

* (CC) C663BSY4320 – MUHAMMAD FAISAL – STKIP PGRI BANJARMASIN
* (CC) C014BSY3938 – ANDIKA WIRATANA – UNIVERSITAS UDAYANA

CC member is responsible for the development of the API service and deployment of the model. In sort, in this project CC is responsible for Backend, infrastructure, and DevOps.

### ML Member

* (ML) M014BSY1891 – KADEK ARTHA DARMA PRADNYANA – UNIVERSITAS UDAYANA
* (ML) M206BSY1275 – FAHRUL ARDIAN NUGROHO – UNIVERSITAS HALU OLEO
* (ML) M506BSY1660 - HAIDIL FAUZAN - INSTITUT TEKNOLOGI BATAM


<p>ML Member is who are contribute to create text summarization and text classification that used in this application. Without them, this service is nothing.</p>

### MD Member

* (MD) A296BSX2861 – ELISA TRI ASWURI – UNIVERSITAS PEMBANGUNAN NASIONAL VETERAN JAWA TIMUR
* (MD) A014BSY2476 – I GEDE ALEX BRAMARTHA – UNIVERSITAS UDAYANA

<p>MD member is who are responsible to serve mobile applications based on Android and use this service as data source and more.</p>