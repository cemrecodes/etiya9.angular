import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnChanges{
  @Input() count: number = 10;
  name: String = "Cemre";
  surname: String = "";
  songs: String[] = ["Snow On The Beach", "All Too Well", "Midnight Rain"];

  constructor(){}

  increaseCount(){
    this.count++;
  }

  decreaseCount(){
    this.count--;
  }

  ngOnInit(): void{
    console.log("ngOnInit says hi");
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("change: " + changes);
  }

  onNameChange(event: any){
    console.log("namechange", event);
    this.name = event.target.value;
  }

  onSurnameChange(event: any){
    console.log("namechange", event);
    this.name = event.target.value;
  }
}
