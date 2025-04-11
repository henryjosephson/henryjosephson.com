import PostLayout from '../../components/PostLayout';
import SubscribeForm from '../../components/SubscribeForm';
import { getContentPaths, getContentData } from '../../lib/contentUtils';

export default function Post({ postData }) {
  if (!postData) {
    return <div>Article not found</div>;
  }

  return (
    <PostLayout 
      title={postData.title} 
      description={postData.description || `${postData.title} - Henry Josephson`}
      date={postData.date}
      activePage="writing"
    >
      <div className="subscribe-here" style={{ textAlign: 'center' }}>
        <SubscribeForm />
      </div>
      
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </PostLayout>
  );
}

export async function getStaticPaths() {
  return await getContentPaths('writing');
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const postData = await getContentData('writing', slug);
  
  if (!postData && process.env.NODE_ENV === 'production') {
    return { notFound: true };
  }
  
  return {
    props: {
      postData
    }
  };
}
