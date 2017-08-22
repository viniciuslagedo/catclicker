$(function(){

    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };


    var octopus = {
        addNewNote: function(noteStr, color) {
            model.add({
                content: noteStr,
                date: Date.now(),
                color: color
            });
            view.render();
        },

        getNotes: function() {
            return model.getAllNotes().reverse();
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            var newNoteColor = $('#new-note-color');
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val(), newNoteColor.val());
                newNoteContent.val('');
                newNoteColor.val('');
                e.preventDefault();
            });
            view.render();
        },
        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){
                htmlStr += '<li class="note" style="background-color: #' + note.color +'">'+
                        '<span class="note-date">' + new Date (note.date).toString() + '</span>' +
                        note.content
                    '</li>';
            });
            this.noteList.html( htmlStr );
        }
    };

    octopus.init();
});