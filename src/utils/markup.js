export function createGalleryMarkup(photos) {
  return photos
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a class="gallery-link" href="${largeImageURL}">
        <div class="photo-card">    
  <img class="image"src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes </b>
      <span class="info-data">${likes}</span>
    </p>
    <p class="info-item">
      <b>Views </b>
      <span class="info-data">${views}</span>

    </p>
    <p class="info-item">
      <b>Comments </b>
      <span class="info-data">${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads </b>
      <span class="info-data">${downloads}</span>
    </p>
  </div>
</div>
</a>`;
      }
    )
    .join('');
}
