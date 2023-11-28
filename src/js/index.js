import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './api';
import { renderGallery } from './render-gallery';

const form = document.querySelector('.search-form');
const galleryList = document.querySelector('.gallery');

let pageNumber = 1;
let query = '';
let simpleLightbox = new SimpleLightbox('.gallery a');
const perPage = 40;
let isLoading = false;

form.addEventListener('submit', handleSearch);
window.addEventListener('scroll', handleScroll);

async function handleSearch(event) {
  event.preventDefault();
  query = event.target.searchQuery.value.trim();

  if (!query.trim()) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please, fill the main field',
      position: 'topRight',
    });
    return;
  }

  galleryList.innerHTML = '';

  try {
    const { hits, totalHits } = await fetchImages(query, pageNumber, perPage);

    if (totalHits === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again.',
        maxWidth: '450px',
        position: 'topRight',
      });
      return;
    }
    renderGallery(hits);
    simpleLightbox.refresh();
    iziToast.success({
      title: 'Success',
      message: `Hooray! We found ${totalHits} images!`,
      position: 'topRight',
    });
  } catch (error) {
    console.log(error);
  }
}

async function handleScroll() {
  if (checkIfEndOfPage() && !isLoading) {
    isLoading = true;
    pageNumber += 1;

    try {
      const { hits, totalHits } = await fetchImages(query, pageNumber, perPage);
      renderGallery(hits);
      simpleLightbox.refresh();
      const totalPages = Math.ceil(totalHits / perPage);

      if (pageNumber >= totalPages) {
        iziToast.info({
          title: 'Info',
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
        window.removeEventListener('scroll', handleScroll);
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading = false;
    }
  }
}

function checkIfEndOfPage() {
  const triggerOffset = 360;
  return (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - triggerOffset
  );
}
