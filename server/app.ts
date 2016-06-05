import * as express from 'express'

import { boardRouter } from './boards/boardRouter'

const app = express()
app.use(boardRouter)

const port = process.env.PORT || 3000;
app.set('port', port);

app.listen(app.get('port'), () => {
  console.log('Server listening on port ' + port);
}).on('error', (err:any) => {
  console.log('Cannot start server, port most likely in use');
  console.log(err);
});

