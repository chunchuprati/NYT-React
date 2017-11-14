//Include React
import React from 'react';

// Component Creation
var Saved = React.createClass({

    getInitialState:function(){
        return{
            savedArticles:[]
        }
    },

    clickToDelete:function(result){
        this.props.deleteArticle(result);
    },

    componentWillReceiveProps: function(nextProps){
        var that = this;
        console.log(nextProps);
        var myResults = nextProps.savedArticles.map(function(search,i){
            var boundClick = that.clickToDelete.bind(that, search);
            return <div className="list-group-item" key={i}><a href={search.url} target="_blank">{search.title}</a><br />{search.date}<br />
            <button type="button" className="btn btn-success" style={{'float':'right','marginTop':'-39px'}} onClick={boundClick}>Delete</button></div>
        })

        this.setState({savedArticles:myResults});
    },

    // Here we render our Function

    render:function(){
        return(
            <div className="panel panel-success">
                <div className="panel-heading">
                    <h3 className="panel-title text-center"><strong>Saved Articles</strong></h3>
                </div>
                <div className="panel-body">

                        {/* Here We are map a function  to loop through an array*/}

                        {this.state.savedArticles}

                </div>
            </div>             
        )
    }

});


// Export the component back for use in other files
export default Saved;