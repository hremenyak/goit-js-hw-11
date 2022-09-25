import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { PhotosAPIService } from './utils/apiService';
import { createGalleryMarkup } from './utils/markup';

const photosAPI = new PhotosAPIService();
const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  container: document.querySelector('.container'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', loadMore);

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionPosition: 'bottom',
  captionDelay: 250,
});

async function onFormSubmit(evt) {
  evt.preventDefault();
  const searchQuery = evt.currentTarget.elements.searchQuery.value;

  photosAPI.query = searchQuery;
  photosAPI.resetPage();
  try {
    const [photos, total] = await photosAPI.getPhotos();

    refs.gallery.innerHTML = createGalleryMarkup(photos);
    lightbox.refresh();
    Notify.success(`Hooray! We found ${total} images`);
  } catch (err) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

async function loadMore() {
  try {
    const [photos, total] = await photosAPI.getPhotos();
    photosAPI.hits += photos.length;
    refs.gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(photos));
    lightbox.refresh();
    if (photosAPI.allHits >= total) {
      return;
    }
  } catch {
    Notify.info(
      'We are sorry, but you have reached the end of search results.'
    );
  }
}
