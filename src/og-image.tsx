import React from 'react'
import satori from 'satori'
import { promises as fs } from 'fs'
import { Resvg } from '@resvg/resvg-js'

const fontFile = './fonts/Oxygen-Regular.ttf'
const font = fs.readFile('./fonts/Oxygen-Regular.ttf')

export const createOGImage = async ({
  title,
  description,
  avatar,
  backgroundColor = 'rgb(15, 17, 29)',
  width = 1200,
  height = 630,
  type = 'svg',
  backgroundImage,
}: {
  title: string
  description?: string
  avatar: string
  backgroundColor?: string
  width?: number
  height?: number
  type?: 'png' | 'svg'
  backgroundImage?: string
}) => {
  const svg = await satori(
    <div
      style={{
        color: 'rgb(173, 203, 224)',
        background: backgroundColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        fontFamily: 'Gravitas',
      }}
    >
      {backgroundImage && (
        <img
          src={backgroundImage}
          style={{
            position: 'absolute',
            width: `${width}px`,
            height: `${height}px`,
            objectFit: 'cover',
            zIndex: -1,
          }}
        />
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '40px',
          paddingTop: '50px',
        }}
      >
        <img
          src={avatar}
          style={{
            width: '250px',
            height: '250px',
            borderRadius: '50%',
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '40px',
          paddingBottom: '40px',
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: '64px',
            width: '960px',
            textAlign: 'center',
            color: backgroundColor,
          }}
        >
          {title}
        </h1>
      </div>
    </div>,
    {
      width,
      height,
      fonts: [
        {
          name: 'Oxygen',
          data: await font,
          weight: 400,
          style: 'normal',
        },
      ],
    }
  )

  if (type === 'svg') {
    return svg
  } else {
    const resvg = new Resvg(svg, {
      background: backgroundColor,
      font: {
        fontFiles: [fontFile], // Load custom fonts.
        loadSystemFonts: false, // It will be faster to disable loading system fonts.
      },
    })
    const pngData = resvg.render()
    const pngBuffer = pngData.asPng()

    return pngBuffer
  }
}
