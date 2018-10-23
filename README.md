# Working demo
Check the result of the assignment - https://levvsha.github.io/code-assignment-nyt-api/

# Commands

## Install dependencies:
```bash
yarn # (or `npm install` if you prefer npm)
```

## Running in development mode:

```bash
yarn start # (or `npm start` if you prefer npm)
```
- Open up http://localhost:3000/


## Build static assets for github pages:

```bash
yarn run build # (or `npm run build` if you prefer npm )
```
New assets will be built in the `/docs` folder

## Running unit tests:

```bash
yarn run test # (or `npm install` if you prefer npm)
```

# Running end-to-end tests:

- Run the app in the development mode if it is not already running in this mode
```bash
node_modules/.bin/cypress open
```
- Launch `newsAppSpec.js` test case.

