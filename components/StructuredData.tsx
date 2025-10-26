import { Blog, Authors } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'

interface BlogStructuredDataProps {
  post: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
}

export function BlogStructuredData({ post, authorDetails }: BlogStructuredDataProps) {
  const author = authorDetails.length > 0 ? authorDetails[0] : null

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    image: post.images?.[0]
      ? `${siteMetadata.siteUrl}${post.images[0]}`
      : `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
    datePublished: post.date,
    dateModified: post.lastmod || post.date,
    author: author
      ? {
          '@type': 'Person',
          name: author.name,
          url: `${siteMetadata.siteUrl}/about`,
          jobTitle: author.occupation,
          worksFor: {
            '@type': 'Organization',
            name: author.company || '',
          },
          sameAs: [author.linkedin, author.github, author.email && `mailto:${author.email}`].filter(
            Boolean
          ),
        }
      : {
          '@type': 'Person',
          name: siteMetadata.author,
          url: `${siteMetadata.siteUrl}/about`,
        },
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.title,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteMetadata.siteUrl}/${post.path}`,
    },
    keywords: post.tags?.join(', '),
    articleSection: post.tags?.[0] || 'Technology',
    wordCount: post.readingTime?.words || 0,
    timeRequired: post.readingTime?.text || '',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface PersonStructuredDataProps {
  author: CoreContent<Authors>
}

export function PersonStructuredData({ author }: PersonStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.occupation,
    description: `${author.occupation} with expertise in DevOps, cloud architecture, and software engineering.`,
    url: `${siteMetadata.siteUrl}/about`,
    image: author.avatar
      ? `${siteMetadata.siteUrl}${author.avatar}`
      : `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
    email: author.email && `mailto:${author.email}`,
    sameAs: [author.linkedin, author.github, author.email && `mailto:${author.email}`].filter(
      Boolean
    ),
    worksFor: {
      '@type': 'Organization',
      name: author.company || 'Ad Hoc LLC',
    },
    knowsAbout: [
      'DevOps',
      'Cloud Architecture',
      'AWS',
      'Kubernetes',
      'Terraform',
      'Software Engineering',
      'Infrastructure Automation',
    ],
    alumniOf: 'University of Nevada, Las Vegas',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function WebSiteStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    author: {
      '@type': 'Person',
      name: siteMetadata.author,
      url: `${siteMetadata.siteUrl}/about`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteMetadata.siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.title,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
