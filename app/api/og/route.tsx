import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const title = searchParams.get('title') ?? 'Barry — Portfolio';
        const type = searchParams.get('type') ?? 'work'; // 'work' or 'life'

        const isWork = type === 'work';

        // Modern gradient colors
        const gradientStart = isWork ? '#6366f1' : '#8b5cf6';
        const gradientEnd = isWork ? '#764ba2' : '#ec4899';

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        background: '#ffffff',
                        padding: '80px',
                        position: 'relative',
                        fontFamily: 'Inter, system-ui, sans-serif',
                    }}
                >
                    {/* Gradient Background Elements */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '-100px',
                            right: '-100px',
                            width: '600px',
                            height: '600px',
                            borderRadius: '50%',
                            background: `radial-gradient(circle, ${gradientStart}20 0%, transparent 70%)`,
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '-150px',
                            left: '-150px',
                            width: '700px',
                            height: '700px',
                            borderRadius: '50%',
                            background: `radial-gradient(circle, ${gradientEnd}15 0%, transparent 70%)`,
                        }}
                    />

                    {/* Content */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px',
                            zIndex: 10,
                            maxWidth: '900px',
                        }}
                    >
                        {/* Category Badge */}
                        <div
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '12px 24px',
                                borderRadius: '12px',
                                background: isWork ? '#e0e7ff' : '#ede9fe',
                                color: isWork ? '#6366f1' : '#8b5cf6',
                                fontSize: '20px',
                                fontWeight: 600,
                            }}
                        >
                            {isWork ? 'Work' : 'Life'}
                        </div>

                        {/* Title */}
                        <div
                            style={{
                                fontSize: 72,
                                fontWeight: 700,
                                color: '#171717',
                                lineHeight: 1.1,
                                letterSpacing: '-0.03em',
                                display: 'flex',
                            }}
                        >
                            {title}
                        </div>
                    </div>

                    {/* Footer */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            zIndex: 10,
                        }}
                    >
                        {/* Avatar/Logo Circle */}
                        <div
                            style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
                            }}
                        />
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px',
                            }}
                        >
                            <div
                                style={{
                                    fontSize: '24px',
                                    fontWeight: 600,
                                    color: '#171717',
                                }}
                            >
                                Barry
                            </div>
                            <div
                                style={{
                                    fontSize: '18px',
                                    color: '#737373',
                                }}
                            >
                                barry.dev
                            </div>
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: any) {
        console.error(e);
        return new Response(`Failed to generate image: ${e.message}`, {
            status: 500,
        });
    }
}