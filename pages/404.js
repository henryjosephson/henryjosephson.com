import Layout from '../components/Layout';
import Link from 'next/link';
import { getRandomOutlink } from '../lib/extractOutlinks';

export default function Custom404({ randomOutlink }) {
  return (
    <Layout title="404" activePage="">
      <div style={{ textAlign: 'center' }}>
        <Link href="/">henryjosephson.com</Link>
      </div>
      <header>
        <h1 id="title"><span className="latex"></span>
          404: Page Not Found
        </h1>
      </header>
      <div>
        Whoops, that link doesn't exist.
        {randomOutlink ? (
          <p>Want a <a href={randomOutlink.url}>random link</a> instead?</p>
        ) : (
          <p>Want to read a random thing I've linked to? Check back later when I've added some links!</p>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const randomOutlink = getRandomOutlink();
  
  return {
    props: {
      randomOutlink: randomOutlink || null
    }
  };
}