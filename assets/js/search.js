// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input-header');

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                // You can customize the search URL based on your Hugo configuration
                window.location.href = `/search?q=${encodeURIComponent(query)}`;
            }
        });
    }
}); 