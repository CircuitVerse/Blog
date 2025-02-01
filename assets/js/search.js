// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    let searchOpen = document.querySelector('[data-toggle="search"]');
    let searchClose = document.querySelector('.search-overlay');
    let searchBlock = document.querySelector('.search-block');

    if (searchOpen && searchClose && searchBlock) {
        // Open search modal when search icon is clicked
        searchOpen.addEventListener('click', function(e) {
            e.preventDefault();
            searchBlock.classList.add('is-active');
            setTimeout(function() {
                document.querySelector('[name="s"]').focus();
            }, 400);
        });

        // Close search modal when overlay is clicked
        searchClose.addEventListener('click', function() {
            searchBlock.classList.remove('is-active');
        });

        // Close search modal when ESC key is pressed
        document.addEventListener('keyup', function(e) {
            if (e.key === 'Escape') {
                searchBlock.classList.remove('is-active');
            }
        });
    }
}); 