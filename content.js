function generateTOC() {
  const readme = document.querySelector("article");
  if (!readme) return;

  const headings = Array.from(readme.querySelectorAll("h1, h2, h3, h4, h5, h6"));
  if (!headings.length) return;

  const tocContainer = document.createElement("div");
  tocContainer.id = "ce-readme-toc-container";

  // Create hamburger button
  const hamburger = document.createElement("div");
  hamburger.className = "toc-hamburger";
  hamburger.innerHTML = `
    <svg viewBox="0 0 24 24">
      <path d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2z"/>
    </svg>
  `;

  // Create content container
  const tocContent = document.createElement("div");
  tocContent.className = "toc-content";

  const tocList = document.createElement("ul");
  let lastLevels = [tocList];

  headings.forEach(heading => {
    const level = parseInt(heading.tagName.charAt(1));
    const link = document.createElement("a");
    const id = heading.id || heading.textContent.toLowerCase().replace(/\s+/g, "-");
    heading.id = id;
    link.href = `#${id}`;
    link.textContent = heading.textContent;

    const listItem = document.createElement("li");
    listItem.style.paddingLeft = `${(level - 1) * 2}px`;
    listItem.appendChild(link);

    if (level > lastLevels.length) {
      const newList = document.createElement("ul");
      lastLevels[lastLevels.length - 1].lastChild.appendChild(newList);
      lastLevels.push(newList);
    } else {
      lastLevels = lastLevels.slice(0, level);
    }

    lastLevels[lastLevels.length - 1].appendChild(listItem);
  });

  tocContent.appendChild(tocList);
  tocContainer.appendChild(hamburger);
  tocContainer.appendChild(tocContent);
  document.body.appendChild(tocContainer);

  // Add event listeners
  hamburger.addEventListener('click', () => {
    tocContainer.classList.toggle('open');
  });

  // Close TOC when clicking a link
  tocContent.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      tocContainer.classList.remove('open');
    }
  });

  // Close TOC when clicking outside
  document.addEventListener('click', (e) => {
    if (!tocContainer.contains(e.target)) {
      tocContainer.classList.remove('open');
    }
  });
}

generateTOC();
