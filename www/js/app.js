/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/idb-wrapper/idbstore.js":
/*!**********************************************!*\
  !*** ./node_modules/idb-wrapper/idbstore.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global window:false, self:false, define:false, module:false */

/**
 * @license IDBWrapper - A cross-browser wrapper for IndexedDB
 * Version 1.7.2
 * Copyright (c) 2011 - 2017 Jens Arps
 * http://jensarps.de/
 *
 * Licensed under the MIT license
 */

(function (name, definition, global) {

    'use strict';

    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
})('IDBStore', function () {

    'use strict';

    var defaultErrorHandler = function (error) {
        throw error;
    };
    var defaultSuccessHandler = function () {
    };

    var defaults = {
        storeName: 'Store',
        storePrefix: 'IDBWrapper-',
        dbVersion: 1,
        keyPath: 'id',
        autoIncrement: true,
        onStoreReady: function () {
        },
        onError: defaultErrorHandler,
        indexes: [],
        implementationPreference: [
            'indexedDB',
            'webkitIndexedDB',
            'mozIndexedDB',
            'shimIndexedDB'
        ]
    };

    /**
     *
     * The IDBStore constructor
     *
     * @constructor
     * @name IDBStore
     * @version 1.7.2
     *
     * @param {Object} [kwArgs] An options object used to configure the store and
     *  set callbacks
     * @param {String} [kwArgs.storeName='Store'] The name of the store
     * @param {String} [kwArgs.storePrefix='IDBWrapper-'] A prefix that is
     *  internally used to construct the name of the database, which will be
     *  kwArgs.storePrefix + kwArgs.storeName
     * @param {Number} [kwArgs.dbVersion=1] The version of the store
     * @param {String} [kwArgs.keyPath='id'] The key path to use. If you want to
     *  setup IDBWrapper to work with out-of-line keys, you need to set this to
     *  `null`
     * @param {Boolean} [kwArgs.autoIncrement=true] If set to true, IDBStore will
     *  automatically make sure a unique keyPath value is present on each object
     *  that is stored.
     * @param {Function} [kwArgs.onStoreReady] A callback to be called when the
     *  store is ready to be used.
     * @param {Function} [kwArgs.onError=throw] A callback to be called when an
     *  error occurred during instantiation of the store.
     * @param {Array} [kwArgs.indexes=[]] An array of indexData objects
     *  defining the indexes to use with the store. For every index to be used
     *  one indexData object needs to be passed in the array.
     *  An indexData object is defined as follows:
     * @param {Object} [kwArgs.indexes.indexData] An object defining the index to
     *  use
     * @param {String} kwArgs.indexes.indexData.name The name of the index
     * @param {String} [kwArgs.indexes.indexData.keyPath] The key path of the index
     * @param {Boolean} [kwArgs.indexes.indexData.unique] Whether the index is unique
     * @param {Boolean} [kwArgs.indexes.indexData.multiEntry] Whether the index is multi entry
     * @param {Array} [kwArgs.implementationPreference=['indexedDB','webkitIndexedDB','mozIndexedDB','shimIndexedDB']] An array of strings naming implementations to be used, in order or preference
     * @param {Function} [onStoreReady] A callback to be called when the store
     * is ready to be used.
     * @example
     // create a store for customers with an additional index over the
     // `lastname` property.
     var myCustomerStore = new IDBStore({
         dbVersion: 1,
         storeName: 'customer-index',
         keyPath: 'customerid',
         autoIncrement: true,
         onStoreReady: populateTable,
         indexes: [
             { name: 'lastname', keyPath: 'lastname', unique: false, multiEntry: false }
         ]
     });
     * @example
     // create a generic store
     var myCustomerStore = new IDBStore({
         storeName: 'my-data-store',
         onStoreReady: function(){
             // start working with the store.
         }
     });
     */
    var IDBStore = function (kwArgs, onStoreReady) {

        if (typeof onStoreReady == 'undefined' && typeof kwArgs == 'function') {
            onStoreReady = kwArgs;
        }
        if (Object.prototype.toString.call(kwArgs) != '[object Object]') {
            kwArgs = {};
        }

        for (var key in defaults) {
            this[key] = typeof kwArgs[key] != 'undefined' ? kwArgs[key] : defaults[key];
        }

        this.dbName = this.storePrefix + this.storeName;
        this.dbVersion = parseInt(this.dbVersion, 10) || 1;

        onStoreReady && (this.onStoreReady = onStoreReady);

        var env = typeof window == 'object' ? window : self;
        var availableImplementations = this.implementationPreference.filter(function (implName) {
            return implName in env;
        });
        this.implementation = availableImplementations[0];
        this.idb = env[this.implementation];
        this.keyRange = env.IDBKeyRange || env.webkitIDBKeyRange || env.mozIDBKeyRange;

        this.consts = {
            'READ_ONLY': 'readonly',
            'READ_WRITE': 'readwrite',
            'VERSION_CHANGE': 'versionchange',
            'NEXT': 'next',
            'NEXT_NO_DUPLICATE': 'nextunique',
            'PREV': 'prev',
            'PREV_NO_DUPLICATE': 'prevunique'
        };

        this.openDB();
    };

    /** @lends IDBStore.prototype */
    var proto = {

        /**
         * A pointer to the IDBStore ctor
         *
         * @private
         * @type {Function}
         * @constructs
         */
        constructor: IDBStore,

        /**
         * The version of IDBStore
         *
         * @type {String}
         */
        version: '1.7.2',

        /**
         * A reference to the IndexedDB object
         *
         * @type {IDBDatabase}
         */
        db: null,

        /**
         * The full name of the IndexedDB used by IDBStore, composed of
         * this.storePrefix + this.storeName
         *
         * @type {String}
         */
        dbName: null,

        /**
         * The version of the IndexedDB used by IDBStore
         *
         * @type {Number}
         */
        dbVersion: null,

        /**
         * A reference to the objectStore used by IDBStore
         *
         * @type {IDBObjectStore}
         */
        store: null,

        /**
         * The store name
         *
         * @type {String}
         */
        storeName: null,

        /**
         * The prefix to prepend to the store name
         *
         * @type {String}
         */
        storePrefix: null,

        /**
         * The key path
         *
         * @type {String}
         */
        keyPath: null,

        /**
         * Whether IDBStore uses autoIncrement
         *
         * @type {Boolean}
         */
        autoIncrement: null,

        /**
         * The indexes used by IDBStore
         *
         * @type {Array}
         */
        indexes: null,

        /**
         * The implemantations to try to use, in order of preference
         *
         * @type {Array}
         */
        implementationPreference: null,

        /**
         * The actual implementation being used
         *
         * @type {String}
         */
        implementation: '',

        /**
         * The callback to be called when the store is ready to be used
         *
         * @type {Function}
         */
        onStoreReady: null,

        /**
         * The callback to be called if an error occurred during instantiation
         * of the store
         *
         * @type {Function}
         */
        onError: null,

        /**
         * The internal insertID counter
         *
         * @type {Number}
         * @private
         */
        _insertIdCount: 0,

        /**
         * Opens an IndexedDB; called by the constructor.
         *
         * Will check if versions match and compare provided index configuration
         * with existing ones, and update indexes if necessary.
         *
         * Will call this.onStoreReady() if everything went well and the store
         * is ready to use, and this.onError() is something went wrong.
         *
         * @private
         *
         */
        openDB: function () {

            var openRequest = this.idb.open(this.dbName, this.dbVersion);
            var preventSuccessCallback = false;

            openRequest.onerror = function (errorEvent) {

                if (hasVersionError(errorEvent)) {
                    this.onError(new Error('The version number provided is lower than the existing one.'));
                } else {
                    var error;

                    if (errorEvent.target.error) {
                        error = errorEvent.target.error;
                    } else {
                        var errorMessage = 'IndexedDB unknown error occurred when opening DB ' + this.dbName + ' version ' + this.dbVersion;
                        if ('errorCode' in errorEvent.target) {
                            errorMessage += ' with error code ' + errorEvent.target.errorCode;
                        }
                        error = new Error(errorMessage);
                    }

                    this.onError(error);
                }
            }.bind(this);

            openRequest.onsuccess = function (event) {

                if (preventSuccessCallback) {
                    return;
                }

                if (this.db) {
                    this.onStoreReady();
                    return;
                }

                this.db = event.target.result;

                if (typeof this.db.version == 'string') {
                    this.onError(new Error('The IndexedDB implementation in this browser is outdated. Please upgrade your browser.'));
                    return;
                }

                if (!this.db.objectStoreNames.contains(this.storeName)) {
                    // We should never ever get here.
                    // Lets notify the user anyway.
                    this.onError(new Error('Object store couldn\'t be created.'));
                    return;
                }

                var emptyTransaction = this.db.transaction([this.storeName], this.consts.READ_ONLY);
                this.store = emptyTransaction.objectStore(this.storeName);

                // check indexes
                var existingIndexes = Array.prototype.slice.call(this.getIndexList());
                this.indexes.forEach(function (indexData) {
                    var indexName = indexData.name;

                    if (!indexName) {
                        preventSuccessCallback = true;
                        this.onError(new Error('Cannot create index: No index name given.'));
                        return;
                    }

                    this.normalizeIndexData(indexData);

                    if (this.hasIndex(indexName)) {
                        // check if it complies
                        var actualIndex = this.store.index(indexName);
                        var complies = this.indexComplies(actualIndex, indexData);
                        if (!complies) {
                            preventSuccessCallback = true;
                            this.onError(new Error('Cannot modify index "' + indexName + '" for current version. Please bump version number to ' + ( this.dbVersion + 1 ) + '.'));
                        }

                        existingIndexes.splice(existingIndexes.indexOf(indexName), 1);
                    } else {
                        preventSuccessCallback = true;
                        this.onError(new Error('Cannot create new index "' + indexName + '" for current version. Please bump version number to ' + ( this.dbVersion + 1 ) + '.'));
                    }

                }, this);

                if (existingIndexes.length) {
                    preventSuccessCallback = true;
                    this.onError(new Error('Cannot delete index(es) "' + existingIndexes.toString() + '" for current version. Please bump version number to ' + ( this.dbVersion + 1 ) + '.'));
                }

                preventSuccessCallback || this.onStoreReady();
            }.bind(this);

            openRequest.onupgradeneeded = function (/* IDBVersionChangeEvent */ event) {

                this.db = event.target.result;

                if (this.db.objectStoreNames.contains(this.storeName)) {
                    this.store = event.target.transaction.objectStore(this.storeName);
                } else {
                    var optionalParameters = {autoIncrement: this.autoIncrement};
                    if (this.keyPath !== null) {
                        optionalParameters.keyPath = this.keyPath;
                    }
                    this.store = this.db.createObjectStore(this.storeName, optionalParameters);
                }

                var existingIndexes = Array.prototype.slice.call(this.getIndexList());
                this.indexes.forEach(function (indexData) {
                    var indexName = indexData.name;

                    if (!indexName) {
                        preventSuccessCallback = true;
                        this.onError(new Error('Cannot create index: No index name given.'));
                    }

                    this.normalizeIndexData(indexData);

                    if (this.hasIndex(indexName)) {
                        // check if it complies
                        var actualIndex = this.store.index(indexName);
                        var complies = this.indexComplies(actualIndex, indexData);
                        if (!complies) {
                            // index differs, need to delete and re-create
                            this.store.deleteIndex(indexName);
                            this.store.createIndex(indexName, indexData.keyPath, {
                                unique: indexData.unique,
                                multiEntry: indexData.multiEntry
                            });
                        }

                        existingIndexes.splice(existingIndexes.indexOf(indexName), 1);
                    } else {
                        this.store.createIndex(indexName, indexData.keyPath, {
                            unique: indexData.unique,
                            multiEntry: indexData.multiEntry
                        });
                    }

                }, this);

                if (existingIndexes.length) {
                    existingIndexes.forEach(function (_indexName) {
                        this.store.deleteIndex(_indexName);
                    }, this);
                }

            }.bind(this);
        },

        /**
         * Deletes the database used for this store if the IDB implementations
         * provides that functionality.
         *
         * @param {Function} [onSuccess] A callback that is called if deletion
         *  was successful.
         * @param {Function} [onError] A callback that is called if deletion
         *  failed.
         */
        deleteDatabase: function (onSuccess, onError) {
            if (this.idb.deleteDatabase) {
                this.db.close();
                var deleteRequest = this.idb.deleteDatabase(this.dbName);
                deleteRequest.onsuccess = onSuccess;
                deleteRequest.onerror = onError;
            } else {
                onError(new Error('Browser does not support IndexedDB deleteDatabase!'));
            }
        },

        /*********************
         * data manipulation *
         *********************/

        /**
         * Puts an object into the store. If an entry with the given id exists,
         * it will be overwritten. This method has a different signature for inline
         * keys and out-of-line keys; please see the examples below.
         *
         * @param {*} [key] The key to store. This is only needed if IDBWrapper
         *  is set to use out-of-line keys. For inline keys - the default scenario -
         *  this can be omitted.
         * @param {Object} value The data object to store.
         * @param {Function} [onSuccess] A callback that is called if insertion
         *  was successful.
         * @param {Function} [onError] A callback that is called if insertion
         *  failed.
         * @returns {IDBTransaction} The transaction used for this operation.
         * @example
         // Storing an object, using inline keys (the default scenario):
         var myCustomer = {
             customerid: 2346223,
             lastname: 'Doe',
             firstname: 'John'
         };
         myCustomerStore.put(myCustomer, mySuccessHandler, myErrorHandler);
         // Note that passing success- and error-handlers is optional.
         * @example
         // Storing an object, using out-of-line keys:
         var myCustomer = {
             lastname: 'Doe',
             firstname: 'John'
         };
         myCustomerStore.put(2346223, myCustomer, mySuccessHandler, myErrorHandler);
         // Note that passing success- and error-handlers is optional.
         */
        put: function (key, value, onSuccess, onError) {
            if (this.keyPath !== null) {
                onError = onSuccess;
                onSuccess = value;
                value = key;
            }
            onError || (onError = defaultErrorHandler);
            onSuccess || (onSuccess = defaultSuccessHandler);

            var hasSuccess = false,
                result = null,
                putRequest;

            var putTransaction = this.db.transaction([this.storeName], this.consts.READ_WRITE);
            putTransaction.oncomplete = function () {
                var callback = hasSuccess ? onSuccess : onError;
                callback(result);
            };
            putTransaction.onabort = onError;
            putTransaction.onerror = onError;

            if (this.keyPath !== null) { // in-line keys
                this._addIdPropertyIfNeeded(value);
                putRequest = putTransaction.objectStore(this.storeName).put(value);
            } else { // out-of-line keys
                putRequest = putTransaction.objectStore(this.storeName).put(value, key);
            }
            putRequest.onsuccess = function (event) {
                hasSuccess = true;
                result = event.target.result;
            };
            putRequest.onerror = onError;

            return putTransaction;
        },

        /**
         * Retrieves an object from the store. If no entry exists with the given id,
         * the success handler will be called with null as first and only argument.
         *
         * @param {*} key The id of the object to fetch.
         * @param {Function} [onSuccess] A callback that is called if fetching
         *  was successful. Will receive the object as only argument.
         * @param {Function} [onError] A callback that will be called if an error
         *  occurred during the operation.
         * @returns {IDBTransaction} The transaction used for this operation.
         */
        get: function (key, onSuccess, onError) {
            onError || (onError = defaultErrorHandler);
            onSuccess || (onSuccess = defaultSuccessHandler);

            var hasSuccess = false,
                result = null;

            var getTransaction = this.db.transaction([this.storeName], this.consts.READ_ONLY);
            getTransaction.oncomplete = function () {
                var callback = hasSuccess ? onSuccess : onError;
                callback(result);
            };
            getTransaction.onabort = onError;
            getTransaction.onerror = onError;
            var getRequest = getTransaction.objectStore(this.storeName).get(key);
            getRequest.onsuccess = function (event) {
                hasSuccess = true;
                result = event.target.result;
            };
            getRequest.onerror = onError;

            return getTransaction;
        },

        /**
         * Removes an object from the store.
         *
         * @param {*} key The id of the object to remove.
         * @param {Function} [onSuccess] A callback that is called if the removal
         *  was successful.
         * @param {Function} [onError] A callback that will be called if an error
         *  occurred during the operation.
         * @returns {IDBTransaction} The transaction used for this operation.
         */
        remove: function (key, onSuccess, onError) {
            onError || (onError = defaultErrorHandler);
            onSuccess || (onSuccess = defaultSuccessHandler);

            var hasSuccess = false,
                result = null;

            var removeTransaction = this.db.transaction([this.storeName], this.consts.READ_WRITE);
            removeTransaction.oncomplete = function () {
                var callback = hasSuccess ? onSuccess : onError;
                callback(result);
            };
            removeTransaction.onabort = onError;
            removeTransaction.onerror = onError;

            var deleteRequest = removeTransaction.objectStore(this.storeName)['delete'](key);
            deleteRequest.onsuccess = function (event) {
                hasSuccess = true;
                result = event.target.result;
            };
            deleteRequest.onerror = onError;

            return removeTransaction;
        },

        /**
         * Runs a batch of put and/or remove operations on the store.
         *
         * @param {Array} dataArray An array of objects containing the operation to run
         *  and the data object (for put operations).
         * @param {Function} [onSuccess] A callback that is called if all operations
         *  were successful.
         * @param {Function} [onError] A callback that is called if an error
         *  occurred during one of the operations.
         * @returns {IDBTransaction} The transaction used for this operation.
         */
        batch: function (dataArray, onSuccess, onError) {
            onError || (onError = defaultErrorHandler);
            onSuccess || (onSuccess = defaultSuccessHandler);

            if (Object.prototype.toString.call(dataArray) != '[object Array]') {
                onError(new Error('dataArray argument must be of type Array.'));
            } else if (dataArray.length === 0) {
                return onSuccess(true);
            }

            var count = dataArray.length;
            var called = false;
            var hasSuccess = false;

            var batchTransaction = this.db.transaction([this.storeName], this.consts.READ_WRITE);
            batchTransaction.oncomplete = function () {
                var callback = hasSuccess ? onSuccess : onError;
                callback(hasSuccess);
            };
            batchTransaction.onabort = onError;
            batchTransaction.onerror = onError;


            var onItemSuccess = function () {
                count--;
                if (count === 0 && !called) {
                    called = true;
                    hasSuccess = true;
                }
            };

            dataArray.forEach(function (operation) {
                var type = operation.type;
                var key = operation.key;
                var value = operation.value;

                var onItemError = function (err) {
                    batchTransaction.abort();
                    if (!called) {
                        called = true;
                        onError(err, type, key);
                    }
                };

                if (type == 'remove') {
                    var deleteRequest = batchTransaction.objectStore(this.storeName)['delete'](key);
                    deleteRequest.onsuccess = onItemSuccess;
                    deleteRequest.onerror = onItemError;
                } else if (type == 'put') {
                    var putRequest;
                    if (this.keyPath !== null) { // in-line keys
                        this._addIdPropertyIfNeeded(value);
                        putRequest = batchTransaction.objectStore(this.storeName).put(value);
                    } else { // out-of-line keys
                        putRequest = batchTransaction.objectStore(this.storeName).put(value, key);
                    }
                    putRequest.onsuccess = onItemSuccess;
                    putRequest.onerror = onItemError;
                }
            }, this);

            return batchTransaction;
        },

        /**
         * Takes an array of objects and stores them in a single transaction.
         *
         * @param {Array} dataArray An array of objects to store
         * @param {Function} [onSuccess] A callback that is called if all operations
         *  were successful.
         * @param {Function} [onError] A callback that is called if an error
         *  occurred during one of the operations.
         * @returns {IDBTransaction} The transaction used for this operation.
         */
        putBatch: function (dataArray, onSuccess, onError) {
            var batchData = dataArray.map(function (item) {
                return {type: 'put', value: item};
            });

            return this.batch(batchData, onSuccess, onError);
        },

        /**
         * Like putBatch, takes an array of objects and stores them in a single
         * transaction, but allows processing of the result values.  Returns the
         * processed records containing the key for newly created records to the
         * onSuccess calllback instead of only returning true or false for success.
         * In addition, added the option for the caller to specify a key field that
         * should be set to the newly created key.
         *
         * @param {Array} dataArray An array of objects to store
         * @param {Object} [options] An object containing optional options
         * @param {String} [options.keyField=this.keyPath] Specifies a field in the record to update
         *  with the auto-incrementing key. Defaults to the store's keyPath.
         * @param {Function} [onSuccess] A callback that is called if all operations
         *  were successful.
         * @param {Function} [onError] A callback that is called if an error
         *  occurred during one of the operations.
         * @returns {IDBTransaction} The transaction used for this operation.
         *
         */
        upsertBatch: function (dataArray, options, onSuccess, onError) {
            // handle `dataArray, onSuccess, onError` signature
            if (typeof options == 'function') {
                onSuccess = options;
                onError = onSuccess;
                options = {};
            }

            onError || (onError = defaultErrorHandler);
            onSuccess || (onSuccess = defaultSuccessHandler);
            options || (options = {});

            if (Object.prototype.toString.call(dataArray) != '[object Array]') {
                onError(new Error('dataArray argument must be of type Array.'));
            }

            var keyField = options.keyField || this.keyPath;
            var count = dataArray.length;
            var called = false;
            var hasSuccess = false;
            var index = 0; // assume success callbacks are executed in order

            var batchTransaction = this.db.transaction([this.storeName], this.consts.READ_WRITE);
            batchTransaction.oncomplete = function () {
                if (hasSuccess) {
                    onSuccess(dataArray);
                } else {
                    onError(false);
                }
            };
            batchTransaction.onabort = onError;
            batchTransaction.onerror = onError;

            var onItemSuccess = function (event) {
                var record = dataArray[index++];
                record[keyField] = event.target.result;

                count--;
                if (count === 0 && !called) {
                    called = true;
                    hasSuccess = true;
                }
            };

            dataArray.forEach(function (record) {
                var key = record.key;

                var onItemError = function (err) {
                    batchTransaction.abort();
                    if (!called) {
                        called = true;
                        onError(err);
                    }
                };

                var putRequest;
                if (this.keyPath !== null) { // in-line keys
                    this._addIdPropertyIfNeeded(record);
                    putRequest = batchTransaction.objectStore(this.storeName).put(record);
                } else { // out-of-line keys
                    putRequest = batchTransaction.objectStore(this.storeName).put(record, key);
                }
                putRequest.onsuccess = onItemSuccess;
                putRequest.onerror = onItemError;
            }, this);

            return batchTransaction;
        },

        /**
         * Takes an array of keys and removes matching objects in a single
         * transaction.
         *
         * @param {Array} keyArray An array of keys to remove
         * @param {Function} [onSuccess] A callback that is called if all operations
         *  were successful.
         * @param {Function} [onError] A callback that is called if an error
         *  occurred during one of the operations.
         * @returns {IDBTransaction} The transaction used for this operation.
         */
        removeBatch: function (keyArray, onSuccess, onError) {
            var batchData = keyArray.map(function (key) {
                return {type: 'remove', key: key};
            });

            return this.batch(batchData, onSuccess, onError);
        },

        /**
         * Takes an array of keys and fetches matching objects
         *
         * @param {Array} keyArray An array of keys identifying the objects to fetch
         * @param {Function} [onSuccess] A callback that is called if all operations
         *  were successful.
         * @param {Function} [onError] A callback that is called if an error
         *  occurred during one of the operations.
         * @param {String} [arrayType='sparse'] The type of array to pass to the
         *  success handler. May be one of 'sparse', 'dense' or 'skip'. Defaults to
         *  'sparse'. This parameter specifies how to handle the situation if a get
         *  operation did not throw an error, but there was no matching object in
         *  the database. In most cases, 'sparse' provides the most desired
         *  behavior. See the examples for details.
         * @returns {IDBTransaction} The transaction used for this operation.
         * @example
         // given that there are two objects in the database with the keypath
         // values 1 and 2, and the call looks like this:
         myStore.getBatch([1, 5, 2], onError, function (data) { … }, arrayType);

         // this is what the `data` array will be like:

         // arrayType == 'sparse':
         // data is a sparse array containing two entries and having a length of 3:
         [Object, 2: Object]
         0: Object
         2: Object
         length: 3
         // calling forEach on data will result in the callback being called two
         // times, with the index parameter matching the index of the key in the
         // keyArray.

         // arrayType == 'dense':
         // data is a dense array containing three entries and having a length of 3,
         // where data[1] is of type undefined:
         [Object, undefined, Object]
         0: Object
         1: undefined
         2: Object
         length: 3
         // calling forEach on data will result in the callback being called three
         // times, with the index parameter matching the index of the key in the
         // keyArray, but the second call will have undefined as first argument.

         // arrayType == 'skip':
         // data is a dense array containing two entries and having a length of 2:
         [Object, Object]
         0: Object
         1: Object
         length: 2
         // calling forEach on data will result in the callback being called two
         // times, with the index parameter not matching the index of the key in the
         // keyArray.
         */
        getBatch: function (keyArray, onSuccess, onError, arrayType) {
            onError || (onError = defaultErrorHandler);
            onSuccess || (onSuccess = defaultSuccessHandler);
            arrayType || (arrayType = 'sparse');

            if (Object.prototype.toString.call(keyArray) != '[object Array]') {
                onError(new Error('keyArray argument must be of type Array.'));
            } else if (keyArray.length === 0) {
                return onSuccess([]);
            }

            var data = [];
            var count = keyArray.length;
            var called = false;
            var hasSuccess = false;
            var result = null;

            var batchTransaction = this.db.transaction([this.storeName], this.consts.READ_ONLY);
            batchTransaction.oncomplete = function () {
                var callback = hasSuccess ? onSuccess : onError;
                callback(result);
            };
            batchTransaction.onabort = onError;
            batchTransaction.onerror = onError;

            var onItemSuccess = function (event) {
                if (event.target.result || arrayType == 'dense') {
                    data.push(event.target.result);
                } else if (arrayType == 'sparse') {
                    data.length++;
                }
                count--;
                if (count === 0) {
                    called = true;
                    hasSuccess = true;
                    result = data;
                }
            };

            keyArray.forEach(function (key) {

                var onItemError = function (err) {
                    called = true;
                    result = err;
                    onError(err);
                    batchTransaction.abort();
                };

                var getRequest = batchTransaction.objectStore(this.storeName).get(key);
                getRequest.onsuccess = onItemSuccess;
                getRequest.onerror = onItemError;

            }, this);

            return batchTransaction;
        },

        /**
         * Fetches all entries in the store.
         *
         * @param {Function} [onSuccess] A callback that is called if the operation
         *  was successful. Will receive an array of objects.
         * @param {Function} [onError] A callback that will be called if an error
         *  occurred during the operation.
         * @returns {IDBTransaction} The transaction used for this operation.
         */
        getAll: function (onSuccess, onError) {
            onError || (onError = defaultErrorHandler);
            onSuccess || (onSuccess = defaultSuccessHandler);
            var getAllTransaction = this.db.transaction([this.storeName], this.consts.READ_ONLY);
            var store = getAllTransaction.objectStore(this.storeName);
            if (store.getAll) {
                this._getAllNative(getAllTransaction, store, onSuccess, onError);
            } else {
                this._getAllCursor(getAllTransaction, store, onSuccess, onError);
            }

            return getAllTransaction;
        },

        /**
         * Implements getAll for IDB implementations that have a non-standard
         * getAll() method.
         *
         * @param {IDBTransaction} getAllTransaction An open READ transaction.
         * @param {IDBObjectStore} store A reference to the store.
         * @param {Function} onSuccess A callback that will be called if the
         *  operation was successful.
         * @param {Function} onError A callback that will be called if an
         *  error occurred during the operation.
         * @private
         */
        _getAllNative: function (getAllTransaction, store, onSuccess, onError) {
            var hasSuccess = false,
                result = null;

            getAllTransaction.oncomplete = function () {
                var callback = hasSuccess ? onSuccess : onError;
                callback(result);
            };
            getAllTransaction.onabort = onError;
            getAllTransaction.onerror = onError;

            var getAllRequest = store.getAll();
            getAllRequest.onsuccess = function (event) {
                hasSuccess = true;
                result = event.target.result;
            };
            getAllRequest.onerror = onError;
        },

        /**
         * Implements getAll for IDB implementations that do not have a getAll()
         * method.
         *
         * @param {IDBTransaction} getAllTransaction An open READ transaction.
         * @param {IDBObjectStore} store A reference to the store.
         * @param {Function} onSuccess A callback that will be called if the
         *  operation was successful.
         * @param {Function} onError A callback that will be called if an
         *  error occurred during the operation.
         * @private
         */
        _getAllCursor: function (getAllTransaction, store, onSuccess, onError) {
            var all = [],
                hasSuccess = false,
                result = null;

            getAllTransaction.oncomplete = function () {
                var callback = hasSuccess ? onSuccess : onError;
                callback(result);
            };
            getAllTransaction.onabort = onError;
            getAllTransaction.onerror = onError;

            var cursorRequest = store.openCursor();
            cursorRequest.onsuccess = function (event) {
                var cursor = event.target.result;
                if (cursor) {
                    all.push(cursor.value);
                    cursor['continue']();
                }
                else {
                    hasSuccess = true;
                    result = all;
                }
            };
            cursorRequest.onError = onError;
        },

        /**
         * Clears the store, i.e. deletes all entries in the store.
         *
         * @param {Function} [onSuccess] A callback that will be called if the
         *  operation was successful.
         * @param {Function} [onError] A callback that will be called if an
         *  error occurred during the operation.
         * @returns {IDBTransaction} The transaction used for this operation.
         */
        clear: function (onSuccess, onError) {
            onError || (onError = defaultErrorHandler);
            onSuccess || (onSuccess = defaultSuccessHandler);

            var hasSuccess = false,
                result = null;

            var clearTransaction = this.db.transaction([this.storeName], this.consts.READ_WRITE);
            clearTransaction.oncomplete = function () {
                var callback = hasSuccess ? onSuccess : onError;
                callback(result);
            };
            clearTransaction.onabort = onError;
            clearTransaction.onerror = onError;

            var clearRequest = clearTransaction.objectStore(this.storeName).clear();
            clearRequest.onsuccess = function (event) {
                hasSuccess = true;
                result = event.target.result;
            };
            clearRequest.onerror = onError;

            return clearTransaction;
        },

        /**
         * Checks if an id property needs to present on a object and adds one if
         * necessary.
         *
         * @param {Object} dataObj The data object that is about to be stored
         * @private
         */
        _addIdPropertyIfNeeded: function (dataObj) {
            if (typeof dataObj[this.keyPath] == 'undefined') {
                dataObj[this.keyPath] = this._insertIdCount++ + Date.now();
            }
        },

        /************
         * indexing *
         ************/

        /**
         * Returns a DOMStringList of index names of the store.
         *
         * @return {DOMStringList} The list of index names
         */
        getIndexList: function () {
            return this.store.indexNames;
        },

        /**
         * Checks if an index with the given name exists in the store.
         *
         * @param {String} indexName The name of the index to look for
         * @return {Boolean} Whether the store contains an index with the given name
         */
        hasIndex: function (indexName) {
            return this.store.indexNames.contains(indexName);
        },

        /**
         * Normalizes an object containing index data and assures that all
         * properties are set.
         *
         * @param {Object} indexData The index data object to normalize
         * @param {String} indexData.name The name of the index
         * @param {String} [indexData.keyPath] The key path of the index
         * @param {Boolean} [indexData.unique] Whether the index is unique
         * @param {Boolean} [indexData.multiEntry] Whether the index is multi entry
         */
        normalizeIndexData: function (indexData) {
            indexData.keyPath = indexData.keyPath || indexData.name;
            indexData.unique = !!indexData.unique;
            indexData.multiEntry = !!indexData.multiEntry;
        },

        /**
         * Checks if an actual index complies with an expected index.
         *
         * @param {IDBIndex} actual The actual index found in the store
         * @param {Object} expected An Object describing an expected index
         * @return {Boolean} Whether both index definitions are identical
         */
        indexComplies: function (actual, expected) {
            var complies = ['keyPath', 'unique', 'multiEntry'].every(function (key) {
                // IE10 returns undefined for no multiEntry
                if (key == 'multiEntry' && actual[key] === undefined && expected[key] === false) {
                    return true;
                }
                // Compound keys
                if (key == 'keyPath' && Object.prototype.toString.call(expected[key]) == '[object Array]') {
                    var exp = expected.keyPath;
                    var act = actual.keyPath;

                    // IE10 can't handle keyPath sequences and stores them as a string.
                    // The index will be unusable there, but let's still return true if
                    // the keyPath sequence matches.
                    if (typeof act == 'string') {
                        return exp.toString() == act;
                    }

                    // Chrome/Opera stores keyPath squences as DOMStringList, Firefox
                    // as Array
                    if (!(typeof act.contains == 'function' || typeof act.indexOf == 'function')) {
                        return false;
                    }

                    if (act.length !== exp.length) {
                        return false;
                    }

                    for (var i = 0, m = exp.length; i < m; i++) {
                        if (!( (act.contains && act.contains(exp[i])) || act.indexOf(exp[i] !== -1) )) {
                            return false;
                        }
                    }
                    return true;
                }
                return expected[key] == actual[key];
            });
            return complies;
        },

        /**********
         * cursor *
         **********/

        /**
         * Iterates over the store using the given options and calling onItem
         * for each entry matching the options.
         *
         * @param {Function} onItem A callback to be called for each match
         * @param {Object} [options] An object defining specific options
         * @param {String} [options.index=null] A name of an IDBIndex to operate on
         * @param {String} [options.order=ASC] The order in which to provide the
         *  results, can be 'DESC' or 'ASC'
         * @param {Boolean} [options.autoContinue=true] Whether to automatically
         *  iterate the cursor to the next result
         * @param {Boolean} [options.filterDuplicates=false] Whether to exclude
         *  duplicate matches
         * @param {IDBKeyRange} [options.keyRange=null] An IDBKeyRange to use
         * @param {Boolean} [options.writeAccess=false] Whether grant write access
         *  to the store in the onItem callback
         * @param {Function} [options.onEnd=null] A callback to be called after
         *  iteration has ended
         * @param {Function} [options.onError=throw] A callback to be called
         *  if an error occurred during the operation.
         * @param {Number} [options.limit=Infinity] Limit the number of returned
         *  results to this number
         * @param {Number} [options.offset=0] Skip the provided number of results
         *  in the resultset
         * @param {Boolean} [options.allowItemRejection=false] Allows the onItem
         * function to return a Boolean to accept or reject the current item
         * @returns {IDBTransaction} The transaction used for this operation.
         */
        iterate: function (onItem, options) {
            options = mixin({
                index: null,
                order: 'ASC',
                autoContinue: true,
                filterDuplicates: false,
                keyRange: null,
                writeAccess: false,
                onEnd: null,
                onError: defaultErrorHandler,
                limit: Infinity,
                offset: 0,
                allowItemRejection: false
            }, options || {});

            var directionType = options.order.toLowerCase() == 'desc' ? 'PREV' : 'NEXT';
            if (options.filterDuplicates) {
                directionType += '_NO_DUPLICATE';
            }

            var hasSuccess = false;
            var cursorTransaction = this.db.transaction([this.storeName], this.consts[options.writeAccess ? 'READ_WRITE' : 'READ_ONLY']);
            var cursorTarget = cursorTransaction.objectStore(this.storeName);
            if (options.index) {
                cursorTarget = cursorTarget.index(options.index);
            }
            var recordCount = 0;

            cursorTransaction.oncomplete = function () {
                if (!hasSuccess) {
                    options.onError(null);
                    return;
                }
                if (options.onEnd) {
                    options.onEnd();
                } else {
                    onItem(null);
                }
            };
            cursorTransaction.onabort = options.onError;
            cursorTransaction.onerror = options.onError;

            var cursorRequest = cursorTarget.openCursor(options.keyRange, this.consts[directionType]);
            cursorRequest.onerror = options.onError;
            cursorRequest.onsuccess = function (event) {
                var cursor = event.target.result;
                if (cursor) {
                    if (options.offset) {
                        cursor.advance(options.offset);
                        options.offset = 0;
                    } else {
                        var onItemReturn = onItem(cursor.value, cursor, cursorTransaction);
                        if (!options.allowItemRejection || onItemReturn !== false) {
                            recordCount++;
                        }
                        if (options.autoContinue) {
                            if (recordCount + options.offset < options.limit) {
                                cursor['continue']();
                            } else {
                                hasSuccess = true;
                            }
                        }
                    }
                } else {
                    hasSuccess = true;
                }
            };

            return cursorTransaction;
        },

        /**
         * Runs a query against the store and passes an array containing matched
         * objects to the success handler.
         *
         * @param {Function} onSuccess A callback to be called when the operation
         *  was successful.
         * @param {Object} [options] An object defining specific options
         * @param {String} [options.index=null] A name of an IDBIndex to operate on
         * @param {String} [options.order=ASC] The order in which to provide the
         *  results, can be 'DESC' or 'ASC'
         * @param {Boolean} [options.filterDuplicates=false] Whether to exclude
         *  duplicate matches
         * @param {IDBKeyRange} [options.keyRange=null] An IDBKeyRange to use
         * @param {Function} [options.onError=throw] A callback to be called
         *  if an error occurred during the operation.
         * @param {Number} [options.limit=Infinity] Limit the number of returned
         *  results to this number
         * @param {Number} [options.offset=0] Skip the provided number of results
         *  in the resultset
         * @param {Function} [options.filter=null] A custom filter function to
         *  apply to query resuts before returning. Must return `false` to reject
         *  an item. Can be combined with keyRanges.
         * @returns {IDBTransaction} The transaction used for this operation.
         */
        query: function (onSuccess, options) {
            var result = [],
                processedItems = 0;
            options = options || {};
            options.autoContinue = true;
            options.writeAccess = false;
            options.allowItemRejection = !!options.filter;
            options.onEnd = function () {
                onSuccess(result, processedItems);
            };
            return this.iterate(function (item) {
                processedItems++;
                var accept = options.filter ? options.filter(item) : true;
                if (accept !== false) {
                    result.push(item);
                }
                return accept;
            }, options);
        },

        /**
         *
         * Runs a query against the store, but only returns the number of matches
         * instead of the matches itself.
         *
         * @param {Function} onSuccess A callback to be called if the opration
         *  was successful.
         * @param {Object} [options] An object defining specific options
         * @param {String} [options.index=null] A name of an IDBIndex to operate on
         * @param {IDBKeyRange} [options.keyRange=null] An IDBKeyRange to use
         * @param {Function} [options.onError=throw] A callback to be called if an error
         *  occurred during the operation.
         * @returns {IDBTransaction} The transaction used for this operation.
         */
        count: function (onSuccess, options) {

            options = mixin({
                index: null,
                keyRange: null
            }, options || {});

            var onError = options.onError || defaultErrorHandler;

            var hasSuccess = false,
                result = null;

            var cursorTransaction = this.db.transaction([this.storeName], this.consts.READ_ONLY);
            cursorTransaction.oncomplete = function () {
                var callback = hasSuccess ? onSuccess : onError;
                callback(result);
            };
            cursorTransaction.onabort = onError;
            cursorTransaction.onerror = onError;

            var cursorTarget = cursorTransaction.objectStore(this.storeName);
            if (options.index) {
                cursorTarget = cursorTarget.index(options.index);
            }
            var countRequest = cursorTarget.count(options.keyRange);
            countRequest.onsuccess = function (evt) {
                hasSuccess = true;
                result = evt.target.result;
            };
            countRequest.onError = onError;

            return cursorTransaction;
        },

        /**************/
        /* key ranges */
        /**************/

        /**
         * Creates a key range using specified options. This key range can be
         * handed over to the count() and iterate() methods.
         *
         * Note: You must provide at least one or both of "lower" or "upper" value.
         *
         * @param {Object} options The options for the key range to create
         * @param {*} [options.lower] The lower bound
         * @param {Boolean} [options.excludeLower] Whether to exclude the lower
         *  bound passed in options.lower from the key range
         * @param {*} [options.upper] The upper bound
         * @param {Boolean} [options.excludeUpper] Whether to exclude the upper
         *  bound passed in options.upper from the key range
         * @param {*} [options.only] A single key value. Use this if you need a key
         *  range that only includes one value for a key. Providing this
         *  property invalidates all other properties.
         * @return {IDBKeyRange} The IDBKeyRange representing the specified options
         */
        makeKeyRange: function (options) {
            /*jshint onecase:true */
            var keyRange,
                hasLower = typeof options.lower != 'undefined',
                hasUpper = typeof options.upper != 'undefined',
                isOnly = typeof options.only != 'undefined';

            switch (true) {
                case isOnly:
                    keyRange = this.keyRange.only(options.only);
                    break;
                case hasLower && hasUpper:
                    keyRange = this.keyRange.bound(options.lower, options.upper, options.excludeLower, options.excludeUpper);
                    break;
                case hasLower:
                    keyRange = this.keyRange.lowerBound(options.lower, options.excludeLower);
                    break;
                case hasUpper:
                    keyRange = this.keyRange.upperBound(options.upper, options.excludeUpper);
                    break;
                default:
                    throw new Error('Cannot create KeyRange. Provide one or both of "lower" or "upper" value, or an "only" value.');
            }

            return keyRange;

        }

    };

    /** helpers **/
    var empty = {};

    function mixin (target, source) {
        var name, s;
        for (name in source) {
            s = source[name];
            if (s !== empty[name] && s !== target[name]) {
                target[name] = s;
            }
        }
        return target;
    }

    function hasVersionError(errorEvent) {
        if ('error' in errorEvent.target) {
            return errorEvent.target.error.name == 'VersionError';
        } else if ('errorCode' in errorEvent.target) {
            return errorEvent.target.errorCode == 12;
        }
        return false;
    }

    IDBStore.prototype = proto;
    IDBStore.version = proto.version;

    return IDBStore;

}, this);


