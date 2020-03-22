CREATE TABLE user_account(
    user_account_id SERIAL UNIQUE NOT NULL PRIMARY KEY,
    email varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL
);

CREATE TABLE note(
    note_id SERIAL UNIQUE NOT NULL PRIMARY KEY,
    title varchar(255) NOT NULL,
    content text NOT NULL,
    date_created TIMESTAMP NOT NULL,
    user_account_id INT REFERENCES user_account (user_account_id)
);

INSERT INTO user_account (email, password) VALUES('email@gmail.com', 'myPass');

INSERT INTO note (title, content) VALUES('mike sr', 'nish', '1940-12-25');

INSERT INTO parent_child(parent_id, child_id) VALUES(1, 2);
