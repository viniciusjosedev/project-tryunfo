import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

export default class App extends React.Component {
  state = {
    cardName: '',
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
  };

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
    const { cardTrunfo } = this.state;
    const verific = cardTrunfo === true;
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
    });
  };

  onSaveButtonClick = () => {
    const { listCards, backup } = this.state;
    const dict = this.state;
    delete dict.listCards;
    delete dict.backup;
    listCards.push(dict);
    backup.push(dict);
    this.setState({
      listCards,
      backup,
    }, this.clear);
  };

  onInputChange = ({ target }) => {
    const valor = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: valor,
    }, this.loading);
  };

  excluir = ({ target }) => {
    const { id } = target;
    const { listCards, backup } = this.state;
    const nome = listCards.find((elemento) => elemento.cardName === id);
    if (nome.cardTrunfo === true) {
      this.setState({
        hasTrunfo: false,
      });
    }
    let posicao;
    backup.forEach((elemento, index) => {
      if (elemento === nome) {
        posicao = index;
      }
    });
    console.log(posicao);
    console.log(backup);
    delete backup[posicao];
    const agora = backup;
    this.setState({
      listCards: agora,
      backup: agora,
    });
  };

  search = ({ target }) => {
    const { value } = target;
    const { backup } = this.state;
    if (value.length > 0) {
      const busca = backup.filter((elemento) => elemento.cardName.includes(value));
      this.setState(() => ({
        listCards: busca,
      }));
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
      listCards } = this.state;
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
        <input type="text" data-testid="name-filter" onChange={ this.search } />
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
                  id={ elemento.cardName }
                  data-testid="delete-button"
                  type="submit"
                  onClick={ this.excluir }
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
