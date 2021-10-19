import React, { useEffect, useState } from "react";
import { readDeck, createCard } from '../utils/api'
import { useParams, useHistory } from 'react-router-dom'
import CardStructure from './CardStructure'

export default function AddCard() {
    const history = useHistory()
    const { deckId } = useParams();
    const [back, setBack] = useState("Back of card");
    const [deck, setDeck] = useState([]);
    const [front, setFront] = useState("Front of card");

    
    const handleSub = (event) => {
        event.preventDefault();
        const card = {
          front: front,
          back: back,
          deckId: deckId,
        };
        async function updateCard() {
            await createCard(deckId, card);
          };
          updateCard();
          setFront("Front of card");
          setBack("Back of card");
         history.push(`/decks/${deck.id}`);
      };
    
      useEffect(() => {
        async function load() {
            const getDeck = await readDeck(deckId);
            setDeck(getDeck);
        }
        load();
      }, [deckId]);
    

      return (
        <div>
          <div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/">{deck.name}</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Add Card
                </li>
              </ol>
            </nav>
          </div>
    
          <div>
            <CardStructure front={front} back={back} handleSub={handleSub} setFront={setFront} setBack={setBack}/>
          </div>
        </div>
      );
    }
