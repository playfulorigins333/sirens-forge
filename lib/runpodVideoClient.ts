interface GenerateVideoParams {
  prompt: string;
  imageUrl?: string;
}

export async function generateVideo({ prompt, imageUrl }: GenerateVideoParams): Promise<string> {
  const response = await fetch("/api/video", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, imageUrl }),
  });

  const data = await response.json();

  if (!response.ok || !data?.success || !data?.url) {
    throw new Error(data?.error || "Video generation failed.");
  }

  return data.url as string;
}
