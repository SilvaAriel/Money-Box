import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MovementService } from '../shared/movement.service'

@Component({
  selector: 'movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css']
})
export class MovementComponent implements OnInit {

  @Input() accountId: number = null;
  @Input() detail: string = '';
  @Input() destAccountId: string = ''; 
  @Input() value: string = '';
  
  @Output() updateAccountList = new EventEmitter();

  operation:string = '';

  error:string = "";
  success:string = "";

  constructor(
    public movementService: MovementService) { }

  ngOnInit() { }

  setOperation(op) {
    this.operation = op.id;
  }

  finalizarOperacao() {
    let movement = {
      account: {
        accountId: this.accountId
      },
      detail: this.detail,
      value: this.value,
      destAccountId: this.destAccountId
    }
    if (this.operation == 'deposit') {
      this.movementService.deposit(movement).subscribe(
        (data:{})=> {
          this.error=""
          this.success="Done"
        },
        (error:any)=> {
          this.error = error
        })
    } else if (this.operation == 'withdraw') {
      this.movementService.withdraw(movement).subscribe(
        (data:{})=> {
          this.error=""
          this.success="Done"
        },
        (error:any)=> {
          this.error = error
        })
    } else if (this.operation == 'transfer') {
      this.movementService.transfer(movement).subscribe(
        (data:{})=> {
          this.error=""
          this.success="Done"
        },
        (error:any)=> {
          this.error = error
        }
      )
    }
    this.detail = '';
    this.value = '';
    this.operation = '';
    this.updateAccountList.emit(null);
  }
}
