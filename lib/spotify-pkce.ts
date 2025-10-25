/**
 * Spotify PKCE Authentication Helper
 * 
 * This implements the Authorization Code with PKCE flow for Spotify Web API.
 * PKCE is more secure and doesn't require storing client secrets.
 */

// Store these in memory/session (in a real app, use secure session storage)
let codeVerifier: string | null = null
let codeChallenge: string | null = null

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!
const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || 'http://127.0.0.1:3000/api/spotify/callback'

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

export function generateCodeVerifier(): string {
  const crypto = require('crypto')
  codeVerifier = base64URLEncode(crypto.randomBytes(32))
  return codeVerifier
}

export function generateCodeChallenge(verifier: string): string {
  codeChallenge = base64URLEncode(sha256(verifier))
  return codeChallenge
}

export function getAuthUrl(): string {
  const verifier = generateCodeVerifier()
  const challenge = generateCodeChallenge(verifier)
  
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: 'user-read-currently-playing user-read-playback-state',
    redirect_uri: REDIRECT_URI,
    code_challenge_method: 'S256',
    code_challenge: challenge,
  })

  return `https://accounts.spotify.com/authorize?${params.toString()}`
}

export async function exchangeCodeForTokens(code: string): Promise<any> {
  if (!codeVerifier) {
    throw new Error('No code verifier found. Please restart the authentication flow.')
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      code_verifier: codeVerifier,
    }).toString(),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Token exchange failed: ${response.status} ${error}`)
  }

  const tokens = await response.json()
  
  // Clear the code verifier after use
  codeVerifier = null
  codeChallenge = null
  
  return tokens
}