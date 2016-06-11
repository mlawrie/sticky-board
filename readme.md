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
- Add a sticky
- Return stickies from server
- Move sticky / edit sticky update server
- click away turn off sticky edit mode
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


