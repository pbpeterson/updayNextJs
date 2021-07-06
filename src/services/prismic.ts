import Prismic from '@prismicio/client'

export function getPrismicClient(req ?: unknown){
  return Prismic.client('https://updaynext.cdn.prismic.io/api/v2',{
    accessToken: process.env.PRISMIC_ACESS_TOKEN,
    req,
  })
}
