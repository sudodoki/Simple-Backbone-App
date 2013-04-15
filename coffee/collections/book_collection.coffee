class App.Collections.BookCollection extends Backbone.Collection
  model: App.Models.Book
  localStorage: new Store('bookShelf')
