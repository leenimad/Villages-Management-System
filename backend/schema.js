// const { buildSchema } = require('graphql');
// const fs = require('fs');
// const bcrypt = require('bcrypt');

// const usersFile = './data/users.json';

// const schema = buildSchema(`
//   type User {
//     id: ID!
//     username: String!
//     password: String!
//     role: String!
//     profilePhoto: String! # Add profilePhoto field
//   }

//   type AuthData {
//     token: String!
//     role: String!
//     profilePhoto: String! # Add profilePhoto field
//   }

//   input UserInput {
//     username: String!
//     password: String!
//     role: String!
//     profilePhoto: String! # Add profilePhoto field
//   }
//   type Village {
//     id: ID!
//     name: String!
//     region: String!
//     landArea: Float
//     latitude: Float
//     longitude: Float
//     tags: [String]
//     image: String

//     # New demographic fields:
//     populationSize: Int
//     ageDistribution: String
//     genderRatios: String
//     growthRate: String
//   }

//   input VillageInput {
//     name: String!
//     region: String!
//     landArea: Float
//     latitude: Float
//     longitude: Float
//     tags: [String]
//     image: String

//     # Optional demographic fields in the same input:
//     populationSize: Int
//     ageDistribution: String
//     genderRatios: String
//     growthRate: String
//   }

//   type Query {
//     login(username: String!, password: String!): AuthData
//     getVillages: [Village!]!
//   }

//   type Mutation {
//     signup(userInput: UserInput): User
//     addVillage(input: VillageInput!): Village!
//     updateVillage(id: ID!, input: VillageInput!): Village!
//     deleteVillage(id: ID!): Boolean!
//   }
// `);

// // Password validation function
// const validatePassword = (password) => {
//   const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
//   if (!regex.test(password)) {
//     throw new Error('Password must be at least 8 characters long, contain one uppercase letter and one number.');
//   }
// };

// const villagesFile = './data/villages.json';

// if (!fs.existsSync(villagesFile)) {
//   fs.writeFileSync(villagesFile, '[]');
// }

// const root = {
//   login: async ({ username, password }) => {
//     const users = JSON.parse(fs.readFileSync(usersFile));
//     const user = users.find((u) => u.username === username);
  
//     // Check if the user exists
//     if (!user) {
//       // Replace "User does not exist" with the generic message
//       throw new Error("Username or password is incorrect.");
//     }
  
//     // Compare hashed password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {   
//       // Replace "Incorrect password" with the generic message
//       throw new Error("Username or password is incorrect.");
//     } 
  
//     // Return token and role if login is successful
//     return { token: `${user.id}-token`, role: user.role, profilePhoto: user.profilePhoto  };
//   },   
 
//   signup: async ({ userInput }) => {
//     const users = JSON.parse(fs.readFileSync(usersFile));

//     // Validate username
//     if (!userInput.username || userInput.username.trim().length === 0) {
//       throw new Error('Username cannot be empty.');
//     }

//     // Check for duplicate username
//     const existingUser = users.find((u) => u.username === userInput.username);
//     if (existingUser) {
//       throw new Error('User already exists.');
//     }

//     // Validate password strength
//     validatePassword(userInput.password);

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(userInput.password, 10);

//     // Add new user with hashed password
//     const newUser = {
//       id: users.length + 1,
//       username: userInput.username,
//       password: hashedPassword,
//       role: userInput.role,
//       profilePhoto: userInput.profilePhoto, // Store the profile photo
//     };

//     users.push(newUser);
//     fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

//     return newUser;
//   }, 

//   getVillages: () => {
//     const data = fs.readFileSync(villagesFile, 'utf8'); // villagesFile points to ./data/villages.json
//     return JSON.parse(data); // must return the entire object with new fields
//   },

//   addVillage: ({ input }) => {
//     try {
//       console.log("Received input:", input);  // Add log
//       const villages = JSON.parse(fs.readFileSync(villagesFile, 'utf8'));
//       const newVillage = { id: villages.length + 1, ...input };
//       villages.push(newVillage);
//       fs.writeFileSync(villagesFile, JSON.stringify(villages, null, 2));
//       console.log("Updated villages:", villages); // Add log
//       return newVillage;
//     } catch (error) {
//       console.error("Error in addVillage:", error); // Catch any error
//       throw new Error("Failed to add village");
//     }
//   },
    

