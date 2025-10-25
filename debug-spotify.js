// Debug script to test Spotify API credentials
const https = require('https');
const querystring = require('querystring');

// Load environment variables
require('dotenv').config();

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

console.log('Environment variables:');
console.log('SPOTIFY_CLIENT_ID:', client_id ? `${client_id.substring(0, 8)}...` : 'NOT SET');
console.log('SPOTIFY_CLIENT_SECRET:', client_secret ? `${client_secret.substring(0, 8)}...` : 'NOT SET');
console.log('SPOTIFY_REFRESH_TOKEN:', refresh_token ? `${refresh_token.substring(0, 8)}...` : 'NOT SET');

if (!client_id || !client_secret || !refresh_token) {
  console.error('❌ Missing required environment variables!');
  console.log('\nTo fix this:');
  console.log('1. Update your .env file with real Spotify API credentials');
  console.log('2. Visit https://developer.spotify.com/dashboard to create an app');
  console.log('3. Generate a refresh token using OAuth flow');
  process.exit(1);
}

async function testSpotifyAPI() {
  try {
    console.log('\n🔄 Testing token refresh...');
    
    // Test token refresh
    const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
      }),
    });

    if (!tokenResponse.ok) {
      console.error('❌ Token refresh failed:', tokenResponse.status, tokenResponse.statusText);
      const errorText = await tokenResponse.text();
      console.error('Response:', errorText);
      return;
    }

    const tokenData = await tokenResponse.json();
    console.log('✅ Token refresh successful!');
    
    // Test now playing endpoint
    console.log('\n🎵 Testing now playing...');
    const nowPlayingResponse = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    });

    if (nowPlayingResponse.status === 204) {
      console.log('ℹ️ No music currently playing');
    } else if (nowPlayingResponse.status === 200) {
      const nowPlayingData = await nowPlayingResponse.json();
      console.log('✅ Currently playing:', nowPlayingData.item?.name || 'Unknown track');
      console.log('   Artist:', nowPlayingData.item?.artists?.[0]?.name || 'Unknown artist');
      console.log('   Is playing:', nowPlayingData.is_playing);
    } else {
      console.error('❌ Now playing request failed:', nowPlayingResponse.status, nowPlayingResponse.statusText);
      const errorText = await nowPlayingResponse.text();
      console.error('Response:', errorText);
    }
    
  } catch (error) {
    console.error('❌ Error testing Spotify API:', error.message);
  }
}

testSpotifyAPI();