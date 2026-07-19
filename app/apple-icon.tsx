import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// Apple 會自行套用圓角遮罩,所以底色滿版、不透明
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0B6E4F',
        }}
      >
        <svg width="124" height="124" viewBox="0 0 64 64" fill="none">
          <path
            d="M17 33 L28.5 44 L47 21"
            stroke="#ffffff"
            strokeWidth="9.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
