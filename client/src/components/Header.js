import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as Football } from '../assets/football.svg';
import Logo from '../assets/dfb_logo.png';

export default function Header({ numberOfShoppingCartItems }) {
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

  a {
    text-decoration: none;
    color: hsl(340, 10%, 5%);
  }

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

const ShoppingCartDisplay = styled.section`
  display: flex;
  align-items: center;

  font-weight: ${(props) => props.highlight && 'bold'};
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
