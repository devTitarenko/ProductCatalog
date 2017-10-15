import React from 'react';
import {render} from 'react-dom';


var Board = React.createClass({
    getInitialState: function () {
        return {
            data: []
        }
    },

    componentDidMount: function () {
        fetch('/product/all')
            .then(Response => Response.json())
            .then(responseJson => {
                this.setState({
                    data: responseJson
                })
            });
    },

    add: function (product) {
        var array = this.state.data;
        array.push(product);
        this.setState({data: array});
    },

    removeProduct: function (i) {
        var array = this.state.data;
        array.splice(i, 1);
        this.setState({data: array});
    },

    updateProduct: function (product, i) {
        var array = this.state.data;
        product.id !== null ? array[i] = product : array.push(product);
        this.setState({data: array});
    },

    forEachProduct: function (product, i) {
        return (
            <Product key={i} index={i}
                     updateOnBoard={this.updateProduct} deleteFromBoard={this.removeProduct}>
                {product}
            </Product>
        )
    },

    addingForm: function (e) {
        var product = {
            productName: this.refs.newName.value,
            price: this.refs.newPrice.value,
            description: this.refs.newDescr.value
        };
        this.add(product);
        this.refs.newName.value = null;
        this.refs.newPrice.value = null;
        this.refs.newDescr.value = null;
        e.preventDefault();
    },

    render: function () {
        return (
            <div className="board">
                <form onSubmit={this.addingForm}>
                    <input ref="newName" required={true}/>
                    <input ref="newPrice" type="number" min={1} required={true}/>
                    <textarea ref="newDescr"/>
                    <button className="button-info create">Add new</button>
                </form>
                <br/>
                <table>
                    <tbody>
                    <tr>
                        <th className="column30">Product Name</th>
                        <th className="column10">Price</th>
                        <th className="column40">Description</th>
                        <th className="column10">Edit</th>
                        <th className="column10">Delete</th>
                    </tr>
                    {this.state.data.map(this.forEachProduct)}
                    </tbody>
                </table>
            </div>
        );
    }
});


var Product = React.createClass({
    getInitialState: function () {
        return {editing: false}
    },

    componentDidMount: function () {
        if (!this.props.children.id) {
            this.save();
        }
    },

    edit: function () {
        this.setState({editing: true})
    },

    remove: function () {
        var answer = confirm("Do you really want to delete this product?");
        if (answer === true) {
            fetch('/product/' + this.props.children.id, {
                method: 'DELETE'
            });
            this.props.deleteFromBoard(this.props.index);
            this.setState({show: false})
        }
    },

    save: function () {
        var product;
        if (this.props.children.id) {
            product = {
                id: this.props.children.id,
                productName: this.refs.changeName.value,
                price: this.refs.changePrice.value,
                description: this.refs.changeDescr.value,
            }
        } else {
            product = {
                id: this.props.children.id,
                productName: this.props.children.productName,
                price: this.props.children.price,
                description: this.props.children.description
            }
        }
        console.log('New product: ' + JSON.stringify(product, null, 2));
        if (product.productName.trim() !== '' && product.price > 0) {
            fetch('/product', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product)
            }).then(response => {
                if (response.status === 200) {
                    response.json().then(responseJson => {
                        product.id = responseJson.savedId;
                    });
                    this.props.updateOnBoard(product, this.props.index);
                    this.setState({editing: false})
                } else {
                    if (!product.id) {
                        this.props.deleteFromBoard(this.props.index);
                    }
                    alert('Looks like there was a problem. Status Code: ' + response.status);
                }
            }).catch(err => {
                console.log('Fetch Error: ', err);
            });
        } else {
            alert('Product name should be not empty and price > 0 !')
        }
    },

    cancel: function () {
        if (!this.props.children.id) {
            this.props.deleteFromBoard(this.props.index);
        } else {
            this.setState({editing: false})
        }
    },

    renderNormal: function () {
        return (
            <tr>
                <td>{this.props.children.productName}</td>
                <td>{this.props.children.price}</td>
                <td>{this.props.children.description}</td>
                <td>
                    <button className="button-primary" onClick={this.edit}>Edit</button>
                </td>
                <td>
                    <button className="button-danger" onClick={this.remove}>Remove</button>
                </td>
            </tr>
        )
    },

    renderEdit: function () {
        return (
            <tr>
                <td><input ref="changeName" defaultValue={this.props.children.productName}/></td>
                <td><input ref="changePrice" defaultValue={this.props.children.price} type="number" min={1}/></td>
                <td><textarea ref="changeDescr" defaultValue={this.props.children.description}/></td>
                <td>
                    <button onClick={this.save} className="button-success">Save</button>
                </td>
                <td>
                    <button onClick={this.cancel}>Cancel</button>
                </td>
            </tr>
        )
    },

    render: function () {
        if (this.state.editing) {
            return this.renderEdit();
        } else {
            return this.renderNormal();
        }
    }
});


render(<Board/>, document.getElementById('react'));