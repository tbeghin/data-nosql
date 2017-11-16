const mongoose = require('mongoose');
const rewire = require('rewire');
const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();
const dataBaseManager = require('../../Manager/dataBaseManager');
const dataBaseManagerPrivate = rewire('../../Manager/dataBaseManager');

describe('dataBaseManager', function () {
    describe('getDataBase', function () {
        it('resolves as promised', function () {
            const assert = dataBaseManager.getDataBase('', '');
            return assert.should.be.rejectedWith('La collection ou le chemin de base de données est vide.');
        });
    });
    describe('createDataBase', function () {
        it('resolves as promised', function () {
            sinon.stub(mongoose, 'createConnection').returns(new Promise((resolve) => resolve('ok')));
            const createDataBase = dataBaseManagerPrivate.__get__('createDataBase');
            const assert = createDataBase('', '');
            return Promise.all([
                assert.should.be.fulfilled,
                assert.should.eventually.equal('ok')
            ]);
        });
    });
});