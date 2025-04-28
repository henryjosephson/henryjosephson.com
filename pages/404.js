import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Custom404() {
  const [randomOutlink, setRandomOutlink] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch random link when component mounts (client-side only)
    fetch('/api/random-outlink')
      .then(response => response.json())
      .then(data => {
        setRandomOutlink(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching random link:', error);
        setLoading(false);
      });
  }, []);

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
        {loading ? (
          <p>Finding you a random link...</p>
        ) : randomOutlink ? (
          <p>Want a <a href={randomOutlink.url}>random link</a> instead?</p>
        ) : (
          <p>Want to read a random thing I've linked to? Check back later when I've added some links!</p>
        )}
      </div>
    </Layout>
  );
}