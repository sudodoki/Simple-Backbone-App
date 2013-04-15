window.App =
  Models: {}
  Views: {}
  Collections: {}

class App.Router extends Backbone.Router
  routes:
    '' : 'home',
    'books/:id' : 'viewBook'
    'books': 'books',
    'books/flush': 'deleteCollection'
  home: ->
    console.log 'home, sweet home'

  viewBook: (id)->
    $('#app-container').trigger 'showBookSignal', id

  books: ->
    window.books = new App.Collections.BookCollection()
    books.fetch()
    console.log 'books loaded', books
    new App.Views.BooksView(collection: books)
    # IndexView.render()

  deleteBooksCollection: ->
    new App.Collections.BookCollection().localStorage._clear()

$ ->
  ###
  SEED INFO, kinda
  randArr = ["New", "Model", "Can", "Shoot", "Star"]
  books =  new App.Collections.BookCollection()
  for i in [1..5]
    randomTitle = (shuffled = _.shuffle(randArr))[0] + ' ' + shuffled[1]
    books.create({title: randomTitle})
  books.save()
  ###

  window.history.replaceState('', '', '/')
  new App.Views.LibraryView()