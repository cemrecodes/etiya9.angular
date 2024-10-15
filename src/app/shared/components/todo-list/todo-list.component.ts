import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  todos: string[] = ["ödev"];
  newTodo: string = '';

  addTodo() {
    let trimmedTodo = this.newTodo.trim();
    if (trimmedTodo) {
      if(this.todos.includes(trimmedTodo)){
        alert("This todo already exists.");
      }
      else{
        this.todos.push(this.newTodo);
        this.newTodo = '';
      }
    }

  }

  removeTodo(index: number) {
    this.todos.splice(index, 1);
  }
}
