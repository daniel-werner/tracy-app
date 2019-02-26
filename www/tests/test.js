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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
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
/*! exports provided: BatteryDriverAndroid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BatteryDriverAndroid", function() { return BatteryDriverAndroid; });
/* harmony import */ var _app_drivers_battery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.drivers.battery */ "./src/js/model/drivers/app.drivers.battery.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var BatteryDriverAndroid =
/*#__PURE__*/
function (_BatteryDriver) {
  _inherits(BatteryDriverAndroid, _BatteryDriver);

  function BatteryDriverAndroid() {
    _classCallCheck(this, BatteryDriverAndroid);

    return _possibleConstructorReturn(this, _getPrototypeOf(BatteryDriverAndroid).call(this));
  }

  _createClass(BatteryDriverAndroid, [{
    key: "bind",
    value: function bind() {
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
    }
  }]);

  return BatteryDriverAndroid;
}(_app_drivers_battery__WEBPACK_IMPORTED_MODULE_0__["BatteryDriver"]);



/***/ }),

/***/ "./src/js/model/drivers/android/app.drivers.android.hardware.js":
/*!**********************************************************************!*\
  !*** ./src/js/model/drivers/android/app.drivers.android.hardware.js ***!
  \**********************************************************************/
/*! exports provided: HardwareDriverAndroid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HardwareDriverAndroid", function() { return HardwareDriverAndroid; });
/* harmony import */ var _app_drivers_hardware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.drivers.hardware */ "./src/js/model/drivers/app.drivers.hardware.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var HardwareDriverAndroid =
/*#__PURE__*/
function (_HardwareDriver) {
  _inherits(HardwareDriverAndroid, _HardwareDriver);

  function HardwareDriverAndroid() {
    var _this;

    _classCallCheck(this, HardwareDriverAndroid);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HardwareDriverAndroid).call(this));
    _this.commonEvents = window.app.common.events;
    return _this;
  }

  _createClass(HardwareDriverAndroid, [{
    key: "bind",
    value: function bind() {
      cordova.plugins.backgroundMode.on('activate', function () {
        console.log('activate background mode');
        cordova.plugins.backgroundMode.disableWebViewOptimizations();
      });
    }
  }, {
    key: "isHeartRateAvailable",
    value: function isHeartRateAvailable() {
      return false;
    }
  }, {
    key: "backgroundRunEnable",
    value: function backgroundRunEnable() {
      cordova.plugins.backgroundMode.enable();
    }
  }, {
    key: "backgroundRunDisable",
    value: function backgroundRunDisable() {
      cordova.plugins.backgroundMode.disable();
    }
  }, {
    key: "exit",
    value: function exit() {
      try {
        navigator.app.exitApp();
      } catch (error) {
        console.warn('Application exit failed.', error.message);
      }
    }
  }]);

  return HardwareDriverAndroid;
}(_app_drivers_hardware__WEBPACK_IMPORTED_MODULE_0__["HardwareDriver"]);



/***/ }),

/***/ "./src/js/model/drivers/android/app.drivers.android.network.js":
/*!*********************************************************************!*\
  !*** ./src/js/model/drivers/android/app.drivers.android.network.js ***!
  \*********************************************************************/
/*! exports provided: NetworkDriverAndroid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkDriverAndroid", function() { return NetworkDriverAndroid; });
/* harmony import */ var _app_drivers_network__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.drivers.network */ "./src/js/model/drivers/app.drivers.network.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var NetworkDriverAndroid =
/*#__PURE__*/
function (_NetworkDriver) {
  _inherits(NetworkDriverAndroid, _NetworkDriver);

  function NetworkDriverAndroid() {
    _classCallCheck(this, NetworkDriverAndroid);

    return _possibleConstructorReturn(this, _getPrototypeOf(NetworkDriverAndroid).call(this));
  }

  _createClass(NetworkDriverAndroid, [{
    key: "bind",
    value: function bind() {
      var _this = this;

      document.addEventListener("offline", function () {
        _this.onNetworkTypeChange();
      }, false);
      document.addEventListener("online", function () {
        _this.onNetworkTypeChange();
      }, false);
      setTimeout(function () {
        _this.onGetNetworkTypeSuccess();
      }, 500);
    }
  }, {
    key: "isNetworkAvailable",
    value: function isNetworkAvailable() {
      return navigator.connection.type !== Connection.NONE;
    }
  }, {
    key: "onNetworkTypeChange",
    value: function onNetworkTypeChange(network) {
      this.networkType = navigator.connection.type;
      this.commonEvents.dispatchEvent('model.network.type.changed');
    }
  }, {
    key: "onGetNetworkTypeSuccess",
    value: function onGetNetworkTypeSuccess(network) {
      this.networkType = navigator.connection.type;
      this.commonEvents.dispatchEvent('model.network.initialized');
    }
  }]);

  return NetworkDriverAndroid;
}(_app_drivers_network__WEBPACK_IMPORTED_MODULE_0__["NetworkDriver"]);



