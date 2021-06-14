# README.md

## Overview
This project contains a Discord bot that is built with discordJS. It aims to add utility functions for personal use.

Features include:
- `ftoc/ctof <number>` : Converting between Farenheit and Celcius
- `tz <time> <city> to <city>` : Converting time between timezones (WIP)

See upcoming features and progress tracking at the [trello board](https://trello.com/b/p9kSMeKw)

## Project Structure

Folder structure
```
|- index.js // Main file, commands are registered here
|- config/ 
|- features/ 
	|- misc.js // Contains ftoc/ctof feature code
	|- timezone.js // Contains timezone feature code
|- utils/ // Folder for functions that could be used across multiple features

```

This project follows the [gitflow workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow). 
When a deployment pipeline is set up the **master branch will trigger automatic deployments**.

## Development

### Setup

1. Run `npm run install`
2. Set up your `.env` file with the bot user token
3. Set up `config/config.json` with the bot user id and any other customisation

### Develop

**To run**
1. Run `npm run bot`

**To test**
1. Run `npm run test`

### Deploy

Currently this is a locally deployed bot. However there are plans in future to set up an automatic pipeline that will deploy features as they are committed to branches and merged into the `master` branch.


