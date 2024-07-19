import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import GifDetails from './components/GifDetails/GifDetails';
import './App.css'

export default function App() {
  const LIMIT = 25;
  const [gif, setGif] = useState({});
  const [searchGifTerm, setSearchGifTerm] = useState('dog');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=IP7R5AjVlJdI6wZPxyMJl0JSMX9jo7Sp&q=${searchGifTerm}&limit=${LIMIT}&lang=en`;

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
      <h1>Random Gif Generator</h1>
      <SearchBar setSearchGifTerm={setSearchGifTerm} />
      {isLoading ? <h1>Hold on... gif is loading!</h1> : <GifDetails gif={gif}/>}
    </>
  );
}
