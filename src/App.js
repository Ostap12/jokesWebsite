import React, {Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import InputNum from './components/InputNum';
import ListOfJokes from './components/ListOfJokes'
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jokes: [],
            itemsPerLoad: 1,
            categories: '[nerdy, explicit]',
            disabled: null,
            buttons: [
                {
                    title: 'Select All',
                    types: '[nerdy, explicit]'
                },
                {
                    title: 'Nerdy',
                    types: '[nerdy]'
                },
                {
                    title: 'Explicit',
                    types: '[explicit]'
                }
            ]
        };
    }

    //     getJoke() {
//         axios.get('http://api.icndb.com/jokes/random/')
//             .then(response => {
//                 this.setState({joke: response.data.value.joke});
//             }).catch(error => {
//             console.log(error);
//         });
//     }

    //     loadCategories() {
//         axios.get("http://api.icndb.com/categories")
//             .then(response => {
//                 this.setState({
//                     categories: response.data.value,
//                     currentInfo: response.data.length + " categories loaded"
//                 });
//             })
//             .catch(error => {
//                 this.setState({
//                     currentInfo: "Cannot load category",
//                 });
//             });
//     }

    loadJoke = () => {
        const {itemsPerLoad, categories} = this.state;
        const url = "https://api.icndb.com/jokes/random/" + itemsPerLoad + "?limitTo=" + categories;
        axios.get(url)
            .then(response => response.data)
            .then(data =>
                this.setState({
                    jokes: data.value
                })
            );
    };

    componentWillMount() {
        this.loadJoke();
    }

    itemsPerLoad = async event => {
        const targetElement = event.target.value;
        if (targetElement >= 1 && targetElement <= 10) {
            await this.setState({itemsPerLoad: targetElement});
            this.loadJoke();
        }
    };

    changeCategory = async(type, index) => {
        await this.setState({
            categories: type,
            disabled: index
        });
        this.loadJoke();
    };

    render() {
        const {jokes, itemsPerLoad, buttons} = this.state;
        return (
            <div className="container">
                <h1 className="text-center">Chuck Norris Jokes</h1>
                <div className="row">
                    <h3 >Results per load</h3>
                    <div className="col-1">
                        <input
                            type="number"
                            className="form-control"
                            step="1"
                            value={itemsPerLoad}
                            onChange={this.itemsPerLoad}
                            min="1"
                            max="10"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        {buttons.map((button, index) => {
                            return (
                                <button
                                    key={index}
                                    style={{margin: "10px"}}
                                    type="button"
                                    disabled={index === this.state.disabled}
                                    className="btn btn-info"
                                    onClick={() => this.changeCategory(button.types, index)}
                                >
                                    {button.title}
                                </button>
                            );
                        })}
                    </div>
                    <br/>
                    <div className="col-4">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => this.loadJoke()}
                        >
                            Refresh!
                        </button>
                    </div>
                </div>
                <ListOfJokes jokes={jokes}/>
            </div>
        );
    }
}


export default App;
