import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#D9EAFD] rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Terms and Conditions</h1>
      <div className="terms-text text-lg text-gray-700 space-y-4">
        <p>By using this service, you agree to the following terms:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>You must be at least 18 years old to use this service.</li>
          <li>You agree to provide accurate information when registering.</li>
          <li>You are prohibited from using the service for illegal activities.</li>
          <li>We are not liable for any damages arising from the use of this service.</li>
          <li>You grant us the right to use any content submitted via the service.</li>
          <li>We may modify these Terms and Conditions at any time without notice.</li>
          <li>The service is provided 'as is' without warranties of any kind.</li>
        </ul>
      </div>
    </div>
  );
};

export default TermsAndConditions;
