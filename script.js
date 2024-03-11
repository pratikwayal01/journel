// Function to save the entry
function saveEntry() {
    const entryDate = document.getElementById('entryDate').value;
    const entryContent = document.getElementById('entryContent').value;
  
    if (entryDate && entryContent) {
      let entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
      entries.push({ date: entryDate, content: entryContent });
      localStorage.setItem('journalEntries', JSON.stringify(entries));
      document.getElementById('entryDate').value = '';
      document.getElementById('entryContent').value = '';
      displayTodaysEntries(); // Update entries list after saving
    } else {
      alert('Please fill in both date and content fields.');
    }
  }
  
  // Function to display today's entries
  function displayTodaysEntries() {
    const today = new Date().toISOString().slice(0, 10);
  
    const entriesList = document.getElementById('entriesList');
    entriesList.innerHTML = '';
  
    const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    const todaysEntries = entries.filter(entry => entry.date === today);
  
    todaysEntries.forEach(entry => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item';
      listItem.innerHTML = `
        <strong>${entry.date}</strong>
        <p>${entry.content}</p>
      `;
      entriesList.appendChild(listItem);
    });
  }
  
  // Function to display entries for a specific date
  function showEntries() {
    const showDate = document.getElementById('showDate').value;
  
    if (showDate) {
      const entriesList = document.getElementById('entriesList');
      entriesList.innerHTML = '';
  
      const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
      const filteredEntries = entries.filter(entry => entry.date === showDate);
  
      filteredEntries.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `
          <strong>${entry.date}</strong>
          <p>${entry.content}</p>
        `;
        entriesList.appendChild(listItem);
      });
    } else {
      alert('Please select a date.');
    }
  }
  // Function to delete an entry
function deleteEntry(date, content) {
  let entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
  entries = entries.filter(entry => !(entry.date === date && entry.content === content));
  localStorage.setItem('journalEntries', JSON.stringify(entries));
  displayTodaysEntries();
}

// Function to create entry element
function createEntryElement(entry) {
  const listItem = document.createElement('li');
  listItem.className = 'list-group-item';
  listItem.innerHTML = `
    <div>
      <strong>${entry.date}</strong>
      <p>${entry.content}</p>
      <button class="btn btn-danger btn-sm" onclick="deleteEntry('${entry.date}', '${entry.content}')">Delete</button>
    </div>
  `;
  return listItem;
}

// Function to display today's entries
function displayTodaysEntries() {
  const today = new Date().toISOString().slice(0, 10);

  const entriesList = document.getElementById('entriesList');
  entriesList.innerHTML = '';

  const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
  const todaysEntries = entries.filter(entry => entry.date === today);

  todaysEntries.forEach(entry => {
    const listItem = createEntryElement(entry);
    entriesList.appendChild(listItem);
  });
}

  
  // Initial display of today's entries when the page loads
  displayTodaysEntries();
  