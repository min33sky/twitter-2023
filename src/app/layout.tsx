import SessionWrapper from '@/lib/SessionWrapper';
import './globals.css';
import Layout from '@/components/layout/Layout';
import { authOptions } from './api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export const metadata = {
  title: 'twitter 2023',
  description: 'twitter clone',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ko">
      <body className="h-screen bg-slate-900">
        <SessionWrapper session={session}>
          <Layout>{children}</Layout>
        </SessionWrapper>
      </body>
    </html>
  );
}
