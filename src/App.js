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
    cardTrunfo: '',
    hasTrunfo: '',
    isSaveButtonDisabled: true,
  };

  loadingteste = () => {
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
    // console.log(this.state.isSaveButtonDisabled);
  };

  onInputChange = ({ target }) => {
    const valor = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: valor,
    }, this.loadingteste);
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
      isSaveButtonDisabled } = this.state;
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
      </div>
    );
  }
}
