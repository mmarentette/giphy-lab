import { useState } from 'react';

export default function SearchBar({setSearchGifTerm}) {
    const [searchTerm, setSearchTerm] = useState('');

    function handleChange(e) {
        setSearchTerm(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSearchGifTerm(searchTerm);
        setSearchTerm('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={searchTerm} onChange={handleChange} placeholder="Search gif" />
            <button type="submit">Search</button>
        </form>
    )
}