import express from 'express'

import loaders from '~/loaders'
import env from '~/configs/env'

const startServer = async () => {
  const app = express()
  const port = env.port

  await loaders({ app })

  app.listen(port, () => {
    console.log(`Server: http://localhost:${port}`)
  })
}

startServer()
