import React from 'react'
import CardStructure from './CardStructure'
import { updateCard, readDeck} from '../utils/api'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'



export default function EditCard() {

  const history = useHistory();
  const [back, setBack] = useState('');
  const { deckId, cardId } = useParams();
  const [card, setCard] = useState({});
  const [deck, setDeck] = useState([]);
  const [front, setFront] = useState("");


  const handleSub = (event) => {event.preventDefault();
    const editedCard = {...card, front, back,};
    updateCard(editedCard).then((response) => {
      setCard(response);
      history.push(`/decks/${deckId}`);
    });};

    useEffect(() => {
      const abortController = new AbortController();
      async function cardLoad() {
        try {
          const deckInfo = await readDeck(deckId, abortController.signal);
          setDeck(deckInfo);
          setCard(deckInfo.cards.find((card) => card.id + "" === cardId));
          setFront(deckInfo.cards.find((card) => card.id + "" === cardId).front);
          setBack(deckInfo.cards.find((card) => card.id + "" === cardId).back);
        } catch (error) {
          console.log(error);
        }
      }
      cardLoad();
      return () => abortController.abort();
    }, [deckId, cardId]);


    return (
      <div>
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
                Edit Card
              </li>
            </ol>
          </nav>
        </div>
        <h2>Edit Card</h2>
        <div>
        <CardStructure front={front} back={back} handleSub={handleSub} setFront={setFront} setBack={setBack}/>
        </div>
      </div>
    )}