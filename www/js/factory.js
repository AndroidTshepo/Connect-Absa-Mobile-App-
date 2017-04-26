app.factory('defaultService', function ($http, $q) {
   return {
       data: function(dataINF) {
           // the $http API is based on the deferred/promise APIs exposed by the $q service
           return $http({
                          //My API pointing to the php back-end
                            url: 'http://localhost:8080/commentBackend/index.php',
                            method: "POST",
                            data: $.param(dataINF),
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                       })
                        .then(function(response) {
	                        console.log("====Inside default Service====");
	                        console.log(response);
                           //if (typeof response.data === 'object') {
                                return response;
                   }, function(response) {
                       // something went wrong
                       return $q.reject(response);
           });
       }
   };
});
