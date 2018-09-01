import React, { Component } from 'react';
import GroceryList from './Components/GroceryList';
import './App.css';

class App extends Component {
  constructor() {
    super();
    
  }

  componentWillMount() {
    this.setState({
      groceries: [
        // {
        //   checked: false,
        //   name: 'Appel',
        //   amount: 8,
        //   itemColor: this.getRandomColor()
        // },
        // {
        //   checked: false,
        //   name: 'Peer',
        //   amount: 3,
        //   itemColor: this.getRandomColor()
        // },
        // {
        //   checked: false,
        //   name: 'Banaan',
        //   amount: 4,
        //   itemColor: this.getRandomColor()
        // },
        // {
        //   checked: true,
        //   name: 'Kiwi',
        //   amount: 1,
        //   itemColor: this.getRandomColor()
        // }
      ]
    });
  }

  getRandomColor() {
    var color = '#66539C';  // Random color

    try {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", "http://www.colr.org/json/color/random", false); // async false
      xmlhttp.send();                                                      // HTTPS does not allow calls to HTTP

      if (xmlhttp.readyState === XMLHttpRequest.DONE) {                    // XMLHttpRequest.DONE == 4
        if (xmlhttp.status === 200) {
            let obj = JSON.parse(xmlhttp.response);
            color = '#' + obj.new_color;
        } else {
            color = '#000000';
        }
      }
    } catch (ex) {
      console.log(ex);
    }

    return color;
  }

  handleAddGrocery(grocery) {
    let groceries = this.state.groceries;

    // Give the item a border color
    grocery.itemColor = this.getRandomColor();

    // groceries.push(grocery);       // Adds it to the bottom of the array
    groceries.splice(0,0, grocery);   // Adds it to the top of the array

    this.setState({groceries:groceries});
  }

  handleDeleteGrocery(id) {
    let groceries = this.state.groceries;
    let index = groceries.findIndex(x => x.name === id);
    groceries.splice(index, 1);
    this.setState({groceries:groceries});
  }

  handleMoveUpGrocery(id) {
    let groceries = this.state.groceries;
    let index = groceries.findIndex(x => x.name === id);

    if (index === 0) return;                                            // Already at the top of the list
    groceries.splice(index - 1, 0, groceries.splice(index, 1).pop());   // Move item up in array

    this.setState({groceries:groceries});
  }

  handleMoveDownGrocery(id) {
    let groceries = this.state.groceries;
    let index = groceries.findIndex(x => x.name === id);

    if (index === groceries.length - 1) return;                                 // Already at the bottom of the list
    if (index === (groceries.findIndex(x => x.checked === true) - 1)) return;   // Already at the bottom of the unchecked items
    groceries.splice(index + 1, 0, groceries.splice(index, 1).pop());           // Move item down in array

    this.setState({groceries:groceries});
  }

  handleCheckedChangedGrocery(id) {
    let groceries = this.state.groceries;
    let index = groceries.findIndex(x => x.name === id);

    groceries[index].checked = !groceries[index].checked;

    // Change position in the list
    if (groceries[index].checked) {
      let indexFirstChecked = groceries.findIndex(x => x.checked === true && x.name !== id);
      let indexInsert;
      if (indexFirstChecked < 0) {
        indexInsert = groceries.length - 1;
      } else {
        indexInsert = indexFirstChecked - 1;
      }
      // Move the current item above this one
      groceries.splice(indexInsert, 0, groceries.splice(index, 1).pop());
    } else {
      // Move it to the top of the list
      groceries.splice(0, 0, groceries.splice(index, 1).pop());
    }

    this.setState({groceries:groceries});
  }

  handleAmountChangedGrocery(id, newAmount) {
    let groceries = this.state.groceries;
    let index = groceries.findIndex(x => x.name === id);

    groceries[index].amount = newAmount;

    this.setState({groceries:groceries});
  }

  render() {
    return (
      <div className="App">
        <h2>Grocery List</h2>
        <GroceryList 
          groceries={this.state.groceries} 
          addNewGrocery={this.handleAddGrocery.bind(this)} 
          onDelete={this.handleDeleteGrocery.bind(this)} 
          onMoveUp={this.handleMoveUpGrocery.bind(this)} 
          onMoveDown={this.handleMoveDownGrocery.bind(this)} 
          onCheckedChanged={this.handleCheckedChangedGrocery.bind(this)} 
          onAmountChanged={this.handleAmountChangedGrocery.bind(this)} 
        />
      </div>
    );
  }
}

export default App;
