import mongoose from 'mongoose';

const skuSchema = new mongoose.Schema({
  sku: {
    type: String,
    unique: true,
    required: true,
  },
});

const SKU = mongoose.models.SKU || mongoose.model('SKU', skuSchema);

export default SKU;