/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*global document, tizen, console, window*/

/**
 * Main application module.
 * Provides a namespace for other application modules.
 * Handles application life cycle.
 *
 * @module app
 * @requires {@link app.model.battery}
 * @requires {@link app.ui}
 * @namespace app
 */
__webpack_require__(/*! ../../www/tests/lib/geomock/geomock */ "./www/tests/lib/geomock/geomock.js");

__webpack_require__(/*! ./mock */ "./src/js/mock.js");

__webpack_require__(/*! ./model/models */ "./src/js/model/models.js");

__webpack_require__(/*! ./ui/app.ui */ "./src/js/ui/app.ui.js"); // make sure that "app" namespace is created


window.app = window.app || {};

(function defineApp(app) {
  'use strict';
  /**
   * Battery model module reference.
   *
   * @private
   * @type {object}
   */

  var modelBattery = app.model.battery,

  /**
   * Workout model module reference.
   *
   * @private
   * @type {object}
   */
  modelWorkout = app.model.workout,
      modelNetwork = app.model.network,

  /**
   * UI module reference.
   *
   * @private
   * @type {object}
   */
  ui = app.ui;
  /**
   * Closes application.
   *
   * @memberof app
   * @public
   */

  app.exit = function exit() {
    try {
      tizen.application.getCurrentApplication().exit();
    } catch (error) {
      console.warn('Application exit failed.', error.message);
    }
  };
  /**
   * Handles tizenhwkey event.
   *
   * Closes application if the back device button is pressed.
   *
   * @private
   * @param {Event} e
   */


  function onHwKeyEvent(e) {
    if (e.keyName === 'back') {
      ui.toggleClosePopup();
    }
  }
  /**
   * Registers event listeners.
   *
   * @private
   */


  function bindEvents() {
    document.addEventListener('tizenhwkey', onHwKeyEvent);
  }
  /**
   * Initializes app module.
   *
   * Calls a method responsible for event listeners registering.
   * Starts the battery model initialization.
   *
   * @memberof app
   * @public
   */


  app.init = function init() {
    var platform = Platform.get(),
        driverFactory = new DriverFactory(platform);
    modelBattery.init(driverFactory.buildBatteryDriver(platform));
    modelNetwork.init(driverFactory.buildNetworkDriver(platform));
    modelWorkout.init(driverFactory.buildHardwareDriver(platform));
    bindEvents();
    ui.init();
  };

  if (typeof cordova !== 'undefined') {
    document.addEventListener("deviceready", app.init);
  } else {
    window.addEventListener('load', app.init);
  }
})(window.app);

