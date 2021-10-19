import React, { useState, useEffect } from 'react'
import { readDeck } from '../../utils/api'
import { useParams } from 'react-router-dom'
import Cards from '../Cards'

export default function Study() {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();

    useEffect(() => {
        async function load() {
          try {
            const deckCall = await readDeck(deckId);
            setDeck(deckCall);
          } catch (error) {
            console.log(error);
          }
        }
        load();
      }, [deckId]);
    
    
    
    if (deck) {
        return (
          <div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href={`/decks/${deckId}`}>{deck.name}</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Study
                </li>
              </ol>
            </nav>
            <div>
              <h1>Study:{deck.name}</h1>
            </div>
            <Cards cards={deck.cards} />
          </div>
        );
      } else {
        return <p>Loading...</p>;
      }
    }