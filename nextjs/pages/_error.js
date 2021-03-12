import Link from 'next/link'

const Error = ({ statusCode }) => {
   return (
      <div>
         <p>
            {statusCode
               ? `An error ${statusCode} occurred on server`
               : 'An error occurred on client'}
         </p>
         <p>
            Try{' '}
            <Link href='/'>
               <a>going back</a>
            </Link>
         </p>
      </div>
   )
}

Error.getInitialProps = ({ res, err }) => {
   const statusCode = res ? res.statusCode : err ? err.statusCode : 404
   return { statusCode }
}

export default Error
