class App.Views.BooksView extends Backbone.View
  collection: App.Collections.BookCollection
  el: '.books'
  initialize: ->
    @renderAll()

  renderAll: ->
    console.log 'called for renderAll', @$el.length
    @$el.empty()
    @collection.each(@render, @)

  render: (book) ->
    bookView = new App.Views.BookView(model: book)
    @$el.append(bookView.render(yes).el)