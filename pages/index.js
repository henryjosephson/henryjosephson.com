import Link from 'next/link';
import Layout from '../components/Layout';
import SubscribeForm from '../components/SubscribeForm';

export default function Home() {
  return (
    <Layout 
      title="Henry Josephson" 
      description="Henry Josephson's blog. Crosswords, AI Policy, Philosophy" 
      activePage="home"
    >
        <header>
          <h1><span className="latex">Henry Josephson</span></h1>
        </header>

        <div className="abstract">
          <h2>Abstract</h2>
          <p>
            Hi! I'm Henry. I'm finishing up my final year at the University of Chicago, where I study data science and philosophy.
            <label htmlFor="sn-1" className="sidenote-toggle sidenote-number"></label>{' '}
            <input type="checkbox" id="sn-1" className="sidenote-toggle" />
            <span className="sidenote">I'm also a footnote enthusiast.</span>
            I make <a href="#crosswords">crosswords</a> for the <i>New York Times</i>, and I'm interning for Seb Krier's AI governance team at <a href='https://deepmind.google/'>Google DeepMind</a> as I finish up my full-time job search. I'll keep you all updated on my progress! If you're interested in a more-substantial resume,
            you can click <a href="./resume.pdf">here</a> or check my LinkedIn in the <a href="#socials">Socials</a> section below.
            <br />
            <br />I haven't signed any contracts whose existence I'm not allowed to mention.
          </p><br />
          <SubscribeForm />
        </div>

        <nav role="navigation" className="toc">
          <h2>Contents</h2>
          <ol>
            <li><a href="#whatDo">I. What am I working on right now?</a></li>
            <li><a href="#words">II. Writing</a></li>
            <li><a href="#crosswords">III. Crosswords</a></li>
            <li><a href="#socials">IV. Socials & Contact Info</a></li>
            <li><a href="#feedback">V. Anonymous Feedback</a></li>
          </ol>
        </nav>

        <main>
          <article>
            <h2 id="whatDo">I. What am I working on right now?</h2>
            Check out my <Link href="/now/">now</Link> page!

            <h2 id="words">II. Writing</h2>
            I've started to write enough that I can't fit everything on my main page! Find everything I've uploaded here on my <Link href="/writing">writing</Link> page.

            That said, if you like <Link href="/writing/NY-Should-Pass-Light-Touch-Law-To-Keep-AI-Innovation-Responsible">AI</Link> <Link href="/writing/CA-Wants-RAISE-Act">policy</Link> <Link href="/writing/Notes-on-Superintelligence-Strategy">writing</Link>, <Link href="/writing/Spring Break Links">link</Link>-<Link href="/writing/Clearing-My-Tabs">posts</Link>, and the <a href="https://congress.henryjosephson.com">occasional data visualization</a>, you're in the right place.

            <h2 id="crosswords">III. Crosswords</h2>
            <p>
              I make crossword puzzles! You can solve some of them in the <a href="https://www.xwordinfo.com/Thumbs?author=Henry+Josephson"><i>New York Times</i></a> and the <a href="https://chicagomaroon.com/staff_name/henry-josephson/"><i>Chicago Maroon</i></a>.
            </p>

            <p>
              I'll also publish puzzles <Link href="/xw">on this page</Link> — expect more once I've graduated and can no longer send non-NYT grids to the <i>Maroon</i>.  
            </p>

            <h2 id="socials">IV. Social Media & Contact Info</h2>
            <p>
              I'm on BlueSky at <a href="https://bsky.app/profile/henryjosephson.com">@henryjosephson.com</a> and LinkedIn <a href="https://www.linkedin.com/in/henry-josephson/">here</a>. I haven't full-on deleted <a href="https://x.com/noshpesoj">my twitter</a> yet, but I only used it to lurk, anyway.
            </p>
            <p>
              I'm not sure if github counts as a social network, but you can find mine at <a href="https://github.com/henryjosephson/">https://github.com/henryjosephson/</a>.
            </p>
            <p>
              I'm not on Instagram and only nominally have a Facebook.
            </p>

            <p>
              If you want to email me, you can use 
              <code className="language-python">"hi" + "@" + this_website</code><br />
            </p>

            <h2 id="feedback">V. Leave me anonymous feedback!</h2>
            <p>
              I really want to be the best version of myself that I can. I aspire
              to change my mind as I see new evidence, and it's very important to me that
              I balance the knowledge that I could be totally wrong with the push to 
              actually do the things I think are right.
              <label htmlFor="sn-3" className="sidenote-toggle sidenote-number"></label>{' '}
              <input type="checkbox" id="sn-3" className="sidenote-toggle" />
              <span className="sidenote">
                I draw inspiration here from Joe Carlsmith's excellent piece <a href="https://joecarlsmith.substack.com/p/on-sincerity"><i>On Sincerity</i></a>.
              </span>
            </p>
            <p>
              If there's any way you think I can be doing better, please 
              <a href="https://feedback.henryjosephson.com">let me know</a>.
            </p>
          </article>
        </main>
    </Layout>
  );
}