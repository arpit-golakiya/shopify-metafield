'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
// const notify = require('../mailer');

// const Imager = require('imager');
// const config = require('../../config');
// const imagerConfig = require(config.root + '/config/imager.js');

const Schema = mongoose.Schema;

// const getTags = tags => tags.join(',');
// const setTags = tags => {
//   if (!Array.isArray(tags)) return tags.split(',').slice(0, 10); // max tags
//   return [];
// };

/**
 * Metafield Schema
 */


const MetafieldSchema = new Schema({
  namespace: { type: String, default: '', trim: true, maxlength: 1000 },
  key: { type: String, default: '', trim: true, maxlength: 400 },
  value: { type: String, default: '', trim: true, maxlength: 1000 },
  valueType: { type: String, default: '', trim: true, maxlength: 1000 },
  description: { type: String, default: '', trim: true, maxlength: 1000 },
  ownerType: { type: String, default: '', trim: true, maxlength: 1000 },
  legacyResourceId: { type: String, default: '', trim: true, maxlength: 1000 },
  // tags: { type: [], get: getTags, set: setTags },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

/**
 * Validations
 */

MetafieldSchema.path('namespace').required(true, 'Metafield namespace cannot be blank');
MetafieldSchema.path('key').required(true, 'Metafield key cannot be blank');
MetafieldSchema.path('value').required(true, 'Metafield value cannot be blank');
MetafieldSchema.path('valueType').required(true, 'Metafield valueType cannot be blank');
MetafieldSchema.path('description').required(true, 'Metafield description cannot be blank');

/**
 * Pre-remove hook
 */

MetafieldSchema.pre('remove', function(next) {
  // const imager = new Imager(imagerConfig, 'S3');
  // const files = this.image.files;

  // if there are files associated with the item, remove from the cloud too
  // imager.remove(files, function (err) {
  //   if (err) return next(err);
  // }, 'metafield');

  next();
});

/**
 * Methods
 */

MetafieldSchema.methods = {
  /**
   * Save metafield and upload image
   *
   * @param {Object} images
   * @api private
   */

  uploadAndSave: function(/*image*/) {
    const err = this.validateSync();
    if (err && err.toString()) throw new Error(err.toString());
    return this.save();

    /*
    if (images && !images.length) return this.save();
    const imager = new Imager(imagerConfig, 'S3');

    imager.upload(images, function (err, cdnUri, files) {
      if (err) return cb(err);
      if (files.length) {
        self.image = { cdnUri : cdnUri, files : files };
      }
      self.save(cb);
    }, 'metafield');
    */
  },
};

/**
 * Statics
 */

MetafieldSchema.statics = {
  /**
   * Find metafield by id
   *
   * @param {ObjectId} id
   * @api private
   */

  load: function(_id) {
    return this.findOne({ _id })
      // .populate('user', 'name email username')
      // .populate('comments.user')
      .exec();
  },

  /**
   * List metafields
   *
   * @param {Object} options
   * @api private
   */

  list: function(options) {
    const criteria = options.criteria || {};
    const page = options.page || 0;
    const limit = options.limit || 30;
    return this.find(criteria)
      // .populate('user', 'name username')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * page)
      .exec();
  }
};

mongoose.model('Metafield', MetafieldSchema);