/***/ }),

/***/ "./src/js/common/app.common.calculations.js":
/*!**************************************************!*\
  !*** ./src/js/common/app.common.calculations.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global window*/

/**
 * Application common calculations module.
 * Provides methods that are necessary for navigation.
 *
 * @module app.common.calculations
 * @namespace app.common.calculations
 * @memberof app.common
 */
// make sure that "app" namespace is created
window.app = window.app || {}; // strict mode wrapper function

(function defineAppCommonCalculations(app) {
  'use strict';
  /**
   * Earth radius constant.
   *
   * @private
   * @const {number}
   */

  var EARTH_RADIUS = 6371000,

  /**
   * Meters unit constant.
   *
   * @private
   * @const {string}
   */
  METERS_UNIT = 'm',

  /**
   * Kilometers unit constant.
   *
   * @private
   * @const {string}
   */
  KILOMETERS_UNIT = 'km',

  /**
   * Calculations module reference.
   *
   * @memberof app.common.calculations
   * @private
   * @type {object}
   */
  calculations = null; // create namespace for the module

  app.common = app.common || {};
  app.common.calculations = app.common.calculations || {};
  calculations = app.common.calculations;
  /**
   * Converts the number value expressed in radians to degrees.
   *
   * @private
   * @param {number} value
   * @returns {number}
   */

  function toDegrees(value) {
    return value * 180 / Math.PI;
  }
  /**
   * Converts the number value expressed in degrees to radians.
   *
   * @private
   * @param {number} value
   * @returns {number}
   */


  function toRadians(value) {
    return value * Math.PI / 180;
  }
  /**
   * Formats distance value to be displayed in meters or kilometers.
   *
   * @private
   * @param {number} distance Distance in meters.
   * @returns {number}
   */


  function formatDistance(distance) {
    if (distance >= 1000) {
      distance /= 1000;
    }

    return distance.toFixed(0);
  }
  /**
   * Formats unit value to represent meters or kilometers.
   *
   * @private
   * @param {number} distance Distance in meters.
   * @returns {string}
   */


  function formatUnit(distance) {
    if (distance >= 1000) {
      return KILOMETERS_UNIT;
    }

    return METERS_UNIT;
  }
  /**
   * Calculates the angle based on the start and destination position.
   *
   * @memberof app.common.calculations
   * @public
   * @param {object} start
   * @param {number} start.latitude
   * @param {number} start.longitude
   * @param {object} destination
   * @param {number} destination.latitude
   * @param {number} destination.longitude
   * @returns {number}
   */


  calculations.calculateAngle = function calculateAngle(start, destination) {
    var sLon = toRadians(start.longitude),
        dLon = toRadians(destination.longitude),
        sLat = toRadians(start.latitude),
        dLat = toRadians(destination.latitude),
        deltaLon = dLon - sLon;

    if (deltaLon > Math.PI) {
      deltaLon -= 2 * Math.PI;
    } else if (deltaLon < -Math.PI) {
      deltaLon += 2 * Math.PI;
    }

    return toDegrees(Math.atan2(deltaLon, Math.log(Math.tan(dLat / 2 + Math.PI / 4) / Math.tan(sLat / 2 + Math.PI / 4))));
  };
  /**
   * Calculates the distance between two positions
   * based on its coordinates.
   *
   * @memberof app.common.calculations
   * @public
   * @see http://www.sunearthtools.com/tools/distance.php
   * @param {object} start
   * @param {number} start.latitude
   * @param {number} start.longitude
   * @param {object} destination
   * @param {number} destination.latitude
   * @param {number} destination.longitude
   * @returns {number}
   */


  calculations.calculateDistance = function calculateDistance(start, destination) {
    var sLon = toRadians(start.longitude),
        dLon = toRadians(destination.longitude),
        sLat = toRadians(start.latitude),
        dLat = toRadians(destination.latitude),
        distance = EARTH_RADIUS * Math.acos(Math.sin(sLat) * Math.sin(dLat) + Math.cos(sLat) * Math.cos(dLat) * Math.cos(dLon - sLon));
    return {
      raw: distance,
      formatted: formatDistance(distance),
      unit: formatUnit(distance)
    };
  };
  /**
   * Obtains angle from rotation.
   *
   * @memberof app.common.calculations
   * @param {number} value
   * @returns {number}
   */


  calculations.angleFromRotation = function angleFromRotation(value) {
    var angle = -value % 360;

    if (angle < 0) {
      angle += 360;
    }

    return angle;
  };
  /**
   * Calculates angle for navigation path indicator.
   *
   * @memberof app.common.calculations
   * @param {number} partialPath
   * @param {number} totalPath
   * @param {number} totalAngle
   * @returns {number}
   */


  calculations.calculatePathAngle = function calculatePathAngle(partialPath, totalPath, totalAngle) {
    return partialPath * totalAngle / totalPath;
  };
})(window.app);

