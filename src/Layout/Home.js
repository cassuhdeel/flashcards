import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { listDecks } from '../utils/api';
import Decks from './Deck/Decks';

export default function Home() {
    const history = useHistory()
    const [decks, setDecks] = useState([])
    
    useEffect(() => {
        async function getDeck() {
            const getDecks = await listDecks();
            setDecks(getDecks)
        }
        getDeck();
    }, []);

    // const handleDelete = async (deckId) => {
    //     const result = window.confirm("Are you sure you want to delete this post?");
    //     if (result) {
    //       await deleteDeck(deckId);
          
    //     } 
    //   };

    return (
        <div>

            <button className='btn btn-secondary' onClick={() => history.push('/decks/new')}>
                Create Deck
            </button>
            <Decks decks={decks} />
           
        </div>
    )
}
