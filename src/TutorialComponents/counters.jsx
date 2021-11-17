import React, { Component } from "react"; // imrc + tab
import Counter from "./counter";

class Counters extends Component {
  // cc + tab


  render() {
    const { onIncrement, onDelete, onReset, counters } = this.props;

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button onClick={onReset} className="btn btn-primary btn-sm m-2">
          Reset
        </button>
        {counters.map((c) => (
          <Counter
            key={c.id}
            onIncrement={onIncrement}
            onDelete={onDelete}
            counter={c}
          />
        ))}
      </div>
    );
  }
}

export default Counters;

/*********************************
 * Counter OLD before object destructuring
 */

/*

class Counters extends Component {
  // cc + tab

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button
          onClick={this.props.onReset}
          className="btn btn-primary btn-sm m-2"
        >
          Reset
        </button>
        {this.props.counters.map((c) => (
          <Counter
            key={c.id}
            onIncrement={this.props.onIncrement}
            onDelete={this.props.onDelete}
            counter={c}
          />
        ))}
      </div>
    );
  }
}

export default Counters;

/*********************************
 * Counter OLD before lift up the counters to the App Component
 */

/*
class Counters extends Component {
  // cc + tab

  state = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
  };

  handleDelete = (counterID) => {

    //console.log("Event Handler Called", counterID);

    /******
     * We don't want to remove a component. We want to define the counter list new and then let React react. :D
     * /
    /*const counters_new = this.state.counters.filter((c) => c.id !== counterID);
    this.setState({ counters: counters_new });* /
    // or if bouth names are equal we can simplify this:
    const counters = this.state.counters.filter((c) => c.id !== counterID);
    this.setState({ counters });
  }; // we need to define an Event, we do this in the probs (Event: onDelete)

  handleIncrement = (counter) => {
    const counters = [...this.state.counters]; // ... to clone the array, with references
    //counter[0].value++; // with this we would modify the state counters values directly and this is a big no in React!
    const index = counters.indexOf(counter);
    counters[index] = { ...counter }; // replace the reference of first entry to a reference to the transfered counter and update this value
    counters[index].value++;
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button
          onClick={this.handleReset}
          className="btn btn-primary btn-sm m-2"
        >
          Reset
        </button>
        {this.state.counters.map((c) => (
          <Counter
            key={c.id} // key value is used internally by react
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
            // we remove this props because with more props it will be ugly, we now transfer counter itself, because it already has all the informations for the props
            //id={c.id} // we can't use key so we have to add additional id so we have access to this value
            //value={c.value}
            counter={c}

          />
        ))}
      </div>
    );

    /***** with children
     * return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {this.state.counters.map((c) => (
          <Counter id={c.id} key={c.id} value={c.value}>
            <h4>Counter #{c.id} </h4>
          </Counter>
        ))}
      </div>
    );

     * /
  }
}

export default Counters;*/

