import { exchangeCodeForTokens } from 'lib/spotify-pkce'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    console.error('Spotify authorization error:', error)
    return NextResponse.redirect(
      new URL(`/?spotify_error=${encodeURIComponent(error)}`, request.url)
    )
  }

  if (!code) {
    console.error('No authorization code received from Spotify')
    return NextResponse.redirect(new URL('/?spotify_error=no_code', request.url))
  }

  try {
    const tokens = await exchangeCodeForTokens(code)

    console.log('✅ Spotify tokens received!')
    console.log('Access token:', tokens.access_token?.substring(0, 20) + '...')
    console.log('Refresh token:', tokens.refresh_token?.substring(0, 20) + '...')
    console.log('Expires in:', tokens.expires_in, 'seconds')

    // In a real application, you would securely store these tokens
    // For development, we'll show them to copy to .env
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Spotify Authorization Success</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              max-width: 800px;
              margin: 40px auto;
              padding: 20px;
              line-height: 1.6;
            }
            .success { color: #059669; }
            .code-block {
              background: #f3f4f6;
              border: 1px solid #d1d5db;
              border-radius: 8px;
              padding: 16px;
              font-family: 'Monaco', 'Consolas', monospace;
              font-size: 14px;
              margin: 16px 0;
              overflow-x: auto;
            }
            .warning {
              background: #fef3cd;
              border: 1px solid #fbbf24;
              border-radius: 8px;
              padding: 16px;
              margin: 16px 0;
            }
            .copy-btn {
              background: #059669;
              color: white;
              border: none;
              padding: 8px 16px;
              border-radius: 4px;
              cursor: pointer;
              margin-top: 8px;
            }
          </style>
        </head>
        <body>
          <h1 class="success">✅ Spotify Authorization Successful!</h1>
          
          <h2>Step 1: Copy your refresh token</h2>
          <p>Add this line to your <code>.env</code> file:</p>
          <div class="code-block">SPOTIFY_REFRESH_TOKEN="${tokens.refresh_token}"</div>
          <button class="copy-btn" onclick="copyToClipboard('SPOTIFY_REFRESH_TOKEN=&quot;${tokens.refresh_token}&quot;')">
            Copy to Clipboard
          </button>
          
          <h2>Step 2: Restart your development server</h2>
          <p>Stop your <code>yarn dev</code> and restart it to load the new environment variable.</p>
          
          <h2>Step 3: Test your Now Playing</h2>
          <p>
            Start playing music on Spotify and check your blog at 
            <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>
          </p>
          
          <div class="warning">
            <strong>⚠️ Security Note:</strong> In production, store tokens securely in a database 
            or secure session storage. Never commit refresh tokens to version control.
          </div>
          
          <h2>Debug Information</h2>
          <details>
            <summary>Token Details (for debugging)</summary>
            <div class="code-block">
Access Token: ${tokens.access_token?.substring(0, 50)}...<br>
Refresh Token: ${tokens.refresh_token}<br>
Expires In: ${tokens.expires_in} seconds<br>
Token Type: ${tokens.token_type}<br>
Scope: ${tokens.scope}
            </div>
          </details>
          
          <script>
            function copyToClipboard(text) {
              navigator.clipboard.writeText(text).then(() => {
                alert('Copied to clipboard!');
              }).catch(err => {
                console.error('Failed to copy: ', err);
              });
            }
          </script>
        </body>
      </html>
    `

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    })
  } catch (error) {
    console.error('Error exchanging code for tokens:', error)
    return NextResponse.redirect(
      new URL(`/?spotify_error=${encodeURIComponent('token_exchange_failed')}`, request.url)
    )
  }
}
