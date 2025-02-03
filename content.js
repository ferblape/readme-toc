function generateTOC() {
  const readme = document.querySelector("article");
  if (!readme) return;

  const headings = Array.from(readme.querySelectorAll("h1, h2, h3, h4, h5, h6"));
  if (!headings.length) return;

  const tocContainer = document.createElement("div");
  tocContainer.id = "ce-readme-toc-container";

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

  tocContainer.appendChild(tocList);
  document.body.appendChild(tocContainer);
}

generateTOC();
