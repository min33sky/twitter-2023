import './globals.css';
import Layout from '@/components/layout/Layout';

export const metadata = {
  title: 'twitter 2023',
  description: 'twitter clone',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-slate-800 h-screen">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
