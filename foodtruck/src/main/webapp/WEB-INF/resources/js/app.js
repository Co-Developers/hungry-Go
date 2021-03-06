(function() {
	var app = angular.module('foodtruck', [ 'ui.router', 'oc.lazyLoad',
			'ui.select', 'ngSanitize' ]);

	app
			.config(function($stateProvider, $urlRouterProvider) {
				$urlRouterProvider.otherwise('/home');
				$stateProvider
						.state('home', {
							url : '/home',
							templateUrl : 'resources/templates/homepage.html'
						})

						.state(
								'menu',
								{
									url : '/menu',
									templateUrl : 'resources/templates/menu.html',
									resolve : {
										loadFiles : [
												'$ocLazyLoad',
												function($ocLazyLoad) {
													return $ocLazyLoad
															.load([ {
																name : 'menu.ctrl',
																files : [
																		'resources/css/menu.css',
																		'resources/js/menu/menuService.js',
																		'resources/js/menu/menuController.js' ],
																cache : false
															} ]);
												} ]
									}
								})

						.state(
								'admin',
								{
									url : '/admin',
									templateUrl : 'resources/templates/admin/admin.html',
									controller : 'adminCtrl',
									resolve : {
										loadFiles : [
												'$ocLazyLoad',
												function($ocLazyLoad) {
													return $ocLazyLoad
															.load([ {
																name : 'admin.ctrl',
																files : [ 'resources/js/admin/adminController.js' ],
																cache : false
															} ]);
												} ]
									}
								})

						.state(
								'admin.editMenu',
								{
									url : '/admin/editMenu',
									templateUrl : 'resources/templates/admin/editMenu.html',
									controller : 'adminMenuCtrl',
									resolve : {
										loadFiles : [
												'$ocLazyLoad',
												function($ocLazyLoad) {
													return $ocLazyLoad
															.load([ {
																name : 'editmenu.ctrl',
																files : [
																		'resources/css/menu.css',
																		'resources/js/menu/menuService.js',
																		'resources/js/admin/menu/adminMenuService.js',
																		'resources/js/admin/menu/adminMenuController.js' ],
																cache : false
															} ]);
												} ]
									}
								})

						.state(
								'viewOrders',
								{
									url : '/viewOrders',
									templateUrl : 'resources/templates/viewOrders.html',
									resolve : {
										loadFiles : [
												'$ocLazyLoad',
												function($ocLazyLoad) {
													return $ocLazyLoad
															.load([ {
																name : 'order.ctrl',
																files : [
																		'resources/js/order/orderService.js',
																		'resources/js/order/orderController.js' ],
																cache : false
															} ]);
												} ]
									}
								})
						.state(
								'viewBrea',
								{
									url : '/viewBrea',
									templateUrl : 'resources/templates/admin/breatruck.html',
									resolve : {
										loadFiles : [
												'$ocLazyLoad',
												function($ocLazyLoad) {
													return $ocLazyLoad
															.load([ {
																name : 'order.ctrl',
																files : [
																		'resources/js/order/orderService.js',
																		'resources/js/order/orderController.js' ],
																cache : false
															} ]);
												} ]
									}
								})
						.state(
								'viewPomona',
								{
									url : '/viewPomona',
									templateUrl : 'resources/templates/admin/pomonatruck.html',
									resolve : {
										loadFiles : [
												'$ocLazyLoad',
												function($ocLazyLoad) {
													return $ocLazyLoad
															.load([ {
																name : 'order.ctrl',
																files : [
																		'resources/js/order/orderService.js',
																		'resources/js/order/orderController.js' ],
																cache : false
															} ]);
												} ]
									}
								})

						.state(
								'viewdbBar',
								{
									url : '/viewdbBar',
									templateUrl : 'resources/templates/admin/dBartruck.html',
									resolve : {
										loadFiles : [
												'$ocLazyLoad',
												function($ocLazyLoad) {
													return $ocLazyLoad
															.load([ {
																name : 'order.ctrl',
																files : [
																		'resources/js/order/orderService.js',
																		'resources/js/order/orderController.js' ],
																cache : false
															} ]);
												} ]
									}
								})

						.state('contact', {
							url : '/contact',
							templateUrl : 'resources/templates/contact.html'
						})

						.state('about', {
							url : '/about',
							templateUrl : 'resources/templates/aboutus.html'
						})

						.state('checkout', {
							url : '/checkout',
							templateUrl : 'resources/templates/checkout.html'
						})

						.state(
								'orderSuccess',
								{
									url : '/orderSuccess',
									templateUrl : 'resources/templates/orderSuccess.html'
								})

						.state(
								'cart',
								{
									url : '/cart',
									templateUrl : 'resources/templates/cart.html',
									resolve : {
										loadFiles : [
												'$ocLazyLoad',
												function($ocLazyLoad) {
													return $ocLazyLoad
															.load([ {
																name : 'cart.ctrl',
																files : [
																		'resources/css/app.css',
																		'resources/js/cart/cartService.js',
																		'resources/js/cart/cartController.js' ],
																cache : false
															} ]);
												} ]
									}
								});
			});

	app.service('appService', [ '$http', '$q', function($http, $q) {
		this.login = function(userName, password) {
			var defer = $q.defer();
			var data = {
				userName : userName,
				password : password
			};
			$http.post('/user/login', data).then(function success(res) {
				console.log("check here" + res.data);
				if (res.data)
					defer.resolve(res.data);
				else {
					defer.reject();
				}
			});
			return defer.promise;
		};

		this.register = function(formData) {
			var defer = $q.defer();
			$http.post('/user/register', formData).then(function(res) {
				defer.resolve(res.data);
			}, function() {
				defer.reject();
			});
			return defer.promise;
		};
	} ]);

	app.controller('mainCtrl', [
			'$scope',
			'appService',
			'$window',
			'$state',
			'$timeout',
			function($scope, appService, $window, $state, $timeout) {
				$scope.userLoggedIn = false;
				$scope.loginError = false;
				$scope.isAdmin = false;
				$scope.cartItem= JSON.parse($window.sessionStorage.getItem("cartCount"))|| 0;
				
				console.log("sochap"+$scope.cartItem);
				$scope.login = function(user) {
					appService.login(user.userName, user.password).then(
							function success(res) {
								$scope.userLoggedIn = true;
								$scope.userName = user.userName;
								console.log("admin " + $scope.userName);
								user.userName = "";
								user.password = "";
								if ($scope.userName == "admin") {
									$scope.isAdmin = true;
									console.log("admin2 " + $scope.userName);
								}
							}, function failed(error) {
								$scope.userLoggedIn = false;
								$scope.loginError = true;
								$timeout(function() {
									$scope.loginError = false;
								}, 2500);
								user.userName = "";
								user.password = "";
							});

				};

				$scope.register = function(newUser) {
					$scope.userName = newUser.userName;
					var payload = {
						userName : newUser.userName,
						email : newUser.email,
						password : newUser.password
					};
					console.log(payload);
					appService.register(payload).then(function(res) {
						$scope.userLoggedIn = true;
						if ($scope.userName == "admin") {
							$scope.isAdmin = true;
							console.log("admin2 " + $scope.userName);
						}
						newUser.userName = "";
						newUser.email = "";
						newUser.password = "";
						newUser.confirmPassword = "";
					});

				};

				$scope.signOut = function() {
					$scope.userLoggedIn = false;
					$scope.isAdmin = false;
					$state.go("home");
				};
			} ]);
})();