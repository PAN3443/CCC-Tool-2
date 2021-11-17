import React, { Component } from "react";

class Counter extends Component {
  //state = {
  //value: this.props.counter.value, // remove this because of single source of truth, => we need a controlled component (has not his own local state, is totaly controlled by its parent)
  //imageUrl: "https://picsum.photos/200",
  //tags: [], //"tag1", "tag2", "tag3"],
  //};

  styles = {
    width: "3vw",
    fontWeight: "bold",
  }; // don't need this because of controlled component

  componentDidUpdate(prevProps, prevState) {
    console.log("Counter - Updated");
    console.log("prevProps", prevProps);
    console.log("prevState", prevState);

    if (prevProps.counter.value !== this.props.counter.value) {
      // Ajax to get/set data from the Server
    }
  }

  componentWillUnmount() {
    console.log("Counter - Unmount");
    // perfect to do a clean up (if we have e.g. timers, etc) to provide memory leaks
  }

  /*constructor() {
    super(); // we need a super before
    //console.log("Constructor", this); // with super its now not undefined any more
    this.handleIncrement = this.handleIncrement.bind(this);
    /********************************************************************************************** 
    * we bind the 'this' of the method "handleIncrement" to the 'this'of this object and create a new function.
    * We replace the old function with the new one.
    *********************************************************************************************** /
  }

  handleIncrement() {
    //console.log("Ingrement Clicked", this); // => "Ingrement Clicked", undefined ... because this is undefined, we need to define it (Binding Event Handlers)
    /********************************************************************************************** 
    * obj.method() => "this" would recomment the object
    * function() => "this" would give a reference to the window object, but is the strict-mode is enabled it will return a undefined
    * we need a constructor
    *********************************************************************************************** /
  }*/

  // As Alternative without the Contructor we can do the binding with an Arrow function, which gives an clearer overview
  /*handleIncrement = () => {
    //console.log("Ingrement Clicked", this);
    //this.state.value++; // react will not update the view in the browser, we need to use the method this.setState of the component
    this.setState({ value: this.state.value + 1 });
    /**********************************************************************************************
     * setState tells react that the state of this component is going to change.
     * => somewhere in the future the render() method is called, but we don't know when (asynchronous call)
     * it will check which dom element in render is affected from the new state and will change this element
     *********************************************************************************************** /
  };*/

  // now we want to pass Event Arguments

  /*handleIncrement = () => {
    //product) => {console.log(product); In render() => this.handleIncrement({ product });
    this.setState({ value: this.state.value + 1 });
  };*/ render() {
    return (
      <div>
        <span style={this.styles} className={this.getBadgeClasses()}>
          {this.formatCount()}
        </span>
        <button
          /*onClick={() => {
            this.handleIncrement();
          }}*/
          onClick={() => this.props.onIncrement(this.props.counter)}
          // we could also transfer the id, but also the reference to this object

          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        <button onClick={() => this.props.onDelete(this.props.counter.id)} className="btn btn-danger btn-sm m-2">
          Delete
        </button>
      </div>
    );

    /*
    //console.log('props', this.props); // every react component has properties 'props' e.g. value, selected, hidden .... (key is special and not in props) and also the children are in props
    return (
      <div>
        {this.props.children}
        <span style={this.styles} className={this.getBadgeClasses()}>
          {this.formatCount()}
        </span>
        <button
          onClick={() => {
            this.handleIncrement();
          }}
          style={{ fontSize: "1.5vh" }}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
      </div>
    );*/

    /*return (
      <React.Fragment>
        {this.state.tags.length === 0 && "Please create a new tag!"}
        {this.renderTags()}
      </React.Fragment>
    );*/
    /**********************************************************************************************
     * how does this work => {this.state.tags.length === 0 && "Please create a new tag!"}
     * first is an boolean, second is a string
     * true && false => false
     * true && "Hi" => "Hi" // Javascript will transcript not boolean to truthly and falsely. An emty sting => falsely, not empty string => truthly
     * true && "Hi" && 1 => 1 // three truthly => javascript give the last operant
     * instead of an string another jsx expresion is also possible e.g. {this.state.tags.length === 0 && <p>Please create a new tag!</p>}
     ***********************************************************************************************/

    /*return (
      <React.Fragment>
        <img src={this.state.imageUrl} alt=""/>
      </React.Fragment>
    );*/
  }

  renderTags() {
    if (this.state.tags.length === 0) return <p>There are no tags!</p>;

    return (
      <ul>
        {this.state.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";

    classes += this.props.counter.value === 0 ? "warning" : "primary";

    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;

    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
