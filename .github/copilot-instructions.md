# Copilot Instructions for brandoncruz.dev Blog

## Project Overview
This is a Next.js 15 blog built on the [Tailwind NextJS Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) template with custom Spotify integration. It uses App Router, Contentlayer for MDX processing, and various content management features.

## Architecture & Key Components

### Content Management
- **Contentlayer** (`contentlayer.config.ts`) processes MDX files from `data/blog/` and `data/authors/`
- Blog posts are in MDX format with frontmatter, support nested routing (`data/blog/nested-route/`)
- **Site configuration** is centralized in `data/siteMetadata.js` - update site title, description, social links here
- **Navigation** links defined in `data/headerNavLinks.ts`

### Spotify Integration (Custom Feature)
- **API Routes**: `/api/now-playing`, `/api/spotify`, `/api/spotify/callback`
- **Components**: `NowPlaying.tsx` with `MusicEqualizer.tsx` animation
- **Authentication**: Uses PKCE flow (`lib/spotify-pkce.ts`) and refresh tokens (`lib/spotify.ts`)
- **Setup utilities**: Multiple debug/setup scripts (`generate-spotify-token.js`, `debug-spotify.js`, `check-spotify-config.js`)
- **Required env vars**: `SPOTIFY_CLIENT_ID`, `SPOTIFY_REFRESH_TOKEN`, `NEXT_PUBLIC_SPOTIFY_REDIRECT_URI`

### Layout System
- **App layout** (`app/layout.tsx`) - global providers, metadata, analytics
- **Post layouts** in `layouts/` directory - `PostLayout.tsx` for blog posts, `ListLayout.tsx` for post lists
- **Components** are modular in `components/` - most are server components unless marked with `'use client'`

## Development Workflows

### Content Creation
```bash
# Blog posts go in data/blog/ as .mdx files
# Images in public/static/images/
# Run dev server to see changes
npm run dev
```

### Build & Deploy
```bash
npm run build     # Builds with Contentlayer processing + postbuild script
npm run analyze   # Bundle analysis with ANALYZE=true
npm run serve     # Production server
```

### Spotify Setup (if needed)
1. Run `node generate-spotify-token.js` to get refresh token
2. Add to `.env.local`: `SPOTIFY_CLIENT_ID`, `SPOTIFY_REFRESH_TOKEN`  
3. Test with `node debug-spotify.js`

## Key Conventions

### File Organization
- **API routes**: `app/api/[feature]/route.ts` using App Router conventions
- **Components**: Use TypeScript interfaces, most are server components
- **Styling**: TailwindCSS with custom config, CSS modules in `css/`
- **Static assets**: All in `public/static/` (images, favicons, etc.)

### Code Patterns
- **Data fetching**: SWR for client-side (`components/NowPlaying.tsx`), server components for static
- **Environment**: Use `.env.local` for secrets, `.env` for public vars
- **TypeScript**: Strict types from Contentlayer generated types (`contentlayer/generated`)

### Content Structure
- **Frontmatter**: Required fields include `title`, `date`, `summary`, optional `tags[]`
- **Images**: Use `<Image>` component from `components/Image.tsx`, not Next.js Image directly
- **Links**: Use `<Link>` or `<CustomLink>` components for internal/external links

## Integration Points
- **Analytics**: Configured via `siteMetadata.analytics` (supports multiple providers)
- **Comments**: Giscus integration in `components/Comments.tsx`
- **Search**: Algolia integration via `pliny/search`
- **RSS**: Auto-generated via `scripts/rss.mjs` in postbuild
- **Security**: CSP headers configured in `next.config.js`

## Common Tasks
- **New blog post**: Create `.mdx` in `data/blog/` with proper frontmatter
- **Update site info**: Modify `data/siteMetadata.js`
- **Add nav link**: Update `data/headerNavLinks.ts`
- **Spotify issues**: Check env vars with debug scripts, verify refresh token validity
- **Styling changes**: Update `css/tailwind.css` or component-level classes