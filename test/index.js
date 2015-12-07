import chai from 'chai';
import chaiSpies from 'chai-spies';
chai.use(chaiSpies).should();
import jsonFile from '../src/';
describe('jsonFile', () => {

  it('returns a function', () => {
    jsonFile().should.be.a('function');
  });

  describe('output function', () => {
    let process = null;
    let subFunction = null;
    beforeEach(() => {
      process = chai.spy((contents) => contents);
      subFunction = jsonFile(process);
    });

    it('calls the given function when called', () => {
      subFunction('{}');
      process.should.have.been.called(1);
    });

    it('calls the given function with the given contents as JSON', () => {
      subFunction('{"foo":"a","bar":true}');
      process.should.have.been.called.with.exactly({ foo: 'a', bar: true });
    });

    it('returns contents of process, stringified as JSON', () => {
      process = chai.spy(() => ({ bar: false, baz: 1 }));
      subFunction = jsonFile(process);
      subFunction('{}')
        .should.equal('{\n  "bar": false,\n  "baz": 1\n}');
    });

    it('calls the given function with the remaining args verbatum', () => {
      subFunction('{}', 1, 2, 3);
      process.should.have.been.called.with.exactly({}, 1, 2, 3);
    });

    it('can override indent with `indent` option', () => {
      process = chai.spy(() => ({ bar: false, baz: 1 }));
      subFunction = jsonFile(process, { indent: '\t' });
      subFunction('{}')
        .should.equal('{\n\t"bar": false,\n\t"baz": 1\n}');
      process = chai.spy(() => ({ bar: false, baz: 1 }));
      subFunction = jsonFile(process, { indent: 0 });
      subFunction('{}')
        .should.equal('{"bar":false,"baz":1}');
    });

    it('can override JSON.stringify replacer with `replacer` option', () => {
      function replacer(key, value) {
        return key ? 'foo' : value;
      }
      process = chai.spy(() => ({ bar: false, baz: 1 }));
      subFunction = jsonFile(process, { replacer });
      subFunction('{}')
        .should.equal('{\n  "bar": "foo",\n  "baz": "foo"\n}');
    });

  });

});
