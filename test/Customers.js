var superagent = require('superagent');
var expect = require('expect.js');
require("dotenv").config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

let insertedId;

describe('Customer Endpoints', function () {
    it("GetAllCustomer should return an array.", function (done) {
        superagent.get(`https://localhost:${process.env.PORT}/customer`)
            .then((res) => {
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(res.body.payload.data).to.be.an('array');
                done();
            })
    });
    it("CreateCustomer should return an id.", function (done) {
        superagent.post(`https://localhost:${process.env.PORT}/customer`)
            .send({
                FirstName: "Test",
                LastName: "Testi",
                DateOfBirth: "1989-08-04",
                PhoneNumber: "+989122222222",
                Email: "test@gmail.com",
                BankAccountNumber: "AT483200000012345864"
            })
            .set('Accept', 'application/json')
            .then((res) => {
                insertedId = res.body.payload.data.insertedId;
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(res.body.payload.data).to.have.property("insertedId");
                done();
            });
    });
    it("DuplicateEmailCustomer should return error.", function (done) {
        superagent.post(`https://localhost:${process.env.PORT}/customer`)
            .send({
                FirstName: "Test",
                LastName: "Testi",
                DateOfBirth: "1989-08-04",
                PhoneNumber: "+989111111111",
                Email: "test@gmail.com",
                BankAccountNumber: "AT483200000012345864"
            })
            .set('Accept', 'application/json')
            .catch((res) => {
                expect(res).to.exist;
                expect(res.status).to.equal(409);
                expect(res.response.body.errMessage).to.equal("UNIQUE_EMAIL");
                done();
            });
    });
    it("GetOneCustomer should return a record.", function (done) {
        superagent.get(`https://localhost:${process.env.PORT}/customer/${insertedId}`)
            .then((res) => {
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(res.body.payload.data).to.have.property("_id");
                expect(res.body.payload.data._id).to.equal(insertedId);
                done();
            });
    });
    it("DeleteCustomer should return a count.", function (done) {
        superagent.delete(`https://localhost:${process.env.PORT}/customer/${insertedId}`)
            .then((res) => {
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(res.body.payload.data).to.have.property("deletedCount");
                expect(res.body.payload.data.deletedCount).to.equal(1);
                done();
            });
    });
})