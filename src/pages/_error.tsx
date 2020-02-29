import React from 'react'

import { HttpStatusCode } from '@tidl/types'
import PageNotFound from './404'
import { PageError } from '@tidl/components'

type Prop = {
  statusCode: HttpStatusCode
}

const Error = ({ statusCode }: Prop) => {
  if (statusCode === HttpStatusCode.NotFound) {
    return <PageNotFound />
  }

  const msg = statusCode
    ? `An error ${statusCode} occurred on server`
    : 'An error occurred on client'
  console.log(msg)

  return <PageError />
}

Error.getInitialProps = ({ res, err }: { res: any; err: any }) => {
  const statusCode = (res && res.statusCode) || (err && err.statusCode)
  return { statusCode }
}

export default Error
