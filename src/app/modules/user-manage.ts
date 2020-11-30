import { User } from './user';

export class UserManage {
    private _friends: User[];
    private blocked: User[];
    constructor(friends: User[], blocked: User[]) {
        
    }
    public get friends(): User[] {
    return this._friends;
    }
            public set friends(value: User[]) {
                this._friends = value;
            }
}