/***/ }),

/***/ "./src/js/common/app.common.events.js":
/*!********************************************!*\
  !*** ./src/js/common/app.common.events.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global window*/

/**
 * Application common events module.
 * Provides common methods related to events triggering.
 *
 * @module app.common.events
 * @namespace app.common.events
 * @memberof app.common
 */
// make sure that "app" namespace is created
window.app = window.app || {}; // strict mode wrapper function

(function defineAppCommonEvents(app) {
  'use strict';
  /**
   * Events module reference.
   *
   * @memberof app.common
   * @private
   * @type {object}
   */

  var events = null; // create namespace for the module

  app.common = app.common || {};
  app.common.events = app.common.events || {};
  events = app.common.events;
  /**
   * Dispatches an event.
   *
   * @memberof app.common.events
   * @public
   * @param {string} eventName Event name.
   * @param {*} data Detailed data.
   */

  events.dispatchEvent = function dispatchEvent(eventName, data) {
    var customEvent = new window.CustomEvent(eventName, {
      detail: data
    });
    window.dispatchEvent(customEvent);
  };
})(window.app);

/***/ }),

/***/ "./src/js/mock.js":
/*!************************!*\
  !*** ./src/js/mock.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener('load', function () {
  navigator.geolocation.delay = 1000;
  navigator.geolocation.repeat = true;
  var startTime = 1551018055000;
  navigator.geolocation.waypoints = [{
    coords: {
      latitude: 45.8849114,
      longitude: 19.2545559,
      accuracy: 65
    },
    timestamp: startTime
  }, {
    coords: {
      latitude: 45.8856601,
      longitude: 19.2553514,
      accuracy: 65
    },
    timestamp: startTime + 30000
  }, {
    coords: {
      latitude: 45.8849114,
      longitude: 19.2545559,
      accuracy: 65
    },
    timestamp: startTime + 55000
  }, {
    coords: {
      latitude: 45.8856601,
      longitude: 19.2553514,
      accuracy: 65
    },
    timestamp: startTime + 75000
  }, {
    coords: {
      latitude: 45.8849114,
      longitude: 19.2545559,
      accuracy: 65
    },
    timestamp: startTime + 90000
  }];
});

/***/ }),

/***/ "./src/js/model/app.model.battery.js":
/*!*******************************************!*\
  !*** ./src/js/model/app.model.battery.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*global console, window, tizen*/

/**
 * Application battery model module.
 * It is responsible for obtaining information about device battery state.
 *
 * @module app.model.battery
 * @requires {@link app.common.events}
 * @namespace app.model.battery
 * @memberof app.model
 */
// make sure that "app" namespace is created
window.app = window.app || {};

(function defineAppModelBattery(app) {
  'use strict';
  /**
   * Battery model module reference.
   *
   * @private
   * @type {object}
   */

  var modelBattery = null,

  /**
   * Common events module reference.
   *
   * @private
   * @type {object}
   */
  commonEvents = app.common.events,
      driver = null; // create namespace for the module

  app.model = app.model || {};
  app.model.battery = app.model.battery || {};
  modelBattery = app.model.battery;
  /**
   * Initializes the battery model module.
   *
   * @memberof app.model.battery
   * @public
   */

  modelBattery.init = function init(driver) {
    driver = driver;
    driver.init();
  };
})(window.app);

/***/ }),

/***/ "./src/js/model/app.model.geolocation.js":
/*!***********************************************!*\
  !*** ./src/js/model/app.model.geolocation.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*global window, console, navigator, setTimeout*/

/**
 * Application geolocation model module.
 * It is responsible for providing information about user location.
 *
 * @module app.model.geolocation
 * @requires {@link app.common.events}
 * @requires {@link app.common.calculations}
 * @namespace app.model.geolocation
 * @memberof app.model
 */
// make sure that "app" namespace is created
window.app = window.app || {};

(function defineAppModelGeolocation(app) {
  'use strict';
  /**
   * Geolocation checking interval (in milliseconds).
   *
   * @private
   * @const {number}
   */

  var GEO_CHECKING_INTERVAL = 1000,

  /**
   * Geolocation checking counter.
   * Defines max number of checking interval occurrences.
   *
   * @private
   * @const {number}
   */
  GEO_CHECKING_COUNTER = 5,

  /**
   * Geolocation model module reference.
   *
   * @private
   * @type {object}
   */
  modelGeolocation = null,

  /**
   * Common events module reference.
   *
   * @private
   * @type {object}
   */
  commonEvents = app.common.events,

  /**
   * Common calculations module reference.
   *
   * @private
   * @type {object}
   */
  commonCalculations = app.common.calculations,

  /**
   * Geolocation API object.
   *
   * @private
   * @type {object}
   */
  geolocation = null,

  /**
   * Current position data.
   *
   * @private
   * @type {Position}
   */
  currentPosition = null,

  /**
   * Stores information about number of checking interval occurrences.
   *
   * @private
   * @type {number}
   */
  checkingCounter = 0; // create namespace for the module

  app.model = app.model || {};
  app.model.geolocation = app.model.geolocation || {};
  modelGeolocation = app.model.geolocation;
  /**
   * Checks if the current position is equal to the one given as parameter.
   * Returns true if it is, false otherwise.
   *
   * @param {Position} position
   * @returns {boolean}
   */

  function isPositionEqual(position) {
    if (currentPosition && (currentPosition.coords.latitude === position.coords.latitude || currentPosition.coords.longitude === position.coords.longitude)) {
      return true;
    }

    return false;
  }
  /**
   * Performs action on get current position success.
   *
   * @private
   * @param {Position} position
   * @fires model.geolocation.current.position.changed
   * @fires model.geolocation.current.destination.reached
   * @fires model.geolocation.position.available
   */


  function onGetCurrentPositionSuccess(position) {
    if (!isPositionEqual(position)) {
      currentPosition = position;
      commonEvents.dispatchEvent('model.geolocation.current.position.changed');
    }

    commonEvents.dispatchEvent('model.geolocation.position.available');
    checkingCounter = 0; //setTimeout(getGeoPosition, GEO_CHECKING_INTERVAL);
  }
  /**
   * Performs action on get current position error.
   *
   * @private
   * @fires model.geolocation.position.unavailable
   * @fires model.geolocation.position.lost
   */


  function onGetCurrentPositionError(error) {
    commonEvents.dispatchEvent('model.geolocation.position.unavailable');
    checkingCounter += 1;

    if (checkingCounter === GEO_CHECKING_COUNTER) {
      commonEvents.dispatchEvent('model.geolocation.position.lost');
    }

    console.warn(error); //setTimeout(getGeoPosition, GEO_CHECKING_INTERVAL);
  }
  /**
   * Uses Geolocation API in order to obtain information
   * about changes of the current position.
   *
   * @private
   */


  function getGeoPosition() {
    try {
      geolocation.watchPosition(onGetCurrentPositionSuccess, onGetCurrentPositionError, {
        maximumAge: GEO_CHECKING_INTERVAL,
        enableHighAccuracy: true,
        timeout: GEO_CHECKING_INTERVAL
      });
    } catch (error) {
      console.warn('Couldn\'t get geolocation position.', error);
    }
  }
  /**
   * Returns current position.
   *
   * @memberof app.model.geolocation
   * @public
   * @returns {object}
   */


  modelGeolocation.getCurrentPosition = function getCurrentPosition() {
    return currentPosition;
  };
  /**
   * Initializes the geolocation model module.
   *
   * @memberof app.model.geolocation
   * @public
   * @fires model.geolocation.available
   * @fires model.geolocation.unavailable
   */


  modelGeolocation.init = function init() {
    if (navigator.geolocation) {
      geolocation = navigator.geolocation;
      commonEvents.dispatchEvent('model.geolocation.available');
      getGeoPosition();
    } else {
      commonEvents.dispatchEvent('model.geolocation.unavailable');
    }
  };
})(window.app);

/***/ }),

/***/ "./src/js/model/app.model.network.js":
/*!*******************************************!*\
  !*** ./src/js/model/app.model.network.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*global window, console, tizen*/

/**
 * Application network model module.
 * It is responsible for providing information about user location.
 *
 * @module app.model.network
 * @requires {@link app.common.events}
 * @namespace app.model.network
 * @memberof app.model
 */
// make sure that "app" namespace is created
window.app = window.app || {};

(function defineAppModelNetwork(app) {
  'use strict';
  /**
   * Common events module reference.
   *
   * @private
   * @type {object}
   */

  var commonEvents = app.common.events,
      modelNetwork = null; // create namespace for the module

  app.model = app.model || {};
  app.model.network = app.model.network || {};
  modelNetwork = app.model.network;
  modelNetwork.driver = null;
  /**
   * Checks available network type.
   *
   * @private
   */

  function checkNetworkType() {
    return modelNetwork.driver.checkNetworkType();
  }
  /**
   * Checks whether the network type has different value than 'NONE'.
   *
   * @memberof app.model.network
   * @public
   * @returns {boolean}
   */


  modelNetwork.isNetworkAvailable = function isNetworkAvailable() {
    return modelNetwork.driver.isNetworkAvailable();
  };
  /**
   * Returns available network type;
   *
   * @memberof app.model.network
   * @public
   * @returns {string}
   */


  modelNetwork.getNetworkType = function getNetworkType() {
    return modelNetwork.driver.getNetworkType();
  };
  /**
   * Initializes the network model module.
   *
   * @memberof app.model.network
   * @public
   */


  modelNetwork.init = function init(driver) {
    modelNetwork.driver = driver;
    modelNetwork.driver.init();
  };
})(window.app);

/***/ }),

/***/ "./src/js/model/app.model.sync.js":
/*!****************************************!*\
  !*** ./src/js/model/app.model.sync.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*global window, console, geolocation, setTimeout*/

/**
 * Application sync model module.
 * It is responsible for syncing workouts with the server.
 *
 * @module app.model.geolocation
 * @requires {@link app.common.events}
 * @requires {@link app.common.calculations}
 * @namespace app.model.geolocation
 * @memberof app.model
 */
// make sure that "app" namespace is created
window.app = window.app || {};

(function defineAppModelSync(app) {
  'use strict';
  /**
   * Workout model module reference.
   *
   * @private
   * @type {object}
   */

  var modelSync = null,

  /**
   * Geolocation model module reference.
   *
   * @private
   * @type {object}
   */
  modelWorkout = app.model.workout,

  /**
   * Common events module reference.
   *
   * @private
   * @type {object}
   */
  commonEvents = app.common.events,
      modelNetwork = app.model.network,
      syncUrls = {
    login: '',
    upload: ''
  }; // create namespace for the module

  app.model = app.model || {};
  app.model.sync = app.model.sync || {};
  modelSync = app.model.sync;
  /**
   * Registers event listeners.
   *
   * @private
   */

  function bindEvents() {
    window.addEventListener('model.workout.getlist.successful', function (e) {
      e.stopPropagation();
      var workouts = e.detail;
      uploadWorkouts(workouts);
    }, 'model.workout.getlist.failed', function (e) {
      e.stopPropagation();
      commonEvents.dispatchEvent('model.sync.upload.failed');
    });
  }

  function getToken() {
    return localStorage.getItem('token');
  }

  function createAuthHeader() {
    var token = getToken() || '',
        header = {
      key: 'Authorization',
      value: 'Bearer ' + token
    };
    return token.length ? header : false;
  }
  /**
   * Initializes the workout model module.
   *
   * @memberof app.model.workout
   * @public
   * @fires model.sync.login.successful
   * @fires model.sync.login.failed
   * @param {string} loginUrl
   * @param {string} uploadUrl
   */


  modelSync.init = function init(loginUrl, uploadUrl) {
    syncUrls.login = loginUrl;
    syncUrls.upload = uploadUrl;
    bindEvents();
  };

  modelSync.login = function login(email, password) {
    var client = new XMLHttpRequest(),
        localStorage = window.localStorage;
    /* Check the response status */

    client.onreadystatechange = function () {
      if (client.readyState == 4) {
        if (client.status == 200) {
          localStorage.setItem('token', JSON.parse(client.response));
          commonEvents.dispatchEvent('model.sync.login.successful', {
            token: client.response
          });
        } else {
          commonEvents.dispatchEvent('model.sync.login.failed');
        }
      }
    };

    client.onerror = function (e) {
      console.log(e);
    };

    var data = "email=" + email + "&" + "password=" + password;
    client.open('POST', syncUrls.login, true);
    client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    client.send(data);
    /* Send to server */
  };

  modelSync.sync = function () {
    // Disabled until network availability is fixed for cordova
    // if( modelNetwork.isNetworkAvailable() ){
    modelWorkout.getItemsToSync(); // }
  };

  function uploadWorkouts(workouts) {
    var client = new XMLHttpRequest(),
        authHeaders = createAuthHeader();

    if (authHeaders === false) {
      commonEvents.dispatchEvent('model.sync.login.required');
      return false;
    }
    /* Check the response status */


    client.onreadystatechange = function () {
      if (client.readyState == 4) {
        console.log('Response: ' + client.status);

        switch (client.status) {
          case 200:
            modelWorkout.clear();
            commonEvents.dispatchEvent('model.sync.upload.successful', true);
            break;

          case 401:
            commonEvents.dispatchEvent('model.sync.login.required');
            break;

          default:
            commonEvents.dispatchEvent('model.sync.upload.failed');
            break;
        }
      }
    };

    client.open('POST', syncUrls.upload, true);
    var payload = JSON.stringify({
      data: workouts
    });
    client.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    client.setRequestHeader("Accept", "application/json");
    client.setRequestHeader(authHeaders.key, authHeaders.value);
    console.log('Sending data to the server');
    client.send(payload);
    /* Send to server */
  }
})(window.app);

/***/ }),

/***/ "./src/js/model/app.model.workout.js":
/*!*******************************************!*\
  !*** ./src/js/model/app.model.workout.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _workout_app_workout_cycling_workout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../workout/app.workout.cycling_workout */ "./src/js/workout/app.workout.cycling_workout.js");
/* harmony import */ var _workout_app_workout_running_workout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../workout/app.workout.running_workout */ "./src/js/workout/app.workout.running_workout.js");
/* harmony import */ var _workout_app_workout_base_workout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../workout/app.workout.base_workout */ "./src/js/workout/app.workout.base_workout.js");




