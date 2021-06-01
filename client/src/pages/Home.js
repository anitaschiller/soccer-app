import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import PlayerCard from '../components/PlayerCard';
import PlayerForm from '../components/PlayerForm';

export default function Home({
  players,
  onAddToShoppingCart,
  onDeletePlayer,
  clubs,
  onAddPlayer,
  openEditModal,
  isShowingEditModal,
  activeClub,
}) {
  const [playerToEdit, setPlayerToEdit] = useState({});

  function openModal(player) {
    setPlayerToEdit(player);
    openEditModal(true);
  }

  return (
    <>
      <Players>
        {players.map((player, index) => (
          <PlayerCard
            key={index}
            player={player}
            onAddToShoppingCart={onAddToShoppingCart}
            onDeletePlayer={onDeletePlayer}
            onOpenEditModal={openModal}
            activeClub={activeClub}
          />
        ))}
        {isShowingEditModal && (
          <FormWrapper>
            <PlayerForm
              headlineText={'Edit player'}
              clubs={clubs}
              playerToEdit={playerToEdit}
              onAddPlayer={onAddPlayer}
            />
          </FormWrapper>
        )}
      </Players>
    </>
  );
}

Home.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object),
  onAddToShoppingCart: PropTypes.func,
  onDeletePlayer: PropTypes.func,
  clubs: PropTypes.arrayOf(PropTypes.object),
  onAddPlayer: PropTypes.func,
  openEditModal: PropTypes.func,
  isShowingEditModal: PropTypes.bool,
  activeClub: PropTypes.object,
};

const Players = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  position: relative;
  margin: 0 1rem;
`;

const FormWrapper = styled.div`
  position: absolute;
  top: 0;
  right: auto;
  left: auto;
  background: white;
  margin: 0 auto;
  width: 100vw;
`;
