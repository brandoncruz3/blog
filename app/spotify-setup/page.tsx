import SpotifyAuth from 'components/SpotifyAuth'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Spotify Setup - PKCE Authentication',
  description: 'Set up Spotify integration using modern PKCE authentication flow',
}

export default function SpotifySetupPage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Spotify Setup
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Configure Spotify integration using the modern PKCE authentication flow
        </p>
      </div>
      
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          <div className="prose dark:prose-dark max-w-none">
            <h2>Setup Instructions</h2>
            
            <h3>1. Update your Spotify App settings</h3>
            <p>
              In your <a href="https://developer.spotify.com/dashboard" target="_blank" rel="noopener noreferrer">
              Spotify Developer Dashboard</a>, add this redirect URI to your app:
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm">
              http://127.0.0.1:3000/api/spotify/callback
            </div>
            
            <h3>2. Update your .env file</h3>
            <p>Make sure your <code>.env</code> file has your real Spotify Client ID:</p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm">
              SPOTIFY_CLIENT_ID="your_real_client_id_here"<br/>
              SPOTIFY_REFRESH_TOKEN=""
            </div>
            
            <h3>3. Authenticate with Spotify</h3>
            <p>
              Click the button below to start the PKCE authentication flow. 
              After successful authentication, you'll get a refresh token to add to your .env file.
            </p>
            
            <div className="my-8">
              <SpotifyAuth />
            </div>
            
            <h3>Benefits of PKCE Flow</h3>
            <ul>
              <li><strong>More Secure:</strong> No client secret needed on the client side</li>
              <li><strong>Modern Standard:</strong> Recommended by OAuth 2.1 specification</li>
              <li><strong>Better UX:</strong> Streamlined authentication process</li>
              <li><strong>Mobile Friendly:</strong> Works well with mobile apps and SPAs</li>
            </ul>
            
            <h3>What happens after authentication?</h3>
            <ol>
              <li>You'll be redirected to Spotify to authorize the app</li>
              <li>Spotify redirects back with an authorization code</li>
              <li>The app exchanges the code for tokens using PKCE</li>
              <li>You'll see a page with your refresh token</li>
              <li>Copy the refresh token to your .env file</li>
              <li>Restart your dev server</li>
              <li>Your Now Playing component will start working!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}