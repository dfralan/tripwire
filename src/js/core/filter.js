

function searchAndHighlight() {
  const documents = document.querySelectorAll('.matcher');
  let matchedDocuments = [];
  const searchValue = document.getElementById('searchInput').value.trim().toLowerCase();

  documents.forEach(document => {
    const text = document.textContent.toLowerCase();
    const parent = document.parentNode;

    if (text.includes(searchValue)) {
      document.classList.remove('hidememan');

      if (!matchedDocuments.includes(parent)) {
        matchedDocuments.push(parent);
      }
    } else {
      document.classList.add('hidememan');
    }
  });
}

function clearHighlights() {
  matchedDocuments.forEach(parent => {
    parent.classList.remove('hidememan');
  });
  matchedDocuments = [];
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', searchAndHighlight);
