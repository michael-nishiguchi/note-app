require('dotenv').config();
const connectionString = process.env.DATABASE_URL;
const pg = require('pg');
const pool = new pg.Pool({ connectionString: connectionString });
var express = require('express');
const app = express();
var router = express.Router();
const path = require('path');
const port = 3000;
const bcrypt = require('bcryptjs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => console.log('Running on ' + port));
router.use(express.static(path.join(__dirname, 'public')));
app.post('/login', (req, res) => {
	var email = req.body.email;
	var password = req.body.password;
	//var hashedPassword = passwordHash.generate(password);
	let hash = bcrypt.hashSync(password, 10);

	//console.log(hash);
	/*
	pool.query(
		"SELECT * FROM user_account WHERE email = '" + req.body.email + "' AND password =  '" + "' req.body.password",
		function(err, result) {
			if (err) {
				console.error('Error running query', err);
			}
			res.send(result.rows);
		}
	);
	*/

	pool.query(
		'SELECT * FROM user_account WHERE email = ? AND password = ?',
		[ req.body.email, req.body.password ],
		function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}
			response.end();
		}
	);
});

/*
router.get('/getPerson/:id', function(req, res) {
	//getting person
	pool.query('SELECT first_name, last_name, birthday from PERSON WHERE person_id = $1', [ req.params.id ], function(
		err,
		result
	) {
		if (err) {
			console.error('Error running query', err);
		}
		res.send(result.rows);
	});
});
router.get('/getParents/:id', function(req, res) {
	//getting parents
	pool.query('SELECT parent_id FROM parent_child WHERE parent_id = $1', [ req.params.id ], function(err, result) {
		if (err) {
			console.error('Error running query', err);
		}
		res.send(result.rows);
	});
});
router.get('/getChildren/:id', function(req, res) {
	//getting children
	pool.query('SELECT child_id FROM parent_child WHERE child_id = $1', [ req.params.id ], function(err, result) {
		if (err) {
			console.error('Error running query', err);
		}
		res.send(result.rows);
	});
});
*/
app.use('/', router);

/*
Error running query error: invalid input syntax for type integer: "[object Object],[object Object]"
    at Connection.parseE (C:\Users\Michael\Google Drive\School\CS 313 - Web Engineering II\wk10\node_modules\pg\lib\connection.js:614:13)
    at Connection.parseMessage (C:\Users\Michael\Google Drive\School\CS 313 - Web Engineering II\wk10\node_modules\pg\lib\connection.js:413:19)     
    at TLSSocket.<anonymous> (C:\Users\Michael\Google Drive\School\CS 313 - Web Engineering II\wk10\node_modules\pg\lib\connection.js:129:22)       
    at TLSSocket.emit (events.js:311:20)
    at addChunk (_stream_readable.js:294:12)
    at readableAddChunk (_stream_readable.js:275:11)
    at TLSSocket.Readable.push (_stream_readable.js:209:10)
    at TLSWrap.onStreamRead (internal/stream_base_commons.js:186:23) {
  name: 'error',
  length: 132,
  severity: 'ERROR',
  code: '22P02',
  detail: undefined,
  hint: undefined,
  position: undefined,
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: undefined,
  table: undefined,
  column: undefined,
  dataType: undefined,
  constraint: undefined,
  file: 'numutils.c',
  line: '259',
  routine: 'pg_strtoint32'
}
*/
