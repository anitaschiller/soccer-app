import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as Football } from '../assets/football.svg';
import { ReactComponent as UserCircle } from '../assets/user_circle.svg';
import Logo from '../assets/dfb_logo.png';

export default function Header({
  clubs,
  numberOfShoppingCartItems,
  onChangeClub,
  activeClub,
}) {
  const [showClubSelector, setShowClubSelector] = useState(false);

  const renderClubs = (clubs) =>
    clubs.map((club) => (
      <li
        onClick={() => {
          onChangeClub(club);
          setShowClubSelector(!showClubSelector);
        }}
      >
        {club.name}
      </li>
    ));

  return (
    <HeaderNavigation>
      <NavLink to="/">
        <img src={Logo} width="64" height="64" alt="Logo" />
      </NavLink>

      <h1>German Fußball Transfer Market</h1>

      <NavLink to="/addplayer">
        <ShoppingCartDisplay>
          <PlusIcon>+</PlusIcon>
          <span>Add player</span>
        </ShoppingCartDisplay>
      </NavLink>

      <UserProfile
        href="/#"
        onClick={(event) => {
          event.preventDefault();
          setShowClubSelector(!showClubSelector);
        }}
      >
        <FlexWrapper>
          <UserCircle />
          <span>{activeClub && activeClub.name}</span>
        </FlexWrapper>

        {showClubSelector && <ClubSelector>{renderClubs(clubs)}</ClubSelector>}
      </UserProfile>

      <NavLink to="/cart">
        <ShoppingCartDisplay highlight={numberOfShoppingCartItems}>
          <Football /> {numberOfShoppingCartItems}{' '}
          {numberOfShoppingCartItems === 0 || numberOfShoppingCartItems > 1
            ? 'items'
            : 'item'}
        </ShoppingCartDisplay>
      </NavLink>
    </HeaderNavigation>
  );
}

const HeaderNavigation = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  background: white;
  position: ${(props) => (props.isStatic ? 'static' : 'fixed')};
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;

  a {
    text-decoration: none;
    color: hsl(340, 10%, 5%);
  }
`;

const UserProfile = styled.a`
  position: relative;

  svg {
    width: 2.8rem;
    height: 2.8rem;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;

  span {
    width: 12rem;
    margin-left: 0.5rem;
  }
`;

const ClubSelector = styled.ul`
  background: white;
  border-radius: 0.7rem;
  box-shadow: 0 0.3rem 0.5rem rgba(30, 30, 30, 0.4);
  list-style: none;
  margin: 0.5rem 0 0 0;
  padding: 1rem;
  position: absolute;
  width: 16rem;
  z-index: 100;
  li {
    margin-bottom: 0.3rem;
  }
  li:hover {
    color: hsl(160, 60%, 50%);
  }
`;

const ShoppingCartDisplay = styled.section`
  display: flex;
  align-items: center;

  font-weight: ${(props) => props.highlight && 'bold'};

  svg {
    width: 3rem;
    margin-right: 0.7rem;
  }

  svg:hover {
    transform: rotate(45deg);
  }

  svg path.st25 {
    fill: hsl(340, 60%, 50%);
  }
`;

const PlusIcon = styled.span`
  display: inline-grid;
  place-items: center;
  font-size: 1.4rem;
  background: hsl(160, 60%, 50%);
  color: hsl(160, 5%, 90%);
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  margin-right: 0.7rem;
`;
