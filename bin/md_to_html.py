"""converts draft .md files to ready-to-publish .html files with sidenotes and code highlighting"""

import argparse
import logging
import re
from datetime import datetime as dt
from pathlib import Path

import pypandoc
from constants import HTML_TEMPLATE, INDEX_TEMPLATE

logging.getLogger("pypandoc").addHandler(logging.NullHandler())


def get_title_from_html(html_body: str) -> str:
    """Gets title from html body

    Args:
        html_body (str): html body

    Returns:
        str: title
    """
    match = re.findall(r"<h1.*>(.*)</h1>", html_body)
    if match:
        return match[0].strip()
    return "Untitled Post"


def convert_footnotes_to_sidenotes(html_body: str) -> str:
    """Converts footnotes to sidenotes

    Args:
        html_body (str): HTML body with footnotes

    Returns:
        str: HTML body with sidenotes
    """
    # Extract the footnotes section
    footnotes_section_match = re.search(
        r'<section id="footnotes".*?>(.*?)</section>', html_body, re.DOTALL
    )

    if not footnotes_section_match:
        return html_body

    # Extract footnote items from the section
    footnote_section = footnotes_section_match.group(1)

    # Process each footnote individually to handle multi-paragraph footnotes
    footnotes = {}

    # First, find all footnote list items
    footnote_lis = re.findall(
        r'<li id="fn(\d+)">(.*?)</li>', footnote_section, re.DOTALL
    )

    for fn_num, fn_content in footnote_lis:
        # Remove the backlink at the end of the footnote
        clean_content = re.sub(
            r'<a href="#fnref\d+" class="footnote-back"[^>]*>↩︎</a>', "", fn_content
        )

        # Handle footnotes with multiple paragraphs - preserve all HTML inside
        # Just remove any outer <p> tags if they're the only content
        if clean_content.strip().startswith("<p>") and clean_content.strip().endswith(
            "</p>"
        ):
            # Only strip outer <p></p> if there's only one pair
            p_tags_count = clean_content.count("<p>")
            if p_tags_count == 1:
                clean_content = re.sub(
                    r"^<p>(.*)</p>$", r"\1", clean_content.strip(), flags=re.DOTALL
                )

        footnotes[fn_num] = clean_content.strip()

    # Replace footnote references with sidenotes
    sidenote_counter = 1

    def replace_footnote(match):
        nonlocal sidenote_counter
        fn_num = match.group(1)
        if fn_num in footnotes:
            # Create sidenote HTML structure matching the index.html format
            sidenote_html = f'<label for="sn-{sidenote_counter}" class="sidenote-toggle sidenote-number"></label>\n      <input type="checkbox" id="sn-{sidenote_counter}" class="sidenote-toggle" />\n      <span class="sidenote">{footnotes[fn_num]}</span>'
            sidenote_counter += 1
            return sidenote_html
        return match.group(0)

    # Replace footnote references with improved regex that matches pandoc output
    html_without_footnotes = re.sub(
        r'<a href="#fn(\d+)" class="footnote-ref" id="fnref\d+" role="doc-noteref"><sup>\d+</sup></a>',
        replace_footnote,
        html_body,
    )

    # Remove the footnotes section
    return re.sub(
        r'<section id="footnotes".*?</section>',
        "",
        html_without_footnotes,
        flags=re.DOTALL,
    )


def enhance_code_blocks(html_body: str) -> str:
    """Enhance code blocks with Prism.js class

    Args:
        html_body (str): HTML with code blocks

    Returns:
        str: HTML with enhanced code blocks
    """
    # Find code blocks and add language class for PrismJS
    html_body = re.sub(
        r'<pre><code class="([^"]+)">', r'<pre><code class="language-\1">', html_body
    )

    # Ensure code blocks don't have line-by-line formatting
    return re.sub(
        r'<div class="sourceCode" id="cb\d+"><pre class="sourceCode ([^"]+)"><code class="sourceCode [^"]+">(.*?)</code></pre></div>',
        r'<pre><code class="language-\1">\2</code></pre>',
        html_body,
        flags=re.DOTALL,
    )


def check_mathjax_needed(html_body: str) -> bool:
    """Check if MathJax is needed in the document

    Args:
        html_body (str): HTML content

    Returns:
        bool: True if MathJax elements are found
    """
    # Check for LaTeX delimiters: $, $$
    mathjax_patterns = [
        r"\$\$.+?\$\$",  # Display math: $$...$$
        r"\$.+?\$",  # Inline math: $...$
    ]

    return any(re.search(pattern, html_body, re.DOTALL) for pattern in mathjax_patterns)


