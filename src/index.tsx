import express from 'express'
import fetch from 'node-fetch'
import { createOGImage } from './og-image.js'

// @ts-ignore
global.fetch = fetch

const app = express()

app.get('/', async (req, res) => {
  const {
    text: queryText,
    avatar: queryAvatar,
    type: queryType,
    description: queryDescription,
    backgroundImage: queryBackgroundImage,
  } = req.query
  const text = queryText ? String(queryText) : 'Hello World!'
  const avatar = queryAvatar
    ? String(queryAvatar)
    : 'https://avatars1.githubusercontent.com/u/578259?s=460&v=4'
  const type = queryType ? String(queryType) : 'svg'
  const description = queryDescription ? String(queryDescription) : undefined
  const backgroundImage = queryBackgroundImage
    ? String(queryBackgroundImage)
    : undefined

  const resp = await createOGImage({
    title: text,
    avatar,
    type: type as 'png' | 'svg',
    description,
    backgroundImage,
  })

  if (type === 'svg') {
    res.setHeader('Content-Type', 'image/svg+xml')
  } else {
    res.setHeader('Content-Type', 'image/png')
  }

  res.send(resp)
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
