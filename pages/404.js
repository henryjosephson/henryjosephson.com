import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Custom404() {
  const [randomOutlink, setRandomOutlink] = useState(null);

  useEffect(() => {
    // Fetch the static JSON file
    fetch('/outlinks.json')
      .then(response => response.json())
      .then(outlinks => {
        if (outlinks && outlinks.length > 0) {
          // Select a random link
          const randomIndex = Math.floor(Math.random() * outlinks.length);
          setRandomOutlink(outlinks[randomIndex]);
        }
      })
      .catch(error => {
        console.error('Error fetching outlinks:', error);
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
        {randomOutlink ? (
          <p>Want a <a href={randomOutlink.url}>random link</a> instead?</p>
        ) : (
          <p>Want to read a random thing I've linked to? Check back later when I've added some links!</p>
        )}
      </div>
    </Layout>
  );
}