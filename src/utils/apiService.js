import axios from 'axios';

const agent = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '29943348-171bd2ecaab641b0bb07a2401',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 100,
  },
});

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalHits = 0;
  }

  async getPhotos() {
    const {
      data: { hits, totalHits },
    } = await agent.get(`?q=${this.searchQuery}&page=${this.page}`);

    if (!hits.length) {
      throw new Error();
    }
    return [hits, totalHits];
  }

  get query() {
    return this.searchQuery;
  }
  set query(newSearchQuery) {
    this.searchQuery = newSearchQuery;
  }
  incrementPage() {
    this.page += 1;
  }
  get hitsTotal() {
    return this.totalHits;
  }
  set hitsTotal(total) {
    this.totalHits = total;
  }
}
