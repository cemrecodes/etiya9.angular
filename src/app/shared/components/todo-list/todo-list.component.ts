import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoCardComponent } from "../todo-card/todo-card.component";
import { HttpClient } from '@angular/common/http';
import { GetToDoListResponse } from '../../models/GetToDoListResponse';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, TodoCardComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  todos: GetToDoListResponse[] = [];
  newTodo: GetToDoListResponse = { userId: 1, id: 0, title: '', completed: false };
  toDoListFromBackend: GetToDoListResponse[] = [];

  constructor(private httpClient: HttpClient){}
  
  ngOnInit(){
    this.fetchTodos();
  }

  add(): void {
    const trimmedTitle = this.newTodo.title.trim();
    if (trimmedTitle) {
      const todoToAdd: GetToDoListResponse = {
        userId: this.newTodo.userId,
        id: this.newTodo.id,
        title: trimmedTitle,
        completed: this.newTodo.completed
      };

      this.httpClient.post<GetToDoListResponse>("https://jsonplaceholder.typicode.com/todos", todoToAdd)
      .subscribe({
        next: (response) => {
          this.todos.push(response);
          this.newTodo = { userId: 1, id: 0, title: '', completed: false };
          console.log("Todo added:", response);
          alert("Todo added!");
          this.toDoListFromBackend.push(todoToAdd);
        },
        error: (err) => {
          console.log("Error adding todo!", err);
          alert("Error adding todo!\n" + err);
        }
      });
    }
  }

  remove(id: number) {
    this.httpClient.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).subscribe({
      next: () => {
        this.todos = this.todos.filter((i) => i.id !== id);
        console.log("Todo deleted:", id);
        alert("Todo deleted: " + id);
        this.toDoListFromBackend = this.toDoListFromBackend.filter(t => t.id !== id);
      },
      error: (err) => {
        console.log("Todo deleted:", id);
        alert("Todo deleted: " + id);
      }
    });
  }

  fetchTodos() {
    // Async, Observable, Subscribe
    this.httpClient
      .get<GetToDoListResponse[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe({
        next: (response: GetToDoListResponse[]) => {
          this.toDoListFromBackend = response;
        },
        error: (err: any) => {
          console.log('Error: ', err);
        },
        complete: () => {
          console.log('Success');
        },
      });
  }
}
