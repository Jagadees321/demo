const apiKey = "636e1481b4f3c446d26b8eb6ebfe7127";


async function fetchImages(searchTerm) {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchTerm}&per_page=24&format=json&nojsoncallback=1`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.photos.photo;
    } catch (error) {
        console.error("Error fetching images:", error);
        return [];
    }
}


function displayGallery(images) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; 

    images.forEach(image => {
        const imageUrl = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_m.jpg`;
        
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');

        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = image.title;

        galleryItem.appendChild(img);
        gallery.appendChild(galleryItem);
    });
}


function handleSearch() {
    const searchTerm = document.getElementById('searchBar').value.trim();
    if (searchTerm) {
        fetchImages(searchTerm).then(images => displayGallery(images));
    }
}


function handleCategoryClick(category) {
    fetchImages(category).then(images => displayGallery(images));
}


function init() {
    
    document.getElementById('searchButton').addEventListener('click', handleSearch);

    
    document.getElementById('searchBar').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    
    document.querySelectorAll('.sidebar ul li').forEach(categoryItem => {
        categoryItem.addEventListener('click', function () {
            const category = this.getAttribute('data-category');
            handleCategoryClick(category);
        });
    });

    
    fetchImages('cricketers').then(images => displayGallery(images));
}


window.onload = init;
