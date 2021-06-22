let _logoutButton = new LogoutButton;
//деавторизация
_logoutButton.action = function(data) {
    ApiConnector.logout(response => {
        response['success'] ? location.reload() : console.log(response);
    });
};

// Получение информации о пользователе
ApiConnector.current(response => {
    response['success'] ? ProfileWidget.showProfile(response['data']) : console.log(response);
});

// Получение текущих курсов валюты
function clearAndFillStocksTable(data) {
    let _ratesBoard = new RatesBoard();
    _ratesBoard.clearTable();
    _ratesBoard.fillTable(data);
};

ApiConnector.getStocks(response => {
    response['success'] ? clearAndFillStocksTable(response['data']) : console.log(response);
});


// Операции с деньгами
function addMoney2Wallet(object, data) {
    ApiConnector.addMoney(data, response => {
        response['success'] ? ProfileWidget.showProfile(response['data']) : object.setMessage(response['success'], response['error']);
    });
};

let _moneyManager = new MoneyManager();

// пополнение баланса
_moneyManager.addMoneyCallback = function (data) {
    data ? addMoney2Wallet(_moneyManager, data) : console.log(data);
};

// конвертирование валюты
function moneyConverting(object, data) {
    ApiConnector.convertMoney(data, response => {
        response['success'] ? ProfileWidget.showProfile(response['data']) : object.setMessage(response['success'], response['error']);
    });
};
_moneyManager.conversionMoneyCallback = function (data) {
    data ? moneyConverting(_moneyManager, data) : console.log(data);
};
// перевод валюты
function transferMoney2Favorites(object, data) {
    ApiConnector.transferMoney(data, response => {
        response['success'] ? ProfileWidget.showProfile(response['data']) : object.setMessage(response['success'], response['error']);
    });
};

_moneyManager.sendMoneyCallback = function (data) {
    data ? transferMoney2Favorites(_moneyManager, data) : console.log(data);
};

// Работа с избранным
function showFavorites(object, data) {
    object.clearTable();
    object.fillTable(data);
    _moneyManager.updateUsersList(data);
};

let favoritesObject = new FavoritesWidget()
// начальный список избранного
ApiConnector.getFavorites(response => {
    response['success'] ? showFavorites(favoritesObject, response['data']) : favoritesObject.setMessage(response['success'], response['error']);
});
// добавление пользователя в список избранных
favoritesObject.addUserCallback = function (data) {
    ApiConnector.addUserToFavorites(data, response => {
        response['success'] ? showFavorites(favoritesObject, response['data']) : favoritesObject.setMessage(response['success'], response['error']);
    });
};
// удаление пользователя из избранного
favoritesObject.removeUserCallback = function (data) {
    ApiConnector.removeUserFromFavorites(data, response => {
        response['success'] ? showFavorites(favoritesObject, response['data']) : favoritesObject.setMessage(response['success'], response['error']);
    });
};