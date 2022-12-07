import React from 'react';

export default class Form extends React.Component {
  render() {
    return (
      <>
        <label htmlFor="name-input">
          Nome:
          <input id="name-input" data-testid="name-input" type="text" />
        </label>
        <br />
        <label htmlFor="description-input">
          textarea
          <textarea id="description-input" type="text" data-testid="description-input" />
        </label>
        <br />
        <label htmlFor="attr1-input">
          atributo 1
          <input type="number" name="" id="attr1-input" data-testid="attr1-input" />
        </label>
        <br />
        <label htmlFor="attr2-input">
          atributo 2
          <input type="number" name="" id="attr2-input" data-testid="attr2-input" />
        </label>
        <br />
        <label htmlFor="attr3-input">
          atributo 3
          <input type="number" name="" id="attr3-input" data-testid="attr3-input" />
        </label>
        <br />
        <label htmlFor="image-input">
          imagem
          <input type="text" name="" id="" data-testid="image-input" />
        </label>
        <br />
        <label htmlFor="rare-input">
          raridade
          <select data-testid="rare-input" id="rare-input">
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>
        <br />
        <label htmlFor="trunfo-input">
          super trybe trunfo
          <input type="checkbox" data-testid="trunfo-input" />
        </label>
        <br />
        <button type="submit" id="save-button" data-testid="save-button">Salvar</button>
      </>
    );
  }
}
