import { getNowPlaying } from 'lib/spotify'
import { NextResponse } from 'next/server'

export interface NowPlayingSong {
  isPlaying: boolean
  artist?: string
  songUrl?: string
  title?: string
}

export async function GET() {
  try {
    const response = await getNowPlaying()

    if (response.status === 204 || response.status > 400) {
      return NextResponse.json({ isPlaying: false })
    }

    const nowPlaying = await response.json()
    
    if (nowPlaying.currently_playing_type === 'track') {
      // song
      const isPlaying = nowPlaying.is_playing
      const title = nowPlaying.item.name
      const artist = nowPlaying.item.artists
        .map((_artist: { name: string }) => _artist.name)
        .join(', ')
      const songUrl = nowPlaying.item.external_urls.spotify

      return NextResponse.json(
        {
          artist,
          isPlaying,
          songUrl,
          title,
        },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
          },
        }
      )
    } else if (nowPlaying.currently_playing_type === 'episode') {
      // podcast
      return NextResponse.json({
        isPlaying: nowPlaying.is_playing,
        songUrl: 'https://open.spotify.com',
        title: 'Podcast',
      })
    }

    return NextResponse.json({ isPlaying: false })
  } catch (error) {
    console.error('Error fetching now playing:', error)
    return NextResponse.json({ isPlaying: false }, { status: 500 })
  }
}