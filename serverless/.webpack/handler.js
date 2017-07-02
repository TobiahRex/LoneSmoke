(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = __webpack_require__(1);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _extends2 = __webpack_require__(2);

	var _extends3 = _interopRequireDefault(_extends2);

	var _stringify = __webpack_require__(3);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _bluebird = __webpack_require__(4);

	var _handleSesDiscount = __webpack_require__(5);

	var _handleSesDiscount2 = _interopRequireDefault(_handleSesDiscount);

	var _handleSesStatus = __webpack_require__(7);

	var _handleSesStatus2 = _interopRequireDefault(_handleSesStatus);

	var _connection = __webpack_require__(12);

	var _connection2 = _interopRequireDefault(_connection);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable global-require, import/imports-first, no-console, no-unused-expressions */
	if (!global._babelPolyfill) __webpack_require__(25);

	module.exports.sesDiscountHandler = function (event, context) {
	  console.log('\nEVENT: ', (0, _stringify2.default)(event, null, 2));
	  if (!event.body.userEmail || !event.body.type || !event.body.language) {
	    return context.fail('Missing required arguments.') && context.done(null, (0, _extends3.default)({ type: 'ERROR', problem: 'Missing required arguments!' }, event.body));
	  }
	  return (0, _connection2.default)().then(function (dbResults) {
	    return (0, _handleSesDiscount2.default)((0, _extends3.default)({ event: event }, dbResults));
	  }).then(function (result) {
	    if (typeof result === 'string') {
	      context.succeed && context.done(null, { message: 'User has successfully been sent a "' + result + '" email.' });
	    } else if ((typeof result === 'undefined' ? 'undefined' : (0, _typeof3.default)(result)) === 'object') {
	      context.succeed && context.done(null, result);
	    }
	  }).catch(function (error) {
	    console.log('\nFINAL Lambda ERROR: \n', (0, _stringify2.default)(error, null, 2));
	    context.fail('Ses discount failed.', (0, _stringify2.default)((0, _extends3.default)({ message: 'Ses Discount handler FAILED' }, error))) && context.done();
	  });
	};

	module.exports.sesStatusHandler = function (event, context) {
	  console.log('\nEVENT: ', (0, _stringify2.default)(event, null, 2));
	  if (!event.body.notificationType || !event.body.mail) {
	    context.fail('Missing required arguments.') && context.done(null, (0, _extends3.default)({ type: 'ERROR', problem: 'Missing required arguments!' }, event.body));
	  } else {
	    (0, _connection2.default)().then(function (dbResults) {
	      return (0, _handleSesStatus2.default)((0, _extends3.default)({ event: event }, dbResults));
	    }).then(function () {
	      context.succeed && context.succeed({ message: 'Ses status has been successfully handled.' });
	    }).catch(function (error) {
	      console.log('\nFINAL Lambda ERROR: \n', (0, _stringify2.default)(error, null, 2));
	      context.fail && context.fail((0, _extends3.default)({ message: 'Ses Status handler FAILED' }, error));
	    });
	  }
	};

	module.exports.createNewEmail = function (event, context) {
	  console.log('\nEVENT: ', (0, _stringify2.default)(event, null, 2));

	  (0, _connection2.default)().then(function (_ref) {
	    var Email = _ref.dbModels.Email;
	    return Email.createEmail(event.body);
	  }).then(function (newEmail) {
	    console.log('final resolve.');
	    context.succeed && context.succeed({ message: 'Created new Email.', newEmail: newEmail });
	  }).catch(function (error) {
	    console.log('\nFINAL Lambda ERROR: \n', (0, _stringify2.default)(error, null, 2));
	    context.error && context.error((0, _extends3.default)({ message: 'FAILED: Could not Create new Email.' }, error));
	  });
	};

	module.exports.deleteEmail = function (event, context) {
	  console.log('\nEVENT: ', (0, _stringify2.default)(event, null, 2));
	  if (!event.body.id) {
	    console.log('ERROR: Did not provide necessary document _id to delete.');
	    context.error && context.error({ message: 'Missing required ID field.' });
	  } else {
	    (0, _connection2.default)().then(function (_ref2) {
	      var Email = _ref2.dbModels.Email;
	      return _bluebird.Promise.fromCallback(function (cb2) {
	        return Email.findByIdAndRemove(event.body.id, cb2);
	      });
	    }) // eslint-disable-line
	    .then(function () {
	      context.succeed && context.succeed({ message: 'Successfully deleted Email.' });
	    }).catch(function (error) {
	      console.log('\nFINAL Lambda ERROR: \n', (0, _stringify2.default)(error, null, 2));
	      context.error && context.error((0, _extends3.default)({ message: 'FAILED: Could not Delete Email.  Verify _id is correct.' }, error));
	    });
	  }
	};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/typeof");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/extends");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = require("bluebird");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(2);

	var _extends3 = _interopRequireDefault(_extends2);

	var _promise = __webpack_require__(6);

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable no-console */

	/**
	* 1) Determine if the userEmail has already been sent a discount by checking Market Hero collection.
	* 2a) If found, filter the email by language matching the requested langauge and send a Rejection Email.
	* 2b) If not found, verify user has not added classified our application emails as "spam" since last message had been sent.
	* 3a) If email has not been added to Complaint collection, send the user a Discount email.
	*
	* @param {object} event - event.body = Top-Level SES status object.
	* @param {object} dbModels - Mongo model instance(s).
	*
	* @return {object} - Promise: resolved - email type sent.
	*/
	exports.default = function (_ref) {
	  var event = _ref.event,
	      _ref$dbModels = _ref.dbModels,
	      MarketHero = _ref$dbModels.MarketHero,
	      Email = _ref$dbModels.Email,
	      Complaint = _ref$dbModels.Complaint;
	  return new _promise2.default(function (resolve, reject) {
	    var _event$body = event.body,
	        userEmail = _event$body.userEmail,
	        type = _event$body.type,
	        language = _event$body.language;


	    MarketHero.checkForLead(userEmail).then(function (dbUser) {
	      // eslint-disable-line
	      if (dbUser) {
	        Email.findEmailAndFilterLanguage(type + 'Rejected', language).then(function (filteredEmail) {
	          return Email.sendEmail(userEmail, filteredEmail);
	        }).then(function (sesResponse) {
	          return resolve(sesResponse);
	        });
	      } else {
	        return Complaint.find({ email: userEmail }).exec();
	      }
	    }).then(function (dbComplaint) {
	      if (dbComplaint.length) {
	        console.log(userEmail, ' has classified our emails as "SPAM"');
	        return reject({ problem: 'Cannot send emails to that user because the user has classified our Emails as "abuse" aka "SPAM"' });
	      }
	      console.log('New user has successfully signed up for ', type, '.\nSending discount email now...');
	      return Email.findEmailAndFilterLanguage(type, language);
	    }).then(function (filteredEmail) {
	      return Email.sendEmail(userEmail, filteredEmail);
	    }).then(function (emailType) {
	      return resolve(emailType);
	    }).catch(function (error) {
	      console.log('(ERROR @ handleSesDiscount.js) \nERROR: ', error);
	      if (Object.prototype.hasOwnProperty.call(error, 'type')) {
	        reject(error);
	      } else {
	        reject({ type: 'error', problem: (0, _extends3.default)({}, error) });
	      }
	    });
	  });
	};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/core-js/promise");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(2);

	var _extends3 = _interopRequireDefault(_extends2);

	var _promise = __webpack_require__(6);

	var _promise2 = _interopRequireDefault(_promise);

	var _bluebird = __webpack_require__(4);

	var _createLeadConcurrently = __webpack_require__(8);

	var _createLeadConcurrently2 = _interopRequireDefault(_createLeadConcurrently);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable no-console, import/newline-after-import, import/imports-first */

	__webpack_require__(11).load({ silent: true });

	/**
	* 1) Determines what type of notification has been received.
	* 2a) If Bounce type - do nothing.
	* 2b) If Complaint type - add to Complaint collection.
	* 2c) If Delivered type - add to MarketHero collection & add to MarketHero leads collection via REST API.
	*
	* @param {object} event - event.body = Top-Level SES status object.
	* @param {object} dbModels - Mongo model instance(s).
	*
	* @return {object} - Promise: resolved - no data.
	*/
	exports.default = function (_ref) {
	  var event = _ref.event,
	      _ref$dbModels = _ref.dbModels,
	      MarketHero = _ref$dbModels.MarketHero,
	      Complaint = _ref$dbModels.Complaint;
	  return new _promise2.default(function (resolve, reject) {
	    var _event$body = event.body,
	        notificationType = _event$body.notificationType,
	        _event$body$mail = _event$body.mail,
	        destination = _event$body$mail.destination,
	        commonHeaders = _event$body$mail.commonHeaders;

	    // 2a) if type === "Bounce"

	    if (notificationType === 'Bounce') {
	      console.log('BOUNCED Email to ', destination[0], '\nSubject: ', commonHeaders.subject);
	      resolve();

	      // 2b) if type === "Complaint"
	    } else if (notificationType === 'Complaint') {
	      _bluebird.Promise.fromCallback(function (cb) {
	        return Complaint.create({ // eslint-disable-line
	          email: destination[0],
	          subject: commonHeaders.subject,
	          created: new Date()
	        });
	      }, cb) //eslint-disable-line
	      .then(function (newComplaint) {
	        console.log('\n', newComplaint.email, ': successfully added to Complaint collections.');
	        resolve();
	      }).catch(function (error) {
	        console.log('\nError saving email to Complaint collection:\n Error = ', error);
	        reject({ type: 'error', problem: (0, _extends3.default)({}, error) });
	      });

	      // 2c) If type === "Delivered"
	    } else if (notificationType === 'Delivery') {
	      console.log('SES email successfully delivered to email: ', destination[0], '\n Saving email to Market Hero and Mongo cluster...');
	      var results = (0, _createLeadConcurrently2.default)(MarketHero, destination[0], {
	        name: '!LS-beachDiscount',
	        description: 'User received a 10% discount for submitting email at Zushi Beach 2017.'
	      }).catch(function (error) {
	        console.log('Error saving lead to Market Hero & Mongo Collection: ', error);
	        reject({ type: 'error', problem: (0, _extends3.default)({}, error) });
	      });
	      console.log('Successfully saved new Lead: "', destination[0], '" to Market Hero & Mongo Cluster.\nMarket Hero Result: ', results[0].data, '\nMongo Result: ', results[1]);
	      resolve();
	    }
	  });
	};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _regenerator = __webpack_require__(9);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _promise = __webpack_require__(6);

	var _promise2 = _interopRequireDefault(_promise);

	var _asyncToGenerator2 = __webpack_require__(10);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable no-console, import/imports-first */

	/**
	* 1) Concurrently calls MarketHero API and creates lead & Creates new MarketHero document with user email.
	*
	* @param {instance} marketHeroModel - Mongo model instance.
	* @param {string} email - SesStatusObject.
	* @param {object} tagInfo - { name, description }.
	*
	* @return [array{object}] - Promises: resolved.
	*/
	var createNewLead = function () {
	  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(marketHeroModel, email, tagInfo) {
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            _context.next = 2;
	            return _promise2.default.all([marketHeroModel.createApiLead(email, tagInfo.name), marketHeroModel.createMongoLead(email, tagInfo)]);

	          case 2:
	            return _context.abrupt("return", _context.sent);

	          case 3:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee, undefined);
	  }));

	  return function createNewLead(_x, _x2, _x3) {
	    return _ref.apply(this, arguments);
	  };
	}();
	exports.default = createNewLead;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	module.exports = require("dotenv");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _promise = __webpack_require__(6);

	var _promise2 = _interopRequireDefault(_promise);

	var _mongoose = __webpack_require__(13);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _marketHero = __webpack_require__(14);

	var _marketHero2 = _interopRequireDefault(_marketHero);

	var _email = __webpack_require__(18);

	var _email2 = _interopRequireDefault(_email);

	var _complaint = __webpack_require__(23);

	var _complaint2 = _interopRequireDefault(_complaint);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable no-console, no-constant-condition, no-unused-vars */
	_mongoose2.default.Promise = _promise2.default;
	var dotenv = __webpack_require__(11).config({ silent: true }); //eslint-disable-line
	var MONGO_DB = process.env.MONGO_URI;

	if (!MONGO_DB) throw new Error('MONGO_DB URI value is: ' + (MONGO_DB.length ? MONGO_DB : 'undefined'));

	var cachedDb = {
	  connection: null,
	  dbModels: {
	    Product: null,
	    User: null
	  }
	};

	var verifyDb = function verifyDb() {
	  return new _promise2.default(function (resolve) {
	    if (cachedDb.connection && cachedDb.connection._readyState === 1) {
	      console.log('cachedDb.connection._readyState: ', cachedDb.connection._readyState, '\nFOUND PREVIOUS CONNECTION\n', '\nCurrent Connections: ', cachedDb.connection.base.connections);
	      resolve(cachedDb);
	    } else {
	      var connection = _mongoose2.default.createConnection(MONGO_DB, console.log);

	      console.log('CREATED NEW CONNECTION: ', connection, '\nmongoose.connection.readyState: ', connection._readyState, '\nAll Connections:', connection.base);

	      cachedDb = {
	        connection: connection,
	        dbModels: {
	          MarketHero: (0, _marketHero2.default)(connection),
	          Email: (0, _email2.default)(connection),
	          Complaint: (0, _complaint2.default)(connection)
	        }
	      };
	      resolve(cachedDb);
	    }
	  });
	};

	exports.default = verifyDb;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = require("mongoose");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(2);

	var _extends3 = _interopRequireDefault(_extends2);

	var _stringify = __webpack_require__(3);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _toConsumableArray2 = __webpack_require__(15);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _promise = __webpack_require__(6);

	var _promise2 = _interopRequireDefault(_promise);

	var _axios = __webpack_require__(16);

	var _axios2 = _interopRequireDefault(_axios);

	var _bluebird = __webpack_require__(4);

	var _marketHero = __webpack_require__(17);

	var _marketHero2 = _interopRequireDefault(_marketHero);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(11).load({ silent: true }); /* eslint-disable no-use-before-define, no-console, import/newline-after-import */

	exports.default = function (db) {
	  /**
	  * 1) Determines if email is already saved to MarketHero collection.
	  *
	  * @param string userEmail - Email data.
	  *
	  * @return {object} - Promise: resolved - user info if found || nothing if not found.
	  */
	  _marketHero2.default.statics.checkForLead = function (userEmail) {
	    return new _promise2.default(function (resolve, reject) {
	      MarketHero.findOne({ 'lead.email': userEmail }).exec().then(resolve).catch(reject);
	    });
	  };

	  /**
	  * 1) Determines whether @param "tag" is an array or single string.
	  * 2) Calls MarketHero API, and creates new lead & adds tag(s) to new that lead.
	  * 3a) Returns resolved Promise.
	  * 3b) Returns error object { type: 'error', problem: {desc} }
	  *
	  * @param string userEmail - Email data.
	  * @param string || [array] tag -  Tag data || Tags Data.
	  *
	  * @return {object} - Promise: resolved - no data.
	  */
	  _marketHero2.default.statics.createApiLead = function (userEmail, tag) {
	    return new _promise2.default(function (resolve, reject) {
	      var tagInfo = null;

	      if (Array.isArray(tag)) tagInfo = [].concat((0, _toConsumableArray3.default)(tag));else tagInfo = tag;

	      var reqBody = {
	        apiKey: process.env.MARKET_HERO_API_KEY,
	        firstName: 'John',
	        lastName: 'Doe',
	        email: userEmail,
	        tags: tagInfo
	      };
	      _axios2.default.post('https://private-anon-9aba81438f-markethero2.apiary-mock.com/v1/api/tag-lead', (0, _stringify2.default)(reqBody), {
	        headers: {
	          'Content-Type': 'application/json'
	        }
	      }).then(function (_ref) {
	        var status = _ref.status,
	            data = _ref.data;

	        if (status !== 200) {
	          console.log('\n          Market Hero API Error:\n          Cannot update lead# ' + userEmail + ';\n          Response: ' + data + '\n        ');
	          reject({ type: 'error', problem: (0, _extends3.default)({}, data) });
	        }
	        console.log('\n        Market Hero API Success:\n        Created/Updated ' + userEmail + '.\n        Response: ' + data + '\n      ');
	      });
	    });
	  };

	  /**
	  * 1) Determines whether @param "tag" is an array or single string.
	  * 2) Creates new MarketHero document in Mongo Cluster..
	  * 3) Returns Resolved Promise.
	  * 3b) Returns
	  *
	  * @param {string} userEmail - Email data.
	  * @param {string || array} tag - Tag data.
	  *
	  * @return {object} - Promise: resolved - no data.
	  */
	  _marketHero2.default.statics.createMongoLead = function (userEmail, tag) {
	    return new _promise2.default(function (resolve, reject) {
	      var tagInfo = null;

	      if (Array.isArray(tag)) tagInfo = [].concat((0, _toConsumableArray3.default)(tag));else tagInfo = tag;

	      _bluebird.Promise.fromCallback(function (cb) {
	        return MarketHero.create({
	          lead: { email: userEmail },
	          tags: Array.isArray(tagInfo) ? [].concat((0, _toConsumableArray3.default)(tagInfo)) : [tagInfo]
	        }, cb);
	      }).then(function (newLead) {
	        console.log('\n        Created new lead in Mongo Database.\n        New Lead: ' + newLead + '\n      ');
	        resolve(newLead);
	      }).catch(function (error) {
	        console.log('\n        Could not create new Lead in Mongo Database.\n        ERROR: ' + error + '\n      ');
	        reject({ type: 'error', problem: (0, _extends3.default)({}, error) });
	      });
	    });
	  };

	  var MarketHero = db.model('MarketHero', _marketHero2.default);
	  return MarketHero;
	};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/toConsumableArray");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	module.exports = require("axios");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Schema = __webpack_require__(13).Schema;

	var ObjectId = exports.ObjectId = Schema.Types.ObjectId;
	var marketHeroSchema = new Schema({
	  lead: {
	    email: { type: String, required: true },
	    date: { type: Date, default: Date.now },
	    firstName: { type: String, default: 'John' },
	    lastName: { type: String, default: 'Doe' }
	  },
	  tags: [{
	    name: { type: String },
	    description: { type: String },
	    date: { type: Date }
	  }]
	});
	exports.default = marketHeroSchema;
	/* Schema Breakdown.
	  "leads": Leads is an array of all the leads in the LoneSmoke database.

	  "tags": Tags is the an array of all the existing tags currently in existence.
	  - name: The name of the tag. e.g. "!beachDiscount"
	  - description: The details behind why the tag exists and it's purpose. e.g. "This customer signed up to receive a 10% discount from Zushi Beach".
	  - date: The date that this tag was created.
	*/

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _stringify = __webpack_require__(3);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _extends2 = __webpack_require__(2);

	var _extends3 = _interopRequireDefault(_extends2);

	var _promise = __webpack_require__(6);

	var _promise2 = _interopRequireDefault(_promise);

	var _awsSdk = __webpack_require__(19);

	var _awsSdk2 = _interopRequireDefault(_awsSdk);

	var _bluebird = __webpack_require__(4);

	var _isEmail = __webpack_require__(20);

	var _isEmail2 = _interopRequireDefault(_isEmail);

	var _email = __webpack_require__(21);

	var _email2 = _interopRequireDefault(_email);

	var _config = __webpack_require__(22);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_awsSdk2.default.config.update({
	  accessKeyId: _config2.default.aws.accessKeyId,
	  secretAccessKey: _config2.default.aws.secretAccessKey,
	  region: _config2.default.aws.region
	}); /* eslint-disable no-use-before-define, no-console, import/newline-after-import */


	var ses = new _awsSdk2.default.SES();

	exports.default = function (db) {
	  /**
	  * 1) Validate required fields exist.
	  * 2) Create a new email.
	  *
	  * @param {object} fields - Required fields for creating new Email.
	  *
	  * @return {object} - Promise: resolved - Email details.
	  */
	  _email2.default.statics.createEmail = function (fields) {
	    return new _promise2.default(function (resolve, reject) {
	      var type = fields.type,
	          purpose = fields.purpose,
	          language = fields.language,
	          subjectData = fields.subjectData,
	          bodyHtmlData = fields.bodyHtmlData,
	          bodyTextData = fields.bodyTextData,
	          replyToAddress = fields.replyToAddress;


	      if (!type || !purpose || !language || !replyToAddress || !subjectData || !bodyHtmlData || !bodyTextData) {
	        reject((0, _extends3.default)({ error: 'Missing required fields to create a new Email.' }, fields));
	      } else {
	        _bluebird.Promise.fromCallback(function (cb) {
	          return Email.create((0, _extends3.default)({}, fields), cb);
	        }).then(function (newEmail) {
	          console.log('\nSuccessfully created new Email!\n _id: ', newEmail._id);
	          resolve(newEmail);
	        });
	      }
	    });
	  };

	  /**
	  * 1) Find all emails with type.
	  * 2) Filter results by request language.
	  *
	  * @param {string} type - The email type to find.
	  * @param {string} requestedLangauge - The language to filter by.
	  *
	  * @return {object} - Promise: resolved - Email details.
	  */
	  _email2.default.statics.findEmailAndFilterLanguage = function (type, reqLanguage) {
	    return new _promise2.default(function (resolve, reject) {
	      Email.find(type).exec().then(function (dbEmails) {
	        if (!dbEmails.length) {
	          console.log('Error: \nDid not find any emails with type: "', type, '"');
	          reject({ type: 'error', problem: 'Did not find any emails with type: ' + type });
	        }

	        var foundEmail = dbEmails.filter(function (dbEmail) {
	          return dbEmail.language === reqLanguage;
	        })[0];

	        if (!foundEmail) {
	          console.log('Error: \nDid not find email with language: "', reqLanguage, '"');
	          reject({ type: 'error', problem: 'After filtering emails of type "' + type + '", there was no email that matched language: "' + reqLanguage + '"' });
	        }
	        resolve(foundEmail);
	      });
	    });
	  };

	  /**
	  * 1) Determine if the userEmail has already been sent a discount by checking Market Hero collection.
	  * 2a) If found, send a Rejection Email.
	  * 2b) If not found, verify user has not added classified our application emails as "spam" since last message had been sent.
	  * 3a) If email has not been added to Complaint collection, send the user a Discount email.
	  *
	  * @param {string} to - recipients email address.
	  * @param {object} emailDoc - Mongo Email collection, Document.
	  *
	  * @return {object} - Promise: resolved - email type sent.
	  */
	  _email2.default.statics.sendEmail = function (to, emailDoc) {
	    return new _promise2.default(function (resolve, reject) {
	      if (!(0, _isEmail2.default)(to)) {
	        console.log('ERROR @ sendEmail: \n\'', to, '\' is not a valid email address.');
	        reject({ error: true, problem: 'Did not submit a valid email address. Please try again.' });
	      }
	      var emailParams = {
	        Destination: {
	          ToAddresses: to
	        },
	        Source: emailDoc.replyToAddress,
	        ReplyToAddresses: emailDoc.replyToAddress,
	        Message: {
	          Html: {
	            Data: emailDoc.bodyHtmlData,
	            Charset: emailDoc.bodyHtmlCharset
	          },
	          Body: {
	            Text: {
	              Data: emailDoc.bodyTextData,
	              Charset: emailDoc.bodyTextCharset
	            }
	          },
	          Subject: {
	            Data: emailDoc.subjectData,
	            Charset: emailDoc.subjectCharset
	          }
	        }
	      };

	      _bluebird.Promise.fromCallback(function (cb) {
	        return ses.sendEmail(emailParams, cb);
	      }).then(function (data) {
	        console.log('\nSuccessfully sent SES email: ', data);
	        resolve({
	          statusCode: 200,
	          body: (0, _stringify2.default)({ message: 'Mail sent successfully.' })
	        });
	      }).catch(function (error) {
	        console.log('\nERROR sending SES email with type: "', emailDoc.type, '"\nError = ', error, '\n', error.stack);
	        reject({ error: true, problem: (0, _extends3.default)({}, error) });
	      });
	    });
	  };

	  var Email = db.model('Email', _email2.default);
	  return Email;
	};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	module.exports = require("aws-sdk");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	module.exports = require("validator/lib/isEmail");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Schema = __webpack_require__(13).Schema;

	var ObjectId = exports.ObjectId = Schema.Types.ObjectId;
	var emailSchema = new Schema({
	  type: { type: String, required: true },
	  created: { type: Date, default: Date.now },
	  purpose: { type: String, required: true },
	  language: { type: String, required: true },
	  replyToAddress: { type: String, required: true },
	  subjectData: { type: String, required: true },
	  subjectCharset: { type: String, default: 'utf8' },
	  bodyHtmlData: { type: String, required: true },
	  bodyHtmlCharset: { type: String, default: 'utf8' },
	  bodyTextData: { type: String, requried: true },
	  bodyTextCharset: { type: String, default: 'utf8' }
	});
	exports.default = emailSchema;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	module.exports = {
		"aws": {
			"accessKeyId": "AKIAJUPLOWQUBUVQLKCQ",
			"secretAccessKey": "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",
			"region": "ap-northeast-1"
		}
	};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _promise = __webpack_require__(6);

	var _promise2 = _interopRequireDefault(_promise);

	var _isEmail = __webpack_require__(20);

	var _isEmail2 = _interopRequireDefault(_isEmail);

	var _complaint = __webpack_require__(24);

	var _complaint2 = _interopRequireDefault(_complaint);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable no-use-before-define, no-console */
	exports.default = function (db) {
	  /**
	  * 1) Verifies email - 2) If valid, saved email to Complaint collection:
	  * Purpose: Have a record of emails that have tagged this apps Emails as "Spam" so as to never send again.
	  *
	  * @param {string} email - Email data.
	  *
	  * @return {object} - Promise resolved with data.
	  */
	  _complaint2.default.statics.addEmailComplaint = function (email) {
	    return new _promise2.default(function (resolve, reject) {
	      if (!(0, _isEmail2.default)(email)) {
	        reject({ type: 'error', problem: email + ' - Is not a valid email.' });
	      }
	      Complaint.find({}).exec().then(function (dbComplaints) {
	        return dbComplaints.emails.push({ address: email, created: new Date() }).save();
	      }).then(function () {
	        console.log('Successfully saved ', email, ' to Complaints list.');
	        resolve();
	      });
	    });
	  };

	  var Complaint = db.model('Complaint', _complaint2.default);
	  return Complaint;
	};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Schema = __webpack_require__(13).Schema;

	var complaintSchema = new Schema({
	  emails: {
	    address: { type: String, required: true },
	    subject: { type: String, required: true },
	    created: { type: Date, default: Date.now }
	  }
	});
	exports.default = complaintSchema;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ })
/******/ ])));