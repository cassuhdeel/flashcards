import React, { useState } from "react";
import { createDeck } from '../../utils/api'
import { useHistory } from 'react-router-dom'


export default function CreateDeck() {
const history = useHistory()
const [createDecks, setCreateDecks] = useState({name: '', description:''})

const change=(event)=>{
  setCreateDecks({...createDecks,[event.target.name]:event.target.value})
}

async function handleSub(event) {event.preventDefault();
  const response = await createDeck(createDecks);
  history.push(`/decks/${response.id}`);
}


return (
  <div>
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
    </div>

    <div>
      <form onSubmit={handleSub}>
        <div className="form-group">
          <label className="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Deck Name"
            onChange={change}
            value={createDecks.name}
            style={{ width: "100%" }}
          />
        </div>
        <div className="form-group">
          <label className="description">Description</label>
          <textarea
            name="description"
            id="description"
            type="textarea"
            rows="3"
            placeholder="Brief description of deck"
            onChange={change}
            value={createDecks.description}
            style={{ width: "100%" }}
          ></textarea>
        </div>
        <button type="button" className="btn btn-secondary" onClick={() => history.push("/")}
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