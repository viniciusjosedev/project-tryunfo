import React from 'react';
import PropTypes from 'prop-types';

export default class Form extends React.Component {
  render() {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick } = this.props;
    return (
      <>
        <label htmlFor="name-input">
          Nome:
          <input
            name="cardName"
            value={ cardName }
            id="name-input"
            data-testid="name-input"
            type="text"
            onChange={ onInputChange }
          />
        </label>
        <br />
        <label htmlFor="description-input">
          textarea
          <textarea
            name="cardDescription"
            value={ cardDescription }
            onChange={ onInputChange }
            id="description-input"
            type="text"
            data-testid="description-input"
          />
        </label>
        <br />
        <label htmlFor="attr1-input">
          atributo 1
          <input
            name="cardAttr1"
            value={ cardAttr1 }
            onChange={ onInputChange }
            type="number"
            id="attr1-input"
            data-testid="attr1-input"
          />
        </label>
        <br />
        <label htmlFor="attr2-input">
          atributo 2
          <input
            name="cardAttr2"
            value={ cardAttr2 }
            onChange={ onInputChange }
            type="number"
            id="attr2-input"
            data-testid="attr2-input"
          />
        </label>
        <br />
        <label htmlFor="attr3-input">
          atributo 3
          <input
            name="cardAttr3"
            value={ cardAttr3 }
            onChange={ onInputChange }
            type="number"
            id="attr3-input"
            data-testid="attr3-input"
          />
        </label>
        <br />
        <label htmlFor="image-input">
          imagem
          <input
            name="cardImage"
            value={ cardImage }
            onChange={ onInputChange }
            type="text"
            id=""
            data-testid="image-input"
          />
        </label>
        <br />
        <label htmlFor="rare-input">
          raridade
          <select
            name="cardRare"
            data-testid="rare-input"
            id="rare-input"
            value={ cardRare }
            onChange={ onInputChange }
          >
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>
        <br />
        <label htmlFor="trunfo-input">
          super trybe trunfo
          <input
            name="cardTrunfo"
            type="checkbox"
            data-testid="trunfo-input"
            checked={ cardTrunfo }
            onChange={ onInputChange }
          />
        </label>
        <br />
        <button
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
          type="submit"
          id="save-button"
          data-testid="save-button"
        >
          Salvar
        </button>
      </>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.string,
  hasTrunfo: PropTypes.string,
  isSaveButtonDisabled: PropTypes.string,
  onInputChange: PropTypes.string,
  onSaveButtonClick: PropTypes.string,
};

Form.defaultProps = {
  cardName: '',
  cardDescription: '',
  cardAttr1: '',
  cardAttr2: '',
  cardAttr3: '',
  cardImage: '',
  cardRare: '',
  cardTrunfo: '',
  hasTrunfo: '',
  isSaveButtonDisabled: '',
  onInputChange: '',
  onSaveButtonClick: '',
};
