class App.Views.BookView extends Backbone.View
  model: App.Models.Book

  render: (short = no) ->
    viewHTML =  if short
      Handlebars.compile("<li class='book'><span>Book, which is called {{title}} </span><a href='#books/{{id}}'>Check it out</a></li>")(title: @model.get('title'), id: @model.get('id'))
    else
      Handlebars.compile("<div class='book full'><span>Book. Title - {{title}}. Id - {{id}}. Cid - {{cid}}</li>")(title: @model.get('title'), id: @model.get('id'), cid: @model.cid)

    @setElement(viewHTML)
    console.log @el
    @

