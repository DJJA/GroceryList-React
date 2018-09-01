import React, { Component } from 'react';
import GroceryItem from './GroceryItem';
import './GroceryList.css';

class GroceryList extends Component {

  handleSubmit(e) {
    e.preventDefault();
    
    // Check if it's valid
    let groceryName = this.refs.groceryName.value;
    if (groceryName.trim() === '') {
      alert('The name cannot be empty.');
      return;
    }
    if (this.props.groceries.findIndex(x => x.name.toLowerCase() === groceryName.toLowerCase()) !== -1) {
      alert('\'' + groceryName + '\' is already on the list.');
      return;
    }

    this.props.addNewGrocery({
      checked: false,
      name: groceryName,
      amount: this.refs.groceryAmount.value
    });

    this.refs.groceryName.value = '';
    this.refs.groceryAmount.value = 1;
  }

  handleOnDelete(id) {
    this.props.onDelete(id);
  }

  handleOnMoveUp(id) {
    this.props.onMoveUp(id);
  }

  handleOnMoveDown(id) {
    this.props.onMoveDown(id);
  }

  handleOnCheckedChanged(id) {
    this.props.onCheckedChanged(id);
  }

  handleOnAmountChanged(id, newAmount) {
    this.props.onAmountChanged(id, newAmount);
  }

  render() {
    let groceryItems;
    if (this.props.groceries && this.props.groceries.length > 0) {
      groceryItems = this.props.groceries.map(grocery => {
        return (
          <GroceryItem 
            grocery={grocery} 
            onDelete={this.handleOnDelete.bind(this)} 
            onMoveUp={this.handleOnMoveUp.bind(this)} 
            onMoveDown={this.handleOnMoveDown.bind(this)} 
            onCheckedChanged={this.handleOnCheckedChanged.bind(this)} 
            onAmountChanged={this.handleOnAmountChanged.bind(this)} 
          />
        );
      });
    } else {
      groceryItems = 'No items yet...'
    }

    return (
      <div className="GroceryList">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" placeholder="Name..." ref="groceryName" />
          <input type="number" className="numberInput" defaultValue="1" min="1" max="99" ref="groceryAmount" />
          <input type="submit" value="Add" />
        </form>
        <div className="GroceryListItemsContainer">
          {groceryItems}
        </div>
      </div>
    );
  }
}

export default GroceryList;
