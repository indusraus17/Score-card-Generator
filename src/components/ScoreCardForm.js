import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import ResetForm from './ResetForm';
import GradingScaleTable from './GradingScaleTable';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


// import { saveAs } from 'file-saver';

const ScoreCardForm = ({ onSubmit }) => {
  const formRef = useRef(null); // Ref for the form element

  const FT = 20;
  const Oral = 10;
  const SA = 60;
  const OralSA = 10;
  const Overall = 100;

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showDownloadButton, setShowDownloadButton] = useState(false);

  const [scholasticData, setScholasticData] = useState({
    Hindi: { FT: '', Oral: '', SA: '', OralSA: '' },
    English: { FT: '', Oral: '', SA: '', OralSA: '' },
    Sanskrit: { FT: '', Oral: '', SA: '', OralSA: '' },
    Math: { FT: '', Oral: '', SA: '', OralSA: '' },
    Evs: { FT: '', Oral: '', SA: '', OralSA: '' },
    GrandTotal: { overallMarks: '', percentageOfGD: '' },
  });

  const [attendanceData, setAttendanceData] = useState({
    workingDays: '',
    daysPresent: '',
    percentage: '',
    cgpa: '',
    grade: '',
    teacherRemarks: '',
  });

  const [activities, setActivities] = useState([
    { activity: 'Development & Maturity', grade: '' },
    { activity: 'Responsibility', grade: '' },
    { activity: 'Music', grade: '' },
    { activity: 'Discipline', grade: '' },
    { activity: 'Hand Work', grade: '' },
    { activity: 'Self-Confidence', grade: '' },
    { activity: 'Craft', grade: '' },
  ]);

  const handleChangeScholastic = (subject, subCategory, e) => {
    const { value } = e.target;
    setScholasticData({
      ...scholasticData,
      [subject]: { ...scholasticData[subject], [subCategory]: parseInt(value) },
    });
  };

  const handleChangeActivity = (index, e) => {
    const { name, value } = e.target;
    const newActivities = [...activities];
    newActivities[index][name] = value;
    setActivities(newActivities);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const scholasticDataWithOverallMarks = { ...scholasticData };
    let grandTotal = 0;
    Object.entries(scholasticDataWithOverallMarks).forEach(([subject, marks]) => {
      if (subject !== 'GrandTotal') {
        const overallMarks = marks.FT + marks.Oral + marks.SA + marks.OralSA;
        scholasticDataWithOverallMarks[subject] = { ...marks, overallMarks };
        grandTotal += overallMarks;
      }
    });

    const { workingDays, daysPresent } = attendanceData;
    const percentage = ((daysPresent / workingDays) * 100).toFixed(2);
    const grandTotalPercentage = ((grandTotal / 500) * 100).toFixed(2);

    const cgpa = parseFloat((grandTotalPercentage / 10).toFixed(2));

    setScholasticData({
      ...scholasticDataWithOverallMarks,
      GrandTotal: { overallMarks: grandTotal, percentageOfGD: grandTotalPercentage },
    });

    let grade, teacherRemarks;
    if (grandTotalPercentage > 90) {
      grade = 'A1';
      teacherRemarks = 'Excellent';
    } else if (grandTotalPercentage < 91 && grandTotalPercentage > 80) {
      grade = 'A2';
      teacherRemarks = 'Very Good';
    } else if (grandTotalPercentage < 81 && grandTotalPercentage > 70) {
      grade = 'B1';
      teacherRemarks = 'Good';
    } else if (grandTotalPercentage < 71 && grandTotalPercentage > 60) {
      grade = 'B2';
      teacherRemarks = 'Satisfactory';
    } else if (grandTotalPercentage < 61 && grandTotalPercentage > 50) {
      grade = 'C1';
      teacherRemarks = 'Satisfactory';
    } else if (grandTotalPercentage < 51 && grandTotalPercentage > 40) {
      grade = 'C2';
      teacherRemarks = 'Unsatisfactory';
    } else {
      grade = 'D';
      teacherRemarks = 'FAIL';
    }

    setAttendanceData({
      ...attendanceData,
      percentage,
      grade,
      cgpa,
      teacherRemarks,
    });

    onSubmit({ scholasticData: scholasticDataWithOverallMarks, attendanceData, grandTotalPercentage });
    setShowDownloadButton(true);
    setFormSubmitted(true);
  };

  const handleDownloadPDF = () => {

      const excludedElements = document.querySelectorAll('.exclude-from-pdf');
  excludedElements.forEach(element => {
    element.style.display = 'none';
  });
    if (!formRef.current) return;

    html2canvas(formRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('score_card.pdf');

      handleReset();
    });

    setShowDownloadButton(false);
    setFormSubmitted(false);
  };

  const handleReset = () => {
    setScholasticData({
      Hindi: { FT: '', Oral: '', SA: '', OralSA: '' },
      English: { FT: '', Oral: '', SA: '', OralSA: '' },
      Sanskrit: { FT: '', Oral: '', SA: '', OralSA: '' },
      Math: { FT: '', Oral: '', SA: '', OralSA: '' },
      Evs: { FT: '', Oral: '', SA: '', OralSA: '' },
      GrandTotal: { overallMarks: '', percentageOfGD: '' },
    });
    setAttendanceData({ workingDays: '', daysPresent: '', percentage: '', cgpa: '', grade: '', teacherRemarks: '' });
    setActivities([
      { activity: 'Development & Maturity', grade: '' },
      { activity: 'Responsibility', grade: '' },
      { activity: 'Music', grade: '' },
      { activity: 'Discipline', grade: '' },
      { activity: 'Hand Work', grade: '' },
      { activity: 'Self-Confidence', grade: '' },
      { activity: 'Craft', grade: '' },
    ]);
    setShowDownloadButton(false);
    setFormSubmitted(false);
  };

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit} className="score-card-form">
      <h1>FIRST TERMINAL EXAMINATION 2023-24</h1>
        <h2>ACADEMIC PERFORMANCE</h2>
        <div className="scholastic-area">
          <h3>Part-I: Scholastic Area</h3>
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>FT-{FT}</th>
                <th>Oral-{Oral}</th>
                <th>SA-{SA}</th>
                <th>OralSA-{OralSA}</th>
                <th>Overall Marks-{Overall}</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(scholasticData).map(([subject, marks]) => {
                if (subject !== 'GrandTotal') {
                  return (
                    <tr key={subject}>
                      <td>{subject}</td>
                      <td>
                        <Form.Control
                          type="number"
                          value={marks.FT}
                          onChange={(e) => handleChangeScholastic(subject, 'FT', e)}
                          min={0}
                          max={20}
                          required
                          disabled={formSubmitted}
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          value={marks.Oral}
                          onChange={(e) => handleChangeScholastic(subject, 'Oral', e)}
                          min={0}
                          max={10}
                          required
                          disabled={formSubmitted}
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          value={marks.SA}
                          onChange={(e) => handleChangeScholastic(subject, 'SA', e)}
                          min={0}
                          max={60}
                          required
                          disabled={formSubmitted}
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          value={marks.OralSA}
                          onChange={(e) => handleChangeScholastic(subject, 'OralSA', e)}
                          min={0}
                          max={10}
                          required
                          disabled={formSubmitted}
                        />
                      </td>
                      <td>{marks.overallMarks}</td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
              <tr>
                <th>GrandTotal:</th>
                <td colSpan="5">{scholasticData.GrandTotal?.overallMarks}</td>
              </tr>
              <tr>
                <th>Percentage:</th>
                <td colSpan="5">{scholasticData.GrandTotal?.percentageOfGD}%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="co-scholastic-area">
          <h3>Part-II:Co-Scholastic Area</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Activity</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={index}>
                  <td>{activity.activity}</td>
                  <td>
                    <Form.Control
                      type="text"
                      name="grade"
                      value={activity.grade}
                      onChange={(e) => handleChangeActivity(index, e)}
                      pattern="^(A|A\+)$"
                      required
                      disabled={formSubmitted}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="attendance-area">
          <h3>Part-III: Attendance</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Number of Working Days</th>
                <th>Number of Days Present</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Form.Control
                    type="number"
                    name="workingDays"
                    value={attendanceData.workingDays}
                    onChange={(e) => setAttendanceData({ ...attendanceData, workingDays: e.target.value })}
                    min={0}
                    max={83}
                    required
                    disabled={formSubmitted}
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    name="daysPresent"
                    value={attendanceData.daysPresent}
                    onChange={(e) => setAttendanceData({ ...attendanceData, daysPresent: e.target.value })}
                    min={0}
                    max={83}
                    required
                    disabled={formSubmitted}
                  />
                </td>
                <td>{attendanceData.percentage}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <th>C.G.P :</th> 
      <td>{attendanceData.cgpa}</td>
            <th>Grade :</th>
            <td>{attendanceData.grade}</td>
              <th>Teacher's Remarks :</th>
              <td>{attendanceData.teacherRemarks}</td>
        <div className="gradingScale">
          <GradingScaleTable />
        </div>
        {showDownloadButton ? (
          <Button variant="primary" className='exclude-from-pdf' onClick={handleDownloadPDF}>
            Download PDF
          </Button>
        ) : (
          <>
            <ResetForm onClick={handleReset} />
            <Button variant="primary"  type="submit">
              Submit
            </Button>
            
          </>
        )}
      </Form>
    </>
  );
};

export default ScoreCardForm;
