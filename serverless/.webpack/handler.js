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

	var _keys = __webpack_require__(1);

	var _keys2 = _interopRequireDefault(_keys);

	var _extends2 = __webpack_require__(2);

	var _extends3 = _interopRequireDefault(_extends2);

	var _stringify = __webpack_require__(3);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _bluebird = __webpack_require__(4);

	var _handleSesDiscount = __webpack_require__(5);

	var _handleSesDiscount2 = _interopRequireDefault(_handleSesDiscount);

	var _handleSesStatus = __webpack_require__(7);

	var _handleSesStatus2 = _interopRequireDefault(_handleSesStatus);

	var _connection = __webpack_require__(11);

	var _connection2 = _interopRequireDefault(_connection);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable global-require, import/imports-first, no-console, no-unused-expressions */
	if (!global._babelPolyfill) __webpack_require__(24);

	module.exports.sesDiscountHandler = function (event, context) {
	  console.log('\nEVENT: ', (0, _stringify2.default)(event, null, 2));
	  if (!event.body.userEmail || !event.body.type || !event.body.language) {
	    return context.fail({ message: 'Missing required arguments.' }) && context.done();
	  }

	  (0, _connection2.default)().then(function (dbResults) {
	    return (0, _handleSesDiscount2.default)((0, _extends3.default)({ event: event }, dbResults));
	  }).then(function (result) {
	    console.log('Successfully handled Ses Discount.  RESULTS = ', result);
	    return context.succeed('Successfully handled Ses Discount.') && context.done();
	  }).catch(function (error) {
	    console.log('Error handling Ses discount. ERROR = ' + error);
	    return context.fail('Ses Discount handler. ERROR = ' + error) && context.done();
	  });
	};

	module.exports.sesStatusHandler = function (event, context) {
	  // eslint-disable-line
	  console.log('\nEVENT: ', (0, _stringify2.default)(event, null, 2));

	  (0, _connection2.default)().then(function (dbResults) {
	    return (0, _handleSesStatus2.default)((0, _extends3.default)({ event: event }, dbResults));
	  }).then(function (result) {
	    return context.succeed('Ses status has been successfully handled.  RESULT = ' + result) && context.done();
	  }).catch(function (error) {
	    console.log('Ses Status handler FAILED.  ERROR = ' + error);
	    return context.fail('Ses Status handler FAILED.  ERROR = ' + error) && context.done();
	  });
	};

	module.exports.createNewEmail = function (event, context) {
	  // eslint-disable-line
	  console.log('\nEVENT: ', (0, _stringify2.default)(event, null, 2));

	  if ((0, _keys2.default)(event.body).length > 7) {
	    console.log('ERROR: You provided unneccesary input arguments.');
	    return context.fail('ERROR = You provided unnecessary input arguments.') && context.done();
	  }

	  (0, _connection2.default)().then(function (_ref) {
	    var Email = _ref.dbModels.Email;
	    return Email.createEmail(event.body);
	  }).then(function (newEmail) {
	    console.log('final resolve.');
	    return context.succeed({ message: 'Created new Email.', newEmail: newEmail }) && context.done();
	  }).catch(function (error) {
	    console.log('FAILED: Could not Create new Email.  ERROR = ' + error);
	    return context.fail('FAILED: Could not Create new Email.  ERROR = ' + error) && context.done();
	  });
	};

	module.exports.deleteEmail = function (event, context) {
	  // eslint-disable-line
	  console.log('\nEVENT: ', (0, _stringify2.default)(event, null, 2));
	  var eventKeys = (0, _keys2.default)(event.body);

	  if (!eventKeys.includes('id')) {
	    console.log('ERROR: Did not provide necessary document _id to delete.');
	    return context.fail((0, _stringify2.default)({ message: 'Missing required ID field.' })) && context.done();
	  } else if (eventKeys.length > 1) {
	    console.log('ERROR: You provided too many input arguments.  ARGS = ' + (0, _keys2.default)(event.body));
	    return context.error('ERROR: You provided too many input arguments.  ARGS = ' + (0, _keys2.default)(event.body)) && context.done();
	  }

	  (0, _connection2.default)().then(function (_ref2) {
	    var Email = _ref2.dbModels.Email;
	    return _bluebird.Promise.fromCallback(function (cb2) {
	      return Email.findByIdAndRemove(event.body.id, cb2);
	    });
	  }) // eslint-disable-line
	  .then(function () {
	    return context.succeed('Successfully deleted Email.') && context.done();
	  }).catch(function (error) {
	    console.log('\nFINAL Lambda ERROR: \n', (0, _stringify2.default)(error, null, 2));
	    return context.error('Could not Delete Email.  Verify _id is correct. ERROR= ' + error) && context.done();
	  });
	};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/core-js/object/keys");

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

	    return MarketHero.checkForLead(userEmail).then(function (dbUser) {
	      // eslint-disable-line
	      if (dbUser && dbUser._id) {
	        console.log('\nFound MarketHero lead for this user - Preparing to send rejection email...');
	        return Email.findEmailAndFilterLanguage(type + 'Rejected', language).then(function (filteredEmail) {
	          console.log('\nFound email based on user\'s language: ', filteredEmail.language);
	          return Email.sendEmail(userEmail, filteredEmail);
	        }).then(function (sesResponse) {
	          return resolve(sesResponse);
	        });
	      }

	      console.log('\nNew user! Verifying they haven\'t blocked our emails...');
	      return Complaint.find({ email: userEmail }).exec();
	    }).then(function (dbComplaint) {
	      if (dbComplaint && dbComplaint.length) {
	        console.log(userEmail, ' has classified our emails as "SPAM"');
	        return reject(userEmail, ' has classified our emails as "SPAM"');
	      }
	      console.log('New user has successfully signed up for "' + type + '".  Sending discount email now...\'');
	      return Email.findEmailAndFilterLanguage(type, language);
	    }).then(function (filteredEmail) {
	      return Email.sendEmail(userEmail, filteredEmail);
	    }).then(function (sesStatus) {
	      return resolve(sesStatus);
	    }).catch(function (error) {
	      console.log('Could not update SES Status.  ERROR = ' + error);
	      return reject('Could not update SES Status.  ERROR = ' + error);
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

	var _promise = __webpack_require__(6);

	var _promise2 = _interopRequireDefault(_promise);

	var _bluebird = __webpack_require__(4);

	var _createLeadConcurrently = __webpack_require__(8);

	var _createLeadConcurrently2 = _interopRequireDefault(_createLeadConcurrently);

	var _updateLeadConcurrently = __webpack_require__(9);

	var _updateLeadConcurrently2 = _interopRequireDefault(_updateLeadConcurrently);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable no-console, import/newline-after-import, import/imports-first */

	__webpack_require__(10).load({ silent: true });

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
	      Complaint = _ref$dbModels.Complaint,
	      Email = _ref$dbModels.Email;
	  return new _promise2.default(function (resolve, reject) {
	    event.Records.forEach(function (record, i, array) {
	      // eslint-disable-line
	      console.log('Preparing to handle ', i + 1, ' of ', array.length, ' records.');

	      var Message = record.Sns.Message;


	      var notification = null;

	      try {
	        notification = JSON.parse(Message);
	        console.log('\nSuccessfully parsed Sns Response Message.\nnotification: ', notification);
	      } catch (error) {
	        console.log('Could not parse Sns Message Body.  ERROR = ' + error);
	        reject('Could not parse Sns Message Body.  ERROR = ' + error);
	      }

	      var _notification = notification,
	          notificationType = _notification.notificationType,
	          _notification$mail = _notification.mail,
	          messageId = _notification$mail.messageId,
	          destinations = _notification$mail.destination;

	      // 2a) if type === "Bounce"

	      if (notificationType === 'Bounce') {
	        Email.findSentEmailAndUpdate(messageId, notificationType).then(function (updatedEmail) {
	          console.log('\nSuccessfully located and updated status for Email.');
	          resolve(updatedEmail);
	        }).catch(function (error) {
	          console.log('Could not update Email with status: "' + notificationType + '".  ERROR = ' + error);
	          reject('Could not update Email with status: ' + notificationType + '.  ERROR = ' + error);
	        });

	        // 2b) if type === "Complaint"
	      } else if (notificationType === 'Complaint') {
	        Email.findSentEmailAndUpdate(messageId, notificationType).then(function (updatedEmail) {
	          console.log('Successfully updated email: "' + updatedEmail.subjectData + '" with status: "' + notificationType + '".  ');

	          return _bluebird.Promise.fromCallback(function (cb) {
	            return Complaint.create({
	              messageId: messageId,
	              email: destinations[i],
	              created: new Date()
	            }, cb);
	          });
	        }).then(function (newComplaint) {
	          console.log('Successfully added email: "' + newComplaint.email + '" to Complaint database.  ');
	          resolve('Successfully added email: "' + newComplaint.email + '" to Complaint database.  ');
	        }).catch(function (error) {
	          console.log('Could not update Email with status: ' + notificationType + '.  ERROR = ' + error);
	          reject('Could not update Email with status: ' + notificationType + '.  ERROR = ' + error);
	        });

	        // 2c) If type === "Delivery"
	      } else if (notificationType === 'Delivery') {
	        Email.findSentEmailAndUpdate(messageId, notificationType).then(function (updatedEmail) {
	          console.log('Successfully updated MONGO email: "' + updatedEmail.subjectData + '" with status: "' + notificationType + '".  ');

	          if (/Rejected/gi.test(updatedEmail.type)) {
	            return (0, _updateLeadConcurrently2.default)(MarketHero, destinations[i], {
	              name: '' + updatedEmail.type,
	              description: updatedEmail.purpose
	            });
	          }
	          return (0, _createLeadConcurrently2.default)(MarketHero, destinations[i], {
	            name: '' + updatedEmail.type,
	            description: updatedEmail.purpose
	          });
	        }).then(function (results) {
	          console.log('Successfully handled Ses Status!  MarketHero result: "' + results[0] + '".  Market Hero Result: "' + results[1] + '".  ');

	          return resolve('Successfully handled Ses Status!  MarketHero result: "' + results[0] + '".  Market Hero Result: "' + results[1] + '".  ');
	        }).catch(function (error) {
	          console.log('Could not update Email with status: ' + notificationType + '.  ERROR = ' + error);

	          reject('Could not update Email with status: ' + notificationType + '.  ERROR = ' + error);
	        });
	      }
	    });
	  });
	};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _promise = __webpack_require__(6);

	var _promise2 = _interopRequireDefault(_promise);

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
	var createNewLead = function createNewLead(marketHeroModel, email, tagInfo) {
	  return _promise2.default.all([marketHeroModel.createOrUpdateLead(email, tagInfo.name), marketHeroModel.createMongoLead(email, tagInfo)]);
	};

	exports.default = createNewLead;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _promise = __webpack_require__(6);

	var _promise2 = _interopRequireDefault(_promise);

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
	var updateOldLead = function updateOldLead(marketHeroModel, email, tagInfo) {
	  return _promise2.default.all([marketHeroModel.createOrUpdateLead(email, tagInfo.name), marketHeroModel.updateMongoLead(email, tagInfo)]);
	};

	exports.default = updateOldLead;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = require("dotenv");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _promise = __webpack_require__(6);

	var _promise2 = _interopRequireDefault(_promise);

	var _mongoose = __webpack_require__(12);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _marketHero = __webpack_require__(13);

	var _marketHero2 = _interopRequireDefault(_marketHero);

	var _email = __webpack_require__(17);

	var _email2 = _interopRequireDefault(_email);

	var _complaint = __webpack_require__(22);

	var _complaint2 = _interopRequireDefault(_complaint);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable no-console, no-constant-condition, no-unused-vars */
	_mongoose2.default.Promise = _promise2.default;
	var dotenv = __webpack_require__(10).config({ silent: true }); //eslint-disable-line
	var MONGO_DB = process.env.MONGO_URI;

	if (!MONGO_DB) throw new Error('MONGO_DB URI value is: ' + (MONGO_DB || 'undefined'));

	var cachedDb = {
	  connection: null,
	  dbModels: {
	    Email: null,
	    Complaint: null,
	    MarketHero: null
	  }
	};

	var verifyDb = function verifyDb() {
	  return new _promise2.default(function (resolve) {
	    if (cachedDb.connection && cachedDb.connection._readyState === 1) {
	      console.log('cachedDb.connection._readyState: ', cachedDb.connection._readyState, '\nFOUND PREVIOUS CONNECTION\n', '\nCurrent Connections: ', cachedDb.connection.base.connections);
	      resolve(cachedDb);
	    } else {
	      var connection = _mongoose2.default.createConnection(MONGO_DB, { replset: { poolSize: 100 } });

	      console.log('CREATED NEW CONNECTION: ', connection, '\nmongoose.connection.readyState: ', connection._readyState, '\nAll Connections:', connection.base);

	      cachedDb = {
	        connection: connection,
	        dbModels: {
	          Email: (0, _email2.default)(connection),
	          Complaint: (0, _complaint2.default)(connection),
	          MarketHero: (0, _marketHero2.default)(connection)
	        }
	      };
	      console.log('\n\nCACHED Connection: \n\n', cachedDb.connection);
	      resolve(cachedDb);
	    }
	  });
	};

	exports.default = verifyDb;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = require("mongoose");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _toConsumableArray2 = __webpack_require__(14);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _promise = __webpack_require__(6);

	var _promise2 = _interopRequireDefault(_promise);

	var _axios = __webpack_require__(15);

	var _axios2 = _interopRequireDefault(_axios);

	var _bluebird = __webpack_require__(4);

	var _marketHero = __webpack_require__(16);

	var _marketHero2 = _interopRequireDefault(_marketHero);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(10).load({ silent: true }); /* eslint-disable no-use-before-define, no-console, import/newline-after-import */

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
	  _marketHero2.default.statics.createOrUpdateLead = function (userEmail, tag) {
	    return new _promise2.default(function (resolve, reject) {
	      var tagInfo = [];

	      if (Array.isArray(tag)) tagInfo = tag;else tagInfo = [tag];

	      var reqBody = {
	        apiKey: process.env.MARKET_HERO_API_KEY,
	        firstName: 'John',
	        lastName: 'Doe',
	        email: userEmail,
	        tags: tagInfo // eslint-disable-line
	      };

	      return _axios2.default.post('https://api.markethero.io/v1/api/tag-lead', reqBody, {
	        headers: {
	          'Content-Type': 'application/json'
	        }
	      }).then(function (res) {
	        if (res.status !== 200) {
	          console.log('Market Hero API Error:  Cannot update lead# ' + userEmail + '; Response: "' + res.data + '".  ');
	          return reject('Error posting to Market Hero.  ERROR = ' + res.data);
	        }
	        console.log('\nSuccessfully posted to Market Hero: \nMarket Hero response: ', res.data);
	        return resolve('Successfully posted to Market Hero: \nMarket Hero response: ' + res.data);
	      }).catch(function (error) {
	        console.log('\nError trying to saved Lead to market Hero: ', error);
	        return reject('Error trying to save LEAD to MarketHero.  ERROR = ' + error);
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

	      return _bluebird.Promise.fromCallback(function (cb) {
	        return MarketHero.create({
	          lead: { email: userEmail },
	          tags: Array.isArray(tagInfo) ? [].concat((0, _toConsumableArray3.default)(tagInfo)) : [tagInfo]
	        }, cb);
	      }).then(function (newLead) {
	        console.log('Created New lead in Mongo Database. Results: ' + newLead);
	        return resolve(newLead);
	      }).catch(function (error) {
	        console.log('Error trying to save LEAD to Mongo Database.  ERROR = ' + error);
	        return reject('Error trying to save LEAD to Mongo Database.  ERROR = ' + error);
	      });
	    });
	  };

	  _marketHero2.default.statics.updateMongoLead = function (userEmail, tag) {
	    return new _promise2.default(function (resolve, reject) {
	      var tagInfo = null;

	      if (Array.isArray(tag)) tagInfo = [].concat((0, _toConsumableArray3.default)(tag));else tagInfo = tag;

	      return MarketHero.findOne({ 'lead.email': userEmail }).exec().then(function (dbLead) {
	        console.log('Found lead in Mongo Database. Results: ' + dbLead);
	        dbLead.tags = [].concat((0, _toConsumableArray3.default)(tagInfo));
	        return MarketHero.save({ new: true });
	      }).then(function (savedLead) {
	        console.log('Successfully updated Lead: ' + savedLead);
	        return resolve('Successfully updated Lead: ' + savedLead);
	      }).catch(function (error) {
	        console.log('Error trying to save LEAD to Mongo Database.  ERROR = ' + error);
	        return reject('Error trying to save LEAD to Mongo Database.  ERROR = ' + error);
	      });
	    });
	  };

	  var MarketHero = db.model('MarketHero', _marketHero2.default);
	  return MarketHero;
	};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/toConsumableArray");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	module.exports = require("axios");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Schema = __webpack_require__(12).Schema;

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
	}, {
	  bufferCommands: true
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(2);

	var _extends3 = _interopRequireDefault(_extends2);

	var _toConsumableArray2 = __webpack_require__(14);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _promise = __webpack_require__(6);

	var _promise2 = _interopRequireDefault(_promise);

	var _awsSdk = __webpack_require__(18);

	var _awsSdk2 = _interopRequireDefault(_awsSdk);

	var _bluebird = __webpack_require__(4);

	var _isEmail = __webpack_require__(19);

	var _isEmail2 = _interopRequireDefault(_isEmail);

	var _email = __webpack_require__(20);

	var _email2 = _interopRequireDefault(_email);

	var _config = __webpack_require__(21);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_awsSdk2.default.config.update({
	  accessKeyId: _config2.default.aws.accessKeyId,
	  secretAccessKey: _config2.default.aws.secretAccessKey,
	  region: _config2.default.aws.sesEmailRegion
	}); /* eslint-disable no-use-before-define, no-console, import/newline-after-import */


	var ses = new _awsSdk2.default.SES();

	exports.default = function (db) {
	  /**
	  * 1) Find a saved Email Document.
	  * 2) Locate the sent email inside the documents - "sentEmails" array.
	  * 3) Update the email's status.  Save new changes.
	  *
	  * @param {string} msgId - SES messageId value.
	  * @param {string} status - SES status result.
	  *
	  * @return {object} - Promise: resolved - Email details.
	  */
	  _email2.default.statics.findSentEmailAndUpdate = function (msgId, status) {
	    return new _promise2.default(function (resolve, reject) {
	      if (!msgId || !status) return reject('Missing required arguments. "msgId": ' + (msgId || 'undefined') + '. "status": ' + (status || 'undefined') + '. ');

	      console.log('Querying Mongo for Email to update.  "messageId": ' + msgId + '\'.  ');

	      return Email.findOne({ 'sentEmails.messageId': msgId }).exec().then(function (dbEmail) {
	        if (!dbEmail) {
	          console.log('Could not find any Sent emails with MessageId: ', msgId);
	          return reject('Could not find sent email with id# ' + msgId + '.  ');
	        }
	        console.log('\nFound Email with MessageID: ', msgId);

	        var emailsToSave = dbEmail.sentEmails.filter(function (sent) {
	          return sent.messageId !== msgId;
	        });

	        dbEmail.sentEmails = [].concat((0, _toConsumableArray3.default)(emailsToSave), [{
	          messageId: msgId,
	          sesStatus: status
	        }]);
	        console.log('\nSaving updated Email status...  ');
	        return dbEmail.save({ new: true });
	      }).then(function (updatedEmail) {
	        console.log('Updated sent emails for Email _id: ', updatedEmail._id);
	        return resolve(updatedEmail);
	      }).catch(function (error) {
	        console.log('Query was unsuccessful.  ERROR = ' + error);
	        return reject('Query was unsuccessful.  ERROR = ' + error);
	      });
	    });
	  };
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
	      if (!type || !reqLanguage) return reject('Missing required arguments. "type": ' + (type || 'undefined') + '. "reqLanguage": ' + (reqLanguage || 'undefined') + '.  ');

	      return Email.find({ type: type }).exec().then(function (dbEmails) {
	        console.log('Found the following emails: ' + dbEmails);
	        if (!dbEmails) {
	          console.log('Did not find any emails with type: "' + type + '"');
	          return reject('Did not find any emails with type: "' + type + '".  ');
	        }

	        var foundEmail = dbEmails.filter(function (dbEmail) {
	          return dbEmail.type === type && dbEmail.language === reqLanguage;
	        })[0];

	        console.log('Filtered email results: Found "type" = ' + foundEmail.type + '.  Requested "type" = ' + type + '.  Found "language" = ' + reqLanguage + '.  Requested "language" = ' + reqLanguage + '.  ');

	        if (!foundEmail) {
	          console.log('Did not successfully filter email results array.');
	          return reject('Did not successfully filter email results array.');
	        }
	        return resolve(foundEmail);
	      }).catch(function (error) {
	        console.log('Could not find any emails with "type" = ' + type + '.  ERROR = ' + error);
	        return reject('Could not find any emails with "type" = ' + type + '.  ERROR = ' + error + '.  ');
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
	          ToAddresses: [to]
	        },
	        Source: emailDoc.replyToAddress,
	        ReplyToAddresses: [emailDoc.replyToAddress],
	        Message: {
	          Body: {
	            Html: {
	              Data: emailDoc.bodyHtmlData,
	              Charset: emailDoc.bodyHtmlCharset
	            },
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

	      console.log('\nSending AWS ses email...');
	      return _bluebird.Promise.fromCallback(function (cb) {
	        return ses.sendEmail(emailParams, cb);
	      }).then(function (data) {
	        console.log('\nSuccessfully sent SES email: \n', data, '\nSaving record of email sent to Email Document...');

	        emailDoc.sentEmails.push({ messageId: data.MessageId });

	        return emailDoc.save({ new: true });
	      }).then(function (savedEmail) {
	        console.log('\nSuccessfully updated "messageId" with value: \n', savedEmail.sentEmails.pop().messageId);
	        return resolve();
	      }).catch(function (error) {
	        console.log('\nERROR sending SES email with type: "', emailDoc.type, '"\nError = ', error, '\n', error.stack);
	        return reject({ error: true, problem: (0, _extends3.default)({}, error) });
	      });
	    });
	  };

	  var Email = db.model('Email', _email2.default);
	  return Email;
	};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	module.exports = require("aws-sdk");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	module.exports = require("validator/lib/isEmail");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Schema = __webpack_require__(12).Schema;

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
	  bodyTextCharset: { type: String, default: 'utf8' },
	  sentEmails: [{
	    messageId: { type: String },
	    sesStatus: { type: String }
	  }]
	}, {
	  bufferCommands: true
	});
	exports.default = emailSchema;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	module.exports = {
		"aws": {
			"accessKeyId": "AKIAJUPLOWQUBUVQLKCQ",
			"secretAccessKey": "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",
			"region": "ap-northeast-1",
			"sesEmailRegion": "us-east-1"
		}
	};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _promise = __webpack_require__(6);

	var _promise2 = _interopRequireDefault(_promise);

	var _isEmail = __webpack_require__(19);

	var _isEmail2 = _interopRequireDefault(_isEmail);

	var _complaint = __webpack_require__(23);

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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Schema = __webpack_require__(12).Schema;

	var complaintSchema = new Schema({
	  emails: {
	    email: { type: String, required: true },
	    created: { type: Date, default: Date.now },
	    messageId: { type: String, required: true }
	  }
	}, {
	  bufferCommands: true
	});
	exports.default = complaintSchema;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ })
/******/ ])));