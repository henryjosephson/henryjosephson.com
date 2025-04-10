import PostLayout from '../../components/PostLayout';
import { getContentPaths, getContentData } from '../../lib/contentUtils';

export default function CrosswordPuzzle({ puzzleData }) {
  if (!puzzleData) {
    return <div>Puzzle not found</div>;
  }

  return (
    <PostLayout 
      title={puzzleData.title} 
      description={`Crossword Puzzle: ${puzzleData.title}`}
      date={puzzleData.date}
      activePage="xw"
    >
      <div dangerouslySetInnerHTML={{ __html: puzzleData.contentHtml }} />
      {puzzleData.puzzleEmbed && (
        <div className="puzzle-embed" dangerouslySetInnerHTML={{ __html: puzzleData.puzzleEmbed }} />
      )}
    </PostLayout>
  );
}

export async function getStaticPaths() {
  return await getContentPaths('xw');
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const puzzleData = await getContentData('xw', slug);
  
  if (!puzzleData && process.env.NODE_ENV === 'production') {
    return { notFound: true };
  }
  
  return {
    props: {
      puzzleData
    }
  };
}
