import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

export default class App extends React.Component {
  state = { cardName: '',
    cardDescription: '',
    cardAttr1: '',
    cardAttr2: '',
    cardAttr3: '',
    cardImage: '',
    cardRare: '',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    listCards: [],
    backup: [],
    checked: false,
    inputDisabled: false };

  loading = () => {
    const { cardName, cardDescription, cardImage,
      cardRare, cardAttr1, cardAttr2, cardAttr3 } = this.state;
    const limitUp = 90;
    const limitDown = 0;
    const soma = 210;
    if (cardName !== ''
    && cardDescription !== '' && cardImage !== '' && cardRare !== ''
    && Number(cardAttr1) <= limitUp && Number(cardAttr1) >= limitDown
    && Number(cardAttr2) <= limitUp && Number(cardAttr3) >= limitDown
    && Number(cardAttr3) <= limitUp && Number(cardAttr2) >= limitDown
    && Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3) <= soma) {
      this.setState(() => ({
        isSaveButtonDisabled: false,
      }));
    } else {
      this.setState(() => ({
        isSaveButtonDisabled: true,
      }));
    }
  };

  clear = () => {
    const { backup } = this.state;
    const verific = backup.some((elemento) => elemento.cardTrunfo === true);
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      hasTrunfo: verific,
      isSaveButtonDisabled: true,
      checked: false,
      inputDisabled: false,
      listCards: backup,
    });
  };

  onSaveButtonClick = () => {
    const { backup } = this.state;
    backup.push(this.state);
    this.setState({
      backup,
    }, this.clear);
  };

  onInputChange = ({ target }) => {
    const valor = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: valor }, this.loading);
  };

  excluir = (name) => {
    const { listCards, backup } = this.state;
    const nome = listCards.find((elemento) => elemento.cardName === name);
    if (nome.cardTrunfo === true) {
      this.setState({
        hasTrunfo: false,
      });
    }
    const agora = backup.filter((elemento) => elemento !== nome);
    this.setState({
      backup: agora,
      listCards: agora,
    });
  };

  complet = (verific, busca) => {
    if (busca !== undefined) {
      this.setState({
        checked: verific,
      }, () => {
        this.setState({
          listCards: [busca],
          inputDisabled: true,
        });
      });
    } else {
      this.setState({
        checked: verific,
      }, () => {
        this.setState({
          listCards: [],
          inputDisabled: true,
        });
      });
    }
  };

  search = ({ target }) => {
    let { value } = target;
    const { backup } = this.state;
    value = value === 'todas' ? '' : value;
    value = target.type === 'checkbox' ? target.checked : value;
    if (String(value).length > 0) {
      if (value === true) {
        const busca = backup.find((elemento) => elemento.cardTrunfo === true);
        this.complet(target.checked, busca);
      }
      if (value === false) {
        this.setState({
          checked: target.checked,
        }, () => {
          this.setState({
            listCards: backup,
            inputDisabled: false,
          });
        });
      }
      if (value === 'normal' || value === 'raro' || value === 'muito raro') {
        const busca = backup.filter((elemento) => elemento.cardRare === value);
        this.setState(() => ({
          listCards: busca,
        }));
      } else {
        const busca = backup.filter((elemento) => elemento.cardName.includes(value));
        this.setState(() => ({
          listCards: busca,
        }));
      }
    } else {
      this.setState({
        listCards: backup,
      });
    }
  };

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
      listCards,
      checked,
      inputDisabled } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardTrunfo={ cardTrunfo }
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardImage={ cardImage }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardRare={ cardRare }
          onInputChange={ this.onInputChange }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card
          cardName={ cardName }
          cardTrunfo={ cardTrunfo }
          cardImage={ cardImage }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardRare={ cardRare }
          cardDescription={ cardDescription }
          hasTrunfo={ hasTrunfo }
        />
        <input
          type="text"
          data-testid="name-filter"
          onChange={ this.search }
          disabled={ inputDisabled }
        />
        <select
          onClick={ this.search }
          data-testid="rare-filter"
          disabled={ inputDisabled }
        >
          <option value="todas">Todas</option>
          <option value="normal">Normal</option>
          <option value="raro">Raro</option>
          <option value="muito raro">Muito Raro</option>
        </select>
        <label htmlFor="filter-checkbox">
          Filtrar por Super Trunfo
          <input
            type="checkbox"
            id="filter-checkbox"
            checked={ checked }
            data-testid="trunfo-filter"
            onChange={ this.search }
          />
        </label>
        {
          listCards.length > 0 ? listCards.map(
            (elemento) => (
              <div key={ elemento.cardName } className="cartasRenderizadas">
                <Card
                  cardName={ elemento.cardName }
                  cardTrunfo={ elemento.cardTrunfo }
                  cardImage={ elemento.cardImage }
                  cardAttr1={ elemento.cardAttr1 }
                  cardAttr2={ elemento.cardAttr2 }
                  cardAttr3={ elemento.cardAttr3 }
                  cardRare={ elemento.cardRare }
                  cardDescription={ elemento.cardDescription }
                  hasTrunfo={ elemento.hasTrunfo }
                />
                <button
                  // id={ elemento.cardName }
                  data-testid="delete-button"
                  type="submit"
                  onClick={ () => this.excluir(elemento.cardName) }
                >
                  Excluir
                </button>
              </div>
            ),
          ) : ''
        }
      </div>
    );
  }
}
