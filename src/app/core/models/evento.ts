import { Ticket } from "./ticket";

export class Event {
  public owner: string;
  public capacity: number;
  public visibility: string;
  public name: string;
  public price: number;
  public users: string[];
  public latitude: number;
  public longitude: number;
  public imagen: string;
  public id: string;
  //private _tickets: Ticket[];

  constructor(
    id?: string,
    owner?: string,
    capacity?: number,
    price?: number,
    tickets?: Ticket[],
    users?: string[],
    name?: string,
    latitude?: number,
    longitude?: number
  ) {
    this.owner = owner;
    this.capacity = capacity;
    this.id = id || "";
    this.price = price;
    this.users = users || [];
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    // this.tickets = tickets;
  }
  /* public get tickets(): Ticket[] {
    return this._tickets;
  }
  public set tickets(value: Ticket[]) {
    this._tickets = value;
  }*/
}
