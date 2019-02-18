install:
	npm install

start:
	npx babel-node -- src/bin/brain-games.js

publish:
	npm publish

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm run test-coverage

watch:
	npm test -- --watch
