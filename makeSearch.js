class makeSearchBar {
    constructor() {
        this.elements = this.createSearchBar();
        this.dataMap = this.lookUpLocations();
    }

    createSearchBar() {
        const elements = {
            container: document.createElement('div'),
            searchBar: document.createElement('input'),
            searchSVG: document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
            searchPath: document.createElementNS('http://www.w3.org/2000/svg', 'path'),
            dataList: document.createElement('datalist')
        }
        
        elements.container.setAttribute('id', 'search-container');
        elements.dataList.setAttribute('id', 'location-list');
        elements.searchBar.setAttribute('id', 'search-bar');
        elements.searchBar.setAttribute('name', 'search-bar');
        elements.searchBar.setAttribute('type', 'search');
        elements.searchBar.setAttribute('list', 'location-list');
        elements.searchSVG.setAttribute('id', 'search-svg');
        elements.searchSVG.setAttribute('viewBox', '0 0 24 24');
        elements.searchPath.setAttribute('id', 'search-path');
        elements.searchPath.setAttribute('d', 'M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z');

        this.bindElements(elements);

        elements.searchBar.appendChild(elements.dataList);
        elements.searchSVG.appendChild(elements.searchPath);
        elements.container.appendChild(elements.searchBar);
        elements.container.appendChild(elements.searchSVG);

        return elements;
    }

    getSearchBar() {
        return this.elements.container;
    }

    getInput() {
        return this.elements.searchBar;
    }

    getIcon() {
        return this.elements.searchSVG;
    }

    bindElements(elements) {
        elements.searchBar.addEventListener('input', (e) => {
            this.dataMap = this.lookUpLocations();
            this.clearDataList();
            this.populateDataList();
        });
    }

    clearDataList() {
        const locationList = this.elements.dataList;
        Array.from(locationList.children).forEach((child) => {
            child.remove();
        })
    }

    async getSearch() {
        try {
            const search = this.elements.searchBar.value.toLowerCase();
            const map = await this.dataMap;
            return (map.has(search))
                ? map.get(search)
                : map.get(Array.from(map.keys())[0]);
        } catch (e) {
            console.log(e);
        }
    }

    async populateDataList() {
        try {
            const data = await this.dataMap;
            data.forEach((item) => {
                const option = document.createElement('option');
                option.setAttribute('value', `${item.name}, ${item.state}`);
                this.elements.dataList.appendChild(option);
            });
        } catch (e) {
            console.log(e);
        } 
    }

    async lookUpLocations() {
        const search = this.elements.searchBar.value;
        const newDataMap = new Map();
        if (search === '') { return newDataMap; }
        try {
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=adf5af2a65ec517047f615b7f33f3ad8`, { mode: 'cors' });
            const data = await response.json();           
            await data.forEach((item) => {
                const key = `${item.name}, ${item.state}`;
                newDataMap.set(key.toLowerCase(), item);
            });
            return newDataMap;
        } catch (e) {
            console.log(e);
        }
    }
}
