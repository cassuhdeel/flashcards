import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import { updateDeck, readDeck } from '../../utils/api'



export default function EditDeck() {

const history = useHistory()
const {deckId} =useParams
const fill = { name:'', description:'' }
const [deck, setDeck] = useState(fill)
const [description, setDescription] = useState(deck.description)
const [name, setName] = useState('')

const handleDescChange = (event) => {
    setDescription(event.target.value)
}
const handleSub = (event) => {
    event.preventDefault();
    const currentDeck = {
        ...deck, name, description
    } 
    updateDeck(currentDeck)
    .then(response => {
        setDeck(response)
        history.push(`/decks/${deck.id}`)
    })}
     const handleName = (event) => {
         setName(event.target.value)
     }

     useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck() {
          const getDecks = await readDeck(deckId, abortController.signal);
          setDeck(getDecks);
          setName(getDecks.name);
          setDescription(getDecks.description);
        }
        loadDeck();
        return () => abortController.abort();
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
                <a href={`/decks/${deckId}`}>{deck.name}</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Edit Deck
              </li>
            </ol>
          </nav>
        </div>
        <h2>Edit Deck</h2>
        <div>
          <form>
            <div className="form-group">
              <label className="name">Name</label>
              <input
                type="name"
                className="form-control"
                id="exampleFormControlInput1"
                value={name}
                onChange={handleName}
              />
            </div>
            <div className="form-group">
              <label className="exampleFormControlTextarea1">Description</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={description}
                onChange={handleDescChange}
              ></textarea>
            </div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => history.push(`/decks/${deck.id}`)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" onClick={handleSub}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
