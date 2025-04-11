document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    const reportCards = document.querySelectorAll('.report-card');
    
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      
      reportCards.forEach(card => {
        const title = card.querySelector('.report-title').textContent.toLowerCase();
        const description = card.querySelector('.report-description').textContent.toLowerCase();
        const type = card.querySelector('.report-type').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm) || type.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
    
    // Filtering functionality
    const typeFilter = document.querySelectorAll('.filter-dropdown')[0];
    const yearFilter = document.querySelectorAll('.filter-dropdown')[1];
    
    function applyFilters() {
      const selectedType = typeFilter.value;
      const selectedYear = yearFilter.value;
      
      reportCards.forEach(card => {
        const type = card.querySelector('.report-type').textContent;
        const yearSection = card.closest('.year-section');
        const year = yearSection ? yearSection.querySelector('h2').textContent : '';
        
        const typeMatch = selectedType === 'All Report Types' || type === selectedType;
        const yearMatch = selectedYear === 'All Years' || year.includes(selectedYear);
        
        if (typeMatch && yearMatch) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }
    
    typeFilter.addEventListener('change', applyFilters);
    yearFilter.addEventListener('change', applyFilters);
  });
  
  // Enhanced modal functionality with annexes
  function openModal(pdfUrl, annexes = []) {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    const annexContainer = document.getElementById('annexContainer');
    
    // Clear previous annexes
    annexContainer.innerHTML = '';
    
    // Add new annexes if provided
    if (annexes && annexes.length > 0) {
      annexes.forEach(annex => {
        const annexLink = document.createElement('a');
        annexLink.href = annex.url;
        annexLink.classList.add('annex-link');
        annexLink.download = annex.name;
        
        // Create annex element with icon based on file type
        let icon = 'file-text';
        if (annex.url.endsWith('.pdf')) icon = 'file-pdf';
        else if (annex.url.endsWith('.doc') || annex.url.endsWith('.docx')) icon = 'file-word';
        else if (annex.url.endsWith('.xls') || annex.url.endsWith('.xlsx')) icon = 'file-excel';
        
        annexLink.innerHTML = `
          <svg class="annex-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          ${annex.name}
        `;
        
        annexContainer.appendChild(annexLink);
      });
      
      // Show the annex container
      annexContainer.style.display = 'flex';
    } else {
      // Hide the annex container if no annexes
      annexContainer.style.display = 'none';
    }
  
    const url = new URL(pdfUrl, window.location.origin);
    viewer.src = url.pathname;
    modal.style.display = 'flex';
  }
  
  function closeModal() {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
  
    viewer.src = ""; // Clear for better performance
    modal.style.display = 'none';
  }
