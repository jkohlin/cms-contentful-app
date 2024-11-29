import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, Key } from 'react'

export default async function Puffar({ puffCollection }: { puffCollection: any }) {
    const classes = `container flex flex-1 flex-col gap-4 p-4`
    console.log('puffCollection', JSON.stringify(puffCollection))
    return (
        <div className={classes}>
            {puffCollection.map((puffSet: any, index: any) => {
                const hex = puffSet.colors.backgroundColor.hexCode[0]
                const name = 'Teaser | 3 posts light'

                const thesePuffs = puffSet.posterCollection.items.map((puff: any, index: Key) => ({
                    title: puff.title,
                    url: puff.coverImage.url,
                    slug: puff.slug,
                }))
                // console.log('thesePuffs', JSON.stringify(thesePuffs, null, 2))
                /* puffset:
                {
                namn: 'Teaser | 3 posts light',
                ==> posterCollection: { items: [ [Object], [Object], [Object] ] },varje objekt är ett block, men borde vara blockPostReferenceBlock
                colors: { backgroundColor: { namn: 'yellow 300', hexCode: [Array] } }
                }
                */
                return (
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3" key={index}>
                        {thesePuffs.map((puff: { url: any; title: string | null | undefined; slug: string }, index: Key | null | undefined) => (
                            <div
                                key={index}
                                className="aspect-video rounded-xl bg-muted/50 border bg-cover bg-top text-slate-50 p-8"
                                style={{ backgroundImage: `url(${puff.url})` }}
                            >
                                <a href={'/posts/' + puff.slug}>
                                    <div style={{ mixBlendMode: 'difference' }}>{puff.title}</div>
                                </a>
                            </div>
                        ))}
                    </div>
                )
            })}
        </div>
    )
}
