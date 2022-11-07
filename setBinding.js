// Binds the various functions on the page
function bindHeader() {
    
    // Opens a searchbar when the location is clicked, prevents multiple clicks via 'in-search' class
    const headLocation = document.getElementById('head-location');
    headLocation.addEventListener('click', (e) => {
        if (headLocation.classList.contains('in-search')) { return; }
        makeSelector();
        headLocation.classList.add('in-search')
    });

    // Binds the search bar to page elements, allows for it to close when clicked elsewhere
    function makeSelector() {
        const searchBar = makeSearch();
        const searchDiv = document.createElement('div');
        searchDiv.setAttribute('id', 'search-div');
        searchDiv.appendChild(searchBar.getSearchBar());
        document.getElementById('head-location').appendChild(searchDiv);
        window.addEventListener('click', (e) => {
            if (e.target.id != 'search-div'
                && e.target.id != 'head-location'
                && e.target.id != 'search-bar'
                && e.target.id != 'location-list') {
                    headLocation.classList.remove('in-search');
                    searchDiv.remove();
            }
        })
    }

    // Calls to make searchbar, binds autopopulation of locations in the datalist on keydowns
    function makeSearch() {
        const searchBar = new makeSearchBar();
        searchBar.getInput().addEventListener('keydown', (e) => {
            if (e.code != 'Enter') { return; }
            headLocation.classList.remove('in-search');
            getWeatherData(searchBar.getSearch());
        });
        searchBar.getIcon().addEventListener('click', (e) => {
            headLocation.classList.remove('in-search');
            document.getElementById('search-div').remove();
            getWeatherData(searchBar.getSearch());
        })
        return searchBar;
    }
}

bindHeader();
