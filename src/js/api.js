const PIXABAY_API_KEY = '40905423-24d24966a8b04fca12252a818';
import axios from 'axios';

export async function fetchImages(query, pageNumber, perPage) {
  const response = await axios.get(
    `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=${perPage}`
  );
  return response.data;
}
