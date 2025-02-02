import React from "react";
import "../css/Policy.css";

const Policy = () => {
  return (
    <div className="policy-content">
      <section id="introduction" className="policy-section">
        <h2 className="policy-h2">Introduction</h2>
        <p className="policy-p">
          This Privacy Policy describes Our policies and procedures on the
          collection, use, and disclosure of Your information when You use the
          Service and tells You about Your privacy rights and how the law
          protects You.
        </p>
      </section>

      <section id="definitions" className="policy-section">
        <h2 className="policy-h2">Definitions</h2>
        <div className="policy-definition">
          <h3 className="policy-h3">Account</h3>
          <p className="policy-p">
            Means a unique account created for You to access our Service or
            parts of our Service.
          </p>
        </div>
        <div className="policy-definition">
          <h3 className="policy-h3">Service</h3>
          <p className="policy-p">
            Refers to the Application or the Website or both.
          </p>
        </div>
        <div className="policy-definition">
          <h3 className="policy-h3">Usage Data</h3>
          <p className="policy-p">
            Refers to data collected automatically, either generated by the use
            of the Service or from the Service infrastructure itself.
          </p>
        </div>
      </section>

      <section id="data-collection" className="policy-section">
        <h2 className="policy-h2">Collection of Your Personal Data</h2>
        <h3 className="policy-h3">Personal Data</h3>
        <p className="policy-p">
          While using Our Service, We may ask You to provide Us with certain
          personally identifiable information that can be used to contact or
          identify You.
        </p>
        <h3 className="policy-h3">Usage Data</h3>
        <p className="policy-p">
          Usage Data is collected automatically when using the Service.
        </p>
      </section>

      <section id="data-use" className="policy-section">
        <h2 className="policy-h2">Use of Your Personal Data</h2>
        <p className="policy-p">
          The Company may use Personal Data for the following purposes:
        </p>
        <ul>
          <li className="policy-list-item">
            To provide and maintain our Service
          </li>
          <li className="policy-list-item">To manage Your Account</li>
          <li className="policy-list-item">
            For the performance of a contract
          </li>
          <li className="policy-list-item">To contact You</li>
          <li className="policy-list-item">
            To provide You with news, special offers, and general information
          </li>
        </ul>
      </section>

      <section id="data-sharing" className="policy-section">
        <h2 className="policy-h2">Sharing of Your Personal Data</h2>
        <p className="policy-p">
          We may share Your personal information in the following situations:
        </p>
        <ul>
          <li className="policy-list-item">With Service Providers</li>
          <li className="policy-list-item">For business transfers</li>
          <li className="policy-list-item">With Affiliates</li>
          <li className="policy-list-item">With business partners</li>
          <li className="policy-list-item">With Your consent</li>
        </ul>
      </section>

      <section id="data-retention" className="policy-section">
        <h2 className="policy-h2">Retention of Your Personal Data</h2>
        <p className="policy-p">
          The Company will retain Your Personal Data only for as long as is
          necessary for the purposes set out in this Privacy Policy.
        </p>
      </section>

      <section id="data-transfer" className="policy-section">
        <h2 className="policy-h2">Transfer of Your Personal Data</h2>
        <p className="policy-p">
          Your information, including Personal Data, is processed at the
          Company's operating offices and in any other places where the parties
          involved in the processing are located.
        </p>
      </section>

      <section id="rights" className="policy-section">
        <h2 className="policy-h2">Your Rights</h2>
        <p className="policy-p">
          You have the right to delete or request that We assist in deleting the
          Personal Data that We have collected about You.
        </p>
      </section>

      <section id="security" className="policy-section">
        <h2 className="policy-h2">Security of Your Personal Data</h2>
        <p className="policy-p">
          The security of Your Personal Data is important to Us, but remember
          that no method of transmission over the Internet, or method of
          electronic storage is 100% secure.
        </p>
      </section>

      <section id="children" className="policy-section">
        <h2 className="policy-h2">Children's Privacy</h2>
        <p className="policy-p">
          Our Service does not address anyone under the age of 13. We do not
          knowingly collect personally identifiable information from anyone
          under the age of 13.
        </p>
      </section>

      <section id="links" className="policy-section">
        <h2 className="policy-h2">Links to Other Websites</h2>
        <p className="policy-p">
          Our Service may contain links to other websites that are not operated
          by Us.
        </p>
      </section>

      <section id="changes" className="policy-section">
        <h2 className="policy-h2">Changes to This Privacy Policy</h2>
        <p className="policy-p">
          We may update Our Privacy Policy from time to time. We will notify You
          of any changes by posting the new Privacy Policy on this page.
        </p>
      </section>

      <section id="contact" className="policy-section">
        <h2 className="policy-h2">Contact Us</h2>
        <p className="policy-p">
          If you have any questions about this Privacy Policy, You can contact
          us:
        </p>
        <p className="policy-p">Email: mentaease@gmail.com</p>
      </section>
    </div>
  );
};

export default Policy;
