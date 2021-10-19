import React from 'react';
import { useHistory } from 'react-router-dom';
import { deleteDeck } from '../../utils/api';

export default function Decks({decks}) {
const history = useHistory()

return (
    <ul>
        {decks.map((deck) =>
        <li key={deck.id}>
            <div>
                <div>
                    <h4>{deck.name}</h4>
                    <h5>{deck.cards.length} cards</h5>
                    <p>{deck.description}</p>
                    <a href={`/decks/${deck.id}`} className='btn btn-secondary'>
                        View
                    </a>
                    <a href={`/decks/${deck.id}/study`} className="btn btn-primary">
                        Study
                    </a>
                    <a href="/" className="btn btn-danger" onClick={(event) => {event.preventDefault();
                        if (window.confirm(
                            "Delete this deck? You won't be able to recover it.")
                            ) {
                            deleteDeck(`${deck.id}`);
                            history.go("/");
                            }}}>
                        Delete
                    </a>
                </div>
            </div>
        </li>
        )}
    </ul>
)
}