import Express from'express';
import {graphql} from 'graphql';
import GraphHTTP from 'express-graphql';
import Schema  from './schema';

var queryy = ' query{people {id }}';
const APP_PORT = 3000;

// graphqli(Schema, query).then( function(result) {
//   console.log(JSON.stringify(result));
// });
const app = Express();
// app.set('view engine', 'ejs');
// app.use('/graphql', GraphHTTP(req =>{
  // return{
  // schema:Schema
  // console.log('hello'),
  // query: graphql(Schema, queryy).then(function(result) {console.log(result)})
// };
// }));
app.use(Express.static('public'));

app.use(Express.static(__dirname + '/'));
app.use('/graphql', GraphHTTP({
   schema: Schema,
   graphiql: true
 }));
// app.post('/graphql', function (req, res) {
//   res.send(graphql(Schema, queryy).then(function(result) { alert("hellO!")  }));
// });
app.listen(APP_PORT, () => {
  console.log('App listening on port ${APP_PORT}');
})
