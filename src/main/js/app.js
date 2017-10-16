import React from 'react';
import {render} from 'react-dom';


var Board = React.createClass({
    getInitialState: function () {
        return {
            data: [],
            addingSidebarVisibility: false,
            infoSidebarVisibility: false
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
        array[i] = null;
        this.setState({data: array});
    },

    updateProduct: function (product, i) {
        var array = this.state.data;
        array[i] = product;
        this.setState({data: array});
    },

    forEachProduct: function (product, i) {
        if (product) {
            return <Product key={i} index={i}
                            updateOnBoard={this.updateProduct} deleteFromBoard={this.removeProduct}>
                {product}
            </Product>
        } else {
            return null;
        }
    },

    addingNew: function (e) {
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

    showHideAdding: function () {
        this.setState({addingSidebarVisibility: !this.state.addingSidebarVisibility})
    },

    showHideInfo: function () {
        this.setState({infoSidebarVisibility: !this.state.infoSidebarVisibility})
    },

    sortByName: function () {
        var array = this.state.data;
        array.sort(function (a, b) {
            if (!a || !b) {
                return 1;
            } else
                return a.productName.localeCompare(b.productName);
        });
        this.setState({data: array});
    },

    sortByPrice: function () {
        var array = this.state.data;
        array.sort(function (a, b) {
            if (!a || !b) {
                return 1;
            } else
                return parseInt(a.price) - parseInt(b.price);
        });
        this.setState({data: array});
    },

    render: function () {
        return (
            <div className="board">
                <div className="sidebar">
                    {this.state.addingSidebarVisibility &&
                    <form onSubmit={this.addingNew}>
                        Product Name:
                        <input ref="newName" required={true}/>
                        Price:
                        <input ref="newPrice" type="number" min={1} required={true}/>
                        Description:
                        <textarea ref="newDescr"/>
                        <button className="button button1">Save</button>
                    </form>
                    }
                </div>
                <div className="central">
                    <h1>We have only the best for you!</h1>
                    <button onClick={this.showHideAdding} className="button button5">Add new</button>
                    <table>
                        <tbody>
                        <tr>
                            <th onClick={this.sortByName} className="column20">Product Name</th>
                            <th onClick={this.sortByPrice} className="column13">Price</th>
                            <th className="column40">Description</th>
                            <th className="column27" colSpan="2">Commands</th>
                        </tr>
                        {this.state.data.map(this.forEachProduct)}
                        </tbody>
                    </table>
                </div>
                <div className="sidebar">
                    {this.state.infoSidebarVisibility &&
                    <form>
                    </form>
                    }
                </div>
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
        if (product.productName.trim() !== '' && product.price > 0 && product.price < 2000000000) {
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
            alert('Product name should be not empty and 0 < price < 2 billion $!')
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
                <td title={this.props.children.productName}>{this.props.children.productName}</td>
                <td title={this.props.children.price + " $"}>{this.props.children.price + " $"}</td>
                <td title={this.props.children.description}>{this.props.children.description}</td>
                <td>
                    <button className="button button2" onClick={this.edit}>Edit</button>
                </td>
                <td>
                    <button className="button button3" onClick={this.remove}>Remove</button>
                </td>
            </tr>
        )
    },

    renderEdit: function () {
        return (
            <tr>
                <td><input ref="changeName" defaultValue={this.props.children.productName}/></td>
                <td><input ref="changePrice" defaultValue={this.props.children.price} type="number" min={1}
                           max={2000000000}/></td>
                <td><textarea ref="changeDescr" defaultValue={this.props.children.description}/></td>
                <td>
                    <button onClick={this.save} className="button button1">Save</button>
                </td>
                <td>
                    <button onClick={this.cancel} className="button button4">Cancel</button>
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