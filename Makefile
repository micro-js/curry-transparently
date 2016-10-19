#
# Vars
#

BIN = ./node_modules/.bin

#
# Tasks
#

node_modules: package.json
	@npm install

test: node_modules
	@${BIN}/tape test/*

validate: node_modules
	@standard

init:
	@git init
	@git add .
	@git commit -am "FIRST"
	@hub create micro-js/curry-transparently -d "Curry functions, but expose their accumulated arguments and underlying function so that they can be meaningfully compared against one another"
	@travis enable
	@git push -u origin master

.PHONY: test validate init
