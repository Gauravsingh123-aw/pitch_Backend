const mongoose = require('mongoose')
require('dotenv').config()

//connecting to database
mongoose.connect(process.env.DB_URL)
    .then(() => console.log("database connected"))
    .catch((Err) => console.log("error in db object", Err));

const userSchema = new mongoose.Schema({
    usertype: {
        type: String,
        required: ['true', "usertype is required"]
    },
    username: {
        type: String,
        required: ["true", "username is required"]
    },
    address: {},
    phone: {},

})

const FounderSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true 
    },
    
    // Basic startup details
    startupName: { 
        type: String,
        required: true 
    },
    businessDescription: {
         type: String 
        },
    industry: {
         type: String 
        },
    stage: {
         type: String, 
         enum: ['Idea', 'MVP', 'Growth', 'Scaling'], 
         default: 'Idea' 
        },
    
    // Funding details
    fundingGoal: { 
        type: Number, 
        required: true 
    },
    equityOffered: { 
        type: Number, 
        required: true 
    },
    
    // Document storage
    pitchDeckUrl: { 
        type: String 
    },  
    // URL to uploaded pitch deck
    legalDocuments: [{ type: String }],  // Array of URLs for legal documents
    
    // Team information
    team: [{
      name: { type: String },
      role: { type: String }
    }],
    
    // Social and website links (optional)
    websiteUrl: { type: String },
    socialLinks: {
      linkedin: { type: String },
      twitter: { type: String }
    },

    
    // Payment information (for receiving funds)
    paymentInfo: {
      accountHolderName: { type: String },
      bankName: { type: String },
      accountNumber: { type: String },
      routingNumber: { type: String },
      stripeAccountId: { type: String }  // Stripe account for secure transactions
    }
  });
  

const InvestorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    investmentRange: {
        min: { type: Number, default: 0 },
        max: { type: Number }
    },
    preferredIndustries: [{ type: String }], // Array of industry names
    org_name: {
        type: String
    },
    investmentExperience:
    {
        type: String,
        enum: ['Beginner', 'Experienced', 'Institutional']
    },
    accreditedStatus: { 
        type: Boolean, default: false 
    },
    invested_amount:{
        type:Number
    },
    invested_companies:[{type:String}],

    watchlist:[{type:String}],

    fund_details:{
        payment_from:{type:String},
        payment_to:{type:String},
        date:{type:date}
    },

    // Payment details for transactions made

    paymentDetails: {
        cardHolderName: { type: String },
        cardNumber: { type: String },  // Consider encryption for sensitive info
        expiryDate: { type: String },
        billingAddress: {
            country: { type: String },
            city: { type: String },
            postalCode: { type: String }
        },
        stripeCustomerId: { type: String }  // For storing Stripe-related details
    }
});

// creating model for schemas

const User=mongoose.model('user',userSchema)
const Investor=mongoose.model('investorschema',InvestorSchema)
const Founder=mongoose.model('founderschema',FounderSchema)

module.exports={User,Investor,Founder};