function Food(n, i) {
    var id = i;
    var name = n;
    var place = null;
    var price = null;
    var weight = null;

    this.getFoodId = function () {
        return id;
    };
    this.getName = function () {
        return name;
    };
    this.getPlace = function () {
        return place;
    };
    this.getPrice = function () {
        return price;
    };
    this.getWeight = function () {
        return weight;
    };

    this.setPlace = function (newPlace) {
        place = newPlace;
    };
    this.setPrice = function (newPrice) {
        if (newPrice > 0) price = newPrice;
    };
    this.setWeight = function (newWeight) {
        if (newWeight > 0) weight = newWeight;
    };
}