import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      {/* Personal Introduction Section */}
      <div className="space-y-6 pt-6 pb-8 md:space-y-8">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl leading-8 font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Hi there! 👋
          </h2>

          <div className="flex flex-col space-y-6 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-14">
            <Image
              className="mx-auto h-24 w-24 shrink-0 rounded-full sm:mx-0"
              src="/static/images/avatar.png"
              alt="Brandon Cruz Headshot"
              width={96}
              height={96}
            />

            <div className="space-y-4 text-base leading-7 text-gray-600 dark:text-gray-300">
              <p>
                My name is Brandon and I have been carving/creating/managing cloud architecture for
                the past 8+ years. I am currently a Staff DevOps Engineer at Ad Hoc LLC working on
                the{' '}
                <Link
                  href="https://www.va.gov/"
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  VA.gov Platform Infrastructure Team
                </Link>
              </p>

              <p>
                Please find me on:{' '}
                <Link
                  href="https://www.linkedin.com/in/brandonrcruz/"
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  LinkedIn
                </Link>
                ,{' '}
                <Link
                  href="https://github.com/brandoncruz3"
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  GitHub
                </Link>
              </p>

              <p>
                If you enjoyed some of the stuff I wrote, you can buy me a coffee ☕️, I'd appreciate
                it! Thanks!🙏
              </p>

              <div>
                <Link href="https://buymeacoffee.com/brandonrcrt">
                  <Image
                    src="https://images.squarespace-cdn.com/content/v1/5cf6ec742e677c000119beb3/1559871045027-2XSVXYWSZD9POBO0QOVD/buy-me-a-coffee-button.png"
                    alt="Buy me a coffee"
                    className="w-24 transition-opacity hover:opacity-80"
                    width={96}
                    height={32}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl leading-8 font-bold tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base leading-6 font-medium">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base leading-6 font-medium">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
