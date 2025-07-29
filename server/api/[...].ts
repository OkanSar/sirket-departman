import { defineEventHandler, proxyRequest } from 'h3'
import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const url = event.req?.url ?? ''
  const target = joinURL(config.public.apiBase, url)
  return proxyRequest(event, target)
})
