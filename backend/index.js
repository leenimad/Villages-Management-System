// const express = require('express');
// const { graphqlHTTP } = require('express-graphql');
// const { schema, root } = require('./schema');
// const cors = require('cors');
// const fs = require('fs');

// // Ensure the data folder and users.json exist
// if (!fs.existsSync('./data')) {
//   fs.mkdirSync('./data');
// }
// if (!fs.existsSync('./data/users.json')) {
//   fs.writeFileSync('./data/users.json', '[]');
// }

// const app = express();
// app.use(express.json({ limit: '10mb' })); // Adjust limit as necessary
// app.use(express.urlencoded({ limit: '10mb', extended: true })); // For URL-encoded data
// // Enable CORS
// app.use(cors());

// // GraphQL endpoint
// app.use('/graphql', graphqlHTTP({
//   schema,
//   rootValue: root,
//   graphiql: true,
// }));

// app.listen(5000, () => {
//   console.log('Server is running on http://localhost:5000/graphql');
// });
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { schema, root } = require('./schema');
const cors = require('cors');
const fs = require('fs');
const WebSocket = require('ws');

// Ensure required files exist
if (!fs.existsSync('./data')) {
  fs.mkdirSync('./data');
}
if (!fs.existsSync('./data/users.json')) {
  fs.writeFileSync('./data/users.json', '[]');
}
if (!fs.existsSync('./data/messages.json')) {
  fs.writeFileSync('./data/messages.json', '[]');
}

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

// Start HTTP server
const server = app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000/graphql');
});

// WebSocket Server
const wss = new WebSocket.Server({ server });
const clients = {}; // Map of active WebSocket connections
const messagesFile = './data/messages.json';

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');

  // Handle incoming WebSocket messages
  // ws.on('message', (message) => {
  //   try {
  //     const parsed = JSON.parse(message);

  //     if (parsed.type === 'init') {
  //       // Register client with their username
  //       clients[parsed.username] = ws;
  //       console.log(`${parsed.username} connected`);
  //     }

  //     if (parsed.type === 'message') {
  //       // Create a message object with a timestamp
  //       const newMessage = {
  //         sender: parsed.from,
  //         recipient: parsed.to,
  //         text: parsed.text,
  //         timestamp: new Date().toISOString(),
  //       };

  //       // Save message to JSON file
  //       const messages = JSON.parse(fs.readFileSync(messagesFile, 'utf8'));
  //       messages.push(newMessage);
  //       fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));

  //       // Forward the message to the recipient if they are online
  //       const recipientWs = clients[parsed.to];
  //       if (recipientWs) {
  //         recipientWs.send(JSON.stringify(newMessage));
  //       } else {
  //         console.log(`Recipient ${parsed.to} not connected`);
  //       }
  //     }
  //   } catch (err) {
  //     console.error('Error processing WebSocket message:', err);
  //   }
  // });
  ws.on('message', (message) => {
    try {
      const parsed = JSON.parse(message);
  
      if (parsed.type === 'init') {
        // Register client with their username
        clients[parsed.username] = ws;
        console.log(`${parsed.username} connected`);
      }
  
      if (parsed.type === 'message') {
        // Create a message object with a timestamp
        const newMessage = {
          sender: parsed.from,
          recipient: parsed.to,
          text: parsed.text,
          timestamp: new Date().toISOString(),
        };
  
        // Save message to JSON file
        const messages = JSON.parse(fs.readFileSync(messagesFile, 'utf8'));
        messages.push(newMessage);
        fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
  
        // Forward the message to the recipient if they are online
        const recipientWs = clients[parsed.to];
        if (recipientWs) {
          recipientWs.send(JSON.stringify(newMessage));
          console.log(`Message sent to ${parsed.to}`);
        } else {
          console.log(`Recipient ${parsed.to} not connected`);
        }
      }
    } catch (err) {
      console.error('Error processing WebSocket message:', err);
    }
  });
  
  // Handle client disconnection
  ws.on('close', () => {
    for (const [username, socket] of Object.entries(clients)) {
      if (socket === ws) {
        delete clients[username];
        console.log(`${username} disconnected`);
        break;
      }
    }
  });
});

console.log('WebSocket server is running on ws://localhost:5000');
