import { NextResponse } from "next/server"

const RUNPOD_API_KEY = process.env.RUNPOD_API_KEY
const RUNPOD_ENDPOINT = process.env.RUNPOD_VIDEO_ENDPOINT

export async function POST(req: Request) {
  if (!RUNPOD_API_KEY || !RUNPOD_ENDPOINT) {
    return NextResponse.json({ error: "RunPod backend is not configured" }, { status: 500 })
  }

  const body = await req.json()
  const { prompt, mode, imageBase64 } = body

  if (!prompt || !mode) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const payload =
    mode === "image-to-video"
      ? {
          input: {
            prompt,
            image: imageBase64
          }
        }
      : {
          input: {
            prompt
          }
        }

  const response = await fetch(RUNPOD_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${RUNPOD_API_KEY}`
    },
    body: JSON.stringify(payload)
  })

  const data = await response.json()

  if (!response.ok) {
    return NextResponse.json({ error: data }, { status: 500 })
  }

  return NextResponse.json({ result: data })
}
