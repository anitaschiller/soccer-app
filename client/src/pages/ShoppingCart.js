import PropTypes from 'prop-types';
import styled from 'styled-components';
import ThemedButton from '../components/ThemedButton';

export default function ShoppingCart({ shoppingCart, onRemovePlayer }) {
  const totalSum = shoppingCart?.transferSum ?? 0;
  const formatedSum = (sum) =>
    new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(sum);

  return (
    <>
      <h2>Shopping Cart</h2>
      <Table>
        <thead>
          <tr>
            <th>Player name</th>
            <th className="align-right">Player price</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {shoppingCart?.players?.map((orderLine) => (
            <tr data-testid="saved-player" key={orderLine.player._id}>
              <td>{orderLine.player.name}</td>
              <td className="align-right">
                {formatedSum(orderLine.player.price)}
              </td>
              <td className="align-right">
                <EditIcon onClick={() => onRemovePlayer(orderLine.player)}>
                  &times;
                </EditIcon>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Sum total:</td>
            <td className="align-right">{formatedSum(totalSum)}</td>
            <td>&nbsp;</td>
          </tr>
        </tfoot>
      </Table>
      <ThemedButton text="Checkout" />
    </>
  );
}

ShoppingCart.propTypes = {
  shoppingCart: PropTypes.object,
  onRemovePlayer: PropTypes.func,
};

const Table = styled.table`
  margin: 0 auto;
  border-collapse: collapse;
  border-radius: 0.5rem;
  font-size: 0.9em;
  font-family: sans-serif;
  width: 90%;
  max-width: 45rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  td,
  th {
    text-align: left;
    padding: 0.75rem 0.9rem;
  }
  th,
  tfoot {
    padding: 0.75rem;
  }

  th {
    background: hsl(160, 5%, 40%);
  }
  th:first-child {
    border-top-left-radius: 0.5rem;
  }
  th:last-child {
    border-top-right-radius: 0.5rem;
  }

  thead tr {
    color: hsl(160, 10%, 96%);
  }
  tbody tr {
    border-bottom: 1px solid hsl(160, 5%, 90%);
  }
  tbody tr:nth-of-type(even) {
    background-color: hsl(160, 5%, 90%);
  }
  tbody tr:last-of-type {
    border-bottom: 2px solid hsl(160, 50%, 50%);
  }
  tfoot td {
    border-top: 2px solid hsl(160, 5%, 90%);
    font-size: 1.25rem;
    padding: 0.75rem 0.9rem;
    font-weight: bold;
    color: hsl(160, 50%, 50%);
  }

  .align-right {
    text-align: right;
  }
`;

const EditIcon = styled.div`
  border: 2px solid hsl(160, 5%, 70%);
  border-radius: 50%;
  cursor: pointer;
  display: inline-grid;
  margin-right: 0.5rem;
  place-items: center;
  position: relative;
  width: 2.2rem;
  height: 2.2rem;
`;