/***/ }),

/***/ "./src/js/model/drivers/app.driver.factory.js":
/*!****************************************************!*\
  !*** ./src/js/model/drivers/app.driver.factory.js ***!
  \****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_drivers_platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.drivers.platform */ "./src/js/model/drivers/app.drivers.platform.js");
/* harmony import */ var _app_drivers_hardware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.drivers.hardware */ "./src/js/model/drivers/app.drivers.hardware.js");
/* harmony import */ var _tizen_app_drivers_tizen_hardware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tizen/app.drivers.tizen.hardware */ "./src/js/model/drivers/tizen/app.drivers.tizen.hardware.js");
/* harmony import */ var _android_app_drivers_android_hardware__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./android/app.drivers.android.hardware */ "./src/js/model/drivers/android/app.drivers.android.hardware.js");
/* harmony import */ var _app_drivers_battery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.drivers.battery */ "./src/js/model/drivers/app.drivers.battery.js");
/* harmony import */ var _tizen_app_drivers_tizen_battery__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tizen/app.drivers.tizen.battery */ "./src/js/model/drivers/tizen/app.drivers.tizen.battery.js");
/* harmony import */ var _android_app_drivers_android_battery__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./android/app.drivers.android.battery */ "./src/js/model/drivers/android/app.drivers.android.battery.js");
/* harmony import */ var _app_drivers_network__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.drivers.network */ "./src/js/model/drivers/app.drivers.network.js");
/* harmony import */ var _tizen_app_drivers_tizen_network__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tizen/app.drivers.tizen.network */ "./src/js/model/drivers/tizen/app.drivers.tizen.network.js");
/* harmony import */ var _android_app_drivers_android_network__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./android/app.drivers.android.network */ "./src/js/model/drivers/android/app.drivers.android.network.js");











