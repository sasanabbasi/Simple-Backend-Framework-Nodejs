# Typescript Framework 1

Simple Create CRUD using Nodejs + Express + Mongodb + Typescript + Validation + Auto Mapper + Middlewares

- **TDD**: Using Superagent and Mocha

### Validations

- Using Decorator and "class-validator" package for Handling validation
- It use Google LibPhoneNumber for phone number validation and "International Bank Account Number" for Account Number Validation

### Generic Classes

- Use Generic Classes for BaseRepository and IRead, IWrite for CQRS
- Email is unique in the database

## Run:

For Run the Project:

```
npm start
```

OR

```
docker-compose up
```

For Test:

```
npm test
```

### Postman Collection

There is a postman collection in the root and you should import it and test the project.
