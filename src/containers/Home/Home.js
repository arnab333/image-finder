import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import SearchArea from '../../components/SearchArea/SearchArea';
import promiseHandler from '../../utils/js/promiseHandler';

import MainContent from '../../components/MainContent/MainContent';

const apiUrl = 'https://pixabay.com/api';
const apiKey = process.env.REACT_APP_PIXABAY_API_KEY;
const perPage = 18;

function isBottom(el) {
  return el.getBoundingClientRect().bottom <= window.innerHeight;
}

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalApiImages, setTotalApiImages] = useState();

  const fetchImages = useCallback(async (searchValue, pageNumber, clear) => {
    const search = searchValue ? searchValue : '';
    const page = pageNumber || 1;
    const [error, response] = await promiseHandler(
      axios({
        method: 'GET',
        url: `${apiUrl}/?key=${apiKey}&q=${search}&image_type=photo&per_page=${perPage}&page=${page}&safesearch=false`,
      })
    );
    if (error) {
      console.error(error);
    } else {
      setTotalApiImages(response.data.totalHits);
      if (clear) {
        setImages(response.data.hits);
      } else {
        setImages((prevImages) => [...prevImages, ...response.data.hits]);
      }

      setLoading(false);
    }
  }, []);

  const handleSearchIconClick = () => {
    if (searchText) {
      setLoading(true);
      setCurrentPage(1);
      fetchImages(searchText, null, true);
    }
  };

  const handleScroll = useCallback(() => {
    const wrappedElement = document.getElementById('mainContentRow');
    const hasContent = images.length <= totalApiImages;
    if (isBottom(wrappedElement)) {
      if (hasContent) {
        setLoading(true);
        setHasMore(true);
        setCurrentPage((prev) => prev + 1);
        fetchImages(searchText, currentPage + 1);
      } else {
        setHasMore(false);
      }
    }
  }, [fetchImages, images, currentPage, totalApiImages, searchText]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        setLoading(true);
        setCurrentPage(1);
        fetchImages(searchText, null, true);
      }
    };

    document.addEventListener('keydown', handleKeyDown, false);
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [fetchImages, searchText, images, handleScroll]);

  useEffect(() => {
    if (images.length === 0) {
      setLoading(true);
      fetchImages();
    }
  }, [fetchImages, images]);

  return (
    <div className="col-12 h-100">
      <SearchArea
        searchText={searchText}
        setSearchText={setSearchText}
        handleSearchIconClick={handleSearchIconClick}
      />
      <MainContent
        images={images}
        loading={loading}
        perPage={perPage}
        hasMore={hasMore}
      />
    </div>
  );
};

export default Home;