(function (root) {
  var DriverFactory = function DriverFactory(platform) {
    this.platform = platform;
  };

  DriverFactory.prototype = {
    buildNetworkDriver: function buildNetworkDriver() {
      var networkDriver = new _app_drivers_network__WEBPACK_IMPORTED_MODULE_7__["NetworkDriver"]();

      switch (this.platform) {
        case _app_drivers_platform__WEBPACK_IMPORTED_MODULE_0__["PLATFORMS"].TIZEN:
          networkDriver = new _tizen_app_drivers_tizen_network__WEBPACK_IMPORTED_MODULE_8__["NetworkDriverTizen"]();
          break;

        case _app_drivers_platform__WEBPACK_IMPORTED_MODULE_0__["PLATFORMS"].ANDROID:
          networkDriver = new _android_app_drivers_android_network__WEBPACK_IMPORTED_MODULE_9__["NetworkDriverAndroid"]();
          break;
      }

      return networkDriver;
    },
    buildBatteryDriver: function buildBatteryDriver() {
      var batteryDriver = new _app_drivers_battery__WEBPACK_IMPORTED_MODULE_4__["BatteryDriver"]();

      switch (this.platform) {
        case _app_drivers_platform__WEBPACK_IMPORTED_MODULE_0__["PLATFORMS"].TIZEN:
          batteryDriver = new _tizen_app_drivers_tizen_battery__WEBPACK_IMPORTED_MODULE_5__["BatteryDriverTizen"]();
          break;

        case _app_drivers_platform__WEBPACK_IMPORTED_MODULE_0__["PLATFORMS"].ANDROID:
          batteryDriver = new _android_app_drivers_android_battery__WEBPACK_IMPORTED_MODULE_6__["BatteryDriverAndroid"]();
          break;
      }

      return batteryDriver;
    },
    buildHardwareDriver: function buildHardwareDriver() {
      var hardwareDriver = new _app_drivers_hardware__WEBPACK_IMPORTED_MODULE_1__["HardwareDriver"]();

      switch (this.platform) {
        case _app_drivers_platform__WEBPACK_IMPORTED_MODULE_0__["PLATFORMS"].TIZEN:
          hardwareDriver = new _tizen_app_drivers_tizen_hardware__WEBPACK_IMPORTED_MODULE_2__["HardwareDriverTizen"]();
          break;

        case _app_drivers_platform__WEBPACK_IMPORTED_MODULE_0__["PLATFORMS"].ANDROID:
          hardwareDriver = new _android_app_drivers_android_hardware__WEBPACK_IMPORTED_MODULE_3__["HardwareDriverAndroid"]();
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
/*! exports provided: BatteryDriver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BatteryDriver", function() { return BatteryDriver; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BatteryDriver =
/*#__PURE__*/
function () {
  function BatteryDriver() {
    _classCallCheck(this, BatteryDriver);

    this.level = null;
    this.commonEvents = window.app.common.events;
  }

  _createClass(BatteryDriver, [{
    key: "init",
    value: function init() {
      this.bind();
    }
  }, {
    key: "bind",
    value: function bind() {}
  }]);

  return BatteryDriver;
}();



/***/ }),

/***/ "./src/js/model/drivers/app.drivers.hardware.js":
/*!******************************************************!*\
  !*** ./src/js/model/drivers/app.drivers.hardware.js ***!
  \******************************************************/
/*! exports provided: HardwareDriver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HardwareDriver", function() { return HardwareDriver; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HardwareDriver =
/*#__PURE__*/
function () {
  function HardwareDriver() {
    _classCallCheck(this, HardwareDriver);

    this.commonEvents = window.app.common.events;
  }

  _createClass(HardwareDriver, [{
    key: "init",
    value: function init() {
      this.bind();
    }
  }, {
    key: "bind",
    value: function bind() {}
    /**
     *
     * @returns {boolean}
     */

  }, {
    key: "isHeartRateAvailable",
    value: function isHeartRateAvailable() {
      return false;
    }
  }, {
    key: "backgroundRunEnable",
    value: function backgroundRunEnable() {}
  }, {
    key: "backgroundRunDisable",
    value: function backgroundRunDisable() {}
  }, {
    key: "exit",
    value: function exit() {}
  }]);

  return HardwareDriver;
}();



/***/ }),

/***/ "./src/js/model/drivers/app.drivers.network.js":
/*!*****************************************************!*\
  !*** ./src/js/model/drivers/app.drivers.network.js ***!
  \*****************************************************/
/*! exports provided: NetworkDriver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkDriver", function() { return NetworkDriver; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NETWORKS = ['2G', '2.5G', '3G', '4G', 'WIFI', 'ETHERNET', 'UNKNOWN'];

var NetworkDriver =
/*#__PURE__*/
function () {
  function NetworkDriver() {
    _classCallCheck(this, NetworkDriver);

    this.commonEvents = window.app.common.events;
    this.networkType = 'NONE';
  }

  _createClass(NetworkDriver, [{
    key: "init",
    value: function init() {
      this.bind();
    }
  }, {
    key: "bind",
    value: function bind() {}
  }, {
    key: "isNetworkAvailable",
    value: function isNetworkAvailable() {
      return NETWORKS.indexOf(this.networkType) !== -1;
    }
  }, {
    key: "getNetworkType",
    value: function getNetworkType() {
      return this.networkType;
    }
  }]);

  return NetworkDriver;
}();



/***/ }),

/***/ "./src/js/model/drivers/app.drivers.platform.js":
/*!******************************************************!*\
  !*** ./src/js/model/drivers/app.drivers.platform.js ***!
  \******************************************************/
/*! exports provided: Platform, PLATFORMS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Platform", function() { return Platform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLATFORMS", function() { return PLATFORMS; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PLATFORMS = {
  TIZEN: 'tizen',
  ANDROID: 'android',
  BROWSER: 'browser'
};

var Platform =
/*#__PURE__*/
function () {
  function Platform() {
    _classCallCheck(this, Platform);
  }

  _createClass(Platform, null, [{
    key: "get",
    value: function get() {
      var platform = PLATFORMS.BROWSER;

      if ((typeof tizen === "undefined" ? "undefined" : _typeof(tizen)) === 'object' && _typeof(tizen.systeminfo) === 'object') {
        platform = PLATFORMS.TIZEN;
      } else if ((typeof device === "undefined" ? "undefined" : _typeof(device)) === 'object' && device.platform === 'Android') {
        platform = PLATFORMS.ANDROID;
      }

      return platform;
    }
  }]);

  return Platform;
}();



