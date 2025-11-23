import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt, imageUrl } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { success: false, error: "Prompt is required for video generation." },
        { status: 400 }
      );
    }

    const backendId = process.env.RUNPOD_BACKEND_ID;
    const apiKey = process.env.RUNPOD_API_KEY;

    if (!backendId || !apiKey) {
      return NextResponse.json(
        { success: false, error: "RunPod backend is not configured." },
        { status: 500 }
      );
    }

    const payload = {
      input: {
        mode: "video",
        prompt,
        ...(imageUrl ? { imageUrl } : {}),
      },
    };

    const response = await fetch(`https://api.runpod.ai/v2/${backendId}/runsync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("RunPod video generation failed:", errorText);
      return NextResponse.json(
        { success: false, error: "RunPod request failed." },
        { status: response.status }
      );
    }

    const data = await response.json();
    const videoUrl =
      data?.output?.url ||
      data?.output?.videoUrl ||
      data?.output?.[0] ||
      data?.url;

    if (!videoUrl || typeof videoUrl !== "string") {
      return NextResponse.json(
        { success: false, error: "Video URL not returned from RunPod." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, url: videoUrl });
  } catch (error) {
    console.error("Video generation error:", error);
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
