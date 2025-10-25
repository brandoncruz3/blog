#!/usr/bin/env node

/**
 * Spotify OAuth Helper Script
 * 
 * This script helps you generate a refresh token for the Spotify Web API.
 * You'll need to:
 * 1. Create a Spotify app at https://developer.spotify.com/dashboard
 * 2. Add http://localhost:8888/callback to your app's redirect URIs
 * 3. Run this script and follow the instructions
 */

const http = require('http');
const { URL } = require('url');
const querystring = require('querystring');

// Load your Client ID and Secret from .env
require('dotenv').config();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3001/callback';
const PORT = 3001;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('❌ Please set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in your .env file');
  process.exit(1);
}

// Scopes needed for now playing
const SCOPES = [
  'user-read-currently-playing',
  'user-read-playback-state'
];

console.log('🎵 Spotify OAuth Helper');
console.log('======================');
console.log();
console.log('Before running this script, make sure you have:');
console.log('1. Created a Spotify app at https://developer.spotify.com/dashboard');
console.log('2. Added http://localhost:3001/callback to your app\'s redirect URIs');
console.log('3. Set your SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env');
console.log();
console.log('🔍 Current configuration:');
console.log(`   Client ID: ${CLIENT_ID ? CLIENT_ID.substring(0, 8) + '...' : 'NOT SET'}`);
console.log(`   Redirect URI: ${REDIRECT_URI}`);
console.log();
console.log('⚠️  IMPORTANT: The redirect URI in your Spotify app MUST EXACTLY match:');
console.log(`   ${REDIRECT_URI}`);
console.log();

// Step 1: Generate authorization URL
const authURL = 'https://accounts.spotify.com/authorize?' + querystring.stringify({
  response_type: 'code',
  client_id: CLIENT_ID,
  scope: SCOPES.join(' '),
  redirect_uri: REDIRECT_URI,
});

console.log('Step 1: Authorization');
console.log('Open this URL in your browser to authorize the app:');
console.log();
console.log(`\x1b[34m${authURL}\x1b[0m`);
console.log();
console.log('After authorization, you\'ll be redirected to localhost:3001/callback');
console.log('Starting local server to capture the callback...');
console.log();

// Step 2: Start local server to capture callback
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  
  if (url.pathname === '/callback') {
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');
    
    if (error) {
      console.error('❌ Authorization failed:', error);
      res.writeHead(400, { 'Content-Type': 'text/html' });
      res.end('<h1>Authorization Failed</h1><p>Error: ' + error + '</p>');
      server.close();
      return;
    }
    
    if (!code) {
      console.error('❌ No authorization code received');
      res.writeHead(400, { 'Content-Type': 'text/html' });
      res.end('<h1>Authorization Failed</h1><p>No code received</p>');
      server.close();
      return;
    }
    
    console.log('✅ Authorization code received!');
    console.log('Exchanging code for tokens...');
    
    try {
      // Step 3: Exchange code for tokens
      const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
        },
        body: querystring.stringify({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: REDIRECT_URI,
        }),
      });
      
      if (!tokenResponse.ok) {
        throw new Error(`Token request failed: ${tokenResponse.status} ${tokenResponse.statusText}`);
      }
      
      const tokenData = await tokenResponse.json();
      
      console.log('✅ Tokens received successfully!');
      console.log();
      console.log('🔑 Your refresh token:');
      console.log(`\x1b[32m${tokenData.refresh_token}\x1b[0m`);
      console.log();
      console.log('Add this to your .env file:');
      console.log(`SPOTIFY_REFRESH_TOKEN="${tokenData.refresh_token}"`);
      console.log();
      console.log('Access token (expires in 1 hour):');
      console.log(`${tokenData.access_token}`);
      
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <h1>✅ Success!</h1>
        <h2>Your refresh token:</h2>
        <p><code>${tokenData.refresh_token}</code></p>
        <h2>Next steps:</h2>
        <ol>
          <li>Copy the refresh token above</li>
          <li>Add it to your .env file: <code>SPOTIFY_REFRESH_TOKEN="${tokenData.refresh_token}"</code></li>
          <li>Restart your Next.js development server</li>
          <li>Your Spotify now playing should work!</li>
        </ol>
        <p>You can close this window.</p>
      `);
      
    } catch (error) {
      console.error('❌ Token exchange failed:', error.message);
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>Token Exchange Failed</h1><p>' + error.message + '</p>');
    }
    
    setTimeout(() => {
      server.close();
      console.log('Server stopped. You can now close this terminal.');
    }, 2000);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Waiting for authorization callback...');
});

server.on('close', () => {
  console.log('Done! Update your .env file with the refresh token above.');
});