/***/ }),

/***/ "./src/js/model/drivers/tizen/app.drivers.tizen.battery.js":
/*!*****************************************************************!*\
  !*** ./src/js/model/drivers/tizen/app.drivers.tizen.battery.js ***!
  \*****************************************************************/
/*! exports provided: BatteryDriverTizen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BatteryDriverTizen", function() { return BatteryDriverTizen; });
/* harmony import */ var _app_drivers_battery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.drivers.battery */ "./src/js/model/drivers/app.drivers.battery.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var BatteryDriverTizen =
/*#__PURE__*/
function (_BatteryDriver) {
  _inherits(BatteryDriverTizen, _BatteryDriver);

  function BatteryDriverTizen() {
    _classCallCheck(this, BatteryDriverTizen);

    return _possibleConstructorReturn(this, _getPrototypeOf(BatteryDriverTizen).apply(this, arguments));
  }

  _createClass(BatteryDriverTizen, [{
    key: "bind",
    value: function bind() {
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
    }
  }]);

  return BatteryDriverTizen;
}(_app_drivers_battery__WEBPACK_IMPORTED_MODULE_0__["BatteryDriver"]);



/***/ }),

/***/ "./src/js/model/drivers/tizen/app.drivers.tizen.hardware.js":
/*!******************************************************************!*\
  !*** ./src/js/model/drivers/tizen/app.drivers.tizen.hardware.js ***!
  \******************************************************************/
/*! exports provided: HardwareDriverTizen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HardwareDriverTizen", function() { return HardwareDriverTizen; });
/* harmony import */ var _app_drivers_hardware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.drivers.hardware */ "./src/js/model/drivers/app.drivers.hardware.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var HardwareDriverTizen =
/*#__PURE__*/
function (_HardwareDriver) {
  _inherits(HardwareDriverTizen, _HardwareDriver);

  function HardwareDriverTizen() {
    var _this;

    _classCallCheck(this, HardwareDriverTizen);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HardwareDriverTizen).call(this));
    _this.commonEvents = window.app.common.events;
    return _this;
  }

  _createClass(HardwareDriverTizen, [{
    key: "bind",
    value: function bind() {}
  }, {
    key: "isHeartRateAvailable",
    value: function isHeartRateAvailable() {
      return true;
    }
  }, {
    key: "backgroundRunEnable",
    value: function backgroundRunEnable() {
      tizen.power.request("CPU", "CPU_AWAKE");
      tizen.power.request('SCREEN', 'SCREEN_NORMAL');
    }
  }, {
    key: "backgroundRunDisable",
    value: function backgroundRunDisable() {
      tizen.power.release("CPU");
      tizen.power.release('SCREEN');
    }
  }, {
    key: "exit",
    value: function exit() {
      try {
        tizen.application.getCurrentApplication().exit();
      } catch (error) {
        console.warn('Application exit failed.', error.message);
      }
    }
  }]);

  return HardwareDriverTizen;
}(_app_drivers_hardware__WEBPACK_IMPORTED_MODULE_0__["HardwareDriver"]);



/***/ }),

/***/ "./src/js/model/drivers/tizen/app.drivers.tizen.network.js":
/*!*****************************************************************!*\
  !*** ./src/js/model/drivers/tizen/app.drivers.tizen.network.js ***!
  \*****************************************************************/
