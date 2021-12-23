import { IsString, IsOptional, IsEmail, IsPhoneNumber, IsIBAN } from 'class-validator';

export class CreateCustomerDto {
    @IsString()
    public FirstName: string;

    @IsString()
    public LastName: string;

    @IsPhoneNumber()
    public PhoneNumber: string;

    @IsEmail()
    public Email: string;

    @IsString()
    public DateOfBirth: string;

    @IsIBAN()
    public BankAccountNumber: string;
}

export class UpdateCustomerDto {
    @IsString()
    @IsOptional()
    public FirstName: string;

    @IsString()
    @IsOptional()
    public LastName: string;

    @IsPhoneNumber()
    @IsOptional()
    public PhoneNumber: string;

    @IsEmail()
    @IsOptional()
    public Email: string;

    @IsString()
    @IsOptional()
    public DateOfBirth: string;

    @IsIBAN()
    @IsOptional()
    public BankAccountNumber: string;
}

export class PaginationCustomerDto {
    @IsString()
    @IsOptional()
    public phrase: string;
}