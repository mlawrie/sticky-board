[![Build Status](https://travis-ci.org/mlawrie/sticky-board.svg?branch=master)](https://travis-ci.org/mlawrie/sticky-board)

# Dev setup
- make sure postgres is installed and working
- `npm install`
- `npm run build`
- `npm devSetup` - sets up postgres
- `npm test`
- `npm start`
- Probably use visual studio code to do stuff

# Todos:
- delete sticky on server
- click away turn off sticky edit mode
- add UI for network interruption / offline
- Update client of changes from other clients (big)
- Some homepage design (big)
- Validate board creation
- Group/ungroup stickies
- Vote on sticky / sticky group
- Add titles to groups/board
- Minimap
- Encryption

# Emergent requirements:
- Return 200 from PUT /api/stickies if the sticky was deleted by somebody else
- Deduplicate contents of persistenceQueue so that only most recent data is sent when offline
- A new sticky returning 422 probably should be just deleted from screen with an error-- user has no way to recover. Changes should probably be reverted in that case, too.

#Tech debt:
- move loadBoard API call from boardView to api/