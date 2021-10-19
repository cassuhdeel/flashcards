import React, { useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';

export default function Cards({cards}) {
    const [front, setFront] = useState(true)
    let [card, setCard] = useState(0)
    const deckId = useParams()
    const history = useHistory()
    
    function nextBtn() {
        if (card + 1 === cards.length) {
            end()
            return 
        }
        setCard(card + 1)
        setFront(() => !front)
    }

    function end() {
        const result = window.confirm(
            "Restart cards? Click cancel to return to the home page.");
          if (result === true) {
            setCard(0);
          } else {
            history.push("/");
          }
        };
      
        const flipBtn = () => {
            setFront(() => !front);
          };
          if (!cards) {
            return null;
          }
        
          if (cards.length > 2) {
            return (
              <ul className="deck-cards">
                {cards && (
                  <li>
                    <div className="card" key={cards[card].id}>
                      <div className="card-body">
                        <h5 className="card-title">
                          Card {card + 1} of {cards.length}
                        </h5>
                        <p className="card-text">
                          {front
                            ? cards[card].front
                            : cards[card].back}
                        </p>
                        <button className="btn btn-secondary" onClick={flipBtn}>
                          Flip
                        </button>
                        {front ? null : (
                          <button className="btn btn-primary" onClick={nextBtn}>
                            Next
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            );
          } else {
            return (
              <div>
                <h3>Not enough cards</h3>
                <p>
                  You need at least 3 cards to study this deck. There are{" "}
                  {cards ? cards.length : 0} cards in this deck.
                </p>
                <Link
                  to={`/decks/${deckId}/cards/new`}
                  className="btn btn-primary ml-3"
                >
                  Add Cards
                </Link>
              </div>
            );
          }
        }
