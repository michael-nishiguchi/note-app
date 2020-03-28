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

var session = require('express-session');
app.use(session({ secret: 'open sesame', resave: true, saveUninitialized: false }));
var ssn;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => console.log('Running on ' + port));
router.use(express.static(path.join(__dirname, 'public')));

//login
app.post('/login', (req, res) => {
	ssn = req.session;

	var email = req.body.email;
	var password = req.body.password;
	let hash = bcrypt.hashSync(password, 10);

	var sql = 'SELECT * FROM user_account WHERE email = $1 LIMIT 1';
	pool.query(sql, [ email ], function(err, result) {
		if (err) {
			console.error('Error running query', err);
		}
		else {
			bcrypt.compare(password, result.rows[0].password, function(err, same) {
				if (err) {
					console.error('Error comparing passwords', err);
				}
				else {
					if (same) {
						id = result.rows[0].user_account_id;
						sql = 'SELECT * FROM notes WHERE user_account_id = $1';

						pool.query(sql, [ id ], function(err, result) {
							if (err) {
								return res.status(500).send(err);
							}

							ssn.email = email;
							res.render('notes.ejs', {
								//notes: JSON.stringify(result.rows),
								email: email,
								notes: result.rows,
								test: 'this is a test'
							});
						});
					}
					else {
						res.send({ success: false });
					}
				}
			});
		}
	});
});

//logout
app.post('/logout', (req, res) => {
	// you got here, now just destroy session and send to create account page
	// also create partial for head
	if (ssn.email) {
		console.log('logged in');
	}
	else {
		console.log('not set');
	}
});
app.use('/', router);