var IDBStore = __webpack_require__(/*! ../../../node_modules/idb-wrapper/idbstore */ "./node_modules/idb-wrapper/idbstore.js");

__webpack_require__(/*! ../common/app.common.calculations */ "./src/js/common/app.common.calculations.js");
/*global window, console, geolocation, setTimeout*/

/**
 * Application geolocation model module.
 * It is responsible for providing information about user location.
 *
 * @module app.model.geolocation
 * @requires {@link app.common.events}
 * @requires {@link app.common.calculations}
 * @namespace app.model.geolocation
 * @memberof app.model
 */
// make sure that "app" namespace is created


window.app = window.app || {};

(function defineAppModelWorkout(app) {
  'use strict';
  /**
   * Geolocation checking interval (in milliseconds).
   *
   * @private
   * @const {number}
   */

  /**
   * Workout model module reference.
   *
   * @private
   * @type {object}
   */

  var modelWorkout = null,

  /**
   * Geolocation model module reference.
   *
   * @private
   * @type {object}
   */
  modelGeolocation = app.model.geolocation,

  /**
   * Common events module reference.
   *
   * @private
   * @type {object}
   */
  commonEvents = app.common.events,

  /**
   *
   * @type {HardwareDriver}
   */
  hardwareDriver = null,

  /**
   * Workout data.
   *
   * @private
   * @type {BaseWorkout}
   */
  workout = null,
      workoutDB = null,
      isDBready = false; // create namespace for the module

  app.model = app.model || {};
  app.model.workout = app.model.workout || {};
  modelWorkout = app.model.workout;
  modelWorkout.WORKOUT_TYPE_RUNNING = 1;
  modelWorkout.WORKOUT_TYPE_CYCLING = 2;
  modelWorkout.WORKOUT_STATUS_UNSAVED = 0;
  modelWorkout.WORKOUT_STATUS_SAVED = 1;
  modelWorkout.WORKOUT_STATUS_SYNCED = 2;
  /**
   * Handles model.geolocation.position.available event.
   *
   * @private
   * @fires model.workout.updateui
   */

  function updateUI() {
    if (workout) {
      commonEvents.dispatchEvent('model.workout.updateui', workout);
    }
  }
  /**
   * Handles model.geolocation.position.available event.
   *
   * @private
   */


  function onModelGeolocationPositionAvailable() {
    var currentPosition = modelGeolocation.getCurrentPosition();

    if (workout && workout.isActive()) {
      var point = new Point(0, currentPosition.coords.latitude, currentPosition.coords.longitude, 0, currentPosition.coords.altitude || 0, currentPosition.timestamp);
      workout.addPoint(point);
      updateUI();
    }
  }
  /**
   * Registers event listeners.
   *
   * @private
   */


  function bindEvents() {
    window.addEventListener('model.geolocation.position.available', onModelGeolocationPositionAvailable);
  }

  function initDatabase() {
    workoutDB = new IDBStore({
      dbVersion: 1,
      storeName: 'workouts',
      keyPath: 'id',
      autoIncrement: true,
      onStoreReady: function onStoreReady() {
        commonEvents.dispatchEvent('model.workout.dbready');
        isDBready = true;
      }
    });
  }
  /**
   * Initializes the workout model module.
   *
   * @memberof app.model.workout
   * @public
   * @fires model.geolocation.available
   * @fires model.geolocation.unavailable
   */


  modelWorkout.init = function init(driver) {
    hardwareDriver = driver;
    hardwareDriver.init();
    bindEvents();
    initDatabase();
  };

  modelWorkout.start = function start(type) {
    switch (type) {
      case _workout_app_workout_base_workout__WEBPACK_IMPORTED_MODULE_2__["WORKOUT_TYPE_CYCLING"]:
        workout = new _workout_app_workout_cycling_workout__WEBPACK_IMPORTED_MODULE_0__["CyclingWorkout"]();
        break;

      case _workout_app_workout_base_workout__WEBPACK_IMPORTED_MODULE_2__["WORKOUT_TYPE_RUNNING"]:
        workout = new _workout_app_workout_running_workout__WEBPACK_IMPORTED_MODULE_1__["RunningWorkout"]();
        break;
    }

    workout.start();
    updateUI();
    hardwareDriver.backgroundRunEnable();
  };
  /**
   *
   * @fires model.workout.paused
   */


  modelWorkout.togglePause = function togglePause() {
    if (!workout.isActive()) {
      hardwareDriver.backgroundRunEnable();
      commonEvents.dispatchEvent('model.workout.resumed');
      workout.resume();
    } else {
      commonEvents.dispatchEvent('model.workout.paused');
      workout.pause();
      hardwareDriver.backgroundRunDisable();
    }
  };
  /**
   *
   * @returns {boolean}
   */


  modelWorkout.isHeartRateAvailable = function () {
    return hardwareDriver.isHeartRateAvailable();
  };

  modelWorkout.save = function save() {
    workout.save();

    var onsuccess = function onsuccess(id) {
      console.log('Successfully inserted! insertId is: ' + id);
      commonEvents.dispatchEvent('model.workout.save.successful', true);
    };

    var onerror = function onerror(error) {
      console.log('Workout save failed!', error);
      commonEvents.dispatchEvent('model.workout.save.failed');
    };

    workoutDB.put(workout.toObject(), onsuccess, onerror);
    return false;
  };

  modelWorkout.clear = function clear() {
    var onsuccess = function onsuccess() {
      console.log('Database celared');
      commonEvents.dispatchEvent('model.workout.clear.successful');
    };

    var onerror = function onerror(error) {
      console.log('Database clear failed!', error);
      commonEvents.dispatchEvent('model.workout.clear.failed');
    };

    workoutDB.clear(onsuccess, onerror);
  };

  modelWorkout.getList = function getList(status) {
    var onsuccess = function onsuccess(data) {
      data = data.filter(function (item) {
        return item.status == status;
      });
      commonEvents.dispatchEvent('model.workout.getlist.successful', data);
    };

    var onerror = function onerror(error) {
      console.log('Workout save failed!', error);
      commonEvents.dispatchEvent('model.workout.getlist.failed');
    };

    workoutDB.getAll(onsuccess, onerror);
  };

  modelWorkout.getItemsToSync = function getItemsToSync() {
    return modelWorkout.getList(modelWorkout.WORKOUT_STATUS_SAVED);
  };

  modelWorkout.getWorkout = function getWorkout() {
    return workout;
  };
})(window.app);

/***/ }),

/***/ "./src/js/model/drivers/android/app.drivers.android.battery.js":
/*!*********************************************************************!*\
  !*** ./src/js/model/drivers/android/app.drivers.android.battery.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../app.drivers.battery */ "./src/js/model/drivers/app.drivers.battery.js");

(function (root) {
  var BatteryDriverAndroid = function BatteryDriverAndroid() {};

  var proto = new BatteryDriver();

  proto.bind = function () {
    var _this = this;

    document.addEventListener("deviceready", function () {
      window.addEventListener("batterystatus", onBatteryStatus, false);

      function onBatteryStatus(status) {
        _this.level = status.level;
      }

      window.addEventListener("batterylow", onBatteryLow, false);

      function onBatteryLow(status) {
        _this.commonEvents.dispatchEvent('model.battery.low');
      }
    }, false);
  };

  BatteryDriverAndroid.prototype = proto;
  root.BatteryDriverAndroid = BatteryDriverAndroid;
})(window);

/***/ }),

/***/ "./src/js/model/drivers/android/app.drivers.android.hardware.js":
/*!**********************************************************************!*\
  !*** ./src/js/model/drivers/android/app.drivers.android.hardware.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../app.drivers.hardware */ "./src/js/model/drivers/app.drivers.hardware.js");

(function (root) {
  var HardwareDriverAndroid = function HardwareDriverAndroid() {
    this.commonEvents = window.app.common.events;
  };

  var proto = new HardwareDriver();

  proto.bind = function () {
    cordova.plugins.backgroundMode.on('activate', function () {
      cordova.plugins.backgroundMode.disableWebViewOptimizations();
    });
    window.addEventListener('model.workout.updateui', function (e) {
      var distance = e.detail.distance;

      if (cordova.plugins.backgroundMode.isActive()) {
        cordova.plugins.backgroundMode.configure({
          text: 'Workout active, distance: ' + Math.round(distance * 100) / 100 + ' km'
        });
      }
    });
    document.addEventListener('backbutton', function (evt) {
      navigator.app.exitApp();
    }, false);
  };

  proto.isHeartRateAvailable = function () {
    return false;
  };

  proto.backgroundRunEnable = function () {
    cordova.plugins.backgroundMode.enable();
  };

  proto.backgroundRunDisable = function () {
    cordova.plugins.backgroundMode.disable();
  };

  HardwareDriverAndroid.prototype = proto;
  root.HardwareDriverAndroid = HardwareDriverAndroid;
})(window);

/***/ }),

/***/ "./src/js/model/drivers/android/app.drivers.android.network.js":
/*!*********************************************************************!*\
  !*** ./src/js/model/drivers/android/app.drivers.android.network.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../app.drivers.network */ "./src/js/model/drivers/app.drivers.network.js");

(function (root) {
  var NetworkDriverAndroid = function NetworkDriverAndroid() {};

  var proto = new NetworkDriver();

  proto.bind = function () {
    var _this = this;

    document.addEventListener("offline", function () {
      _this.onNetworkTypeChange();
    }, false);
    document.addEventListener("online", function () {
      _this.onNetworkTypeChange();
    }, false);
  };

  proto.isNetworkAvailable = function () {
    return navigator.connection.type !== Connection.NONE;
  };

  proto.onNetworkTypeChange = function (network) {
    this.networkType = navigator.connection.type;
    this.commonEvents.dispatchEvent('model.network.type.changed');
  };

  proto.onGetNetworkTypeSuccess = function (network) {
    this.networkType = navigator.connection.type;
    this.commonEvents.dispatchEvent('model.network.initialized');
  };

  NetworkDriverAndroid.prototype = proto;
  root.NetworkDriverAndroid = NetworkDriverAndroid;
})(window);

/***/ }),

/***/ "./src/js/model/drivers/app.driver.factory.js":
/*!****************************************************!*\
  !*** ./src/js/model/drivers/app.driver.factory.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./android/app.drivers.android.battery */ "./src/js/model/drivers/android/app.drivers.android.battery.js");

__webpack_require__(/*! ./android/app.drivers.android.network */ "./src/js/model/drivers/android/app.drivers.android.network.js");

__webpack_require__(/*! ./android/app.drivers.android.hardware */ "./src/js/model/drivers/android/app.drivers.android.hardware.js");

__webpack_require__(/*! ./tizen/app.drivers.tizen.battery */ "./src/js/model/drivers/tizen/app.drivers.tizen.battery.js");

__webpack_require__(/*! ./tizen/app.drivers.tizen.network */ "./src/js/model/drivers/tizen/app.drivers.tizen.network.js");

__webpack_require__(/*! ./tizen/app.drivers.tizen.hardware */ "./src/js/model/drivers/tizen/app.drivers.tizen.hardware.js");

;

(function (root) {
  var DriverFactory = function DriverFactory(platform) {
    this.platform = platform;
  };

  DriverFactory.prototype = {
    buildNetworkDriver: function buildNetworkDriver() {
      var networkDriver = new NetworkDriver();

      switch (this.platform) {
        case Platform.PLATFORM_TIZEN:
          networkDriver = new NetworkDriverTizen();
          break;

        case Platform.PLATFORM_ANDROID:
          networkDriver = new NetworkDriverAndroid();
          break;
      }

      return networkDriver;
    },
    buildBatteryDriver: function buildBatteryDriver() {
      var batteryDriver = new BatteryDriver();

      switch (this.platform) {
        case Platform.PLATFORM_TIZEN:
          batteryDriver = new BatteryDriverTizen();
          break;

        case Platform.PLATFORM_ANDROID:
          batteryDriver = new BatteryDriverAndroid();
          break;
      }

      return batteryDriver;
    },
    buildHardwareDriver: function buildHardwareDriver() {
      var hardwareDriver = new HardwareDriver();

      switch (this.platform) {
        case Platform.PLATFORM_TIZEN:
          hardwareDriver = new HardwareDriverTizen();
          break;

        case Platform.PLATFORM_ANDROID:
          hardwareDriver = new HardwareDriverAndroid();
          break;
      }

      return hardwareDriver;
    }
  };
  root.DriverFactory = DriverFactory;
})(window);

/***/ }),

/***/ "./src/js/model/drivers/app.drivers.battery.js":
/*!*****************************************************!*\
  !*** ./src/js/model/drivers/app.drivers.battery.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

;

(function (root) {
  var BatteryDriver = function BatteryDriver() {
    this.level = null;
    this.commonEvents = window.app.common.events;
  };

  BatteryDriver.prototype = {
    init: function init() {
      this.bind();
    },
    bind: function bind() {}
  };
  root.BatteryDriver = BatteryDriver;
})(window);

/***/ }),

/***/ "./src/js/model/drivers/app.drivers.hardware.js":
/*!******************************************************!*\
  !*** ./src/js/model/drivers/app.drivers.hardware.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

;

(function (root) {
  var HardwareDriver = function HardwareDriver() {
    this.commonEvents = window.app.common.events;
  };

  HardwareDriver.prototype = {
    init: function init() {
      this.bind();
    },
    bind: function bind() {},

    /**
     *
     * @returns {boolean}
     */
    isHeartRateAvailable: function isHeartRateAvailable() {
      return false;
    },
    backgroundRunEnable: function backgroundRunEnable() {},
    backgroundRunDisable: function backgroundRunDisable() {}
  };
  root.HardwareDriver = HardwareDriver;
})(window);

/***/ }),

/***/ "./src/js/model/drivers/app.drivers.network.js":
/*!*****************************************************!*\
  !*** ./src/js/model/drivers/app.drivers.network.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

;

(function (root) {
  var NetworkDriver = function NetworkDriver() {
    this.commonEvents = window.app.common.events;
    this.networkType = 'NONE';
  };

  var NETWORKS = ['2G', '2.5G', '3G', '4G', 'WIFI', 'ETHERNET', 'UNKNOWN'];
  NetworkDriver.prototype = {
    init: function init() {
      this.bind();
    },
    bind: function bind() {},
    isNetworkAvailable: function isNetworkAvailable() {
      return NETWORKS.indexOf(this.networkType) !== -1;
    },
    getNetworkType: function getNetworkType() {
      return this.networkType;
    }
  };
  root.NetworkDriver = NetworkDriver;
})(window);

/***/ }),

/***/ "./src/js/model/drivers/app.drivers.platform.js":
/*!******************************************************!*\
  !*** ./src/js/model/drivers/app.drivers.platform.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

;

(function (root) {
  var Platform = {
    PLATFORM_TIZEN: 'tizen',
    PLATFORM_ANDROID: 'android',
    PLATFORM_BROWSER: 'browser',
    get: function get() {
      var platform = this.PLATFORM_BROWSER;

      if ((typeof tizen === "undefined" ? "undefined" : _typeof(tizen)) === 'object' && _typeof(tizen.systeminfo) === 'object') {
        platform = this.PLATFORM_TIZEN;
      } else if ((typeof device === "undefined" ? "undefined" : _typeof(device)) === 'object' && device.platform === 'Android') {
        platform = this.PLATFORM_ANDROID;
      }

      return platform;
    }
  };
  root.Platform = Platform;
})(window);

/***/ }),

/***/ "./src/js/model/drivers/tizen/app.drivers.tizen.battery.js":
/*!*****************************************************************!*\
  !*** ./src/js/model/drivers/tizen/app.drivers.tizen.battery.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

__webpack_require__(/*! ../app.drivers.battery */ "./src/js/model/drivers/app.drivers.battery.js");

