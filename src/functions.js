const complet = (verific, busca = []) => {
  this.setState({
    checked: verific,
  }, () => {
    this.setState({
      listCards: [busca],
      inputDisabled: true,
    });
  });
};

export default function functionComplement(target, value, backup) {
  if (value === true) {
    const busca = backup.find((elemento) => elemento.cardTrunfo === true);
    if (busca !== undefined) {
      complet(target.checked, busca);
    } else {
      complet(target.checked);
    }
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
}
