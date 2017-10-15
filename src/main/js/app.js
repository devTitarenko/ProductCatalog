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
        array[i] = product;
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

    render: function () {
        return (
            <div>
                <button onClick={this.add.bind(null, {productName: "default"})}
                        className="button-info create">Add new
                </button>
                <table>
                    <tbody>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
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
        return {editing: this.props.children.id === undefined}
    },

    edit: function () {
        this.setState({editing: true})
    },

    remove: function () {
        var r = confirm("Do you really want to delete this product?");
        if (r === true) {
            fetch('/product/' + this.props.children.id, {
                method: 'DELETE'
            });
            this.props.deleteFromBoard(this.props.index);
            this.setState({show: false})
        }
    },

    save: function () {
        var val = {
            id: this.props.children.id,
            productName: this.refs.newName.value,
            price: this.refs.newPrice.value,
            description: this.refs.newDescr.value
        };
        console.log('New product' + val);
        fetch('/product', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(val)
        });
        this.props.updateOnBoard(val, this.props.index);
        this.setState({editing: false})
    },

    cancel: function () {
        if (this.props.children.id === undefined) {
            this.props.deleteFromBoard(this.props.index);
        }
        this.setState({editing: false})
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

    renderForm: function () {
        return (
            <tr>
                <td><textarea ref="newName" defaultValue={this.props.children.productName}/></td>
                <td><textarea ref="newPrice" defaultValue={this.props.children.price}/></td>
                <td><textarea ref="newDescr" defaultValue={this.props.children.description}/></td>
                <td>
                    <button className="button-success" onClick={this.save}>Save</button>
                </td>
                <td>
                    <button onClick={this.cancel}>Cancel</button>
                </td>
            </tr>
        )
    },

    render: function () {
        if (this.state.editing) {
            return this.renderForm();
        } else {
            return this.renderNormal();
        }
    }
});


render(<Board/>, document.getElementById('react'));