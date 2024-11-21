export default async function Puffar({ puffs }: { puffs: any }) {
    let bgcolor = 'bg-gray-50'
    let url =
        'https://images.unsplash.com/photo-1731466450638-959a6f0d1514?q=80&w=1750&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    // if (puffs && puffs.url && puffs.url.startsWith('http')) {
    //     url = puffs.url
    bgcolor = `bg-[${puffs.hex}]`
    // }
    let bg = `bg-[url('${url}')]`
    const classes = `container flex flex-1 flex-col gap-4 p-4 ${bgcolor} ${bg}]`
    return (
        <div className={classes}>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3 ">
                {/* 
                {
                hex: '#ffa62b',
                title: 'Bild på hjärta med rosa',
                url: 'https://images.ctfassets.net/cjzzvbfyk0dt/2QaTjcXrfyUBbpejyBtGMl/be8e08465b8f2b6dd0b282ccf4c30f5f/sweetheart-1.jpeg'
                }                
                {puffs.map((puff, index) => (
                    <div
                        key={index}
                        className="aspect-video rounded-xl bg-muted/50 border bg-cover bg-top text-slate-50 p-8"
                        style={{ backgroundImage: `url(${puff.coverImage.url})` }}
                    >
                        <div style={{ mixBlendMode: 'difference' }}>{puff.title}</div>
                    </div>
                ))} */}
            </div>
        </div>
    )
}
