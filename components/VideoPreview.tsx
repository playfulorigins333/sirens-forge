interface VideoPreviewProps {
  url: string;
}

export function VideoPreview({ url }: VideoPreviewProps) {
  return <video controls src={url} className="w-full rounded-lg" />;
}