/*! exports provided: NetworkDriverTizen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkDriverTizen", function() { return NetworkDriverTizen; });
/* harmony import */ var _app_drivers_network__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.drivers.network */ "./src/js/model/drivers/app.drivers.network.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var NetworkDriverTizen =
/*#__PURE__*/
function (_NetworkDriver) {
  _inherits(NetworkDriverTizen, _NetworkDriver);

  function NetworkDriverTizen() {
    _classCallCheck(this, NetworkDriverTizen);

    return _possibleConstructorReturn(this, _getPrototypeOf(NetworkDriverTizen).call(this));
  }

  _createClass(NetworkDriverTizen, [{
    key: "bind",
    value: function bind() {
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
    }
  }, {
    key: "onNetworkTypeChange",
    value: function onNetworkTypeChange(network) {
      this.networkType = network.networkType;
      this.commonEvents.dispatchEvent('model.network.type.changed');
    }
  }, {
    key: "onGetNetworkTypeSuccess",
    value: function onGetNetworkTypeSuccess(network) {
      this.networkType = network.networkType;
      this.commonEvents.dispatchEvent('model.network.initialized');
    }
  }]);

  return NetworkDriverTizen;
}(_app_drivers_network__WEBPACK_IMPORTED_MODULE_0__["NetworkDriver"]);



/***/ }),

/***/ "./src/js/model/models.js":
/*!********************************!*\
  !*** ./src/js/model/models.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../common/app.common.events */ "./src/js/common/app.common.events.js"); // require('./drivers/app.drivers.platform');


__webpack_require__(/*! ./drivers/app.driver.factory */ "./src/js/model/drivers/app.driver.factory.js");

__webpack_require__(/*! ./app.model.battery */ "./src/js/model/app.model.battery.js");

__webpack_require__(/*! ./app.model.network */ "./src/js/model/app.model.network.js");

__webpack_require__(/*! ./app.model.geolocation */ "./src/js/model/app.model.geolocation.js");

__webpack_require__(/*! ./app.model.workout */ "./src/js/model/app.model.workout.js");

__webpack_require__(/*! ./app.model.sync */ "./src/js/model/app.model.sync.js");

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

/***/ "./src/tests/spec/SyncModelSpec.js":
/*!*****************************************!*\
  !*** ./src/tests/spec/SyncModelSpec.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_model_drivers_app_drivers_platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../js/model/drivers/app.drivers.platform */ "./src/js/model/drivers/app.drivers.platform.js");

describe("Sync", function () {
  var app = window.app || {};
  var env = jasmine.getEnv();
  env.randomizeTests(false);
  app.model.sync.init('http://tracy.test/api/login', 'http://tracy.test/api/workouts');
  beforeEach(function (done) {
    var xmlhttp = new XMLHttpRequest(),
        _this = this;

    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        _this.waypoints = JSON.parse(this.responseText);
        done();
      }
    };

    xmlhttp.open("GET", "tests/data/455.json", true);
    xmlhttp.send();
    this.modelWorkout = app.model.workout;
    this.modelGeolocation = app.model.geolocation;
    this.modelSync = app.model.sync;
    var platform = _js_model_drivers_app_drivers_platform__WEBPACK_IMPORTED_MODULE_0__["Platform"].get(),
        driverFactory = new DriverFactory(platform);
    this.modelWorkout.init(driverFactory.buildHardwareDriver(platform));
    window.addEventListener('model.workout.dbready', function (e) {
      _this.modelWorkout.clear();
    });

    this.runWorkout = function (doneCallback) {
      navigator.geolocation.delay = 1;
      navigator.geolocation.repeat = false;
      navigator.geolocation.waypoints = this.waypoints;
      this.modelGeolocation.init();
      this.modelWorkout.start(this.modelWorkout.WORKOUT_TYPE_RUNNING);
      setTimeout(function () {
        _this.modelWorkout.togglePause();

        doneCallback();
      }, 300);
    };
  });
  it('should login', function (done) {
    window.addEventListener('model.sync.login.successful', function (e) {
      e.stopPropagation();
      expect(e.detail.hasOwnProperty('token')).toBeTruthy();
      expect(e.detail.token.length > 0).toBeTruthy();
      done();
    });
    this.modelSync.login('demo@email.com', '123123');
  });
  it('should login with token and upload workouts', function (done) {
    var _this = this;

    window.addEventListener('model.sync.upload.successful', function (e) {
      e.stopPropagation();
      expect(e.detail).toBeTruthy();
      done();
    });
    this.runWorkout(function () {
      _this.modelWorkout.save();

      _this.modelSync.sync();
    });
  });
});

/***/ }),

/***/ "./src/tests/spec/WorkoutModelSpec.js":
/*!********************************************!*\
  !*** ./src/tests/spec/WorkoutModelSpec.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_model_drivers_app_drivers_platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../js/model/drivers/app.drivers.platform */ "./src/js/model/drivers/app.drivers.platform.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


