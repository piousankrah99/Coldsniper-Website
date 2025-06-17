const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const helmet = require('helmet');
const csp = require('helmet-csp');
const fetch = require('node-fetch');
const mailgun = require('mailgun-js');
const apiKey = process.env.MAILGUN_API_KEY; // Use your environment variable name here


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Configure CSP headers

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [
        "'self'",
        "https://static0.givemesportimages.com",
        "https://rapidapi.com"
      ],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://code.jquery.com",
        "https://cdn.jsdelivr.net",
        "https://code.iconify.design",
        "https://kit.fontawesome.com",
        "https://ka-f.fontawesome.com",
        "ajax.googleapis.com",
        "https://unpkg.com"
      ],
      scriptSrcAttr: [
      "'self'",
      "'unsafe-inline'",
      "https://code.jquery.com",
      "https://cdn.jsdelivr.net",
      "https://code.iconify.design",
      "https://kit.fontawesome.com",
      "https://ka-f.fontawesome.com",
      "ajax.googleapis.com",
      "https://unpkg.com"
      ],
      scriptSrcElem: [
        "'self'",
        "https://cdn.jsdelivr.net",
        "https://code.jquery.com",
        "https://cdnjs.cloudflare.com",
        "https://kit.fontawesome.com",
        "https://code.iconify.design",
        "https://unpkg.com",
        "'unsafe-inline'",
        "'nonce-<your-nonce-value>'",
      ],
      styleSrc: [
        "'self'",
        "https://cdn.jsdelivr.net",
        "https://cdnjs.cloudflare.com",
        "https://unpkg.com",
        "'unsafe-inline'",
      ],
      imgSrc: [
        "'self'",
        "data:",
        "https://mdbootstrap.com",
        "https://oneftbl-cms.imgix.net",
        "https://icdn.caughtoffside.com",
        "https://static0.givemesportimages.com",
        "https://image-service.onefootball.com",
      ],
      connectSrc: ["'self'", "https://football98.p.rapidapi.com"],
    },
  })
);



// Landing pages

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/sign_in', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sign_in.html'));
});

app.get('/sign_up', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sign_up.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/gallery', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'gallery.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/dashboard2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard2.html'));
});

app.get('/page2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'page2.html'));
});

app.get('/News', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'News.html'));
});


app.get('/failure_page', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'failure_page.html'));
});

// Dummy database
const users = [];

// Sign up route
app.post('/sign_up', async (req, res) => {
  try {
    const { username, email, password, birthdate, gender } = req.body;
    // Check if the username or email is already taken
    if (users.find((user) => user.username === username || user.email === email)) {
      return res.redirect('/failure_page');
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Store the user in the database
    users.push({ username, email, password: hashedPassword, birthdate, gender });
    res.redirect('/dashboard');
  } catch (error) {
    res.redirect('/failure_page');
  }
});

// Login route
app.post('/sign_in', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find the user in the database
    const user = users.find((user) => user.username === username);
    if (!user) {
      return res.redirect('/failure_page');
    }
    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.redirect('/failure_page');
    }
    res.redirect('/dashboard');
  } catch (error) {
    res.redirect('/failure_page');
  }
});




const Mailgun = require('mailgun-js');
const formData = require('form-data');


// Create a Mailgun client
const mailgunClient = new Mailgun({ apiKey, domain: 'sandbox9830f1468cc7457286d9095bc9e6eba6.mailgun.org' });

app.post('/send-email', (req, res) => {
  // Retrieve the email data from the request body
  const { name, email, message } = req.body;

  // Create email data
  const emailData = {
    from: 'Excited User <mailgun@sandbox-123.mailgun.org>',
    to: 'piousankrah9@gmail.com',
    subject: name,
    text: email,
    html: message
  };

  // Send email using Mailgun API
  mailgunClient.messages().send(emailData, (error, body) => {
    if (error) {
      console.log(error); // Log error
      // Handle the error response
      res.status(500).json({ error: 'An error occurred while sending the email.' });
    } else {
      console.log(body); // Log response data
      // Handle the success response
      res.json({ message: 'Email sent successfully.' });
    }
  });
});



app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
