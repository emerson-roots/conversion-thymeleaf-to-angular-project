export class ErrorFields{
  timestamp!: number;
  error!: string;
  message!: string;
  status!: number;

  constructor(timestamp: number, error: string, message: string, status: number){
    this.timestamp = timestamp;
    this.error = error;
    this.message = message;
    this.status = status;
  }

}
