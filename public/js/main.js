/*
    Todo APP with JQuery
    https://www.github.com/kutsalkiremitci
    27.11.2022
*/
let todos = [];
let todosArea = $('.todos');
let todoInput = $('[name=todo]');
let objectPreviewArea = $('.objectPreview');

function showObjectTodos(){
    todos = todos.filter((todo) => todo.status);
    objectPreviewArea.text(JSON.stringify(todos),3,null);
}
/* Todo Input */
$('input[name=todo]').keypress(function(e){
    if(e.keyCode === 13){
        $('.addTodo').click();
    }
})
/* Add Todo */
$('.addTodo').on('click',function(){
    let title = todoInput.val();
    if(!title) return alert('Todo cannot be left empty');

    let id = todos.length + 1;
    todos.push({
        id: id,
        title: title,
        status: true,
    });
    todoInput.val("");
    todosArea.append(`
        <div class="d-flex flex-row align-items-center gap-1 mb-1" data-id="${ id }">
        <a class="btn btn-primary btn-sm m editTodo">Edit</a>
            <a class="btn btn-danger btn-sm removeTodo">Remove</a>
            <div class="d-flex flex-row align-items-center gap-1">
                ${ id }. <div class="todoTitle">${ title }</div>
            </div>
        </div>
    `)
    showObjectTodos();
   
})
/* Remove Todo */
$(document).on('click','.removeTodo',function(){
    let todo = $(this).parent();
    let todoID = todo.attr('data-id');
    todo.remove();
    todos = todos.filter((todo) => {
        if(todo.id == todoID){
            todo.status = false;
        }
        return todo;
    })
    showObjectTodos();
});
/* Edit Todo */
$(document).on('click','.editTodo',function(){
    let todo = $(this).parent();
    let todoID = todo.attr('data-id');
    let titleArea = todo.find('.todoTitle');
    if($(this).text() == 'Confirm'){
        $(this).text('Edit');
        $(this).toggleClass('btn-success btn-primary')
        let newTodoTitle = todo.find('[name=reTodo]').val();
        todos = todos.filter((todo) => {
            if(todo.id == todoID){
                todo.title = newTodoTitle;
            }
            return todo;
        })
        todo.find('[name=reTodo]').remove();
        titleArea.html(newTodoTitle);
        showObjectTodos()
        return true;
    }
    $(this).text('Confirm');
    $(this).toggleClass('btn-primary btn-success');

    let todoTitle = titleArea.text();
    titleArea.html('<input class="form-control" name="reTodo" value="'+todoTitle+'" />')

});
/* Reset Todo */
$('.resetTodo').on('click',function(){
    todos = [];
    todosArea.empty()
    showObjectTodos();
});
