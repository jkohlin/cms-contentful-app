import Link from 'next/link'
import { draftMode } from 'next/headers'
import Puffar from '@/app/blocks/puffar'

import Date from './date'
import CoverImage from './cover-image'
import Avatar from './avatar'
//import MoreStories from './more-stories'

import { getAllPosts } from '@/lib/api'
import { getPosts } from '@/lib/api'
import { CMS_NAME, CMS_URL } from '@/lib/constants'

function Intro() {
    return (
        <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">Blog.</h1>
            <h2 className="text-center md:text-left text-lg mt-5 md:pl-8">
                A statically generated blog example using{' '}
                <a href="https://nextjs.org/" className="underline hover:text-success duration-200 transition-colors">
                    Next.js
                </a>{' '}
                and{' '}
                <a href={CMS_URL} className="underline hover:text-success duration-200 transition-colors">
                    {CMS_NAME}
                </a>
                .
            </h2>
        </section>
    )
}

function Hero({ title, coverImage, date, excerpt, author, slug }: { title: string; coverImage: any; date: string; excerpt: string; author: any; slug: string }) {
    return (
        <section>
            <div className="mb-8 md:mb-16">
                <CoverImage title={title} slug={slug} url={coverImage.url} />
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
                <div>
                    <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
                        <Link href={`/posts/${slug}`} className="hover:underline">
                            {title}
                        </Link>
                    </h3>
                    <div className="mb-4 md:mb-0 text-lg">
                        <Date dateString={date} />
                    </div>
                </div>
                <div>
                    <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
                    {author && <Avatar name={author.name} picture={author.picture} />}
                </div>
            </div>
        </section>
    )
}

export default async function Page() {
    const { isEnabled } = draftMode()
    const allPosts = await getAllPosts(isEnabled)

    const allPuffsRaw = await getPosts('lnkblobk', isEnabled)
    const allPuffs = {
        hex: allPuffsRaw[0].colors.backgroundColor.hexCode[0],
        title: allPuffsRaw[0].posterCollection.items[0].title,
        url: allPuffsRaw[0].posterCollection.items[0].coverImage.url,
    }
    const heroPost = allPosts[0]
    const morePosts = allPosts.slice(1)
    return (
        <div className="container mx-auto px-5">
            <Intro />
            {heroPost && (
                // Skapa ett bero-nlock i contentfull och hämta in det här.
                <h1>hero här</h1>
                //<Hero title={heroPost.title} coverImage={heroPost.coverImage} date={heroPost.date} author={heroPost.author} slug={heroPost.slug} excerpt={heroPost.excerpt} />
            )}
            {
                // lägg in block med "senaste inlägg" här (Teaser | 3 posts light)
                <>
                    <h2>puffar</h2>
                    <Puffar puffs={allPuffs} />
                    <h2>slut puffar</h2>
                </>
                /* <MoreStories morePosts={morePosts} /> */
            }
        </div>
    )
}
