# quarantine-digest

Test project about email digest. This has 2 sections `emails` and `config`. The `Emails` shows all the emails with pagination. The `config` give the possibility to set when the app check for new emails nevertheless it is only a UI simulation, it means that the application will check anyway new emails every minute. Please consider that once the server is off the next that the server is running will generate different emails because it is saved in memory instead of database

## Install

`npm i`

## Create .env file (No require)

It is possible to create a .env file to set the address and the port, for example:

```
BACKEND_PORT=8000
SOCKET_PORT=4000
BACKEND_URL=http://localhost:8000
SOCKET_URL=http://localhost:4000
```

Without .env file the app get the values shown above.

## Run the project(run Frontend and Backend is required)

* Run the backend

`npm run start-backend`

* Run the frontend

`npm run start-frontend`

## Run unit test
`npm test`

## Run integration test
`npm run intTest`

## Missing

* React component test
* Integration test for socket
* Validation in case of introduce the same time again
* Some refactor