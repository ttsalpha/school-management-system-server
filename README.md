# [Backend for School Management System](https://github.com/ttsalpha/school-management-system-server/fork)

## Introduction

- Report repository: [SMS - Report](https://github.com/ttsalpha/school-management-system)
- Front end repository: [SMS - Client](https://github.com/ttsalpha/school-management-system-client)
- Back end repository: [SMS - Server](https://github.com/ttsalpha/school-management-system-server)

## Demo heroku

Go to: https://thaobone.herokuapp.com

|    role    |    username   |  password |
|:----------:|:-------------:|:---------:|
|   member   |      bone     |    jack   |
|   admin    |    president  | president |

## Available Scripts

### `yarn install`

Install dependency package.

### `yarn dev`

Runs the app in the development mode.\
Server listening on http://localhost:3001

### `yarn start`

Builds the app for production.\
It correctly bundles React in production mode and optimizes the build for the best performance.

```js
// Go to file Misc.js in src of front end, select server to connect:
export const api = axios.create(({
// choose either baseURL
  baseURL: 'http://localhost:3001/', // connect with local sms server
  baseURL: 'https://thaobone-server.herokuapp.com/' // default connection with heroku
}))
```

## Develop team

- [Bùi Thị Phương Thảo](https://github.com/thaobone163)
- [Trần Thế Sơn](https://github.com/ttsalpha)