def replace_subscribe_tags(html_body: str) -> str:
    """Replace <!--subscribe--> with subscribe div

    Args:
        html_body (str): HTML body with subscribe tags

    Returns:
        str: HTML body with subscribe divs
    """
    return html_body.replace("<!--subscribe-->", '<div class="subscribe-here"></div>')


def update_writing_index(output_path: Path, title: str, date: dt.date):
    """Update the writing/index.html file with the new post

    Args:
        output_path (Path): path to the output file
        title (str): post title
        date (dt.date): post date
    """
    index_path = Path(output_path).parent.parent / "index.html"

    # Create index file if it doesn't exist
    if not index_path.exists():
        template = INDEX_TEMPLATE
        with index_path.open("w") as f:
            f.write(template)

    # Read the current index file
    with index_path.open() as f:
        index_content = f.read()

    # Get relative path for link
    rel_path = Path(output_path).name

    # Create new post entry
    post_entry = f"""<li>
          <a href="./{rel_path}">{title}</a>
          <span class="date">({date.strftime("%B %d, %Y")})</span>
        </li>"""

    # Find the post list and insert at the top
    post_list_match = re.search(
        r'<ul id="post-list">(.*?)</ul>', index_content, re.DOTALL
    )
    if post_list_match:
        post_list = post_list_match.group(1)
        new_post_list = f"\n        {post_entry}{post_list}"
        new_index_content = index_content.replace(
            post_list_match.group(1), new_post_list
        )

        with index_path.open("w") as f:
            f.write(new_index_content)


def main(
    input_path: Path,
    output_path: Path,
    date: dt.date,
    input_format: str = "markdown",
    output_format: str = "html",
):
    """Converts draft .md files to ready-to-publish .html files

    Args:
        input_path (Path): path to input file
        output_path (Path): path to output file
        date (dt.date): the date to include
        input_format (str, optional): input format. Defaults to 'markdown'.
        output_format (str, optional): output format. Defaults to 'html'.
    """
    # Convert markdown to HTML
    pypandoc.convert_file(
        source_file=input_path,
        format=input_format,
        to=output_format,
        outputfile=output_path,
        extra_args=["--wrap=none"],
    )

    with Path(output_path).open("r") as f:
        html_body = f.read()

    # Get title from HTML
    title = get_title_from_html(html_body)

    # Convert footnotes to sidenotes
    html_body = convert_footnotes_to_sidenotes(html_body)

    # Enhance code blocks for syntax highlighting
    html_body = enhance_code_blocks(html_body)

    # Replace subscribe tags
    html_body = replace_subscribe_tags(html_body)

    # Check if MathJax is needed
    template = HTML_TEMPLATE
    if check_mathjax_needed(html_body):
        template = template.replace(
            "</head>",
            '    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>\n</head>',
        )

    # Write the enhanced HTML to the output file
    with Path(output_path).open("w") as f:
        f.write(
            template.replace(
                "<!-- title -->",
                title,
            )
            .replace(
                "<!-- date -->",
                date.strftime("%B %d, %Y"),
            )
            .replace(
                "<!-- body text -->",
                re.sub(r"<h1.*>(.*)</h1>", "", html_body),
            )
        )

    # Update the writing index
    if "writing" in str(output_path) and not str(output_path).endswith("index.html"):
        update_writing_index(output_path, title, date)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--input_path", "-i", type=Path)
    parser.add_argument("--output_path", "-o", type=Path, required=False, default=False)
    args = parser.parse_args()

    in_path = Path(args.input_path)

    date = dt.strptime(
        re.findall(r"\d{4}-\d{2}-\d{2}", str(in_path))[0],
        "%Y-%m-%d",
    ).date()

    if not args.output_path:
        if in_path.parent.name == "_md":
            out_path = Path(
                re.sub(
                    r"\d{4}-\d{2}-\d{2}-",
                    "",
                    str(args.input_path),
                )
                .replace(".md", ".html")
                .replace("/_md", ""),
            )
        else:
            out_path = Path(
                re.sub(
                    r"\d{4}-\d{2}-\d{2}-",
                    "",
                    str(args.input_path),
                ).replace(".md", ".html"),
            )
    else:
        out_path = args.output_path

    # Create the directory if it doesn't exist
    out_dir = Path(out_path).parent
    if not out_dir.exists():
        out_dir.mkdir(parents=True, exist_ok=True)

    main(
        input_path=in_path,
        output_path=out_path,
        date=date,
    )
