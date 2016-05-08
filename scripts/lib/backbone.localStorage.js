/**
 * Backbone localStorage Adapter
 * Version 1.1.16
 *
 * https://github.com/jeromegn/Backbone.localStorage
 */
(function (root, factory) {
  if (typeof exports === 'object' && typeof require === 'function') {
    module.exports = factory(require("backbone"));
  } else if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["backbone"], function(Backbone) {
      // Use global variables if the locals are undefined.
      return factory(Backbone || root.Backbone);
    });
  } else {
    factory(Backbone);
  }
}(this, function(Backbone) {
// A simple module to replace `Backbone.sync` with *localStorage*-based
// persistence. Models are given GUIDS, and saved into a JSON object. Simple
// as that.

// Generate four random hex digits.
function S4() {
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
};

// Generate a pseudo-GUID by concatenating random hexadecimal.
function guid() {
   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
};

function isObject(item) {
  return item === Object(item);
}

function contains(array, item) {
  var i = array.length;
  while (i--) if (array[i] === item) return true;
  return false;
}

function extend(obj, props) {
  for (var key in props) obj[key] = props[key]
  return obj;
}

function result(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return (typeof value === 'function') ? object[property]() : value;
}

chromeStorage = {
  QUOTA_BYTES: chrome.storage.local.QUOTA_BYTES,

  getItem: function(key, callback) {
    chrome.storage.local.get(key, callback);
  },

  setItem: function(key, value, callback) {
    var item = {};
    item[key] = value;
    chrome.storage.local.set(item, callback);
  },

  removeItem: function(key, callback) {
    chrome.storage.local.remove(key, callback);
  },

  clear: function(callback) {
    chrome.storage.local.clear(callback);
  }
};

// Our Store is represented by a single JS object in *localStorage*. Create it
// with a meaningful name, like the name you'd give a table.
// window.Store is deprectated, use Backbone.LocalStorage instead
Backbone.LocalStorage = window.Store = function(name, serializer) {
  if( !this.localStorage ) {
    throw "Backbone.localStorage: Environment does not support localStorage."
  }
  this.name = name;
  this.serializer = serializer || {
    serialize: function(item) {
      return isObject(item) ? JSON.stringify(item) : item;
    },
    // fix for "illegal access" error on Android when JSON.parse is passed null
    deserialize: function (data) {
      return data && JSON.parse(data);
    }
  };

  var ctx = this;
  this.localStorage().getItem(this.name, function (item) {
    ctx.records = (item[ctx.name] && item[ctx.name].split(",")) || [];
  });

  this.ready = function (callback) {
    if (ctx.records) {
      callback();
    } else {
      setTimeout(ctx.ready, 10, callback);
    }
  }
};

extend(Backbone.LocalStorage.prototype, {

  // Save the current state of the **Store** to *localStorage*.
  save: function() {
    this.localStorage().setItem(this.name, this.records.join(","));
  },

  // Add a model, giving it a (hopefully)-unique GUID, if it doesn't already
  // have an id of it's own.
  create: function(model, options, dfd) {
    if (!model.id && model.id !== 0) {
      model.id = guid();
      model.set(model.idAttribute, model.id);
    }
    this.localStorage().setItem(this._itemName(model.id), this.serializer.serialize(model));
    this.records.push(model.id.toString());
    this.save();
    this.find(model, options, dfd);
  },

  // Update a model by replacing its copy in `this.data`.
  update: function(model, options, dfd) {
    this.localStorage().setItem(this._itemName(model.id), this.serializer.serialize(model));
    var modelId = model.id.toString();
    if (!contains(this.records, modelId)) {
      this.records.push(modelId);
      this.save();
    }
    this.find(model, options, dfd);
  },

  // Retrieve a model from `this.data` by id.
  find: function(model, options, dfd) {
    var serializer = this.serializer;

    var key = this._itemName(model.id);
    var callback = function (item) {
      var resp = serializer.deserialize(item[key]);

      if (options && options.success) {
        options.success(resp);
      }

      dfd.resolve(resp);
    };
    this.localStorage().getItem(key, callback);
  },

  // Return the array of all models currently in storage.
  findAll: function(model, options, dfd) {
    var serializer = this.serializer;
    var callback = function (items) {
      var result = [];
      for (key in items) {
        var data = serializer.deserialize(items[key]);
        if (data != null) {
          result.push(data);
        }
      }

      if (options && options.success) {
        options.success(result);
      }

      dfd.resolve(result);
    }

    var itemNames = [];
    for (var i = 0; i < this.records.length; i++) {
      itemNames.push(this._itemName(this.records[i]));
    }
    this.localStorage().getItem(itemNames, callback);
  },

  // Delete a model from `this.data`, returning it.
  destroy: function(model, options, dfd) {
    this.localStorage().removeItem(this._itemName(model.id));
    var modelId = model.id.toString();
    for (var i = 0, id; i < this.records.length; i++) {
      if (this.records[i] === modelId) {
        this.records.splice(i, 1);
      }
    }
    this.save();

    if (options && options.success) {
      options.success(model);
    }

    dfd.resolve(model);
  },

  localStorage: function() {
    return chromeStorage;
  },

  // Clear localStorage for specific collection.
  _clear: function() {
    var local = this.localStorage(),
      itemRe = new RegExp("^" + this.name + "-");

    // Remove id-tracking item (e.g., "foo").
    local.removeItem(this.name);

    // Match all data items (e.g., "foo-ID") and remove.
    for (var k in local) {
      if (itemRe.test(k)) {
        local.removeItem(k);
      }
    }

    this.records.length = 0;
  },

  // Size of localStorage.
  _storageSize: function() {
    return this.localStorage().length || this.localStorage().QUOTA_BYTES;
  },

  _itemName: function(id) {
    return this.name+"-"+id;
  }

});

// localSync delegate to the model or collection's
// *localStorage* property, which should be an instance of `Store`.
// window.Store.sync and Backbone.localSync is deprecated, use Backbone.LocalStorage.sync instead
Backbone.LocalStorage.sync = window.Store.sync = Backbone.localSync = function(method, model, options) {
  var store = result(model, 'localStorage') || result(model.collection, 'localStorage');

  var resp, errorMessage;
  //If $ is having Deferred - use it.
  var syncDfd = Backbone.$ ?
    (Backbone.$.Deferred && Backbone.$.Deferred()) :
    (Backbone.Deferred && Backbone.Deferred());

  switch (method) {
    case "read":
      model.id != undefined ? store.find(model,options, syncDfd) : store.findAll(model, options, syncDfd);
      break;
    case "create":
      store.create(model, options, syncDfd);
      break;
    case "update":
      store.update(model, options, syncDfd);
      break;
    case "delete":
      store.destroy(model, options, syncDfd);
      break;
  }

  return syncDfd && syncDfd.promise();
};

Backbone.ajaxSync = Backbone.sync;

Backbone.getSyncMethod = function(model, options) {
  var forceAjaxSync = options && options.ajaxSync;

  if(!forceAjaxSync && (result(model, 'localStorage') || result(model.collection, 'localStorage'))) {
    return Backbone.localSync;
  }

  return Backbone.ajaxSync;
};

// Override 'Backbone.sync' to default to localSync,
// the original 'Backbone.sync' is still available in 'Backbone.ajaxSync'
Backbone.sync = function(method, model, options) {
  return Backbone.getSyncMethod(model, options).apply(this, [method, model, options]);
};

return Backbone.LocalStorage;
}));
