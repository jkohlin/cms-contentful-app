import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, Key } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { isArray } from 'util'

export default async function Puffar({ puffCollection }: { puffCollection: any }) {
    const classes = `container flex flex-1 flex-col gap-4 p-4`
    //console.log('puffCollection', JSON.stringify(puffCollection))
    return (
        <div className={classes}>
            {puffCollection.map((puffSet: any, index: any) => {
                const hex = puffSet.colors.backgroundColor.hexCode[0]
                const name = puffSet.namn
                const thesePuffs = puffSet.posterCollection.items.map((puff: any, index: Key) => {
                    const showThumb = puff.linkedFrom.blockPostReferenceBlockCollection.items[0].showThumbnail
                    const title = puff.linkedFrom.blockPostReferenceBlockCollection.items[0].showTitle
                        ? puff.linkedFrom.blockPostReferenceBlockCollection.items[0].altTitle || puff.title
                        : 'nope'
                    const richContent = documentToReactComponents(puff.content.json)
                    const obj = {
                        showThumb,
                        title: title,
                        slug: puff.slug,
                        url: puff.coverImage.url,
                        bg: showThumb ? { backgroundImage: `url(${puff.coverImage.url})` } : { backgroundColor: hex },
                        body: puff.linkedFrom.blockPostReferenceBlockCollection.items[0].showLead ? puff.content.json.content[0].content[0].value : null,
                        button: puff.linkedFrom.blockPostReferenceBlockCollection.items[0].buttonText ?? null,
                        richContent
                    }
                    if (Array.isArray(richContent)) {
                        obj.body = richContent[0].props.children
                    }
                    return obj
                })
                return (
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3" key={index} title={name}>
                        {thesePuffs.map((puff: any, index: Key | null | undefined) => (
                            <div key={index} className="max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                                <div className="px-4 py-2">
                                    <h1 className="text-xl font-bold text-gray-800 uppercase dark:text-white">{puff.title ?? ''}</h1>
                                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-400 min-h-[1rem]">{puff.body ?? ''}</div>
                                </div>
                                <img className="object-cover w-full h-48 mt-2" src={puff.url} alt="NIKE AIR" />
                                <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
                                    {puff.button ? <a href={'/posts/' + puff.slug} className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">{puff.button}</a> : null}
                                </div>
                            </div>))}
                    </div>
                )
            })}
        </div>
    )
}
