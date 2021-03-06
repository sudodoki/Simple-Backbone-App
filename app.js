// Generated by CoffeeScript 1.6.2
var _ref, _ref1, _ref2, _ref3, _ref4, _ref5,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

window.App = {
  Models: {},
  Views: {},
  Collections: {}
};

App.Router = (function(_super) {
  __extends(Router, _super);

  function Router() {
    _ref = Router.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Router.prototype.routes = {
    '': 'home',
    'books/:id': 'viewBook',
    'books': 'books',
    'books/flush': 'deleteCollection'
  };

  Router.prototype.home = function() {
    return console.log('home, sweet home');
  };

  Router.prototype.viewBook = function(id) {
    return $('#app-container').trigger('showBookSignal', id);
  };

  Router.prototype.books = function() {
    window.books = new App.Collections.BookCollection();
    books.fetch();
    console.log('books loaded', books);
    return new App.Views.BooksView({
      collection: books
    });
  };

  Router.prototype.deleteBooksCollection = function() {
    return new App.Collections.BookCollection().localStorage._clear();
  };

  return Router;

})(Backbone.Router);

$(function() {
  /*
  SEED INFO, kinda
  randArr = ["New", "Model", "Can", "Shoot", "Star"]
  books =  new App.Collections.BookCollection()
  for i in [1..5]
    randomTitle = (shuffled = _.shuffle(randArr))[0] + ' ' + shuffled[1]
    books.create({title: randomTitle})
  books.save()
  */
  window.history.replaceState('', '', '/');
  return new App.Views.LibraryView();
});

App.Models.Book = (function(_super) {
  __extends(Book, _super);

  function Book() {
    _ref1 = Book.__super__.constructor.apply(this, arguments);
    return _ref1;
  }

  Book.prototype.localStorage = new Backbone.LocalStorage("bookShelf");

  return Book;

})(Backbone.Model);

App.Collections.BookCollection = (function(_super) {
  __extends(BookCollection, _super);

  function BookCollection() {
    _ref2 = BookCollection.__super__.constructor.apply(this, arguments);
    return _ref2;
  }

  BookCollection.prototype.model = App.Models.Book;

  BookCollection.prototype.localStorage = new Store('bookShelf');

  return BookCollection;

})(Backbone.Collection);

App.Views.BookView = (function(_super) {
  __extends(BookView, _super);

  function BookView() {
    _ref3 = BookView.__super__.constructor.apply(this, arguments);
    return _ref3;
  }

  BookView.prototype.model = App.Models.Book;

  BookView.prototype.render = function(short) {
    var viewHTML;

    if (short == null) {
      short = false;
    }
    viewHTML = short ? Handlebars.compile("<li class='book'><span>Book, which is called {{title}} </span><a href='#books/{{id}}'>Check it out</a></li>")({
      title: this.model.get('title'),
      id: this.model.get('id')
    }) : Handlebars.compile("<div class='book full'><span>Book. Title - {{title}}. Id - {{id}}. Cid - {{cid}}</li>")({
      title: this.model.get('title'),
      id: this.model.get('id'),
      cid: this.model.cid
    });
    this.setElement(viewHTML);
    console.log(this.el);
    return this;
  };

  return BookView;

})(Backbone.View);

App.Views.BooksView = (function(_super) {
  __extends(BooksView, _super);

  function BooksView() {
    _ref4 = BooksView.__super__.constructor.apply(this, arguments);
    return _ref4;
  }

  BooksView.prototype.collection = App.Collections.BookCollection;

  BooksView.prototype.el = '.books';

  BooksView.prototype.initialize = function() {
    return this.renderAll();
  };

  BooksView.prototype.renderAll = function() {
    console.log('called for renderAll', this.$el.length);
    this.$el.empty();
    return this.collection.each(this.render, this);
  };

  BooksView.prototype.render = function(book) {
    var bookView;

    bookView = new App.Views.BookView({
      model: book
    });
    return this.$el.append(bookView.render(true).el);
  };

  return BooksView;

})(Backbone.View);

App.Views.LibraryView = (function(_super) {
  __extends(LibraryView, _super);

  function LibraryView() {
    _ref5 = LibraryView.__super__.constructor.apply(this, arguments);
    return _ref5;
  }

  LibraryView.prototype.el = '#app-container';

  LibraryView.prototype.events = {
    'showBookSignal': 'showBook'
  };

  LibraryView.prototype.initialize = function() {
    this.render();
    window.Backbone.history.start();
    return window.Router = new App.Router();
  };

  LibraryView.prototype.render = function() {
    return this.$el.html(this.template(this));
  };

  LibraryView.prototype.template = function() {
    return Handlebars.compile("<h1>Lol Library page</h1><ul class='books'></ul>");
  };

  LibraryView.prototype.showBook = function(e, id) {
    var soughtBook;

    soughtBook = books.get(id);
    return this.$el.find('.books').empty().append(new App.Views.BookView({
      model: soughtBook
    }).render(false).el);
  };

  return LibraryView;

})(Backbone.View);
