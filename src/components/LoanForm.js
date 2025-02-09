// components/LoanForm.js
import React, { useState } from "react";

function LoanForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    salary: "", // سيتم تخزين قيمة الراتب هنا
    isEmployee: false,
  });

  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupColor, setPopupColor] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // تحديث الحقول عند تغيير القيم
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // التحقق من صحة البيانات
  const validateForm = () => {
    const { phone, age } = formData;

    if (phone.length < 10 || phone.length > 12) {
      setPopupMessage("There is an error in the phone number.");
      setPopupColor("red");
      setShowPopup(true);
      return false;
    }

    if (age < 18 || age > 100) {
      setPopupMessage("The age is not acceptable.");
      setPopupColor("red");
      setShowPopup(true);
      return false;
    }

    return true;
  };

  // معالجة إرسال النموذج
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setPopupMessage("The process was successful and your data will be sent.");
      setPopupColor("green");
      setShowPopup(true);
    }
  };

  // التحقق من تفعيل زر الإرسال
  React.useEffect(() => {
    const { name, phone, age, salary } = formData;
    setIsSubmitEnabled(name && phone && age && salary); // الراتب الآن اختيار من القائمة
  }, [formData]);

  return (
    <div className="card">
      <h1>Requesting a Loan</h1>
      <hr />

      <form onSubmit={handleSubmit}>
        {/* اسم المستخدم */}
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        {/* رقم الهاتف */}
        <label>Phone Number:</label>
        <input
          type="number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        {/* العمر */}
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />

        {/* هل أنت موظف؟ */}
        <label>
          Are you an employee?
          <input
            type="checkbox"
            name="isEmployee"
            checked={formData.isEmployee}
            onChange={handleChange}
          />
        </label>

        {/* الراتب (قائمة منسدلة) */}
        <label>Monthly Salary:</label>
        <select name="salary" value={formData.salary} onChange={handleChange}>
          <option value="">Select an option</option>
          <option value="less than $500">Less than $500</option>
          <option value="$500 - $1000">$500 - $1000</option>
          <option value="more than $1000">More than $1000</option>
        </select>
        <br />
        {/* زر الإرسال */}
        <button
          type="submit"
          className="submit-btn"
          disabled={!isSubmitEnabled}
          style={{ backgroundColor: isSubmitEnabled ? "#d63384" : "gray" }}
        >
          Submit
        </button>
      </form>

      {/* نافذة البوب-آب */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p style={{ color: popupColor }}>{popupMessage}</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoanForm;
