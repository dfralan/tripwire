function searchAndHighlight() {
  const documents = document.querySelectorAll('.matchMeMan');
  let matchedDocuments = [];
  const searchValue = document.getElementById('filterInput').value.trim().toLowerCase();

  documents.forEach(document => {
    const text = document.textContent.toLowerCase();
    const parent = document.parentNode;

    if (text.includes(searchValue)) {
      document.classList.remove('hideMeMan');

      if (!matchedDocuments.includes(parent)) {
        matchedDocuments.push(parent);
      }
    } else {
      document.classList.add('hideMeMan');
    }
  });
}

function clearHighlights() {
  matchedDocuments.forEach(parent => {
    parent.classList.remove('hideMeMan');
  });
  matchedDocuments = [];
}

const filterInput = document.getElementById('filterInput');
filterInput.addEventListener('input', searchAndHighlight);
