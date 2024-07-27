document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const searchInput = document.getElementById('search');

    const apiUrl = 'https://api.artic.edu/api/v1';

    const fetchArtworks = async (searchTerm) => {
        try {
            const searchUrl = `${apiUrl}/artworks/search?q=${searchTerm}&limit=12&fields=id,title,image_id,artist_display,is_public_domain`;
            const searchResponse = await fetch(searchUrl);
            const searchData = await searchResponse.json();
            return searchData.data;
        } catch (error) {
            console.error('Error fetching artworks:', error);
        }
    };

    
    const displayArtworks = (artworks) => {
        gallery.innerHTML = '';
        artworks.forEach(artwork => {
            const artworkElement = document.createElement('div');
            artworkElement.classList.add('artwork');
            
            const imageUrl = artwork.image_id 
                ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
                : 'images/placeholder-image.jpg';
            
            artworkElement.innerHTML = `
                <img src="${imageUrl}" alt="${artwork.title || 'No Title Available'}" onerror="this.onerror=null;this.src='images/placeholder-image.jpg';">
                <h2>${artwork.title || 'No Title Available'}</h2>
                <p>${artwork.artist_display || 'Unknown Artist'}</p>
            `;
            gallery.appendChild(artworkElement);
        });
    };

    searchInput.addEventListener('input', async function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm.length > 2) {
            const artworks = await fetchArtworks(searchTerm);
            displayArtworks(artworks);
        } else {
            gallery.innerHTML = '';
        }
    });
});
