// websocket.service.ts

import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    // Adjust the WebSocket URL based on your backend configuration
    this.socket$ = webSocket('ws://localhost:8080/user/getAll');

    // You can perform additional setup here, such as handling connection errors, etc.
  }

  getWebSocketSubject(): WebSocketSubject<any> {
    return this.socket$;
  }


}
