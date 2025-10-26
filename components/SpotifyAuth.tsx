'use client'

import { useState } from 'react'

export default function SpotifyAuth() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const handleAuth = () => {
    setIsAuthenticating(true)
    window.location.href = '/api/spotify'
  }

  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-gray-200 p-6 dark:border-gray-700">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <svg className="h-12 w-12" viewBox="0 0 168 168">
            <path
              fill="#1ED760"
              d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
            />
          </svg>
        </div>

        <h3 className="mb-2 text-lg font-semibold dark:text-white">Connect to Spotify</h3>

        <p className="mb-4 max-w-md text-gray-600 dark:text-gray-400">
          Authorize this app to access your Spotify account and show what you're currently playing.
        </p>

        <button
          onClick={handleAuth}
          disabled={isAuthenticating}
          className="inline-flex items-center rounded-lg bg-[#1ED760] px-4 py-2 font-medium text-white transition-colors hover:bg-[#1db954] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isAuthenticating ? (
            <>
              <svg
                className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Connecting...
            </>
          ) : (
            <>
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.71 14.29L14.41 15l1.29-1.29c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L13 13.59l-1.29-1.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L11.59 15l-1.29 1.29c-.39.39-.39 1.02 0 1.41.19.19.44.29.71.29s.52-.1.71-.29L13 16.41l1.29 1.29c.19.19.44.29.71.29s.52-.1.71-.29c.39-.39.39-1.02 0-1.41z" />
              </svg>
              Connect with Spotify
            </>
          )}
        </button>

        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Uses secure PKCE authentication flow
        </p>
      </div>
    </div>
  )
}
