import { generateAuthUrl } from 'lib/spotify-pkce'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const authUrl = generateAuthUrl()

    // Redirect to Spotify authorization
    return NextResponse.redirect(authUrl)
  } catch (error) {
    console.error('Error generating Spotify auth URL:', error)
    return NextResponse.json({ error: 'Failed to generate authorization URL' }, { status: 500 })
  }
}
