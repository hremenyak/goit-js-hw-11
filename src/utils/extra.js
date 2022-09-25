// import { createGalleryMarkup } from './utils/markup';
// import ApiService from './utils/apiService';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import { Notify } from 'notiflix';
// const refs = {
//   form: document.querySelector('.search-form'),
//   gallery: document.querySelector('.gallery'),
//   // loadMoreBtn: document.querySelector('.load-more'),
//   constainer: document.querySelector('.container'),
// };

// refs.form.addEventListener('submit', onFormSubmit);
// // refs.loadMoreBtn.addEventListener('click', handleLoadMore);

// const apiPhotoService = new ApiService();
// const lightbox = new SimpleLightbox('.gallery a', {
//   captions: true,
//   captionPosition: 'bottom',
//   captionDelay: 250,
// });

// console.log(lightbox);
// let imagesValue = 0;
// async function onFormSubmit(event) {
//   event.preventDefault();

//   const searchQuery = event.currentTarget.searchQuery.value;

//   console.log(searchQuery);

//   apiPhotoService.query = searchQuery;
//   apiPhotoService.page = 1;
//   try {
//     const [photos, total] = await apiPhotoService.getPhotos();
//     refs.gallery.innerHTML = createGalleryMarkup(photos);
//     lightbox.refresh();
//     createObserver();
//     imagesValue += photos.length;
//     apiPhotoService.hitsTotal = total;
//   } catch (err) {
//     Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//   }
// }

// async function handleLoadMore() {
//   apiPhotoService.incrementPage();
//   if (imagesValue >= apiPhotoService.hitsTotal) {
//     Notify.warning('Opps');
//     return;
//   }

//   const [photos, total] = await apiPhotoService.getPhotos();
//   refs.gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(photos));
//   lightbox.refresh();
//   imagesValue += photos.length;
// }

// function createObserver() {
//   let options = {
//     root: null,
//     rootMargin: '100px',
//   };

//   const observer = new IntersectionObserver(handleLoadMore, options);
//   observer.observe(refs.constainer);
// }

//api
// import axios from 'axios';

// const agent = axios.create({
//   baseURL: 'https://pixabay.com/api',
//   params: {
//     key: '29943348-171bd2ecaab641b0bb07a2401',
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     per_page: 100,
//   },
// });

// export default class ApiService {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//     this.totalHits = 0;
//   }

//   async getPhotos() {
//     const {
//       data: { hits, totalHits },
//     } = await agent.get(`?q=${this.searchQuery}&page=${this.page}`);

//     if (!hits.length) {
//       throw new Error();
//     }
//     return [hits, totalHits];
//   }

//   get query() {
//     return this.searchQuery;
//   }
//   set query(newSearchQuery) {
//     this.searchQuery = newSearchQuery;
//   }
//   incrementPage() {
//     this.page += 1;
//   }
//   get hitsTotal() {
//     return this.totalHits;
//   }
//   set hitsTotal(total) {
//     this.totalHits = total;
//   }
// }

//mark up
// export function createGalleryMarkup(photos) {
//   return photos
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => {
//         return `<div class="photo-card">
//       <a href="${largeImageURL}">
//   <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes ${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views ${views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads ${downloads}</b>
//     </p>
//   </div>
//   </a>
// </div>`;
//       }
//     )
//     .join('');
// }
