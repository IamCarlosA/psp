import { Schema, model} from 'mongoose';

const FactureSchema = new Schema({
    employee: {
        type: String,
        required: true
    },
    customer: {
        type: String,
        required: true
    },
    products: [
        {
            name: {
                type: String,
                required: true
            },
            quantify: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    subtotal: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: Date
})

export default model('factures', FactureSchema);