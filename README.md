# CRUD Code Test 

Please read each note very carefully!

Create a simple CRUD application with ASP NET Core that implements the below model:
```
Customer {
	FirstName
	LastName
	DateOfBirth
	PhoneNumber
	Email
	BankAccountNumber
}
```
## Must do:

- **Best Practice**: Tdd and Bdd.


### Validations (Must)

- During Create; validate the phone number to be a valid mobile number only.

- A Valid email and a valid account number must be checked before submitting the form.
- You can use [Google LibPhoneNumber](https://github.com/google/libphonenumber) to validate number at the backend:


### Storage (Must)

- Store the phone number in a database with minimized space storage (choose varchar, or `ulong` whichever store less space).
- Email must be unique in the database

## Nice to do:
- CQRS is also a plus.
- You can use MVC Razor or Blazor UI is a plus.
- Docker-compose project that loads database service automatically which `docker-compose up`
- Clean git commits that show the work progress.

Please clone/fork this repository and share with ID: `reqteradmin` in private mode on github.com
