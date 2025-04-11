import Layout from '../components/Layout';
import Link from 'next/link';

export default function Custom404() {
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
        There's nothing here :(

        Want to read a random thing I've liked?
        If so, <a href="https://feedback.henryjosephson.com/">tell me</a> to implement that feature!
      </div>
    </Layout>
  );
}