//   updateVillage: ({ id, input }) => {
//     const villages = JSON.parse(fs.readFileSync(villagesFile));
//     const index = villages.findIndex((v) => v.id == id);
//     if (index === -1) throw new Error("Village not found");
//     villages[index] = { ...villages[index], ...input };
//     fs.writeFileSync(villagesFile, JSON.stringify(villages, null, 2));
//     return villages[index];
//   },

//   deleteVillage: ({ id }) => {
//     const villages = JSON.parse(fs.readFileSync(villagesFile));
//     const index = villages.findIndex((v) => v.id == id);
//     if (index === -1) return false;
//     villages.splice(index, 1);
//     fs.writeFileSync(villagesFile, JSON.stringify(villages, null, 2));
//     return true;
//   },

// };

// module.exports = { schema, root };
/////////////////////////////////// 
const { buildSchema } = require('graphql');
const fs = require('fs');
const bcrypt = require('bcrypt');

const usersFile = './data/users.json';
const villagesFile = './data/villages.json';
const galleryFile = './data/gallery.json';
const messagesFile = './data/messages.json';

if (!fs.existsSync(galleryFile)) {
  fs.writeFileSync(galleryFile, '[]');
}

const schema = buildSchema(`
  type User {
    id: ID!
    username: String!
    password: String!
    role: String!
    profilePhoto: String!
  }

  type AuthData {
    token: String!
    role: String!
    profilePhoto: String!
  }

  input UserInput {
    username: String!
    password: String!
    role: String!
    profilePhoto: String!
  }

  type Village {
    id: ID!
    name: String!
    region: String!
    landArea: Float
    latitude: Float
    longitude: Float
    tags: [String]
    image: String
    populationSize: Int
    ageDistribution: String
    genderRatios: String
    growthRate: String
  }

  input VillageInput {
    name: String!
    region: String!
    landArea: Float
    latitude: Float
    longitude: Float
    tags: [String]
    image: String
    populationSize: Int
    ageDistribution: String
    genderRatios: String
    growthRate: String
  }

  type Image {
    id: ID!
    url: String!
    description: String!
  }
type Message {
    sender: String!
    recipient: String!
    text: String!
    timestamp: String!
  }
  type Query {
    login(username: String!, password: String!): AuthData
    getVillages: [Village!]!
    getImages: [Image!]!

  getActiveAdmins: [User!]
    getAllUsers: [User!]
     getMessages(sender: String!, recipient: String!): [Message!]

  }

  type Mutation {
    signup(userInput: UserInput): User
    addVillage(input: VillageInput!): Village!
    updateVillage(id: ID!, input: VillageInput!): Village!
    deleteVillage(id: ID!): Boolean!
    addImage(url: String!, description: String!): Image!
    deleteImage(id: ID!): Boolean!
     toggleAdminActiveStatus(username: String!, isActive: Boolean!): User
       sendMessage(from: String!, to: String!, text: String!): Message
  logout(username: String!): Boolean!
       }
`);

const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!regex.test(password)) {
    throw new Error('Password must be at least 8 characters long, contain one uppercase letter and one number.');
  }
};

