help:
	@echo "make build     Build the app."
	@echo "make start     Start the app for development."
	@echo "make clean     Clean the build artifacts."

.PHONY: build
build: dist

dist: node_modules src
	npm run build
	touch dist

start: node_modules
	npm run dev

preview: node_modules src
	npm run preview

.PHONY: deploy
deploy: node_modules
	git switch main && git push
	git switch stage && git pull && git merge main && git push
	git switch main

.PHONY: clean
clean:
	rm -rf dist

######################################################################

node_modules : package-lock.json package.json
	npm install
	touch node_modules
