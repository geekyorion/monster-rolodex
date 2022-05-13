import { Component } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import './App.css';

class App extends Component {
  #users = [];

  constructor() {
    super();
    this.state = {
      monsters: []
    };
    
    this.filterMonsters = this.filterMonsters.bind(this);
  }

  filterMonsters(event) {
    const searchTerm = event.target.value;
    if (searchTerm) {
      const filterRegex = new RegExp(event.target.value, 'i');
      this.setState(() => {
        return { monsters: this.#users.filter(monster => filterRegex.test(monster.name))}
      });
    } else {
      this.setState(() => ({ monsters: this.#users }));
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(users => {
        if (users && Array.isArray(users) && users.length) {
          this.#users = users;
          this.setState(() => ({ monsters: users }), () => console.log(this.state));
        }
      }).catch(err => console.log(err));
  }

  render() {
    return (
      <>
        <div className="wrapper">
          <h1 className="app-title">Monster Rolodex</h1>

          <SearchBox
            onChangeHandler={this.filterMonsters}
            className='monsters-search-box'
            placeholder='Search monsters ...'
          />

          <CardList monsters={this.state.monsters} />
        </div>
      </>
    );
  }

}

export default App;
