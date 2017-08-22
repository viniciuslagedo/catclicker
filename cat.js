$(function() {
    var model = {
        adminVisible: false,
        currentCat: null,
        cats: [
            {
                name: 'Isha',
                clickCounter: 0,
                src: 'images/cat0.jfif'
            },
            {
                name: 'Jhon',
                clickCounter: 0,
                src: 'images/cat1.jfif'
            },
            {
                name: 'Peter',
                clickCounter: 0,
                src: 'images/cat2.jfif'
            },
            {
                name: 'Lyla',
                clickCounter: 0,
                src: 'images/cat3.jfif'
            },
            {
                name: 'Lycan',
                clickCounter: 0,
                src: 'images/cat4.jfif'
            }
        ]
    };

    var octopus = {
        toggleAdmin: function () {
            model.adminVisible = !model.adminVisible;
            detailView.render();
        },
        getAdminVisible: function () {
            return model.adminVisible;
        },
        getCurrentCat: function () {
            return model.currentCat;
        },
        setCurrentCat: function (cat) {
            model.currentCat = cat;
            detailView.render();
        },
        putCat: function (cat) {
            model.currentCat = cat;
            detailView.render();
        },
        increaseCatClick: function (index) {
            model.currentCat.clickCounter++;
            detailView.render();
        },
        getAllCats: function () {
            return model.cats;
        },
        init: function () {
            model.currentCat = model.cats[0];

            listView.init();
            detailView.init();
        }
    };

    var listView = {
        init: function () {
            this.catList = $('.list-cats');
            this.render();
        },
        render: function() {
            var cats = octopus.getAllCats();
            this.catList.html('');
            for (var i = 0; i < cats.length; i++) {
                var cat = cats[i];
                this.catList.append('<p>' + cat.name + '</p>');
                this.catList.children('p').eq(i).click((function(cat) {
                    return function() {
                        octopus.setCurrentCat(cat);
                    };
                })(cat));
            }
        }
    };

    var detailView = {
        init: function() {
            this.name = $('.display-cat .name');
            this.image = $('.display-cat img');
            this.counter = $('.display-cat .counter');
            this.adminArea = $('#admin-area');
            this.nameField = $('.display-cat input#nome');
            this.imageField = $('.display-cat input#src');
            this.counterField = $('.display-cat input#counter');

            $('.display-cat img').click(function() {
                octopus.increaseCatClick();
            });

            $('#admin-button').click(function() {
                octopus.toggleAdmin();
            });

            this.render();
        },
        render: function() {
            //Get Currents
            var currentCat = octopus.getCurrentCat();
            var adminVisible = octopus.getAdminVisible();
            
            //Template
            this.name.text(currentCat.name);
            this.counter.text(currentCat.clickCounter);
            this.image.attr('src', currentCat.src);

            //Admin
            if (adminVisible) {
                this.adminArea.show();
            } else {
                this.adminArea.hide();
            }

            //Form
            this.nameField.val(currentCat.name);
            this.imageField.val(currentCat.src);
            this.counterField.val(currentCat.clickCounter);
        }
    };

    octopus.init();

});