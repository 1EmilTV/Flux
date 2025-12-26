
const btn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

let query = searchInput.value;

window.electron.send('check', query);

btn.addEventListener('click', () => {
    query = searchInput.value;
    if (query === '') {
        return;
    }
    else if (query.startsWith('http://') || query.startsWith('https://')) {
        window.electron.send('search', query);
        return;
    }
    else {
        query = 'https://www.google.com/search?q=' + query;
        window.electron.send('search', query);
        return;
    }
});
