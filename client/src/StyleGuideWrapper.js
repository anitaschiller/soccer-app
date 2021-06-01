import PropTypes from 'prop-types';
import GlobalStyles from './GlobalStyles';

function StyleGuideWrapper({ children }) {
  return (
    <>
      <GlobalStyles />
      {children}
    </>
  );
}

StyleGuideWrapper.propTypes = {
  children: PropTypes.array,
};

export default StyleGuideWrapper;
