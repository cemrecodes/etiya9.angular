import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { GetToDoListResponse } from '../../models/GetToDoListResponse';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [CapitalizePipe],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss'
})
export class TodoCardComponent {
  @Input() toDoFromOtherPage: GetToDoListResponse | null = null;
  @Output() onRemoveClick: EventEmitter<number> = new EventEmitter<number>();

  onRemove() {
    if (this.toDoFromOtherPage) {
      this.onRemoveClick.emit(this.toDoFromOtherPage.id);
    }
  }
}
