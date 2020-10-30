import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };
  }

  onChangeType = (e) => {
    this.setState({
      filters: {
        type: e.target.value,
      },
    });
  };

  fetchData = (url) => {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => this.setState({ pets: data }));
  };

  fetchPets = (e) => {
    if (this.state.filters.type === "cat") {
      this.fetchData("/api/pets?type=cat");
    } else if (this.state.filters.type === "dog") {
      this.fetchData("/api/pets?type=dog");
    } else if (this.state.filters.type === "micropig") {
      this.fetchData("/api/pets?type=micropig");
    } else {
      this.fetchData("/api/pets");
    }
  };

  onAdoptPet = (id) => {
    const pets = this.state.pets.map((pet) => {
      if (pet.id === id) {
        return { ...pet, isAdopted: true };
      }
      return pet;
    });
    this.setState({ pets: pets });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.fetchPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
