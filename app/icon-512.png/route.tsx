import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const size = {
  width: 512,
  height: 512,
};

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#007BFF',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50px',
        }}
      >
        <svg
          xmlns="http://www.开展w3.org/2000/svg"
          width="256"
          height="256"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 6v6" />
          <path d="M15 6v6" />
          <path d="M2 12h19.6" />
          <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
          <circle cx="7" cy="18" r="2" />
          <path d="M9 18h5" />
          <circle cx="16" cy="18" r="2" />
        </svg>
      </div>
    ),
    size
  );
}
