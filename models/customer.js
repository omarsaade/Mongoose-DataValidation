// he fia kell el code for defining and validating customer object
const mongoose = require("mongoose");
const Joi = require("joi");

//mongoose validation

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
  };

  return Joi.validate(customer, schema);
}

// module.exports.Customer = Customer;
//shorter way

// we can also export a single function instead of exporting an object.
// how can we do that ?
//  so for example here we need an object in this module
//  cz we have a multiple meth
// an Object would be usefull if we have multiple methods or properties

exports.Customer = Customer;
exports.validate = validateCustomer;
