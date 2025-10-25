// Quick test to validate Spotify app configuration
require('dotenv').config();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:3001/callback';

console.log('🔍 Spotify App Validation');
console.log('========================');
console.log(`Client ID: ${CLIENT_ID}`);
console.log(`Redirect URI: ${REDIRECT_URI}`);
console.log();

// Test if this is a real Spotify Client ID by checking the format
if (!CLIENT_ID || CLIENT_ID.length !== 32) {
  console.log('❌ Invalid Client ID format. Spotify Client IDs should be 32 characters long.');
  console.log('   Your Client ID length:', CLIENT_ID ? CLIENT_ID.length : 'undefined');
  console.log();
  console.log('This looks like a placeholder/example Client ID.');
  console.log('Please get your real Client ID from: https://developer.spotify.com/dashboard');
} else {
  console.log('✅ Client ID format looks correct (32 characters)');
}

console.log();
console.log('📋 To fix the INVALID_CLIENT error:');
console.log();
console.log('1. Go to https://developer.spotify.com/dashboard');
console.log('2. Click on your app (or create a new one)');
console.log('3. Click "Settings"');
console.log('4. In "Redirect URIs", add EXACTLY this URL:');
console.log(`   ${REDIRECT_URI}`);
console.log('5. Click "Save"');
console.log('6. Copy your real Client ID and Client Secret');
console.log('7. Update your .env file with the real values');
console.log();
console.log('⚠️  Common mistakes:');
console.log('   - Using https instead of http');
console.log('   - Wrong port number (should be 3001)');
console.log('   - Missing /callback at the end');
console.log('   - Using example/placeholder credentials');
console.log();

// Create the authorization URL
const authURL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=user-read-currently-playing%20user-read-playback-state&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

console.log('🔗 Test this authorization URL:');
console.log(authURL);
console.log();
console.log('If you get "INVALID_CLIENT" when clicking this URL, then:');
console.log('- Your Client ID is wrong, OR');
console.log('- The redirect URI is not properly configured in your Spotify app');