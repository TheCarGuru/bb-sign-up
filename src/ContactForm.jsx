import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactForm = () => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('formData');
    return savedData 
      ? JSON.parse(savedData) : {
    country: '',
    createStripeAccount: false,
    companyNameAddress: '',
    emailAddress: '',
    phoneNumber: '',
    servicesList: '',
    zonesInfo: '',
    operatingHours: '',
    pricingExplanation: '',
    binSizes: '',
    truckCount: '',
    taxes: ['', ''],
    otherCharges: '',
    linkQuickBooks: '',
    howHeard: '',
    };
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const validateForm = () => {
    const errors = {};
    if (!formData.country) {
      errors.country = 'Country is required';
    }
    if (!formData.companyNameAddress) {
      errors.companyNameAddress = 'Company name and address is required';
    }
    if (!formData.emailAddressAddress) {
      errors.emailAddressAddress = 'Email address is required';
    }
    if (!formData.phoneNumber) {
      errors.phoneNumber = 'Phone number is required';
    }
    if (!formData.servicesList) {
      errors.servicesList = 'A list of services are required';
    }
    if (!formData.zonesInfo) {
      errors.zonesInfo = 'A list of zones and prices are required';
    }
    if (!formData.operatingHours) {
      errors.operatingHours = 'Operating hours are required';
    }
    if (!formData.pricingExplanation) {
      errors.pricingExplanation = 'An explanation of prices are required';
    }
    if (!formData.binSizes) {
      errors.binSizes = 'A list of bin sizes and unique identifiers (if applicable) are required';
    }
    if (!formData.truckCount) {
      errors.truckCount = 'The number of trucks are required';
    }
    if (!formData.taxes) {
      errors.taxes = 'A list of taxes and the percentage are required';
    }
    if (!formData.otherCharges) {
      errors.otherCharges = 'A list of other charges are required';
    }
    if (!formData.linkQuickBooks) {
      errors.linkQuickBooks = 'A selection is required';
    }
    if (!formData.howHeard) {
      errors.howHeard = 'This is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      fetch('https://fakeEndpoint.com', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            alert('Form submitted successfully!');
            setFormData({
              country: '',
            });
          } else {
            console.error('Failed to submit form');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <div className="container">
      <h1>Contact Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            What is your country?
          </label>
          <select
            className="form-select"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">Select Country</option>
            <option value="Canada">Canada</option>
            <option value="USA">USA</option>
          </select>
        </div>

        <div className="mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="createStripeAccount"
              checked={formData.createStripeAccount}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="createStripeAccount">
              First you need to create an account with Stripe for online credit card processing. 
              There are no setup/cancellation fees with Stripe and they charge 2.9% + $0.30 per transaction that they process (once you have a history with them, you may be able to negotiate a lower rate). 
              They securely store your client's credit card information and your banking information (where they release the funds to you). 
              You will likely never need to log into Stripe after the initial setup. To create an account follow these steps:

              <div className="mb-3">
  <label htmlFor="stripeAccountSteps" className="form-label">
  <br />
   Steps to Create a Stripe Account:
  </label>
  <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
    <li>
      a) Create an account here: <a href="https://dashboard.stripe.com/register" target="_blank" rel="noopener noreferrer">https://dashboard.stripe.com/register</a>
    </li>
    <li>
      b) After you create an account you will receive a verification email. Click on the verification link in the email.
    </li>
    <li>
      c) Log in to Stripe and click the "Activate your account" link in the top left corner.
    </li>
    <li>
      d) Fill out the required information on this page to activate your account.
    </li>
    <li>
      e) Click on the "Settings" icon in the top right corner of the screen (a gear), then the "External payout accounts and scheduling" link (for Canada) or "Bank accounts and scheduling" link (for USA) at the bottom of the screen. Here you can set how often you want to be transferred your money under "Payout schedule".
    </li>
    <li>
      f) Click on the "Settings" icon in the top right corner of the screen, then the "Team" link at the bottom of the screen. Click the "New member" button and add "info@xxxxx.com" as a "Developer" and press the "Invite" button. This will allow me to collect your API keys to connect xxxxx and Stripe (I will delete myself once we are all set up).
    </li>
  </ul>
</div>

You can learn about additional Stripe settings here, though they are not required for xxxxx: https://stripe.com/docs/checklist.
<br /><br />
Note that you do not need to enable receipts from Stripe - xxxxx sends receipts.
<br /><br />
<li style={{ listStyleType: 'none' }}>
      c) Once the above is complete, please respond to this email with the answers to the following (answering by question number is easiest):
      <ul style={{ listStyle: 'none', paddingLeft: '20px' }}> 
        <br />
        <li>1. What is your full company name and mailing address? This will appear on receipts/invoices sent to your customers. 
        <textarea
      className="form-control"
      name="companyNameAddress"
      rows="4"
      placeholder="Enter company name and mailing address here"
      value={formData.companyNameAddress}
      onChange={handleChange}
      ></textarea>
      <br></br>
      </li>
      
        <li>2. What email address would you like to be used by xxxxx? This shows up at the top of the screen in the booking process, and it is where confirmation emails are sent when an order is created. 
        <input
      type="text"
      className="form-control"
      name="emailAddress"
      placeholder="Enter email address"
      value={formData.emailAddress}
      onChange={handleChange}
      />
       <br></br>
      </li>
        
        <li>3. What phone number would you like to be used by xxxxx? This shows up at the top of the screen in the booking process.
        <input
      type="text"
      className="form-control"
      name="phoneNumber"
      placeholder="Enter phone number"
      value={formData.phoneNumber}
      onChange={handleChange}
      />
       <br></br>
      </li>

        <li>4. Please provide a list of your services (e.g. "20 yard bin", "5 yard soil bin") 
        <input
      type="text"
      className="form-control"
      name="servicesList"
      placeholder="Enter list of services"
      value={formData.servicesList}
      onChange={handleChange}
      />
       <br></br>
      </li>

        <li>5. With xxxxx you can charge different prices for different territories, called "Zones" (this allows you to charge higher rates for your services that require more driving). 
        Provide the names of your zones, the zone's price, and which zip/postal codes make up the zone.
        <input
      type="text"
      className="form-control"
      name="zonesInfo"
      placeholder="Enter names of zones, zone prices, and which zip/postal codes make up the zone"
      value={formData.zonesInfo}
      onChange={handleChange}
      />
      </li>

