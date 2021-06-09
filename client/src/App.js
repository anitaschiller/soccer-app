import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import PlayerForm from './components/PlayerForm';
import ShoppingCart from './pages/ShoppingCart';
import { saveToLocal, loadFromLocal } from './lib/localStorage';

function App() {
  const [players, setPlayers] = useState(
    loadFromLocal('footballPlayers') ?? []
  );
  const [shoppingCart, setShoppingCart] = useState(
    loadFromLocal('shoppingCart') ?? []
  );
  const [activeClub, setActiveClub] = useState(
    loadFromLocal('activeClub') ?? null
  );
  const [clubs, setClubs] = useState(loadFromLocal('footballClubs') ?? []);
  const [isShowingEditModal, setIsShowingEditModal] = useState(false);

  useEffect(() => {
    fetch('/clubs')
      .then((result) => result.json())
      .then((clubs) => setClubs(clubs))
      .catch((error) => console.error(error.message));

    fetch('/players')
      .then((result) => result.json())
      .then((apiPlayers) => setPlayers(apiPlayers))
      .catch((error) => console.log(error.message));
  }, []);

  useEffect(() => {
    if (activeClub) {
      fetch('/shopping-cart/' + activeClub._id)
        .then((result) => result.json())
        .then((shoppingCart) => setShoppingCart(shoppingCart))
        .catch((error) => console.error(error.message));
    }
  }, [activeClub]);

  useEffect(() => {
    saveToLocal('footballPlayers', players);
  }, [players]);

  useEffect(() => {
    saveToLocal('shoppingCart', shoppingCart);
  }, [shoppingCart]);

  useEffect(() => {
    saveToLocal('footballClubs', clubs);
  }, [clubs]);

  useEffect(() => {
    saveToLocal('activeClub', activeClub);
  }, [activeClub]);

  function addPlayer(player) {
    fetch('http://localhost:4000/players', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: player.name,
        price: player.price,
        free_transfer: player.free_transfer,
        club: player.club,
        position: player.position,
        skills: player.skills,
        email: player.email,
      }),
    })
      .then((result) => result.json())
      .then((player) => setPlayers([...players, player])) // TODO: Add a success note on top of the form
      .catch((error) => console.log(error.message));
  }

  function addToShoppingCart(playerToAdd) {
    fetch('http://localhost:4000/shopping-cart/' + activeClub._id, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player: playerToAdd._id }),
    })
      .then((result) => result.json())
      .then((updatedShoppingCart) => setShoppingCart(updatedShoppingCart))
      .catch((error) => console.error(error));
  }

  function deletePlayer(playerToDelete) {
    fetch(`http://localhost:4000/players/${playerToDelete._id}`, {
      method: 'DELETE',
    })
      .then((result) => result.json())
      .then((response) => {
        if (response.data && response.data._id) {
          const playersToKeep = players.filter(
            (player) => player._id !== response.data._id
          );
          setPlayers(playersToKeep);
        } else {
          console.log('Player could not be deleted');
        }
      })
      .catch((error) => console.log(error.message));
  }

  function updatePlayer(playerToEdit) {
    const upToDatePlayers = players.filter(
      (player) => player._id !== playerToEdit._id
    );

    fetch(`http://localhost:4000/players/${playerToEdit._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: playerToEdit.name,
        price: playerToEdit.price,
        free_transfer: playerToEdit.free_transfer,
        club: playerToEdit.club,
        position: playerToEdit.position,
        skills: playerToEdit.skills,
        email: playerToEdit.email,
      }),
    })
      .then((result) => result.json())
      .then((playerToUpdate) =>
        setPlayers([...upToDatePlayers, playerToUpdate])
      )
      .catch((error) => console.log(error.message));

    setIsShowingEditModal(false);
  }

  function removePlayer(playerToRemove) {
    const shoppingCartToUpdate = {
      ...shoppingCart,
      players: shoppingCart.players.filter(
        (player) => player._id !== playerToRemove._id
      ),
    };

    fetch('/shopping-cart/' + activeClub._id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(shoppingCartToUpdate),
    })
      .then((result) => result.json())
      .then((updatedShoppingCart) => setShoppingCart(updatedShoppingCart))
      .catch((error) => console.error(error.message));
  }

  return (
    <>
      <Header
        clubs={clubs}
        numberOfShoppingCartItems={shoppingCart?.players?.length}
        onChangeClub={setActiveClub}
        activeClub={activeClub}
      />
      <main>
        <Switch>
          <Route exact path="/">
            <Home
              players={players}
              onAddToShoppingCart={addToShoppingCart}
              onDeletePlayer={deletePlayer}
              clubs={clubs}
              onAddPlayer={updatePlayer}
              openEditModal={() => setIsShowingEditModal(true)}
              isShowingEditModal={isShowingEditModal}
              activeClub={activeClub}
            />
          </Route>
          <Route path="/addplayer">
            <PlayerForm
              headlineText={'Add a new player'}
              onAddPlayer={addPlayer}
              clubs={clubs}
            />
          </Route>
          <Route path="/cart">
            <ShoppingCart
              shoppingCart={shoppingCart}
              onRemovePlayer={removePlayer}
            />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
