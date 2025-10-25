// Spotify App Configuration Checker
require('dotenv').config()

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || 'http://127.0.0.1:3000/api/spotify/callback'

console.log('🔍 Spotify App Configuration Check')
console.log('==================================')
console.log()
console.log('Current Configuration:')
console.log(`📱 Client ID: ${CLIENT_ID}`)
console.log(`🔄 Redirect URI: ${REDIRECT_URI}`)
console.log()

console.log('❗ CRITICAL STEPS to fix INVALID_CLIENT error:')
console.log()
console.log('1. 🌐 Go to: https://developer.spotify.com/dashboard')
console.log(`2. 🔍 Find your app with Client ID: ${CLIENT_ID}`)
console.log('3. ⚙️  Click on your app, then click "Settings"')
console.log('4. 📝 In the "Redirect URIs" section, ADD EXACTLY this URI:')
console.log()
console.log(`   ✅ ${REDIRECT_URI}`)
console.log()
console.log('5. 💾 Click "SAVE" (very important!)')
console.log()
console.log('⚠️  Common mistakes that cause INVALID_CLIENT:')
console.log(`   ❌ Using https instead of http`)
console.log(`   ❌ Wrong port (should be 3000, not 3001 or 8888)`)
console.log(`   ❌ Missing /api/spotify/callback`)
console.log(`   ❌ Forgetting to click "Save" after adding the URI`)
console.log(`   ❌ Using a different Client ID than what's in .env`)
console.log()

// Test the authorization URL
const authURL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=user-read-currently-playing%20user-read-playback-state&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`

console.log('🧪 Test URL (try this after updating your Spotify app):')
console.log()
console.log(authURL)
console.log()
console.log('📋 Checklist before testing:')
console.log('   □ Added redirect URI to Spotify app settings')  
console.log('   □ Clicked "Save" in Spotify dashboard')
console.log('   □ Using the correct Client ID in .env')
console.log('   □ Redirect URI matches exactly (including http://)')
console.log()
console.log('If you still get INVALID_CLIENT after these steps:')
console.log('1. Double-check your Client ID in .env matches your Spotify app')
console.log('2. Try creating a brand new Spotify app')
console.log('3. Make sure you\'re logged into the correct Spotify account')