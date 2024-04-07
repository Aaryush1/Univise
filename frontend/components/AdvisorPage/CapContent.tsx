import React from 'react';
import ReactMarkdown from 'react-markdown'
import content from '../../data/capabilitiesContent.json';
import styles from '@/styles/Capabilities.module.css'; // Import the CSS Module

const CapabilitiesContent: React.FC = () => {
  return (
    <div className={styles.capabilitiesContainer}>
      <h2 className={styles.contentTitle}>
        User Guide
      </h2>

      {content.capabilities.map((capability, index) => (
        <div key={index} className={styles.capabilityItem}>
          <h6 className={styles.itemTitle}>
            {capability.title}
          </h6>
          <ReactMarkdown>
            {capability.description}
          </ReactMarkdown>
        </div>
      ))
      }
    </div >
  );
};

export default CapabilitiesContent;
