import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "leaflet/dist/leaflet.css";
import "./leafletConfig";


// Create Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql', // Your backend GraphQL API endpoint
  cache: new InMemoryCache(),
});

// Render the App with ApolloProvider
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// Optional: For performance monitoring
reportWebVitals();
 