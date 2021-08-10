install:
  npm ci

start:
	heroku local -f Procfile.dev

start-backend:
	npx nodemon bin/slack.js

start-frontend:
	npx webpack serve

build:
	npm run build

lint:
	npx eslint . --ext js,jsx

deploy:
	git push heroku
