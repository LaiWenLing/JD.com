
//创建主模块，添加对路由模块的依赖
var myapp=angular.module("myapp",["ngRoute"]);

//注册一个代表购物车的Service
myapp.factory("cartService",function(){
    //创建一个容器，相当于一个购物筐；
    var cart=[];

    var shopCart={
        //添加商品到购物车：商品对象{naem:"商品名称"，number：1}
        add:function(product){
            // 需要判断购物车的数组中，之前是否已经加入过该商品
            // 如果之前已经加入过，则只需要修改购买数量
            for(var i=0; i<cart.length; i++){
                var item=cart[i];
                if(product.name==item.product.name){
                    //说明之前添加过，这里只修改数量
                    item.number++;
                    return;
                }
            }
            //如果执行到这里，说明数组中没有该商品，添加新商品
            cart.push({product:product,number:1});
        },
        //从购物车中删除商品的方法
        remove:function(name){
            //遍历数组，判断数组中是否有相同name的product
            //cart{product:product,number:1}
            for(var i=0 ;i<cart.length; i++){
                if(name==cart[i].product.name){
                    //如果找到了，从数组中删除它
                    cart.splice(i,1);
                    return;
                }
            }
        },
        //查询购物车所有商品
        findAll:function(){
            return cart;
        },
        //清空购物车
        clear:function(){
            cart.length=0;
        }
    }
    return shopCart;         //返回购物车对象
});

//配置路由，功能是由ngRoute模块中提供的一个$routeProvider对象实现的
//所以需要依赖注入$routeProvider
myapp.config(function($routeProvider){
    //进行路由配置
    $routeProvider.when("/",{templateUrl:"pages/productList.html",controller:"productCtrl"});
    $routeProvider.when("/details",{templateUrl:"pages/details.html",controller:"detailsCtrl"});
    $routeProvider.when("/details?:name",{templateUrl:"pages/details.html",controller:"detailsCtrl"});
    $routeProvider.when("/shopping_cart",{templateUrl:"pages/shopping_cart.html",controller:"cartCtrl"});
});

myapp
    .controller("myCtrl",function($scope,$http,$location,cartService){
        //向服务器端发起ajax请求，需要$http service对象
        var url="product.json";
        //$http.get()方法返回的是一个promise对象
        $http.get(url).success(function(data){
            $scope.productList=data;
        });

        //获得购物车中的商品
        $scope.cart=cartService.findAll();

        //响应删除商品的按钮事件
        $scope.remove=function(name){
            cartService.remove(name);
        };
        $scope.clear=cartService.clear();

        //统计购物车商品总数量
        $scope.count=function(){
            var sum=0;
            //遍历数组，统计总数量；
            for(var i=0; i<$scope.cart.length; i++){
                sum+=$scope.cart[i].number;
            }
            return sum;
        };

        //统计购物车商品总金额
        $scope.total=function(){
            var total=0;
            //遍历数组，计算商品总金额
            for(var i=0; i<$scope.cart.length; i++){
                total+=$scope.cart[i].product.price*$scope.cart[i].number;
            }
            return total;
        };

        //鼠标移入让购物框显示
        $scope.show=function(){}

    })

    //商品列表控制器
    .controller("productCtrl",function($scope,$http,cartService){
        var url="product.json";
        $http.get(url).success(function(data){
            $scope.productList=data;
        });
        //响应购买按钮的点击事件
        $scope.add=function(product){
            //调用购物车对象的add方法
            cartService.add(product);
        };
    })
    //详情页控制器
    //依赖注入一个$routeParams
    //angular的路由模块会自动解析url传来的参数（key-value对），并保存到名叫$routeParams的对象中
    //$routeParams={id:1}
    .controller("detailsCtrl",function($scope,$routeParams,cartService,$http){
        var name=$routeParams["name"] || "微软（Microsoft）Xbox One动感家庭欢乐套装（带 Kinect 版本,含3款免费游戏）";

        var url="product.json";
        $http.get(url).success(function(data){
           $scope.productList=data;
        });

        $scope.cart=cartService.findAll();

        // 根据传递的参数(商品名称)获取对应的商品信息
        for(var i=0; i<$scope.productList.length; i++){
            if(name==$scope.productList[i].name){
                $scope.product=$scope.productList[i];
            }
        }

/*
        for(var i=0; i<$scope.cart.length; i++){
            if(name==$scope.cart[i].productList.number){
                $scope.num=$scope.cart[i].number;
            }
        }
*/

        //购买商品事件
        $scope.add=function(){
            //将商品添加到购物车中
            cartService.add($scope.product);
        }

    })

    //购物车页面控制器
    .controller("cartCtrl",function($scope,cartService){
        //获得购物车中的商品
        $scope.cart=cartService.findAll();

        $scope.count=function(){
            var sum=0;
            //遍历数组，统计总数量；
            for(var i=0; i<$scope.cart.length; i++){
                sum+=$scope.cart[i].number;
            }
            return sum;
        };

        //统计购物车商品总金额
        $scope.total=function(){
            var total=0;
            //遍历数组，计算商品总金额
            for(var i=0; i<$scope.cart.length; i++){
                total+=$scope.cart[i].product.price*$scope.cart[i].number;
            }
            return total;
        };

    })


















