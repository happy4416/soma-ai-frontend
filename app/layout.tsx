export const metadata = {
  title: '경북소마고 도우미 AI',
  description: '경북소프트웨어마이스터고등학교 AI 챗봇',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