const root = {
  // login: async ({ username, password }) => {
  //   const users = JSON.parse(fs.readFileSync(usersFile));
  //   const user = users.find((u) => u.username === username);
  //   if (!user) throw new Error('Username or password is incorrect.');
  //   const isPasswordValid = await bcrypt.compare(password, user.password);
  //   if (!isPasswordValid) throw new Error('Username or password is incorrect.');
  //   return { token: `${user.id}-token`, role: user.role, profilePhoto: user.profilePhoto };
  // },
  login: async ({ username, password }) => {
    const users = JSON.parse(fs.readFileSync(usersFile));
    const user = users.find((u) => u.username === username);
    if (!user) throw new Error('Username or password is incorrect.');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Username or password is incorrect.');

    // Update isActive to true
    user.isActive = true;
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    return { token: `${user.id}-token`, role: user.role, profilePhoto: user.profilePhoto };
},

  signup: async ({ userInput }) => {
    const users = JSON.parse(fs.readFileSync(usersFile));
    if (users.some((u) => u.username === userInput.username)) throw new Error('User already exists.');
    validatePassword(userInput.password);
    const hashedPassword = await bcrypt.hash(userInput.password, 10);
    const newUser = { id: users.length + 1, ...userInput, password: hashedPassword };
    users.push(newUser);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    return newUser;
  },
  logout: ({ username }) => {
    const users = JSON.parse(fs.readFileSync(usersFile));
    const user = users.find((u) => u.username === username);

    if (!user) throw new Error("User not found.");

    // Update isActive to false
    user.isActive = false;
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    return true; // Return true if the operation succeeded
  },
  ////////////////////////////is active////////////////
  toggleAdminActiveStatus: ({ username, isActive }) => {
    const users = JSON.parse(fs.readFileSync(usersFile));
    const user = users.find((u) => u.username === username && u.role === "Admin");
    if (!user) throw new Error("Admin not found");
    user.isActive = isActive;
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    return user;
  },
  getActiveAdmins: () => {
    const users = JSON.parse(fs.readFileSync(usersFile));
    return users.filter((u) => u.role === "Admin" && u.isActive);
  },
  getAllUsers: () => {
    const users = JSON.parse(fs.readFileSync(usersFile));
    return users.filter((u) => u.role === "user");
  },
  //////////// messages //////////////////////////////////
  sendMessage: ({ from, to, text }) => {
    const messagesFile = './data/messages.json';
  
    // Create a new message
    const newMessage = {
      sender: from,
      recipient: to,
      text,
      timestamp: new Date().toISOString(),
    };
  
    // Save the message to messages.json
    const messages = JSON.parse(fs.readFileSync(messagesFile, 'utf8'));
    messages.push(newMessage);
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
  
    console.log('Message saved:', newMessage); // Debug log
  
    // Simulate sending the message via WebSocket if recipient is connected
    const recipientWs = clients[to];
    if (recipientWs) {
      recipientWs.send(JSON.stringify(newMessage));
      console.log(`Message forwarded to ${to}`);
    }
  
    return newMessage;
  },
  
  ////////////////////////////

  getMessages: ({ sender, recipient }) => {
    const messages = JSON.parse(fs.readFileSync(messagesFile, 'utf8'));
    return messages.filter(
      (msg) =>
        (msg.sender === sender && msg.recipient === recipient) ||
        (msg.sender === recipient && msg.recipient === sender)
    );
  },
  //////////////////////////is active////////////////
  getVillages: () => JSON.parse(fs.readFileSync(villagesFile)),

  addVillage: ({ input }) => {
    const villages = JSON.parse(fs.readFileSync(villagesFile));
    const newVillage = { id: villages.length + 1, ...input };
    villages.push(newVillage);
    fs.writeFileSync(villagesFile, JSON.stringify(villages, null, 2));
    return newVillage;
  },

  updateVillage: ({ id, input }) => {
    const villages = JSON.parse(fs.readFileSync(villagesFile));
    const index = villages.findIndex((v) => v.id == id);
    if (index === -1) throw new Error('Village not found');
    villages[index] = { ...villages[index], ...input };
    fs.writeFileSync(villagesFile, JSON.stringify(villages, null, 2));
    return villages[index];
  },

  deleteVillage: ({ id }) => {
    const villages = JSON.parse(fs.readFileSync(villagesFile));
    const index = villages.findIndex((v) => v.id == id);
    if (index === -1) return false;
    villages.splice(index, 1);
    fs.writeFileSync(villagesFile, JSON.stringify(villages, null, 2));
    return true;
  },

  getImages: () => JSON.parse(fs.readFileSync(galleryFile)),

  // addImage: ({ url, description }) => {
  //   const images = JSON.parse(fs.readFileSync(galleryFile));
  //   const newImage = { id: images.length + 1, url, description };
  //   images.push(newImage);
  //   fs.writeFileSync(galleryFile, JSON.stringify(images, null, 2));
  //   return newImage;
  // },
  addImage: ({ url, description }) => {
    const images = JSON.parse(fs.readFileSync(galleryFile));
    const newId = `image-${images.length + 1}`;
    const newImage = { id: newId, url, description };
    images.push(newImage);
    fs.writeFileSync(galleryFile, JSON.stringify(images, null, 2));
    return newImage;
  },  
  deleteImage: ({ id }) => {
    let images = JSON.parse(fs.readFileSync(galleryFile));
    images = images.filter((image) => image.id != id);
    fs.writeFileSync(galleryFile, JSON.stringify(images, null, 2));
    return true;
  },
};

module.exports = { schema, root };
