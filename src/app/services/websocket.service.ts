import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReplaySubject, Subject } from 'rxjs';
import { globalUrls } from '../main/urls';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  
  private webSocket: WebSocket;
  public socketData: Subject<any> = new ReplaySubject(1);

  constructor(private snackbar: MatSnackBar) { }

  connectWebSocket(){
    this.webSocket = new WebSocket(globalUrls.wsDeploymentUpdate);
    this.handleWebSocket();
  }

  handleWebSocket(){
    this.webSocket.onopen = (event) => {
      // console.log("open: ", event);
    }

    this.webSocket.onmessage = (event) => {
      this.handleIncomingData(event.data);
    }

    this.webSocket.onclose = (event) => {
      // console.log("Socket Closed: ", event);
      if(event.code === 1006){
        this.webSocket = null;
        this.connectWebSocket();
      }
    }

    this.webSocket.onerror = (event) => {
      console.log(event);
    }
  }

  handleIncomingData(data: string){
    console.log("message recived: ", data);
    const inData = JSON.parse(data);
    this.socketData.next(inData);
    if(inData.message.status==="SUCCESS"){
      this.snackbar.open("Deployment Successful!", "Close", {duration: 3000});
    } else {
      this.snackbar.open("Deployment Failed!", "Close", {duration: 3000});
    }
  }

  closeConnection(){
    console.log(this.webSocket.OPEN, this.webSocket.readyState);
    this.webSocket.close(1000, "Safely closing");

    console.log("Socket close")
  }
}
