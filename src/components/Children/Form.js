// Include React
import React from 'react';

class Form extends React.Component {

    // Here We set a generic state Association

    constructor(props) {
        super(props);
        this.state = {
            topic:"",
            startYear:"",
            endYear:""
        };
        this.handleChange = this.handleChange.bind(this);
      }

	// This function will respond to the user input 
    handleChange(event) {

    	// Here we create syntax to capture any change in text to the query terms (pre-search).
        var newState ={};
        console.log(event.target.id);
        newState[event.target.id] = event.target.value;
        console.log(newState);
        this.setState(newState);

    }

    // When a user submits... 
    handleClick(){

    // Set the parent to have the search term
        this.props.setTerm(this.state.topic, this.state.startYear, this.state.endYear);

    }

    render() {
      return (
        <div className="panel panel-primary">
            <div className="panel-heading">
                <h2 className="panel-title text-center"><strong>Search</strong></h2>
            </div>
            <div className="panel-body text-center">

                <form action="">
                    <div className="form-group">
                        <h4 className=""><strong>Topic</strong></h4>
                        <input type="text" className="form-control text-center" id="topic" value={this.state.topic} onChange={this.handleChange} required/>
                        <br/>

                        <h4 className=""><strong>Star tYear</strong></h4>
                        <input type="text" className="form-control text-center" id="startYear" value={this.state.startYear} onChange={this.handleChange} required/>
                        <br/>

                        <h4 className=""><strong>End Year</strong></h4>
                        <input type="text" className="form-control text-center" id="endYear"value={this.state.endYear} onChange={this.handleChange} required/>
                        <br/>

                        <button type="button" className="btn btn-primary" onClick={this.handleClick}>Search</button>
                    </div>
                </form>
            </div>
        </div>
    );
    }
  }

// Export the component back for use in other files
export default Form;