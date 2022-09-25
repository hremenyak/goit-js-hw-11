import axios from 'axios';

const agent = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '29943348-171bd2ecaab641b0bb07a2401',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  },
});

export class PhotosAPIService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.allHits = 0;
  }

  async getPhotos() {
    const {
      data: { hits, totalHits },
    } = await agent.get(`?q=${this.searchQuery}&page=${this.page}`);

    if (!hits.length) {
      throw new Error();
    }

    this.incrementPage();

    return [hits, totalHits];
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }

  set query(query) {
    this.searchQuery = query;
  }

  get hits() {
    return this.allHits;
  }

  set hits(sum) {
    this.allHits = sum;
  }
}