describe("Workout model", function () {
  var app = window.app || {};
  var env = jasmine.getEnv();
  env.randomizeTests(false);
  beforeEach(function (done) {
    var xmlhttp = new XMLHttpRequest(),
        _this = this;

    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        _this.waypoints = JSON.parse(this.responseText);
        done();
      }
    };

    xmlhttp.open("GET", "tests/data/455.json", true);
    xmlhttp.send();
    this.modelWorkout = app.model.workout;
    this.modelGeolocation = app.model.geolocation;
    var platform = _js_model_drivers_app_drivers_platform__WEBPACK_IMPORTED_MODULE_0__["Platform"].get(),
        driverFactory = new DriverFactory(platform);
    this.modelWorkout.init(driverFactory.buildHardwareDriver(platform));
    window.addEventListener('model.workout.dbready', function (e) {
      _this.modelWorkout.clear();
    });

    this.runWorkout = function (doneCallback) {
      navigator.geolocation.delay = 1;
      navigator.geolocation.repeat = false;
      navigator.geolocation.waypoints = this.waypoints;
      this.modelGeolocation.init();
      this.modelWorkout.start(this.modelWorkout.WORKOUT_TYPE_RUNNING);
      setTimeout(function () {
        _this.modelWorkout.togglePause();

        doneCallback();
      }, 300);
    };
  });
  it('should start and pause workout', function (done) {
    var _this = this;

    expect(_typeof(this.modelWorkout) === 'object').toBeTruthy();

    var pauseListener = function pauseListener(e) {
      var workout = _this.modelWorkout.getWorkout();

      expect(workout.points.length).toEqual(6);
      window.removeEventListener('model.workout.paused', pauseListener);
    };

    window.addEventListener('model.workout.paused', pauseListener);
    this.runWorkout(function () {
      _this.modelWorkout.togglePause();

      done();
    });
  });
  it('should save the workout', function (done) {
    var _this = this;

    window.addEventListener('model.workout.save.successful', function (e) {
      e.stopPropagation();
      expect(e.detail).toBeTruthy();
      done();
    }, 'model.workout.save.failed', function (e) {
      e.stopPropagation();
      expect(e.detail).toBeTruthy();
      done();
    });
    this.runWorkout(function () {
      _this.modelWorkout.save();
    });
  });
  it('should load saved workouts', function (done) {
    var _this = this;

    window.addEventListener('model.workout.getlist.successful', function (e) {
      e.stopPropagation();
      expect(e.detail.length == 1).toBeTruthy();
      expect(e.detail[0].status == _this.modelWorkout.WORKOUT_STATUS_SAVED).toBeTruthy();
      done();
    }, 'model.workout.getlist.failed', function (e) {
      e.stopPropagation();
      done();
    });
    window.addEventListener('model.workout.save.successful', function (e) {
      e.stopPropagation();

      _this.modelWorkout.getList(_this.modelWorkout.WORKOUT_STATUS_SAVED);
    }, 'model.workout.save.failed', function (e) {
      e.stopPropagation();
      expect(e.detail).toBeTruthy();
      done();
    });
    this.runWorkout(function () {
      // _this.modelSync.sync = function(){};
      _this.modelWorkout.save();
    });
  }); //it('should start the workout and update UI', function (done) {
  //    var _this = this;
  //
  //    navigator.geolocation.delay = 1000;
  //    navigator.geolocation.repeat = false;
  //    navigator.geolocation.waypoints = this.waypoints;
  //
  //    this.modelGeolocation.init();
  //    expect(typeof this.modelWorkout === 'object').toBeTruthy();
  //    this.modelWorkout.start(this.modelWorkout.WORKOUT_TYPE_RUNNING);
  //
  //    window.addEventListener(
  //        'model.workout.updateui',
  //        function(e){
  //            e.stopPropagation();
  //            var data = e.detail;
  //            console.log(data);
  //        }
  //    );
  //
  //    setTimeout( function(){
  //            done();
  //        },
  //        4000);
  //});
});

/***/ }),

/***/ "./src/tests/spec/unit/DriverFactorySpec.js":
/*!**************************************************!*\
  !*** ./src/tests/spec/unit/DriverFactorySpec.js ***!
  \**************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_model_drivers_app_drivers_platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../js/model/drivers/app.drivers.platform */ "./src/js/model/drivers/app.drivers.platform.js");
