// Quick test to validate if the Client ID is real
const CLIENT_ID = 'd6ba734b03ea4890a1355fa18491ea7c'

console.log('🔍 Testing if this is a real Spotify Client ID...')
console.log()

// Make a simple request to Spotify to test if this Client ID exists
fetch(`https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=user-read-currently-playing&redirect_uri=http://example.com`)
  .then(response => {
    console.log('Response status:', response.status)
    if (response.status === 200) {
      console.log('✅ Client ID appears to be valid (got 200 response)')
    } else {
      console.log('❌ Client ID may be invalid or placeholder')
      console.log('This looks like an example/template Client ID')
      console.log()
      console.log('Solution: Get your REAL Client ID from:')
      console.log('https://developer.spotify.com/dashboard')
    }
  })
  .catch(error => {
    console.log('Test failed:', error.message)
  })