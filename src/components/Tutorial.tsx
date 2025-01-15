import React from 'react';
import styles from './Tutorial.module.css';

const Tutorial: React.FC = () => {
  return (
    <div className={styles.tutorialContainer}>
      <h1 className={styles.title}>How to Use IB Grader</h1>
      
      {/* Step 1 */}
      <div className={styles.step}>
        <h2>Step 1: Download any MYP assignment as a Markdown (.md) file</h2>
        <img className={styles.png} src="./step1.png" alt="Step 1 Image" />
        <p>Select an MYP assesment task from any of the core subjects. However, do note that the site works best with text based mediums written on Google Docs.</p>
      </div>
      
      {/* Step 2 */}
      <div className={styles.step}>
        <h2>Step 2: Upload the file to ibgrader.com</h2>
        <img className={styles.png} src="./step2.png" alt="Step 2 Gif" />
        <p>Find the correct file and click "Open" to select the file.</p>
      </div>

      {/* Step 3 */}
      <div className={styles.step}>
        <h2>Step 3: Select the appropriate subject and criterion</h2>
        <img className={styles.png} src="./step3.png" alt="Step 4 Gif" />
        <p>Choose one MYP subject and criterion the paper will be assessed on.</p>
      </div>

      {/* Step 4 */}
      <div className={styles.step}>
        <h2>Step 4: Select the portions to be graded</h2>
        <img className={styles.png} src="./step4.png" alt="Step 3 Gif" />
        <p>Select the relevant portions of the assignment to submit. Please only select student-written portions of the text (exclude rubrics and instruction).</p>
      </div>

      {/* Step 5 */}
      <div className={styles.step}>
        <h2>Step 5: Submit!</h2>
        <img className={styles.png} src="./step5.png" alt="Step 4 Gif" />
        <p>Click "Grade" and wait 20~30 seconds for your AI based feedback.</p>
      </div>
    </div>
  );
};

export default Tutorial;
