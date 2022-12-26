help:
	@echo "make build     Build the app."
	@echo "make start     Start the app for development."
	@echo "make clean     Clean the build artifacts."

.PHONY: build
build: dist 

dist: node_modules src
	yarn build
	touch dist

start: node_modules
	yarn dev

preview: node_modules src
	yarn preview

.PHONY: clean
clean:
	rm -rf dist

######################################################################

node_modules : yarn.lock package.json
	yarn
	touch node_modules
