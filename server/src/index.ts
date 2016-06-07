import { app } from './app'

const port = process.env.PORT || 3000;
app.set('port', port);

app.listen(app.get('port'), () => {
  console.log('Server listening on port ' + port);
}).on('error', (err:any) => {
  console.log('Cannot start server, port most likely in use');
  console.log(err);
});