export function YouTubeEmbed({ videoId, title = "YouTube video" }: { videoId: string; title?: string }) {
    return (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden my-8 shadow-lg">
            <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}
