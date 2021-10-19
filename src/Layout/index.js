import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import EditCard from "./EditCard";
import EditDeck from "./Deck/EditDeck";
import CreateDeck from "./Deck/CreateDeck";
import { Route, Switch } from "react-router-dom";
import Study from "./Deck/Study";
import AddCard from "./AddCard";
import Deck from "./Deck/Deck";



function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
        <NotFound />
        </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