(function (root) {
  var BatteryDriverTizen = function BatteryDriverTizen() {};

  var proto = new BatteryDriver();

  proto.bind = function () {
    var _this = this,
        systeminfo = null;

    if ((typeof tizen === "undefined" ? "undefined" : _typeof(tizen)) === 'object' && _typeof(tizen.systeminfo) === 'object') {
      var systeminfo = tizen.systeminfo;
    } else {
      console.warn('tizen.systeminfo not available');
    }

    try {
      systeminfo.addPropertyValueChangeListener('BATTERY', function change(battery) {
        _this.level = battery.level;

        if (!battery.isCharging && battery.level < _this.LOW_BATTERY) {
          _this.commonEvents.dispatchEvent('model.battery.low');
        }
      }, null, function errorCallback(error) {
        console.warn('Battery state listener was not set.', error);
      });
    } catch (error) {
      console.warn('Battery state listener was not set.', error);
    }
  };

  BatteryDriverTizen.prototype = proto;
  root.BatteryDriverTizen = BatteryDriverTizen;
})(window);

/***/ }),

/***/ "./src/js/model/drivers/tizen/app.drivers.tizen.hardware.js":
/*!******************************************************************!*\
  !*** ./src/js/model/drivers/tizen/app.drivers.tizen.hardware.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../app.drivers.hardware */ "./src/js/model/drivers/app.drivers.hardware.js");

(function (root) {
  var HardwareDriverTizen = function HardwareDriverTizen() {
    this.commonEvents = window.app.common.events;
  };

  var proto = new HardwareDriver();

  proto.bind = function () {};

  proto.isHeartRateAvailable = function () {
    return true;
  };

  proto.backgroundRunEnable = function () {
    tizen.power.request("CPU", "CPU_AWAKE");
    tizen.power.request('SCREEN', 'SCREEN_NORMAL');
  };

  proto.backgroundRunDisable = function () {
    tizen.power.release("CPU");
    tizen.power.release('SCREEN');
  };

  HardwareDriverTizen.prototype = proto;
  root.HardwareDriverTizen = HardwareDriverTizen;
})(window);

/***/ }),

/***/ "./src/js/model/drivers/tizen/app.drivers.tizen.network.js":
/*!*****************************************************************!*\
  !*** ./src/js/model/drivers/tizen/app.drivers.tizen.network.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

__webpack_require__(/*! ../app.drivers.network */ "./src/js/model/drivers/app.drivers.network.js");

(function (root) {
  var NetworkDriverTizen = function NetworkDriverTizen() {};

  var proto = new NetworkDriver();

  proto.bind = function () {
    var _this = this,
        systeminfo = null;

    if ((typeof tizen === "undefined" ? "undefined" : _typeof(tizen)) === 'object' && _typeof(tizen.systeminfo) === 'object') {
      var systeminfo = tizen.systeminfo;
    } else {
      console.warn('tizen.systeminfo not available');
    }

    try {
      systeminfo.getPropertyValue('NETWORK', function (network) {
        _this.onGetNetworkTypeSuccess(network);
      }, function onGetPropertyValueError(error) {
        console.warn('Couldn\'t get network type value.', error);
      });
    } catch (error) {
      console.warn('Couldn\'t get network type value.', error);
    }

    try {
      systeminfo.addPropertyValueChangeListener('NETWORK', function (network) {
        _this.onNetworkTypeChange(network);
      });
    } catch (error) {
      console.warn('Network change listener was not set.', error);
    }
  };

  proto.onNetworkTypeChange = function (network) {
    this.networkType = network.networkType;
    this.commonEvents.dispatchEvent('model.network.type.changed');
  };

  proto.onGetNetworkTypeSuccess = function (network) {
    this.networkType = network.networkType;
    this.commonEvents.dispatchEvent('model.network.initialized');
  };

  NetworkDriverTizen.prototype = proto;
  root.NetworkDriverTizen = NetworkDriverTizen;
})(window);

/***/ }),

/***/ "./src/js/model/models.js":
/*!********************************!*\
  !*** ./src/js/model/models.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../common/app.common.events */ "./src/js/common/app.common.events.js");

__webpack_require__(/*! ./drivers/app.drivers.platform */ "./src/js/model/drivers/app.drivers.platform.js");

__webpack_require__(/*! ./drivers/app.driver.factory */ "./src/js/model/drivers/app.driver.factory.js");

__webpack_require__(/*! ./app.model.battery */ "./src/js/model/app.model.battery.js");

__webpack_require__(/*! ./app.model.network */ "./src/js/model/app.model.network.js");

__webpack_require__(/*! ./app.model.geolocation */ "./src/js/model/app.model.geolocation.js");

__webpack_require__(/*! ./app.model.workout */ "./src/js/model/app.model.workout.js");

__webpack_require__(/*! ./app.model.sync */ "./src/js/model/app.model.sync.js");

/***/ }),

/***/ "./src/js/ui/app.ui.info.js":
/*!**********************************!*\
  !*** ./src/js/ui/app.ui.info.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*global window, tau, document*/

/**
 * Application info popup module.
 * It is responsible showing info popup.
 *
 * @module app.ui.info
 * @memberof app.ui
 */
// make sure that "app" namespace is created
window.app = window.app || {};

(function defineAppUiLogin(app) {
  'use strict';
  /**
   * Page Id.
   *
   * @private
   * @const {string}
   */

  var PAGE_ID = 'info-popup',

  /**
   * Page element.
   *
   * @private
   * @type {HTMLElement}
   */
  page = null,

  /**
   * UI navigation module reference.
   *
   * @private
   * @type {object}
   */
  uiInfo = null,

  /**
   * Popup shown when the workout is paused
   *
   * @type {HTMLElement}
   */
  infoPopup = null,
      infoPopupContent = null; // create namespace for the module

  app.ui = app.ui || {};
  app.ui.info = app.ui.info || {};
  uiInfo = app.ui.info;
  /**
   * Updates UI.
   *
   * @private
   */

  function updateUI(data) {}
  /**
   * Handles pagebeforeshow event.
   *
   * @private
   */


  function onPageBeforeShow() {}
  /**
   * Handles model.workout.updateui event.
   *
   * Updates workout page ui
   * according to the values provided by the workout model module.
   *
   * @private
   */


  function onInfoShowHandler(e) {
    infoPopupContent.innerHTML = e.detail;
    tau.openPopup(infoPopup);
  }
  /**
   * Registers event listeners.
   *
   * @private
   */


  function bindEvents() {
    page.addEventListener('pagebeforeshow', onPageBeforeShow);
    window.addEventListener('ui.info.show', onInfoShowHandler);
  }
  /**
   * Shows the navigation page.
   *
   * @memberof app.ui.navigation
   * @public
   */


  uiInfo.show = function show() {
    tau.changePage('#' + PAGE_ID);
  };
  /**
   * Initializes the ui navigation module.
   *
   * @memberof app.ui.navigation
   * @public
   */


  uiInfo.init = function init() {
    page = document.getElementById(PAGE_ID);
    infoPopup = document.getElementById('info-popup');
    infoPopupContent = document.getElementById('info-content');
    bindEvents();
  };
})(window.app);

/***/ }),

/***/ "./src/js/ui/app.ui.intro.js":
/*!***********************************!*\
  !*** ./src/js/ui/app.ui.intro.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*global window, tau, setTimeout, document*/

/**
 * Application waiting page module.
 * It is responsible for waiting page layout and logic.
 *
 * @module app.ui.waiting
 * @requires {@link app.ui.destination}
 * @namespace app.ui.waiting
 * @memberof app.ui
 */
// make sure that "app" namespace is created
window.app = window.app || {};

(function defineAppUiIntro(app) {
  'use strict';
  /**
   * Page Id.
   *
   * @private
   * @const {string}
   */

  var PAGE_ID = 'intro',

  /**
   * Lost connection message string.
   *
   * @private
   * @const {string}
   */
  LOST_CONNECTION_MESSAGE = 'LOST\nCONNECTION',

  /**
   * Waiting for GPS data message string.
   *
   * @private
   * @const {string}
   */
  WAITING_FOR_GPS_DATA_MESSAGE = 'WAITING FOR\nGPS DATA',

  /**
   * Lost CSS class.
   *
   * @private
   * @const {string}
   */
  LOST_CLASS = 'lost',

  /**
   * Lost connection timeout.
   *
   * @private
   * @const {number}
   */
  LOST_CONNECTION_TIMEOUT = 3000,

  /**
   * UiWaiting module reference.
   *
   * @private
   * @type {object}
   */
  uiIntro = null,

  /**
   * UI destination module reference.
   *
   * @private
   * @type {object}
   */
  uiMain = null,

  /**
   * Page element.
   *
   * @private
   * @type {HTMLElement}
   */
  page = null,

  /**
   * Waiting message element.
   *
   * @private
   * @type {HTMLElement}
   */
  waitingMessage = null,

  /**
   * Stores information about the reason of displaying the waiting page.
   *
   * @type {boolean}
   */
  isConnectionLost = false; // create namespace for the module

  app.ui = app.ui || {};
  app.ui.intro = app.ui.intro || {};
  uiIntro = app.ui.intro;
  /**
   * Handles model.geolocation.position.available event.
   *
   * @private
   */

  function onModelGeolocationPositionAvailable() {
    if (tau.activePage.id === PAGE_ID) {
      if (isConnectionLost) {
        tau.back();
      } else {
        uiMain.show();
      }
    }
  }
  /**
   * Sets waiting for GPS data message.
   *
   * @private
   */


  function setWaitingMessage() {
    waitingMessage.classList.remove(LOST_CLASS);
    waitingMessage.innerText = WAITING_FOR_GPS_DATA_MESSAGE;
  }
  /**
   * Sets lost connection message.
   *
   * @private
   */


  function setLostMessage() {
    waitingMessage.classList.add(LOST_CLASS);
    waitingMessage.innerText = LOST_CONNECTION_MESSAGE;
  }
  /**
   * Handles pagebeforeshow event.
   *
   * @private
   */


  function onPageBeforeShow() {
    setLostMessage();
    setTimeout(function onTimeout() {
      setWaitingMessage();
    }, LOST_CONNECTION_TIMEOUT);
  }
  /**
   * Registers event listeners.
   *
   * @private
   */


  function bindEvents() {
    page.addEventListener('pagebeforeshow', onPageBeforeShow);
    window.addEventListener('model.geolocation.position.available', onModelGeolocationPositionAvailable);
  }
  /**
   * Shows the waiting page.
   *
   * @memberof app.ui.waiting
   * @public
   */


  uiIntro.show = function show() {
    isConnectionLost = true;
    tau.changePage('#' + PAGE_ID);
  };
  /**
   * Initializes the ui waiting module.
   *
   * @memberof app.ui.waiting
   * @public
   */


  uiIntro.init = function init() {
    uiMain = app.ui.main;
    uiIntro = app.ui.intro;
    page = document.getElementById(PAGE_ID);
    waitingMessage = page.querySelector('#waiting-message');
    setWaitingMessage();
    bindEvents();
  };
})(window.app);

/***/ }),

/***/ "./src/js/ui/app.ui.js":
/*!*****************************!*\
  !*** ./src/js/ui/app.ui.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./app.ui.workout */ "./src/js/ui/app.ui.workout.js");

__webpack_require__(/*! ./app.ui.login */ "./src/js/ui/app.ui.login.js");

__webpack_require__(/*! ./app.ui.main */ "./src/js/ui/app.ui.main.js");

__webpack_require__(/*! ./app.ui.intro */ "./src/js/ui/app.ui.intro.js");

__webpack_require__(/*! ./app.ui.info */ "./src/js/ui/app.ui.info.js");
/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*global window, document, tau*/

/**
 * Application ui module.
 * It is responsible for the application ui initialization.
 *
 * @module app.ui
 * @requires {@link app.model.geolocation}
 * @requires {@link app.model.network}
 * @requires {@link app.ui.waiting}
 * @requires {@link app.ui.destination}
 * @requires {@link app.ui.navigation}
 * @requires {@link app.ui.finish}
 * @namespace app.ui
 * @memberof app
 */
// make sure that "app" namespace is created


window.app = window.app || {};

(function defineAppUi(app) {
  'use strict';
  /**
   * Google maps API key.
   *
   * @private
   * @const {string}
   */

  var API_KEY = '',

  /**
   * UI module reference.
   *
   * @private
   * @type {object}
   */
  ui = null,

  /**
   * Geolocation model module reference.
   *
   * @private
   * @type {object}
   */
  modelGeolocation = null,

  /**
   * Network model module reference.
   *
   * @private
   * @type {object}
   */
  modelNetwork = null,

  /**
   * Compass model module reference.
   *
   * @private
   * @type {object}
   */
  modelWorkout = null,

  /**
   * Compass model module reference.
   *
   * @private
   * @type {object}
   */
  modelSync = null,

  /**
   * UI waiting module reference.
   *
   * @private
   * @type {object}
   */
  uiIntro = null,

  /**
   * UI destination module reference.
   *
   * @private
   * @type {object}
   */
  uiMain = null,

  /**
   * UI navigation module reference.
   *
   * @private
   * @type {object}
   */
  uiWorkout = null,

  /**
   * UI login reference.
   *
   * @private
   * @type {object}
   */
  uiLogin = null,

  /**
   * UI info reference.
   *
   * @private
   * @type {object}
   */
  uiInfo = null,

  /**
   * Close popup element.
   *
   * @private
   * @type {HTMLElement}
   */
  closePopup = null,

  /**
   * Close popup yes button element.
   *
   * @private
   * @type {HTMLElement}
   */
  closePopupYesBtn = null,

  /**
   * Gps status indicator.
   *
   * @private
   * @type {HTMLElement}
   */
  gpsStatusIndicators = null,

  /**
   * Network status indicator.
   *
   * @private
   * @type {HTMLElement}
   */
  networkStatusIndicators = null,
      commonEvents = null; // create namespace for the module

  app.ui = app.ui || {};
  ui = app.ui;
  /**
   * Handles model.network.initialized event.
   *
   * @private
   */

  function onModelNetworkInitialized() {
    onModelNetworkTypeChanged();
  }
  /**
   * Handles model.network.type.changed event.
   *
   * @private
   */


  function onModelNetworkTypeChanged() {
    for (var i = 0; i < networkStatusIndicators.length; ++i) {
      var networkStatusIndicator = networkStatusIndicators[i];

      if (networkStatusIndicator.classList.contains('network-status-active')) {
        networkStatusIndicator.classList.remove('network-status-active');
      }

      if (modelNetwork.isNetworkAvailable() && !networkStatusIndicator.classList.contains('network-status-active')) {
        networkStatusIndicator.classList.add('network-status-active');
      }
    }

    ;
  }
  /**
   * Handles model.geolocation.position.available event.
   *
   * @private
   */


  function onModelGeolocationPositionAvailable() {
    for (var i = 0; i < gpsStatusIndicators.length; ++i) {
      var gpsStatusIndicator = gpsStatusIndicators[i];

      if (!gpsStatusIndicator.classList.contains('gps-status-active')) {
        gpsStatusIndicator.classList.add('gps-status-active');
      }
    }

    ;
  }
  /**
   * Handles model.geolocation.position.unavailable
   * and model.geolocation.position.lost events.
   *
   * @private
   */


  function onModelGeolocationPositionUnAvailable() {
    for (var i = 0; i < gpsStatusIndicators.length; ++i) {
      var gpsStatusIndicator = gpsStatusIndicators[i];

      if (gpsStatusIndicator.classList.contains('gps-status-active')) {
        gpsStatusIndicator.classList.remove('gps-status-active');
      }
    }
  }
  /**
   * Handles click event on close popup yes button click.
   *
   * @private
   */


  function onClosePopupYesBtnClick() {
    app.exit();
  }
  /**
   * Registers event listeners.
   *
   * @private
   */


  function bindEvents() {
    closePopupYesBtn.addEventListener('click', onClosePopupYesBtnClick);
    window.addEventListener('model.network.initialized', onModelNetworkInitialized);
    window.addEventListener('model.network.type.changed', onModelNetworkTypeChanged);
    window.addEventListener('model.geolocation.position.available', onModelGeolocationPositionAvailable);
    window.addEventListener('model.geolocation.position.unavailable', onModelGeolocationPositionUnAvailable);
    window.addEventListener('model.geolocation.position.lost', onModelGeolocationPositionUnAvailable);
  }
  /**
   * Toggles close popup.
   *
   * @memberof app.ui
   * @public
   */


  ui.toggleClosePopup = function toggleClosePopup() {
    if (closePopup.classList.contains('ui-popup-active')) {
      tau.closePopup(closePopup);
    } else {
      tau.openPopup(closePopup);
    }
  };
  /**
   * Initializes the ui module.
   *
   * @memberof app.ui
   * @public
   */


  ui.init = function init() {
    modelGeolocation = app.model.geolocation;
    modelNetwork = app.model.network;
    modelWorkout = app.model.workout;
    modelSync = app.model.sync;
    uiIntro = app.ui.intro;
    uiMain = app.ui.main;
    uiWorkout = app.ui.workout;
    uiLogin = app.ui.login;
    uiInfo = app.ui.info;
    commonEvents = app.common.events;
    closePopup = document.getElementById('close-popup');
    closePopupYesBtn = closePopup.querySelector('#close-popup-yes-btn');
    gpsStatusIndicators = document.querySelectorAll('.gps-status');
    networkStatusIndicators = document.querySelectorAll('.network-status');
    bindEvents();
    uiInfo.init();
    uiIntro.init();
    uiMain.init();
    uiWorkout.init();
    uiLogin.init();
    modelGeolocation.init();
    modelSync.init('https://tracy.wernerd.info/api/login', 'https://tracy.wernerd.info/api/workouts');
    window.addEventListener('model.workout.dbready', function (e) {
      modelSync.sync();
    });
    window.addEventListener('model.workout.save.successful', function (e) {
      modelSync.sync();
    });
    window.addEventListener('model.sync.upload.successful', function (e) {
      commonEvents.dispatchEvent('ui.info.show', 'Workouts synced successfully!');
    });
    window.addEventListener('model.sync.upload.failed', function (e) {
      commonEvents.dispatchEvent('ui.info.show', 'Workout sync failed!');
    });
  };
})(window.app);

