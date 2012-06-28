var Menu = function (items) {
    var _this = items;

    _this.Count = function () {
        return _this.length;
    };

    _this.Children = function (id) {
        var children = [];

        for (var index = 0; index < _this.Count(); index++) {
            if (id == _this[index].ParentId) {
                children.push(_this[index]);
            }
        }

        return children;
    };

    return _this;
};
/*
var HtmlListMenuWriter = function (domId, menu, writeItemCallback) {
    var _this = [];

    var _domId = domId;
    var _menu = menu;
    var _writeItemCallback = writeItemCallback;

    _this.Write = function () {
        write(0);
    };

    var write = function (id) {

    };

    var writeItem

    return _this;
};*/

var MenuWriter = function (domId, menu, writer) {
    var _this = [];

    var _menu = menu;
    var _domId = domId;
    var _writer = writer;

    _this.Write = function () {
        write(0);
    };

    var write = function (id) {
        var menuItems = _menu.Children(id);
        for (var index = 0; index < menuItems.length; index++) {
            writeItem(menuItems[index]);
            write(menuItems[index].Id);
        };
    };

    var writeItem = function (item) {
        _writer.Write(item);
    };

    return _this;

};

var Writer = function () {

    var _this = [];

    _this.Write = function (domId, item) {
        $('#' + domId).append('<div>' + item.Name + '</div>');
    };

    return _this;
};

var HtmlListWriter = function (domId) {
    var _this = [];
    var _domId = domId;

    _this.Write = function (item) {
        var menu = $('#' + _domId);
        //menu.append('<span id=' + item.Id + '>' + item.Name + '</span>'); ;
        if (menu === null)
            alert('menu is undefined');
        var parentMenu = menu.find("li [id='" + item.ParentId + "']");
        alert(menu.find('#' + item.Id).length);
        /*if (parentMenu === null)
        alert('parentMenu is undefined.');
        var childContainer = parentMenu.find("ul");
        if (childContainer === null) {
        parentMenu.append('<ul></ul>');
        childContainer = parentMenu.find("ul");
        }

        childContainer.append('<li id=' + item.Id + '><span>' + item.Name + '</span></li>');*/
    };

    return _this;
};

$(function () {
    var menu = new Menu(
        [
            { Id: 1, ParentId: 0, Name: 'Parent' },
            { Id: 2, ParentId: 1, Name: 'First child' },
            { Id: 4, ParentId: 2, Name: 'First child child' },
            { Id: 3, ParentId: 1, Name: 'Second child' }
        ]);

    new MenuWriter("menu", menu, new HtmlListWriter('menu')).Write();
});