var cart = new Array();
var market = new Array();

//library of food
var names = [
    'Hamburger',
    'Cheeseburger',
    'Cola',
    'Fanta',
    'Sprite',
    'Chips',
    'Fry Potatoes',
    'Chicken Wings',
    'Frog tongue',
    'Cyclops second eye',
    'Unicorn Blood', //11
    'Elves ears',
    'Werewolf tail',
    'Dumplings',
    'Dragon`s egg'
];

function createMarket() {
    names.forEach(function (item, i, arr) {
        var food = new Food(item, i);

        food.setPlace(getRandomPlace());
        food.setPrice(getRandomPrice());
        food.setWeight(getRandomWeight());

        market.push(food);
    });

    renderMarket(market);
}

function getRandomPlace() {
    return 'place' + Math.floor((Math.random() * 3) + 1);
}

function getRandomPrice() {
    return Math.floor((Math.random() * 100) + 1);
}

function getRandomWeight() {
    return Math.floor((Math.random() * 20) + 1);
}

function renderMarket(m) {
    m = shuffle(m);

    for (var i = 0; i < m.length; i++) {
        var food = m[i];

        $('#market').append(renderFoodInMarket(food));
    }
}

function renderFoodInMarket(food) {
    var fWrap = $('<div class="food"><i class="fa fa-cart-plus fa-3x f-buy"></i></div>');
    fWrap[0].setAttribute('food-id', food.getFoodId());

    var name = food.getName().split(' ').join('_');
    var fIcon = $('<img src="images/' + name + '.png" class="f-icon">');

    var fName = $('<span class="f-name">' + food.getName() + '</span>');

    var info = food.getPlace() + '<br>' + food.getPrice() + ' $<br>' + food.getWeight() + ' kg';
    var fInfo = $('<span class="f-info">' + info + '</span>');

    fWrap.prepend(fInfo);
    fWrap.prepend(fName);
    fWrap.prepend(fIcon);

    return fWrap;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function addToCart(foodId) {
    var food = null;

    market.forEach(function (item, i, arr) {
        // console.log(item.getFoodId());
        if (item.getFoodId() === foodId) {
            food = item;

        }
    });

    if (typeof cart[food.getName()] === 'undefined') {
        cart[food.getName()] = new Array();
        cart[food.getName()].count = 1;
        cart[food.getName()].food = food;

        // console.log(cart);

        $('#cart').prepend(renderFoodInCart(food));
    }
    else {
        cart[food.getName()].count += 1;

        var info = cart[food.getName()].count + '   -   ' + food.getPrice() * cart[food.getName()].count + " $";
        $('.food[c-food-id="' + food.getFoodId() + '"]').find('.f-info').text(info);
        // alert(text);
    }
    // console.log(cart);

    $('#cartHead').text('Cart [ ' + getCartTotal() + ' ]');    
}

function renderFoodInCart(food) {
    var fWrap = $('<div class="food"></div>');
    fWrap[0].setAttribute('c-food-id', food.getFoodId());

    var name = food.getName().split(' ').join('_');
    var fIcon = $('<img src="images/' + name + '.png" class="f-icon">');

    var fName = $('<span class="f-name">' + food.getName() + '</span>');

    var info = cart[food.getName()].count + '   -   ' + food.getPrice() * cart[food.getName()].count + " $";
    var fInfo = $('<span class="f-info">' + info + '</span>');

    fWrap.prepend(fInfo);
    fWrap.prepend(fName);
    fWrap.prepend(fIcon);

    return fWrap;
}

function getCartTotal() {
    var total = Object.values(cart);
    // arr.forEach(function (item, i, arr) {
    //     console.log(item);
    // });

    total = total.map(function (item) {
        return item.count * item.food.getPrice();
    }).reduce(function (sum, current) {
        return sum + current;
    });

    
    return total;
}

function buy() {
    var names = Object.keys(cart);
    var prices = Object.values(cart);
    
    if(prices.length > 0)
    {
        $("#popup").show();

        $( "#buy" ).unbind( "click" );

        for (var i = 0; i < names.length; i++){
            var name = names[i] + ' x ' + prices[i].count;
            var price = prices[i].count * prices[i].food.getPrice();

            $('#p-content').append(renderBillItem(name, price));
        }

        $('#p-total').text('Total: ' + getCartTotal() + '$');

        $( "#popup" ).click(function() {
            location.reload();
        });
    } else {
        alert('Buy something!');
    }
}

function renderBillItem(name, price) {
    var idom = $('<div class="b-item"></div>');
    
    var ndom = $('<span class="b-name">'+ name +'</span>');
    var pdom = $('<span class="b-price">'+ price +'</span>');
    
    idom.append(ndom);
    idom.append(pdom);
    
    return idom;
}