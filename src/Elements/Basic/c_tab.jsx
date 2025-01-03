import React, { Component } from "react";

class C_Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  handleTabClick = (index) => {
    this.setState({ activeTab: index });
  };

  render() {
    const { children } = this.props;
    const { activeTab } = this.state;
    const tabCount = React.Children.count(children);

    if (!children || children.length === 0) {
      return <p>No Tabs defined</p>;
    }

    return (
      <div style={this.props.style}>
        <div className="cl_row" style={{ ...this.props.tabStyle, ...{ display: "flex", margin: "2vh auto" } }}>
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              onClick={() => this.handleTabClick(index)}
              style={{
                cursor: "pointer",
                color: "var(--font-color-point-out)",
                fontSize: "var(--font-size-big)",
                fontFamily: "var(--font-family-button)",
                lineHeight: "var(--line-height-big-button)",
                flex: `1 1 ${100 / tabCount}%`,
                color: activeTab === index ? "var(--active)" : this.props.pointOutStyle === true ? "var(--font-color-point-out)" : "var(--font-color)",
                textShadow: activeTab === index ? "var(--font-glowing-activ)" : "none",
                background: activeTab === index ? "linear-gradient(to top,var(--active-background) 0%,var(--active-background-alpha-0) 100%)" : "none",
                border: "none",
                borderBottom: activeTab === index ? "2px solid var(--active)" : "1px solid #ccc",
                fontWeight: activeTab === index ? "bold" : "normal",
                textAlign: "center",
              }}
            >
              {child.props.title || `Tab ${index + 1}`}
            </div>
          ))}
        </div>
        <div style={{ ...this.props.tabContentStyle, ...{ margin: "0 auto" } }}>{React.Children.toArray(children)[activeTab]}</div>
      </div>
    );
  }
}

export default C_Tab;