/***/ }),

/***/ "./src/js/ui/app.ui.login.js":
/*!***********************************!*\
  !*** ./src/js/ui/app.ui.login.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*global window, tau, document*/

/**
 * Application navigation page module.
 * It is responsible for navigation page layout and logic.
 *
 * @module app.ui.navigation
 * @requires {@link app.common.calculations}
 * @requires {@link app.model.geolocation}
 * @requires {@link app.ui.waiting}
 * @requires {@link app.ui.destination}
 * @requires {@link app.ui.finish}
 * @namespace app.ui.navigation
 * @memberof app.ui
 */
// make sure that "app" namespace is created
window.app = window.app || {};

(function defineAppUiLogin(app) {
  'use strict';
  /**
   * Page Id.
   *
   * @private
   * @const {string}
   */

  var PAGE_ID = 'login-popup',

  /**
   * Page element.
   *
   * @private
   * @type {HTMLElement}
   */
  page = null,

  /**
   * Sync model module reference.
   *
   * @private
   * @type {object}
   */
  modelSync = null,

  /**
   * UI navigation module reference.
   *
   * @private
   * @type {object}
   */
  uiLogin = null,

  /**
   * Common events module reference.
   *
   * @private
   * @type {object}
   */
  commonEvents = app.common.events,

  /**
   * Popup shown when the workout is paused
   *
   * @type {HTMLElement}
   */
  loginPopup = null,
      loginPopupLoginButton = null,
      loginPopupCancelButton = null; // create namespace for the module

  app.ui = app.ui || {};
  app.ui.login = app.ui.login || {};
  uiLogin = app.ui.login;
  /**
   * Updates UI.
   *
   * @private
   */

  function updateUI(data) {}
  /**
   * Handles pagebeforeshow event.
   *
   * @private
   */


  function onPageBeforeShow() {}
  /**
   * Handles model.workout.updateui event.
   *
   * Updates workout page ui
   * according to the values provided by the workout model module.
   *
   * @private
   */


  function onModelWorkoutUpdateUI(e) {
    if (tau.activePage.id === PAGE_ID) {
      updateUI(e.detail);
    }
  }
  /**
   * Handles click event on pause popup finish button click.
   *
   * @private
   */


  function onLoginPopupLoginBtnClick() {
    var email = loginPopup.querySelector('#login-email').value,
        password = loginPopup.querySelector('#login-password').value;
    modelSync.login(email, password);
  }
  /**
   * Handles click event on pause popup resume button click.
   *
   * @private
   */


  function onLoginPopupCancelBtnClick() {}

  function onLoginSuccessful() {
    commonEvents.dispatchEvent('ui.info.show', 'Successful login!');
  }

  function onLoginFail() {
    commonEvents.dispatchEvent('ui.info.show', 'Login failed!');
  }

  function onLoginRequired() {
    tau.openPopup(loginPopup);
  }
  /**
   * Registers event listeners.
   *
   * @private
   */


  function bindEvents() {
    page.addEventListener('pagebeforeshow', onPageBeforeShow);
    loginPopupLoginButton.addEventListener('click', onLoginPopupLoginBtnClick);
    loginPopupCancelButton.addEventListener('click', onLoginPopupCancelBtnClick);
    window.addEventListener('model.sync.login.successful', onLoginSuccessful);
    window.addEventListener('model.sync.login.failed', onLoginFail);
    window.addEventListener('model.sync.login.required', onLoginRequired);
  }
  /**
   * Shows the navigation page.
   *
   * @memberof app.ui.navigation
   * @public
   */


  uiLogin.show = function show() {
    tau.changePage('#' + PAGE_ID);
  };
  /**
   * Initializes the ui navigation module.
   *
   * @memberof app.ui.navigation
   * @public
   */


  uiLogin.init = function init() {
    modelSync = app.model.sync;
    page = document.getElementById(PAGE_ID);
    loginPopup = document.getElementById('login-popup');
    loginPopupLoginButton = loginPopup.querySelector('#login-popup-login-btn');
    loginPopupCancelButton = loginPopup.querySelector('#login-popup-cancel-btn'); //tau.openPopup(loginPopup);

    bindEvents();
  };
})(window.app);

/***/ }),

/***/ "./src/js/ui/app.ui.main.js":
/*!**********************************!*\
  !*** ./src/js/ui/app.ui.main.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*global window, tau, google, document*/

/**
 * Application destination page module.
 * It is responsible for destination page layout and logic.
 *
 * @module app.ui.destinaton
 * @requires {@link app.model.geolocation}
 * @requires {@link app.model.network}
 * @requires {@link app.ui.navigation}
 * @requires {@link app.ui.waiting}
 * @namespace app.ui.destinaton
 * @memberof app.ui
 */
// make sure that "app" namespace is created
window.app = window.app || {};

(function defineAppUiMain(app) {
  'use strict';
  /**
   * Page Id.
   *
   * @private
   * @const {string}
   */

  var PAGE_ID = 'main',

  /**
  * Page element.
  *
  * @private
  * @type {HTMLElement}
  */
  page = null,

  /**
   * Geolocation model module reference.
   *
   * @private
   * @type {object}
   */
  modelGeolocation = null,

  /**
   * Network model module reference.
   *
   * @private
   * @type {object}
   */
  modelNetwork = null,
      modelWorkout = null,

  /**
  * Ui waiting module reference.
  *
  * @private
  * @type {object}
  */
  uiWaiting = null,

  /**
   * UI destination module reference.
   *
   * @private
   * @type {object}
   */
  uiMain = null,
      workoutStartCyclingButton = null,
      workoutStartRunningButton = null; // create namespace for the module

  app.ui = app.ui || {};
  app.ui.main = app.ui.main || {};
  uiMain = app.ui.main;
  /**
   * Handles pagebeforeshow event.
   *
   * @private
   */

  function onPageBeforeShow() {}

  function onWorkoutStartCycling() {
    modelWorkout.start(modelWorkout.WORKOUT_TYPE_CYCLING);
    tau.changePage('#workout');
  }

  function onWorkoutStartRunning() {
    modelWorkout.start(modelWorkout.WORKOUT_TYPE_RUNNING);
    tau.changePage('#workout');
  }
  /**
   * Registers event listeners.
   *
   * @private
   */


  function bindEvents() {
    page.addEventListener('pagebeforeshow', onPageBeforeShow);
    workoutStartCyclingButton.addEventListener('click', onWorkoutStartCycling);
    workoutStartRunningButton.addEventListener('click', onWorkoutStartRunning);
  }
  /**
   * Shows the destination page.
   *
   * @memberof app.ui.destination
   * @public
   * @param {object} data
   */


  uiMain.show = function show(data) {
    tau.changePage('#' + PAGE_ID);
  };
  /**
   * Initializes the ui destination module.
   *
   * @memberof app.ui.destination
   * @public
   */


  uiMain.init = function init() {
    modelGeolocation = app.model.geolocation;
    modelNetwork = app.model.network;
    modelWorkout = app.model.workout;
    uiWaiting = app.ui.waiting;
    page = document.getElementById(PAGE_ID);
    workoutStartCyclingButton = page.querySelector('.workout-start-cycling');
    workoutStartRunningButton = page.querySelector('.workout-start-running');
    bindEvents();
  };
})(window.app);

/***/ }),

/***/ "./src/js/ui/app.ui.workout.js":
/*!*************************************!*\
  !*** ./src/js/ui/app.ui.workout.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*global window, tau, document*/

/**
 * Application navigation page module.
 * It is responsible for navigation page layout and logic.
 *
 * @module app.ui.navigation
 * @requires {@link app.common.calculations}
 * @requires {@link app.model.geolocation}
 * @requires {@link app.ui.waiting}
 * @requires {@link app.ui.destination}
 * @requires {@link app.ui.finish}
 * @namespace app.ui.navigation
 * @memberof app.ui
 */
// make sure that "app" namespace is created
window.app = window.app || {};

(function defineAppUiWorkout(app) {
  'use strict';
  /**
   * Page Id.
   *
   * @private
   * @const {string}
   */

  var PAGE_ID = 'workout',

  /**
   * Navigation path angle.
   *
   * @private
   * @const {number}
   */
  PATH_ANGLE = 60,

  /**
   * Page element.
   *
   * @private
   * @type {HTMLElement}
   */
  page = null,

  /**
   * Common calculations module reference.
   *
   * @private
   * @type {object}
   */
  commonCalculations = null,

  /**
   * Geolocation model module reference.
   *
   * @private
   * @type {object}
   */
  modelWorkout = null,

  /**
   * Ui waiting module reference.
   *
   * @private
   * @type {object}
   */
  uiWaiting = null,

  /**
   * UI destination module reference.
   *
   * @private
   * @type {object}
   */
  uiDestination = null,

  /**
   * UI finish module reference.
   *
   * @private
   * @type {object}
   */
  uiFinish = null,

  /**
   * UI navigation module reference.
   *
   * @private
   * @type {object}
   */
  uiWorkout = null,

  /**
   * Total distance.
   *
   * @private
   * @type {number}
   */
  totalDistance = 0,

  /**
   * HTML elements to update during workout
   *
   * @type {HTMLElement}
   */
  workoutStatus = null,
      workoutSpeed = null,
      workoutSpeedLabel = null,
      workoutSpeedUnit = null,
      workoutDistance = null,
      workoutHr = null,
      workoutAltitude = null,
      workoutPauseButton = null,

  /**
   *
   * @type {BaseWorkout}
   */
  workout = null,

  /**
   * Popup shown when the workout is paused
   *
   * @type {HTMLElement}
   */
  pausePopup = null,
      pausePopupFinishButton = null,
      pausePopupResumeButton = null,

  /**
   * Popup shown when the workout is finished
   *
   * @type {HTMLElement}
   */
  savePopup = null,
      savePopupDiscardButton = null,
      savePopupSaveButton = null,
      commonEvents = null; // create namespace for the module

  app.ui = app.ui || {};
  app.ui.workout = app.ui.workout || {};
  uiWorkout = app.ui.workout;
  /**
   * Updates UI.
   *
   * @private
   */

  function updateUI(data) {
    workoutSpeed.innerText = Math.round(data.speed * 10) / 10;
    workoutSpeedLabel.innerText = data.speedLabel;
    workoutSpeedUnit.innerText = data.speedUnit;
    workoutDistance.innerText = Math.round(data.distance * 10) / 10;
    workoutHr.innerText = Math.round(data.heartRate);
    workoutAltitude.innerText = Math.round(data.altitude);
  }
  /**
   * Handles pagebeforeshow event.
   *
   * @private
   */


  function onPageBeforeShow() {
    if (workout) {
      updateUI(workout);
    }

    if (!modelWorkout.isHeartRateAvailable()) {
      workoutHr.style.display = 'none';
    }

    workoutStatus.style.display = 'none';
  }
  /**
   * Handles model.workout.uidateui event.
   *
   * Updates workout page ui
   * according to the values provided by the workout model module.
   *
   * @private
   */


  function onModelWorkoutUpdateUI(e) {
    workout = e.detail;

    if (tau.activePage.id === PAGE_ID) {
      updateUI(workout);
    }
  }
  /**
   * Handles tizenhwkey event.
   *
   * Closes application if the back device button is pressed.
   *
   * @private
   * @param {Event} e
   */


  function onHwKeyEvent(e) {
    if (tau.activePage.id === PAGE_ID) {
      if (e.keyName === 'back') {
        modelWorkout.togglePause();
        e.stopPropagation();
      }
    }
  }
  /**
   * Handles model.workout.paused event.
   *
   *
   * @private
   */


  function onModelWorkoutPaused(e) {
    if (tau.activePage.id === PAGE_ID) {
      workoutStatus.style.display = 'inline';
      tau.openPopup(pausePopup);
    }
  }
  /**
   * Handles model.workout.resumed event.
   *
   *
   * @private
   */


  function onModelWorkoutResumed(e) {
    if (tau.activePage.id === PAGE_ID) {
      workoutStatus.style.display = 'none';
      tau.closePopup(pausePopup);
    }
  }
  /**
   * Handles click event on pause popup finish button click.
   *
   * @private
   */


  function onPausePopupFinishBtnClick() {
    tau.openPopup(savePopup);
  }
  /**
   * Handles click event on pause button button click.
   *
   * @private
   */


  function onPauseBtnClick(e) {
    modelWorkout.togglePause();
  }
  /**
   * Handles click event on pause popup resume button click.
   *
   * @private
   */


  function onPausePopupResumeBtnClick() {
    modelWorkout.togglePause();
  }
  /**
   * Handles click event on save popup save button click.
   *
   * @private
   */


  function onSavePopupSaveBtnClick() {
    modelWorkout.save();
    tau.changePage('#main');
  }
  /**
   * Handles click event on save popup discard button click.
   *
   * @private
   */


  function onSavePopupDiscardBtnClick() {
    tau.changePage('#main');
  }

  function onModelWorkoutSaveSuccess() {
    commonEvents.dispatchEvent('ui.info.show', 'Workout saved sucessfully!');
  }

  function onModelWorkoutSaveFailed() {
    commonEvents.dispatchEvent('ui.info.show', 'Workout saved failed!');
  }
  /**
   * Registers event listeners.
   *
   * @private
   */


  function bindEvents() {
    page.addEventListener('pagebeforeshow', onPageBeforeShow);
    document.addEventListener('tizenhwkey', onHwKeyEvent);
    window.addEventListener('model.workout.updateui', onModelWorkoutUpdateUI);
    window.addEventListener('model.workout.paused', onModelWorkoutPaused);
    window.addEventListener('model.workout.resumed', onModelWorkoutResumed);
    window.addEventListener('model.workout.save.successful', onModelWorkoutSaveSuccess);
    window.addEventListener('model.workout.save.failed', onModelWorkoutSaveFailed);
    workoutPauseButton.addEventListener('click', onPauseBtnClick);
    pausePopupFinishButton.addEventListener('click', onPausePopupFinishBtnClick);
    pausePopupResumeButton.addEventListener('click', onPausePopupResumeBtnClick);
    savePopupSaveButton.addEventListener('click', onSavePopupSaveBtnClick);
    savePopupDiscardButton.addEventListener('click', onSavePopupDiscardBtnClick);
  }
  /**
   * Shows the navigation page.
   *
   * @memberof app.ui.navigation
   * @public
   */


  uiWorkout.show = function show() {
    tau.changePage('#' + PAGE_ID);
  };
  /**
   * Initializes the ui navigation module.
   *
   * @memberof app.ui.navigation
   * @public
   */


  uiWorkout.init = function init() {
    commonCalculations = app.common.calculations;
    commonEvents = app.common.events;
    modelWorkout = app.model.workout;
    page = document.getElementById(PAGE_ID);
    workoutStatus = page.querySelector('.workout-status');
    workoutSpeed = page.querySelector('.workout-speed');
    workoutSpeedLabel = page.querySelector('.workout-speed-label');
    workoutSpeedUnit = page.querySelector('.workout-speed-unit');
    workoutDistance = page.querySelector('.workout-distance');
    workoutHr = page.querySelector('.workout-hr');
    workoutAltitude = page.querySelector('.workout-altitude');
    workoutPauseButton = page.querySelector('#workout-pause-btn');
    pausePopup = document.getElementById('pause-popup');
    pausePopupFinishButton = pausePopup.querySelector('#pause-popup-yes-btn');
    pausePopupResumeButton = pausePopup.querySelector('#pause-popup-no-btn');
    savePopup = document.getElementById('save-popup');
    savePopupSaveButton = savePopup.querySelector('#save-popup-yes-btn');
    savePopupDiscardButton = savePopup.querySelector('#save-popup-no-btn');
    bindEvents();
  };
})(window.app);

