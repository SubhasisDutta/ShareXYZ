angular.module('app').controller('mvLoanCheckinCtrl', function($scope,$routeParams,$resource,$location,mvNotifier) {
  var books = $resource("/api/book/:_id");
  $scope.book = books.get({_id: $routeParams.isbn});
  var loan = $resource("/api/loan/available/:isbn/:branch_id/:card_no");
  $scope.available_loan=loan.get({isbn:$routeParams.isbn,branch_id:$routeParams.branch_id,card_no:$routeParams.card_no});


  $scope.checkInBook = function(){
      console.log($routeParams.isbn,$routeParams.branch_id);
      var check_out_res = $resource("/api/loan/checkin");
      var response = check_out_res.save({isbn:$routeParams.isbn,branch_id:$routeParams.branch_id,card_no:$scope.borrower_option},function(){
          console.log(response);
          mvNotifier.notify(response.status);
          $scope.available_book=available_books.get({_id:$routeParams.isbn,_branchId:$routeParams.branch_id});
      });
  };


});