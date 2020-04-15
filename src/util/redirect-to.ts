import Router from 'next/router'
import { ServerResponse } from 'http'

interface RedirectOpts {
  res?: ServerResponse
  query?: string
  status?: number
}

export const redirectTo = (
  destination: string | Location,
  { res, query, status = 302 }: RedirectOpts = {}
) => {
  if (query) {
    destination = `${destination}?${query}`
  }

  if (Router.pathname === destination) {
    return
  }

  if (res) {
    res.writeHead(status, { Location: destination as string })
    res.end()
  } else {
    if (destination[0] === '/' && destination[1] !== '/') {
      Router.push(destination)
    } else {
      window.location = destination as Location
    }
  }
}
