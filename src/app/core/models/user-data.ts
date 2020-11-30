export class UserData {
  notification: string[];
  friends: string[];
  request: string[];
  events: string[];
  constructor(
    notification?: string[],
    friends?: string[],
    request?: string[],
    events?: string[]
  ) {
    this.notification = notification || [];
    this.friends = friends || [];
    this.request = request || [];
    this.events = events || [];
  }
}