/* harmony import */ var _js_model_drivers_tizen_app_drivers_tizen_hardware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../js/model/drivers/tizen/app.drivers.tizen.hardware */ "./src/js/model/drivers/tizen/app.drivers.tizen.hardware.js");
/* harmony import */ var _js_model_drivers_android_app_drivers_android_hardware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../js/model/drivers/android/app.drivers.android.hardware */ "./src/js/model/drivers/android/app.drivers.android.hardware.js");
/* harmony import */ var _js_model_drivers_tizen_app_drivers_tizen_battery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../js/model/drivers/tizen/app.drivers.tizen.battery */ "./src/js/model/drivers/tizen/app.drivers.tizen.battery.js");
/* harmony import */ var _js_model_drivers_android_app_drivers_android_battery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../js/model/drivers/android/app.drivers.android.battery */ "./src/js/model/drivers/android/app.drivers.android.battery.js");
/* harmony import */ var _js_model_drivers_tizen_app_drivers_tizen_network__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../js/model/drivers/tizen/app.drivers.tizen.network */ "./src/js/model/drivers/tizen/app.drivers.tizen.network.js");
/* harmony import */ var _js_model_drivers_android_app_drivers_android_network__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../js/model/drivers/android/app.drivers.android.network */ "./src/js/model/drivers/android/app.drivers.android.network.js");







describe("DriverFactory", function () {
  it('should create drivers for tizen', function () {
    var platform = _js_model_drivers_app_drivers_platform__WEBPACK_IMPORTED_MODULE_0__["PLATFORMS"].TIZEN,
        driverFactory = new DriverFactory(platform),
        batteryDriver = driverFactory.buildBatteryDriver(platform),
        networkDriver = driverFactory.buildNetworkDriver(platform),
        hardwareDriver = driverFactory.buildHardwareDriver(platform);
    expect(batteryDriver instanceof _js_model_drivers_tizen_app_drivers_tizen_battery__WEBPACK_IMPORTED_MODULE_3__["BatteryDriverTizen"]).toBeTruthy();
    expect(networkDriver instanceof _js_model_drivers_tizen_app_drivers_tizen_network__WEBPACK_IMPORTED_MODULE_5__["NetworkDriverTizen"]).toBeTruthy();
    expect(hardwareDriver instanceof _js_model_drivers_tizen_app_drivers_tizen_hardware__WEBPACK_IMPORTED_MODULE_1__["HardwareDriverTizen"]).toBeTruthy();
  });
  it('should create drivers for android', function () {
    var platform = _js_model_drivers_app_drivers_platform__WEBPACK_IMPORTED_MODULE_0__["PLATFORMS"].ANDROID,
        driverFactory = new DriverFactory(platform),
        batteryDriver = driverFactory.buildBatteryDriver(platform),
        networkDriver = driverFactory.buildNetworkDriver(platform),
        hardwareDriver = driverFactory.buildHardwareDriver(platform);
    expect(batteryDriver instanceof _js_model_drivers_android_app_drivers_android_battery__WEBPACK_IMPORTED_MODULE_4__["BatteryDriverAndroid"]).toBeTruthy();
    expect(networkDriver instanceof _js_model_drivers_android_app_drivers_android_network__WEBPACK_IMPORTED_MODULE_6__["NetworkDriverAndroid"]).toBeTruthy();
    expect(hardwareDriver instanceof _js_model_drivers_android_app_drivers_android_hardware__WEBPACK_IMPORTED_MODULE_2__["HardwareDriverAndroid"]).toBeTruthy();
  });
});

/***/ }),

/***/ "./src/tests/spec/unit/WorkoutSpec.js":
/*!********************************************!*\
  !*** ./src/tests/spec/unit/WorkoutSpec.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_js_workout_app_workout_cycling_workout_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../src/js/workout/app.workout.cycling_workout.js */ "./src/js/workout/app.workout.cycling_workout.js");
/* harmony import */ var _src_js_workout_app_workout_running_workout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../src/js/workout/app.workout.running_workout */ "./src/js/workout/app.workout.running_workout.js");


