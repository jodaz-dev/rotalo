import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EventShot - Find Your Event Photos',
  description: 'Browse and find photos from sports events captured by professional photographers. Search events, view galleries, and download your memories.',
  authors: [{ name: 'EventShot' }],
  alternates: {
    canonical: 'https://eventshot.app',
  },
  openGraph: {
    title: 'EventShot - Find Your Event Photos',
    description: 'Browse and find photos from sports events captured by professional photographers.',
    type: 'website',
    images: ['https://lovable.dev/opengraph-image-p98pqg.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EventShot - Find Your Event Photos',
    description: 'Browse and find photos from sports events captured by professional photographers.',
    images: ['https://lovable.dev/opengraph-image-p98pqg.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
