const express = require('express');
const mysql = require('mysql');

// Create express app
const app = express();

// Set up middleware to parse request body
app.use(express.urlencoded({ extended: true }));

// Create database connection
const conn = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'an@280204',
database: 'events'
});

// Connect to database
conn.connect((err) => {
if (err) throw err;
console.log('Connected to database');
});

// Handle form submission
app.post('/submit-event', (req, res) => {
// Get form data
const { eventName, eventLocation, eventDate, organizerContact, reminderTime } = req.body;

// Validate form data
if (!eventName) {
res.send('Please enter an event name.');
return;
}

if (!eventLocation) {
res.send('Please enter an event location.');
return;
}

if (!eventDate) {
res.send('Please enter an event date.');
return;
}

if (!organizerContact) {
res.send('Please enter an organizer contact.');
return;
}

// Insert data into events table
const sql = 'INSERT INTO events (name, location, date, organizer_contact, reminder_time) VALUES (?, ?, ?, ?, ?);'
conn.query(sql, [eventName, eventLocation, eventDate, organizerContact, reminderTime], (err, result) => {
if (err) throw err;
console.log('Event created');
res.send('Event created');
});
});

// Start the server
app.listen(3000, () => {
console.log('Server listening on port 3000');
});