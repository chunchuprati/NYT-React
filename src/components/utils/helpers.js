// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// New York Times API
var nytAPI = "f1a7fcef37c5472fb77d910720e8abb9";

// Helper functions
var helpers = {
    runQuery:function(topic,startYear,endYear){
	//Figure out the geolocation
		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytAPI + "&q=" + topic + "&begin_date=" + startYear + "0101&end_date=" + endYear + "0101";
        return axios.get(queryUR)
        .then(function(response){
            
            var newResults = [];
            var fullResults = response.data.response.docs;
            var counter = 0;

            // Get first 5 Articles that have 3 components
            for (var i =0; i<fullResults.length; i++){
                if(counter>4){
                    return newResults;
                }
                if(fullResults[counter].headline.main && fullResults[counter].pub_date && fullResults[counter].web_url) {
                    newResults.push(fullResults[counter]);
                    counter++;
                }
            }
            return newResults;
        })
    },
    // This function posts saved articles to our database.
	postArticle: function(title, date, url){
        
                axios.post('/api/saved', {title: title, date: date, url: url})
                .then(function(results){
        
                    console.log("Posted to MongoDB");
                    return(results);
                })
            }
}


// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;