import React, { Component } from 'react';
import './GroceryItem.css';

class GroceryItem extends Component {
  delete(id) {
    this.props.onDelete(id);
  }

  moveUp(id) {
    this.props.onMoveUp(id);
  }

  moveDown(id) {
    this.props.onMoveDown(id);
  }

  checkedChanged(id) {
    this.props.onCheckedChanged(id);
  }

  amountChanged(e) {
    this.props.onAmountChanged(this.props.grocery.name, e.target.value);
  }

  render() {
    return (
      <div className="GroceryItem" style={{borderColor: ( this.props.grocery.checked ? '#95a5a6'/* gray */ : this.props.grocery.itemColor)}}>
        <input type="checkbox" checked={this.props.grocery.checked} onChange={this.checkedChanged.bind(this, this.props.grocery.name)} />
        <input type="number" className="numberInput" min="1" max="99" value={this.props.grocery.amount} onChange={this.amountChanged.bind(this)} disabled={this.props.grocery.checked} />
        <div className={this.props.grocery.checked ? 'checked' : ''}>{this.props.grocery.name}</div>
        <button type="button" onClick={this.moveDown.bind(this, this.props.grocery.name)} disabled={this.props.grocery.checked}>Move down</button>
        <button type="button" onClick={this.moveUp.bind(this, this.props.grocery.name)} disabled={this.props.grocery.checked}>Move up</button>
        <button type="button" onClick={this.delete.bind(this, this.props.grocery.name)}>Remove</button>
      </div>
    );
  }
}

export default GroceryItem;
