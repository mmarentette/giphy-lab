import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import SearchBar from './components/SearchBar/SearchBar';
import GifDetails from './components/GifDetails/GifDetails';
import './App.css'

export default function App() {
  const LIMIT = 25;
  const [gif, setGif] = useState({});
  const [searchGifTerm, setSearchGifTerm] = useState('dog');
  const [isLoading, setIsLoading] = useState(true); // Question for Jim/Megan: Based on class example, this should be initialized to false, but I can't get it to work unless initialized to true... what am I missing here?

  useEffect(() => {

    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=IP7R5AjVlJdI6wZPxyMJl0JSMX9jo7Sp&q=${searchGifTerm}&limit=${LIMIT}&lang=en`;

    // Question for Jim/Megan: Is there a way to load a trending gif the first time the app loads, and then render a 'searched' gif every time searchGifTerm state is updated)? This is what I tried + initializing searchGifTerm state to empty string above:
    // { const endpoint = searchGifTerm.length ? `https://api.giphy.com/v1/gifs/search?api_key=IP7R5AjVlJdI6wZPxyMJl0JSMX9jo7Sp&q=${searchGifTerm}&limit=${LIMIT}&lang=en`: `https://api.giphy.com/v1/gifs/trending?api_key=IP7R5AjVlJdI6wZPxyMJl0JSMX9jo7Sp&limit=${LIMIT}` };

    async function getGif() {
      try {
        setIsLoading(true);
        const response = await fetch(endpoint);
        const body = await response.json();
        // console.log(body.data, '<------ body');
        const i = Math.floor(Math.random() * LIMIT);
        setGif(body.data[i]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }

    getGif();
  }, [searchGifTerm]);

  return (
    <>
      <h1>Giphy</h1>
      <SearchBar setSearchGifTerm={setSearchGifTerm} />
      {isLoading ? <h1>Hold on... gif is loading!</h1> : <GifDetails gif={gif}/>}
    </>
  );
}
