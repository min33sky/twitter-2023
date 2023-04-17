import Form from '@/components/Form';
import Header from '@/components/Header';
import PostFeed from '@/components/posts/PostFeed';

export default function Home() {
  return (
    <>
      <Header label="헤더" />
      <Form placeholder="무슨 일이 일어나고 있나요?" />
      <PostFeed />
    </>
  );
}
