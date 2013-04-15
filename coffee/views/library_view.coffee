class App.Views.LibraryView extends Backbone.View
  el: '#app-container'
  events:
    'showBookSignal': 'showBook'
  initialize: ->
    @render()
    window.Backbone.history.start()
    window.Router = new App.Router()
  render: () ->
    @$el.html(@template(@))

  template: () ->
    Handlebars.compile("<h1>Lol Library page</h1><ul class='books'></ul>")

  showBook: (e, id) ->
    soughtBook = books.get id
    @$el.find('.books').empty().append(new App.Views.BookView(model: soughtBook).render(no).el)
