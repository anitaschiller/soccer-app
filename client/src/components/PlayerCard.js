import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReactComponent as Football } from '../assets/football.svg';
import { ReactComponent as Pen } from '../assets/pencil.svg';

export default function PlayerCard({
  player,
  onAddToShoppingCart,
  onDeletePlayer,
  onOpenEditModal,
  activeClub,
}) {
  return (
    <Card>
      {activeClub && (
        <ShoppingCart onClick={() => onAddToShoppingCart(player)}>
          <Football />
        </ShoppingCart>
      )}
      <h3>{player.name}</h3>
      <p>{player.price}</p>
      <p>{player.club}</p>
      <p>{player.position}</p>
      <a href={`mailto:${player.email}`}>{player.email}</a>
      <EditBar>
        <EditIcon onClick={() => onOpenEditModal(player)}>
          <StyledPen />
        </EditIcon>
        <EditIcon onClick={() => onDeletePlayer(player)}>
          <DeleteFunction>&times;</DeleteFunction>
        </EditIcon>
      </EditBar>
    </Card>
  );
}

PlayerCard.propTypes = {
  player: PropTypes.object,
  onAddToShoppingCart: PropTypes.func,
  onDeletePlayer: PropTypes.func,
  onOpenEditModal: PropTypes.func,
  activeClub: PropTypes.object,
};

const Card = styled.article`
  background: hsl(160, 60%, 50%);
  border-radius: 0.4rem;
  color: hsl(160, 96%, 96%);
  padding: 1.2rem 1rem;
  height: 12rem;
  min-width: calc((100% - 1rem) / 3);
  position: relative;

  h3 {
    margin-top: 0;
    position: relative;
  }

  p {
    margin: 0.3rem 0;
  }

  a {
    color: hsl(160, 10%, 20%);
  }
`;

const EditBar = styled.div`
  position: absolute;
  bottom: 1.2rem;
  right: 0.2rem;
`;

const EditIcon = styled.div`
  border: 2px solid white;
  border-radius: 50%;
  cursor: pointer;
  display: inline-grid;
  margin-right: 0.5rem;
  place-items: center;
  position: relative;
  width: 2.2rem;
  height: 2.2rem;
`;

const DeleteFunction = styled.span`
  color: hsl(340, 60%, 50%);
  font-size: 1.3rem;
`;

const StyledPen = styled(Pen)`
  fill: white;
  height: 1rem;
  width: 1rem;
`;

const ShoppingCart = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  height: 2.8rem;
  width: 2.8rem;
  padding: 0;
  position: absolute;
  right: 0.2rem;
  top: 0.5rem;
  z-index: 10;
`;
