import React, {Component} from 'react';
import {render} from 'react-dom';

class App extends Component {
    constructor() {
        super();
        this.state = {
            movies: {},
            data: []
        };
    }

    componentDidMount() {
        fetch('/product/all')
            .then(Response => Response.json())
            .then(responseJson => {
                this.setState({
                    movies: responseJson,
                    data: responseJson
                })
            });
    }

    render() {
        return (
            <div>
                {JSON.stringify(this.state.movies, null, 2)}
                <ProductList products={this.state.data}/>
            </div>
        );
    }
}


class ProductList extends React.Component {
    render() {
        var products = this.props.products.map((product, key) =>
            <Item product={product}/>
        );
        return (
            <table>
                <tbody>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Delete</th>
                </tr>
                {products}
                </tbody>
            </table>
        )
    }
}


class Item extends React.Component {
    constructor() {
        super();
        this.state = {
            show: true
        };
    }

    remove() {
        var r = confirm("Do you really want to delete this product?");
        if (r == true) {
            fetch('/product/' + this.props.product.id, {
                method: 'DELETE'
            });
            this.setState({show: false})
        }
    }

    render() {
        return (
            this.state.show
                ?
                <tr>
                    <td>{this.props.product.productName}</td>
                    <td>{this.props.product.price}</td>
                    <td>{this.props.product.description}</td>
                    <td>
                        <button onClick={this.remove.bind(this)}>Delete</button>
                    </td>
                </tr>
                :
                <div/>
        )
    }
}

render(<App/>, document.getElementById('react'));