describe("Workout", function () {
  it('should calculate distance', function () {
    var timeA = 1551018055000,
        timeB = timeA + 20000,
        // +20 sec
    pointA = new Point(0, 45.8849114, 19.2545559, 0, 0, timeA),
        pointB = new Point(0, 45.8856601, 19.2553514, 0, 0, timeB),
        expectedDistance = 103.54782304590353,
        // meters
    workout = new _src_js_workout_app_workout_cycling_workout_js__WEBPACK_IMPORTED_MODULE_0__["CyclingWorkout"](),
        distance = workout._calculateDistance(pointA, pointB);

    expect(distance).toEqual(expectedDistance);
  });
  it('should calculate speed', function () {
    var timeA = 1551018055000,
        timeB = timeA + 20000,
        // +20 sec
    pointA = new Point(0, 45.8849114, 19.2545559, 0, 0, timeA),
        pointB = new Point(0, 45.8856601, 19.2553514, 0, 0, timeB),
        expectedSpeed = 18.638608148262635,
        workout = new _src_js_workout_app_workout_cycling_workout_js__WEBPACK_IMPORTED_MODULE_0__["CyclingWorkout"](),
        speed = workout._calculateSpeed(pointA, pointB);

    expect(speed).toEqual(expectedSpeed);
  });
  it('should calculate pace', function () {
    var timeA = 1551018055000,
        timeB = timeA + 40000,
        // +40 sec
    pointA = new Point(0, 45.8849114, 19.2545559, 0, 0, timeA),
        pointB = new Point(0, 45.8856601, 19.2553514, 0, 0, timeB),
        expectedPace = 6.438248985409653,
        workout = new _src_js_workout_app_workout_running_workout__WEBPACK_IMPORTED_MODULE_1__["RunningWorkout"](),
        pace = workout._calculatePace(pointA, pointB);

    expect(pace).toEqual(expectedPace);
  });
  it('should add points and calculate distance and pace', function () {
    var timeA = 1551018055000,
        timeB = timeA + 40000,
        // +40 sec
    pointA = new Point(0, 45.8849114, 19.2545559, 0, 0, timeA),
        pointB = new Point(0, 45.8856601, 19.2553514, 0, 0, timeB),
        expectedPace = 6.438248985409653,
        expectedDistance = 103.54782304590353 / 1000,
        // km
    workout = new _src_js_workout_app_workout_running_workout__WEBPACK_IMPORTED_MODULE_1__["RunningWorkout"]();
    workout.addPoint(pointA);
    workout.addPoint(pointB);
    expect(workout.speed).toEqual(expectedPace);
    expect(workout.distance).toEqual(expectedDistance);
  });
  it('should add points and calculate distance and speed', function () {
    var timeA = 1551018055000,
        timeB = timeA + 20000,
        // +20 sec
    pointA = new Point(0, 45.8849114, 19.2545559, 0, 0, timeA),
        pointB = new Point(0, 45.8856601, 19.2553514, 0, 0, timeB),
        expectedSpeed = 18.638608148262635,
        // km/h
    expectedDistance = 103.54782304590353 / 1000,
        // km
    workout = new _src_js_workout_app_workout_cycling_workout_js__WEBPACK_IMPORTED_MODULE_0__["CyclingWorkout"]();
    workout.addPoint(pointA);
    workout.addPoint(pointB);
    expect(workout.speed).toEqual(expectedSpeed);
    expect(workout.distance).toEqual(expectedDistance);
  });
});

/***/ }),

/***/ "./src/tests/test.js":
/*!***************************!*\
  !*** ./src/tests/test.js ***!
  \***************************/
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
__webpack_require__(/*! ../js/model/models */ "./src/js/model/models.js");

__webpack_require__(/*! ./spec/WorkoutModelSpec */ "./src/tests/spec/WorkoutModelSpec.js");

__webpack_require__(/*! ./spec/SyncModelSpec */ "./src/tests/spec/SyncModelSpec.js");

__webpack_require__(/*! ./spec/unit/DriverFactorySpec */ "./src/tests/spec/unit/DriverFactorySpec.js");

__webpack_require__(/*! ./spec/unit/WorkoutSpec */ "./src/tests/spec/unit/WorkoutSpec.js");

/***/ }),

/***/ 1:
/*!*********************************!*\
  !*** multi ./src/tests/test.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/vernerd/www/tracy-app/src/tests/test.js */"./src/tests/test.js");


/***/ })

/******/ });
//# sourceMappingURL=test.js.map