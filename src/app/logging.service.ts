import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  constructor() {}

  // service methos
  Log(msg: string): void {
    console.log(new Date() + ': ' + msg)
  }
}
