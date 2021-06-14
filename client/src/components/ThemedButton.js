import { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ThemeContext from '../context/ThemeContext';

export default function ThemedButton({ text }) {
  const { activeClub } = useContext(ThemeContext);

  return (
    <Flexbox>
      <Button style={{ background: activeClub.color }}>{text}</Button>
    </Flexbox>
  );
}

const Flexbox = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  color: white;
  border-radius: 0.5rem;
  border: none;
  margin: 2rem;
  text-align: center;
  padding: 1rem;
`;

ThemedButton.propTypes = {
  text: PropTypes.string,
};
