import { createGalleryMarkup } from './utils/markup';
import ApiService from './utils/apiService';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix';
const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  // loadMoreBtn: document.querySelector('.load-more'),
  constainer: document.querySelector('.container'),
};

refs.form.addEventListener('submit', onFormSubmit);
// refs.loadMoreBtn.addEventListener('click', handleLoadMore);

const apiPhotoService = new ApiService();
const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionPosition: 'bottom',
  captionDelay: 250,
});

console.log(lightbox);
let imagesValue = 0;
async function onFormSubmit(event) {
  event.preventDefault();

  const searchQuery = event.currentTarget.searchQuery.value;

  console.log(searchQuery);

  apiPhotoService.query = searchQuery;
  apiPhotoService.page = 1;
  try {
    const [photos, total] = await apiPhotoService.getPhotos();
    refs.gallery.innerHTML = createGalleryMarkup(photos);
    lightbox.refresh();
    createObserver();
    imagesValue += photos.length;
    apiPhotoService.hitsTotal = total;
  } catch (err) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

async function handleLoadMore() {
  apiPhotoService.incrementPage();
  if (imagesValue >= apiPhotoService.hitsTotal) {
    Notify.warning('Opps');
    return;
  }

  const [photos, total] = await apiPhotoService.getPhotos();
  refs.gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(photos));
  lightbox.refresh();
  imagesValue += photos.length;
}

function createObserver() {
  let options = {
    root: null,
    rootMargin: '100px',
  };

  const observer = new IntersectionObserver(handleLoadMore, options);
  observer.observe(refs.constainer);
}
