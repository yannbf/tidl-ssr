import React from 'react'
import { HttpStatusCode } from '../interfaces/status-codes'
import NotFound from './404'

type Prop = {
  statusCode: HttpStatusCode
}

const Error = ({ statusCode }: Prop) => {
  if(statusCode === HttpStatusCode.NotFound) return <NotFound/>

  const msg = statusCode
    ? `An error ${statusCode} occurred on server`
    : 'An error occurred on client'
  return (
    <>
      <h1>Oops!</h1>
      <p>{msg}</p>
    </>
  )
}

Error.getInitialProps = ({ res, err }: { res: any; err: any }) => {
  const statusCode = (res && res.statusCode) || (err && err.statusCode)
  return { statusCode }
}

export default Error