For Canada, include these links:
<ul>
  <li>
    <a href="https://data.mongabay.com/igapo/canada/AB" target="_blank" rel="noopener noreferrer">https://data.mongabay.com/igapo/canada/AB (dynamic province)</a>
  </li>
  <li>
    <a href="https://en.wikipedia.org/wiki/Postal_codes_in_Canada#Table_of_all_postal_codes" target="_blank" rel="noopener noreferrer">https://en.wikipedia.org/wiki/Postal_codes_in_Canada#Table_of_all_postal_codes</a>
  </li>
  <li>
    <a href="https://www.freemaptools.com/find-canada-postcodes-inside-radius.htm" target="_blank" rel="noopener noreferrer">https://www.freemaptools.com/find-canada-postcodes-inside-radius.htm</a>
  </li>
  <li>
    <a href="https://worldpostalcode.com/lookup" target="_blank" rel="noopener noreferrer">https://worldpostalcode.com/lookup</a>
  </li>
</ul>

<br></br>
For USA, include these links:
<ul>
  <li><a href="https://worldpostalcode.com/lookup" target="_blank" rel="noopener noreferrer">https://worldpostalcode.com/lookup</a></li>
  <li><a href="https://www.unitedstateszipcodes.org/TN/" target="_blank" rel="noopener noreferrer">https://www.unitedstateszipcodes.org/TN/ (dynamic state)</a></li>
  <li><a href="https://www.freemaptools.com/find-zip-codes-inside-radius.htm" target="_blank" rel="noopener noreferrer">https://www.freemaptools.com/find-zip-codes-inside-radius.htm</a></li>
</ul>
<br></br>

      <li>6. What are your operating hours each day of the week, and are you closed any days of the week?
      <input
      type="text"
      className="form-control"
      name="operatingHours"
      placeholder="Enter your operating hours"
      value={formData.operatingHours}
      onChange={handleChange}
      />
       <br></br>
      </li>

      <li>7. Please explain how your pricing works. Typically companies price in one of two ways:
      <ul>
      <li>Offer a base price that includes X days, and charge $Y for each additional day.</li>
      <li>Alternatively, offer tiered pricing such as "up to 3 days," "up to 7 days," and "up to 15 days" with different prices for each tier. 
      Additionally, charge $Y for each additional day beyond the 15-day threshold.</li>
      </ul>
      <input
      type="text"
      className="form-control"
      name="pricingExplanation"
      placeholder="Explain how your pricing works"
      value={formData.pricingExplanation}
      onChange={handleChange}
      />
       <br></br>
      </li>

      <li>8. Which bin sizes do you have, and how many of each? If bins also have a unique identifier (like an ID), please provide those as well.
      <input
      type="text"
      className="form-control"
      name="binSizes"
      placeholder="Enter names of zones, prices, and which zip/postal codes make up the zone"
      value={formData.binSizes}
      onChange={handleChange}
      />
       <br></br>
      </li>

      <li>9. How many trucks do you have? If a truck has a unique identifier (like an ID), please provide that as well.
      <input
      type="text"
      className="form-control"
      name="truckCount"
      placeholder="Enter number of trucks and unique identifier, if applicable"
      value={formData.truckCount}
      onChange={handleChange}
      />
      <br></br>
      </li>

      <li>10. Which taxes are applied to your orders? Please provide the name of each tax and the percentage. Up to two are allowed.
      <input
      type="text"
      className="form-control"
      name="taxes"
      placeholder="Please provide the name of each tax and the percentage"
      value={formData.taxes}
      onChange={handleChange}
      />
      <br></br>
      </li>
      
      <li>11. Are there any other items you may add to an order and charge for? (e.g. $15 per tire, $25 for overfilling bin)
      <input
      type="text"
      className="form-control"
      name="otherCharges"
      placeholder="Enter any other items to add to your order and charge for"
      value={formData.otherCharges}
      onChange={handleChange}
      />
      <br></br>
      </li>
      
      <li> <label htmlFor="linkQuickBooks" className="form-label">
      Do you wish to link xxxxx with QuickBooks Online (all transactions from xxxxx are sent to QuickBooks Online in real-time)?
          </label>
          <select
            className="form-select"
            name="linkQuickBooks"
            value={formData.linkQuickBooks}
            onChange={handleChange}
            required
          >
            <option value="">Select yes or no</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
      </li>
      <br></br>
      
      <li>13. How did you hear about us?
      <input
      type="text"
      className="form-control"
      name="howHeard"
      placeholder="How did you hear about us?"
      value={formData.howHeard}
      onChange={handleChange}
      />
      </li>
      </ul>
    </li>      
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {Object.keys(formErrors).length > 0 && (
        <div className="alert alert-danger">
          {Object.values(formErrors).map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactForm;