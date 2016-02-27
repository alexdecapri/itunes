var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in.
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.
  //makes more sense to use $http if hitting an API with urls

  	this.getSongData = function(artist) {
  		return $http({
  			method: "JSONP", //some APIs need things requested in a very specific way (like GET)
  		  url: "https://itunes.apple.com/search?term=" + artist + "&callback=JSON_CALLBACK"
  		})
      .then(function(response) {
        var data = response.data.results;
        var searchResultsToDisplay = [];
        data.forEach(function(obj) { //nead that obj in there
          var newObj = {
            AlbumArt: obj.artworkUrl30,
            Artist: obj.artistName,
            Collection: obj.collectionName,
            CollectionPrice: obj.collectionPrice,
            Play: obj.previewUrl,
            Type: obj.wrapperType
          };
          searchResultsToDisplay.push(newObj);
        })
        // console.log(searchResultsToDisplay);
        return searchResultsToDisplay;
      })
  	}

});
