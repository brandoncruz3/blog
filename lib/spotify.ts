const client_id = process.env.SPOTIFY_CLIENT_ID
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

// PKCE utility functions
function base64URLEncode(str: Buffer): string {
  return str
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

function sha256(buffer: string): Buffer {
  const crypto = require('crypto')
  return crypto.createHash('sha256').update(buffer).digest()
}

function generateCodeVerifier(): string {
  const crypto = require('crypto')
  const codeVerifier = base64URLEncode(crypto.randomBytes(32))
  return codeVerifier
}

function generateCodeChallenge(verifier: string): string {
  return base64URLEncode(sha256(verifier))
}

const getAccessToken = async () => {
  if (!refresh_token) {
    throw new Error('No refresh token available. Please re-authenticate.')
  }

  const body = new URLSearchParams()
  body.append('grant_type', 'refresh_token')
  body.append('refresh_token', refresh_token)
  body.append('client_id', client_id!)

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  })

  if (!response.ok) {
    throw new Error(`Token refresh failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken()

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}
