import { AutoMap } from '@automapper/classes';

export default class customerVM {
    @AutoMap()
    public _id: string = "";

    @AutoMap()
    public FirstName: string = "";

    @AutoMap()
    public LastName: string = "";

    @AutoMap()
    public DateOfBirth: Date = null;

    @AutoMap()
    public PhoneNumber: string = "";

    @AutoMap()
    public Email: string = "";

    @AutoMap()
    public BankAccountNumber: string = "";
}
