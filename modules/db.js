// setup connection -------------------------
const pg = require('pg');
const dbURI = "postgres://dbfqfnhcvdqbuq:55942c634dea7b3d59779cc6fc124888704842e7a52c79d2f6715c74a344b67f@ec2-54-155-35-88.eu-west-1.compute.amazonaws.com:5432/d32vkrth7pd363";
const connstring  = process.env.DATABASE_URL || dbURI;
const pool = new pg.Pool({
    connectionString: connstring,
    ssl: { rejectUnauthorized: false }
 });

// database methods -------------------------
let dbMethods = {};

// ----------- BLOGPOSTS -------------------------
dbMethods.getAllBlogPosts = function() {
    let sql = "SELECT * FROM blogposts";	
	return pool.query(sql);	
}

dbMethods.createBlogPost = function(heading, blogtext, userid) {  
    let sql = "INSERT INTO blogposts (id, date, heading, blogtext, userid) VALUES(DEFAULT, DEFAULT, $1, $2, $3) returning *";
	let values = [heading, blogtext, userid];	
    return pool.query(sql, values); 
}

dbMethods.deleteBlogPost = function(id, userid) {  
    let sql = "DELETE FROM blogposts WHERE id = $1 AND userid = $2 RETURNING *";
	let values = [id, userid];	
    return pool.query(sql, values); 
}

// --------------- USERS ---------------------
dbMethods.getAllUsers = function() {
    let sql = "SELECT id, username FROM users";	
	return pool.query(sql); 	
}

dbMethods.getUser = function(username) {
    let sql = "SELECT * FROM users WHERE username = $1";
    let values = [username];	
	return pool.query(sql, values);	
}

dbMethods.createUser = function(username, password, salt) {  
    let sql = "INSERT INTO users (id, username, password, salt) VALUES(DEFAULT, $1, $2, $3) returning *";
	let values = [username, password, salt];	
    return pool.query(sql, values); 
}

dbMethods.deleteUser = function(id) {  
    let sql = "DELETE FROM users WHERE id = $1 RETURNING *";
	let values = [id];	
    return pool.query(sql, values); 
}

// -------- EXPORTS -----------------
module.exports = dbMethods;

