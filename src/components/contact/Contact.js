import CustomerCareTollfreeIcon from "../contact/images/customer_Service_tollfree_icon.png";
import LiveChatIcon from "../contact/images/live_chat_icon.png";
import styles from "../../styles/Contact.module.css";
function ContactUs() {
  return (
    <div class="container-fluid">
      <div className={styles.contactSection}>
        <div className={styles.contactText}>
          <h2>Have More Questions?</h2>
          <p>
            You can contact our customer service via phone or chat.We are
            available 24*7.
          </p>
        </div>
        <div className={styles.contactInfo1}>
          <div className={styles.contactItem}>
            <img
              src={CustomerCareTollfreeIcon}
              alt="Customer Care Toll Free Icon"
            />
            <p>+971-800-600-700</p>
          </div>
          <div className={styles.contactItem}>
            <img src={LiveChatIcon} alt="WhatsApp Live chat Icon" />
            <p>Live Chat (WhatsApp)</p>
          </div>
        </div>
      </div>
      <div className={styles.contactInfo}>
        <h3>Our Contact Information</h3>
        <ul>
          <li>
            <strong>Email:</strong> info@zencart.com
          </li>
          <li>
            <strong>Phone:</strong> +971 50 123 4567
          </li>
          <li>
            <div>
              <strong>Postal Address:</strong>
            </div>
            <div>Zen Cart Solutions FZE</div>
            <div>Office 123, Blitz Tower</div>
            <div>Dubai International City</div>
            <div>Dubai, UAE</div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ContactUs;