/***/ }),

/***/ "./src/js/workout/app.workout.base_workout.js":
/*!****************************************************!*\
  !*** ./src/js/workout/app.workout.base_workout.js ***!
  \****************************************************/
/*! exports provided: WORKOUT_TYPE_RUNNING, WORKOUT_TYPE_CYCLING, BaseWorkout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WORKOUT_TYPE_RUNNING", function() { return WORKOUT_TYPE_RUNNING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WORKOUT_TYPE_CYCLING", function() { return WORKOUT_TYPE_CYCLING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseWorkout", function() { return BaseWorkout; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

__webpack_require__(/*! ./app.workout.point */ "./src/js/workout/app.workout.point.js");

__webpack_require__(/*! ../common/app.common.calculations */ "./src/js/common/app.common.calculations.js");

var WORKOUT_STATUS_UNSAVED = 0,
    WORKOUT_STATUS_SAVED = 1,
    WORKOUT_STATE_STOPPED = 0,
    WORKOUT_STATE_RUNNING = 1,
    WORKOUT_STATE_PAUSED = 2,
    WORKOUT_STATE_AUTOPAUSED = 3;
var WORKOUT_TYPE_RUNNING = 1;
var WORKOUT_TYPE_CYCLING = 2;
/**
 * @class BaseWorkout
 * @constructor
 */

var BaseWorkout =
/*#__PURE__*/
function () {
  function BaseWorkout() {
    _classCallCheck(this, BaseWorkout);

    this.type = null;
    this.status = WORKOUT_STATUS_UNSAVED;
    /** @member {Point[]} **/

    this._points = [];
    this._distance = 0;
    this._segmentIndex = 0;
    this._state = WORKOUT_STATE_STOPPED;
  }

  _createClass(BaseWorkout, [{
    key: "init",
    value: function init() {}
  }, {
    key: "start",
    value: function start() {
      this._state = WORKOUT_STATE_RUNNING;
    }
  }, {
    key: "pause",
    value: function pause() {
      this._state = WORKOUT_STATE_PAUSED;
      this._segmentIndex++;
    }
  }, {
    key: "save",
    value: function save() {
      this.status = WORKOUT_STATUS_SAVED;
    }
  }, {
    key: "resume",
    value: function resume() {
      this._state = WORKOUT_STATE_RUNNING;
    }
    /**
     *
     * @returns {boolean}
     */

  }, {
    key: "isActive",
    value: function isActive() {
      return this._state === WORKOUT_STATE_RUNNING;
    }
    /**
     *
     * @param {Point} point
     */

  }, {
    key: "addPoint",
    value: function addPoint(point) {
      point.segment_index = this._segmentIndex;

      this._points.push(point);

      var points = this._getCalculationPoints();

      if (points) {
        this.calculate(points.pointA, points.pointB);
      }
    }
    /**
     *
     * @private
     *
     * @returns {?{pointA: Point, pointB: Point}}
     */

  }, {
    key: "_getCalculationPoints",
    value: function _getCalculationPoints() {
      var calculationPoints = null;

      if (this._points.length >= 2) {
        calculationPoints = {
          pointA: this._points[this._points.length - 2],
          pointB: this._points[this._points.length - 1]
        };
      }

      return calculationPoints;
    }
    /**
     *
     * @param {Point} pointA
     * @param {Point} pointB
     * @returns {number}
     */

  }, {
    key: "_calculateDistance",
    value: function _calculateDistance(pointA, pointB) {
      var distance = window.app.common.calculations.calculateDistance({
        latitude: pointA.lat,
        longitude: pointA.lng
      }, {
        latitude: pointB.lat,
        longitude: pointB.lng
      });
      this._distance += distance.raw;
      return distance.raw;
    }
    /**
     * Calculate the params such as distance, speed, etc
     *
     * @param {Point} pointA
     * @param {Point} pointB
     */

  }, {
    key: "calculate",
    value: function calculate(pointA, pointB) {}
    /**
     *
     * @returns {string}
     */

  }, {
    key: "toObject",

    /**
     *
     * @returns {{type: int, status: int, points: Point[]}}
     */
    value: function toObject() {
      return {
        type: this.type,
        status: this.status,
        points: this._points
      };
    }
  }, {
    key: "speedUnit",
    get: function get() {
      return 'km/h';
    }
    /**
     *
     * @returns {string}
     */

  }, {
    key: "speedLabel",
    get: function get() {
      return 'Speed';
    }
    /**
     *
     * @returns {number}
     */

  }, {
    key: "speed",
    get: function get() {
      return 0;
    }
    /**
     *
     * @returns {number}
     */

  }, {
    key: "distance",
    get: function get() {
      return this._distance / 1000;
    }
    /**
     *
     * @param {number} distance
     */
    ,
    set: function set(distance) {
      this._distance = distance;
    }
    /**
     *
     * @returns {Point[]}
     */

  }, {
    key: "points",
    get: function get() {
      return this._points;
    }
    /**
     *
     * @returns {int|number}
     */

  }, {
    key: "heartRate",
    get: function get() {
      return this._points.length ? this._points[this._points.length - 1].heart_rate : 0;
    }
    /**
     *
     * @returns {number}
     */

  }, {
    key: "altitude",
    get: function get() {
      return this._points.length ? this._points[this._points.length - 1].elevation : 0;
    }
  }]);

  return BaseWorkout;
}();

;


/***/ }),

/***/ "./src/js/workout/app.workout.cycling_workout.js":
/*!*******************************************************!*\
  !*** ./src/js/workout/app.workout.cycling_workout.js ***!
  \*******************************************************/
/*! exports provided: CyclingWorkout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CyclingWorkout", function() { return CyclingWorkout; });
/* harmony import */ var _app_workout_base_workout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.workout.base_workout */ "./src/js/workout/app.workout.base_workout.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

 // Milliseconds per meter to kilometers per hour

var MPS_TO_KMH = 3600; // hour = 3600 * 1000 milliseconds / kilometer = 1000 meters

var CyclingWorkout =
/*#__PURE__*/
function (_BaseWorkout) {
  _inherits(CyclingWorkout, _BaseWorkout);

  function CyclingWorkout() {
    var _this;

    _classCallCheck(this, CyclingWorkout);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CyclingWorkout).call(this));
    _this.type = _app_workout_base_workout__WEBPACK_IMPORTED_MODULE_0__["WORKOUT_TYPE_CYCLING"];
    _this._speed = 0;
    return _this;
  }
  /**
   *
   * @param {Point} pointA
   * @param {Point} pointB
   * @returns {number}
   */


  _createClass(CyclingWorkout, [{
    key: "_calculateSpeed",
    value: function _calculateSpeed(pointA, pointB) {
      var distance = this._calculateDistance(pointA, pointB),
          timeDiff = pointB.time - pointA.time;

      if (distance > 1 && timeDiff > 0) {
        this._speed = timeDiff ? MPS_TO_KMH * distance / timeDiff : 0;
      }

      return this._speed;
    }
    /**
     * Calculate the params such as distance, speed, etc
     *
     * @param {Point} pointA
     * @param {Point} pointB
     */

  }, {
    key: "calculate",
    value: function calculate(pointA, pointB) {
      this._calculateSpeed(pointA, pointB);
    }
    /**
     *
     * @returns {number}
     */

  }, {
    key: "speed",
    get: function get() {
      return this._speed;
    }
  }]);

  return CyclingWorkout;
}(_app_workout_base_workout__WEBPACK_IMPORTED_MODULE_0__["BaseWorkout"]);



/***/ }),

/***/ "./src/js/workout/app.workout.point.js":
/*!*********************************************!*\
  !*** ./src/js/workout/app.workout.point.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

;

(function (root) {
  /**
   *
   * @param {int} segmentIndex
   * @param {number} lat
   * @param {number} lng
   * @param {int} heartRate
   * @param {number} elevation
   * @param {int} time
   * @constructor
   */
  var Point = function Point(segmentIndex, lat, lng, heartRate, elevation, time) {
    this.segment_index = segmentIndex;
    this.lat = lat;
    this.lng = lng;
    this.heart_rate = heartRate;
    this.elevation = elevation;
    this.time = time;
  };

  Point.prototype = {
    init: function init() {}
  };
  root.Point = Point;
})(window);

/***/ }),

/***/ "./src/js/workout/app.workout.running_workout.js":
/*!*******************************************************!*\
  !*** ./src/js/workout/app.workout.running_workout.js ***!
  \*******************************************************/
/*! exports provided: RunningWorkout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RunningWorkout", function() { return RunningWorkout; });
/* harmony import */ var _app_workout_base_workout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.workout.base_workout */ "./src/js/workout/app.workout.base_workout.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

 // Milliseconds per meter to minutes per kilometer

var MSEC_PER_METER_TO_MIN_PER_KM = 60; // Minute = 60 * 1000  millisecond / kilometer = 1000 meters

var RunningWorkout =
/*#__PURE__*/
function (_BaseWorkout) {
  _inherits(RunningWorkout, _BaseWorkout);

  function RunningWorkout() {
    var _this;

    _classCallCheck(this, RunningWorkout);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RunningWorkout).call(this));
    _this.type = _app_workout_base_workout__WEBPACK_IMPORTED_MODULE_0__["WORKOUT_TYPE_RUNNING"];
    _this._pace = 0;
    return _this;
  }
  /**
   *
   * @param {Point} pointA
   * @param {Point} pointB
   * @returns {number}
   */


  _createClass(RunningWorkout, [{
    key: "_calculatePace",
    value: function _calculatePace(pointA, pointB) {
      var distance = this._calculateDistance(pointA, pointB),
          timeDiff = pointB.time - pointA.time;

      if (distance > 1 && timeDiff > 0) {
        this._pace = timeDiff / distance / MSEC_PER_METER_TO_MIN_PER_KM;
      }

      return this._pace;
    }
    /**
     * Calculate the params such as distance, speed, etc
     *
     * @param {Point} pointA
     * @param {Point} pointB
     */

  }, {
    key: "calculate",
    value: function calculate(pointA, pointB) {
      this._calculatePace(pointA, pointB);
    }
    /**
     *
     * @returns {string}
     */

  }, {
    key: "speedUnit",
    get: function get() {
      return 'min/km';
    }
    /**
     *
     * @returns {string}
     */

  }, {
    key: "speedLabel",
    get: function get() {
      return 'Pace';
    }
    /**
     *
     * @returns {number}
     */

  }, {
    key: "speed",
    get: function get() {
      return this._pace;
    }
  }]);

  return RunningWorkout;
}(_app_workout_base_workout__WEBPACK_IMPORTED_MODULE_0__["BaseWorkout"]);



/***/ }),

/***/ "./www/tests/lib/geomock/geomock.js":
/*!******************************************!*\
  !*** ./www/tests/lib/geomock/geomock.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 2.3.1
(function () {
  /*
  (c) 2011 Jan Monschke
  v1.0.2
  GeoMock is licensed under the MIT license.
  */
  (function () {
    if (typeof navigator === "undefined" || navigator === null) {
      window.navigator = {};
    }

    if (navigator.geolocation == null) {
      window.navigator.geolocation = {};
    }

    navigator.geolocation.delay = 1000;
    navigator.geolocation.shouldFail = false;
    navigator.geolocation.repeat = true;
    navigator.geolocation.failsAt = -1;
    navigator.geolocation.errorMessage = "There was an error retrieving the position!";
    navigator.geolocation.currentTimeout = -1;
    navigator.geolocation.lastPosReturned = 0;

    navigator.geolocation._sanitizeLastReturned = function () {
      if (this.lastPosReturned > this.waypoints.length - 1) {
        this.lastPosReturned = 0;

        if (this.repeat === false) {
          return clearInterval(this.currentTimeout);
        }
      }
    };

    navigator.geolocation._geoCall = function (method, success, error) {
      var _this = this;

      if (this.shouldFail && error != null) {
        return this.currentTimeout = window[method].call(null, function () {
          return error(_this.errorMessage);
        }, this.delay);
      } else {
        if (success != null) {
          return this.currentTimeout = window[method].call(null, function () {
            success(_this.waypoints[_this.lastPosReturned++]);
            return _this._sanitizeLastReturned();
          }, this.delay);
        }
      }
    };

    navigator.geolocation.getCurrentPosition = function (success, error) {
      return this._geoCall("setTimeout", success, error);
    };

    navigator.geolocation.watchPosition = function (success, error) {
      this._geoCall("setInterval", success, error);

      return this.currentTimeout;
    };

    navigator.geolocation.clearWatch = function (id) {
      return clearInterval(id);
    };

    return navigator.geolocation.waypoints = [{
      coords: {
        latitude: 52.5168,
        longitude: 13.3889,
        accuracy: 1500
      }
    }, {
      coords: {
        latitude: 52.5162,
        longitude: 13.3890,
        accuracy: 1334
      }
    }, {
      coords: {
        latitude: 52.5154,
        longitude: 13.3890,
        accuracy: 631
      }
    }, {
      coords: {
        latitude: 52.5150,
        longitude: 13.3890,
        accuracy: 361
      }
    }, {
      coords: {
        latitude: 52.5144,
        longitude: 13.3890,
        accuracy: 150
      }
    }, {
      coords: {
        latitude: 52.5138,
        longitude: 13.3890,
        accuracy: 65
      }
    }, {
      coords: {
        latitude: 52.5138,
        longitude: 13.3895,
        accuracy: 65
      }
    }, {
      coords: {
        latitude: 52.5139,
        longitude: 13.3899,
        accuracy: 65
      }
    }, {
      coords: {
        latitude: 52.5140,
        longitude: 13.3906,
        accuracy: 65
      }
    }, {
      coords: {
        latitude: 52.5140,
        longitude: 13.3910,
        accuracy: 65
      }
    }];
  })();
}).call(this);

/***/ }),

/***/ 0:
/*!*****************************!*\
  !*** multi ./src/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/vernerd/www/tracy-app/src/js/app.js */"./src/js/app.js");


/***/ })

/******/ });
//# sourceMappingURL=app.js.map