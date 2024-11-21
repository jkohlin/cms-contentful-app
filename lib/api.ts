const POST_GRAPHQL_FIELDS = `
  slug
  title
  coverImage {
    url
  }
  date
  author {
    name
    picture {
      url
    }
  }
  excerpt
  content {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
`
const PUFF_GRAPHQL_FIELDS = `
             namn
      colors {
        backgroundColor {
          namn
          hexCode
        }
      }
      posterCollection{
        items{
          title
          
	coverImage{url}
        }
      }`

async function fetchGraphQL(query: string, preview = false): Promise<any> {
    return fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${preview ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ query }),
        next: { tags: ['posts'] },
    }).then((response) => response.json())
}

function extractPost(fetchResponse: any): any {
    return fetchResponse?.data?.postCollection?.items?.[0]
}

function extractPostEntries(fetchResponse: any): any[] {
    return fetchResponse?.data?.postCollection?.items
}

export async function getPreviewPostBySlug(slug: string | null): Promise<any> {
    const entry = await fetchGraphQL(
        `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) 
      {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
        true,
    )
    return extractPost(entry)
}

export async function getAllPosts(isDraftMode: boolean): Promise<any[]> {
    const entries = await fetchGraphQL(
        `query {
      postCollection(where: { slug_exists: true }, order: date_DESC, preview: ${isDraftMode ? 'true' : 'false'}) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
        isDraftMode,
    )
    return extractPostEntries(entries)
}

export async function getPostAndMorePosts(slug: string, preview: boolean): Promise<any> {
    const entry = await fetchGraphQL(
        `query {
      postCollection(where: { slug: "${slug}" }, preview: ${preview ? 'true' : 'false'}, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
        preview,
    )
    const entries = await fetchGraphQL(
        `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${preview ? 'true' : 'false'}, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
        preview,
    )
    return {
        post: extractPost(entry),
        morePosts: extractPostEntries(entries),
    }
}

/* ----------------------------------------------------- */
/*     copilot: fetchEntries function                    */
/* ----------------------------------------------------- */

const fetchEntries = async (contentType: string, preview = false) => {
    const query = `
    {
      ${contentType}Collection {
        items {
          ${PUFF_GRAPHQL_FIELDS}
        }
      }
    }
  `

    const response = await fetchGraphQL(query, preview)
    return response.data[`${contentType}Collection`].items
}

// Example usage within your existing code
export async function getPosts(slug: string, preview: boolean) {
    const entries = await fetchEntries(slug, preview)

    return entries
}
