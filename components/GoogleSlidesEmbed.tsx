export function GoogleSlidesEmbed({
    slideId,
    title = "Google Slides Presentation",
    aspectRatio = "16/9"
}: {
    slideId: string;
    title?: string;
    aspectRatio?: string;
}) {
    return (
        <div
            className="relative w-full my-8 shadow-lg rounded-lg overflow-hidden"
            style={{ aspectRatio }}
        >
            <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://docs.google.com/presentation/d/e/${slideId}/embed?start=false&loop=false&delayms=3000`}
                title={title}
                allowFullScreen
            />
        </div>
    );
}
