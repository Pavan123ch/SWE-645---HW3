import profile from "./assets/profile.png";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [page, setPage] = useState("home");
  const [form, setForm] = useState({});
  const [surveys, setSurveys] = useState([]);

  const API = "http://3.84.226.110:30007";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      let arr = form[name] || [];
      if (checked) arr.push(value);
      else arr = arr.filter(v => v !== value);
      setForm({ ...form, [name]: arr });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    await fetch(`${API}/surveys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    alert("Survey submitted successfully!");

    setForm({});
    setPage("home");
  };

  return (
    <div className="container mt-5">

      {/* ================= HOME PAGE ================= */}
      {page === "home" && (
        <div className="text-center bg-white p-5 shadow rounded">
          <h1 className="text-primary">Welcome to SWE645</h1>
          <p className="text-muted">Building Web Applications on AWS Cloud</p>

          <img
            src={profile}
            alt="Profile"
            className="rounded-circle border border-success mb-3"
            width="140"
          />

          <p>
            Hello! I am Surya Pavan Kumar Chilukuri,
            pursuing my Master’s in Information Systems
            at George Mason University.
          </p>

          <button
            className="btn btn-success mt-3"
            onClick={() => setPage("survey")}
          >
            Student Survey
          </button>

          <button
            className="btn btn-primary mt-3 ms-2"
            onClick={() => {
              fetch(`${API}/surveys`)
                .then(res => res.json())
                .then(data => setSurveys(data));

              setPage("list");
            }}
          >
            View Submissions
          </button>
        </div>
      )}

      {/* ================= SURVEY PAGE ================= */}
      {page === "survey" && (
        <>
          <h2 className="text-success">CS Department Student Survey</h2>
          <p className="text-danger">* indicates required fields</p>

          <form onSubmit={submitForm} className="bg-white p-4 shadow rounded">

            {[
              ["firstName", "First Name"],
              ["lastName", "Last Name"],
              ["street", "Street Address"],
              ["city", "City"],
              ["state", "State"],
              ["zip", "Zip"],
              ["phone", "Telephone"],
              ["email", "Email"]
            ].map(([name, label]) => (
              <div className="mb-3" key={name}>
                <label className="form-label">
                  {label} <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  name={name}
                  className="form-control"
                  required
                  onChange={handleChange}
                />
              </div>
            ))}

            <div className="mb-3">
              <label className="form-label">
                Date of Survey <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="date"
                name="date"
                className="form-control"
                required
                onChange={handleChange}
              />
            </div>

            <h5>What did you like most?</h5>
            {["students","location","campus","atmosphere","dorm","sports"].map(val => (
              <div key={val}>
                <input type="checkbox" name="likes" value={val} onChange={handleChange}/> {val}
              </div>
            ))}

            <h5 className="mt-3">How did you hear about us?</h5>
            {["friends","internet","tv","other"].map(val => (
              <div key={val}>
                <input type="radio" name="source" value={val} required onChange={handleChange}/> {val}
              </div>
            ))}

            <h5 className="mt-3">Would you recommend us?</h5>
            <select name="recommend" className="form-control mb-3" required onChange={handleChange}>
              <option value="">Select</option>
              <option>Definitely</option>
              <option>Likely</option>
              <option>Not Sure</option>
              <option>Unlikely</option>
            </select>

            <button className="btn btn-success">Submit</button>

            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => setPage("home")}
            >
              Back
            </button>

          </form>
        </>
      )}

      {/* ================= RESULTS PAGE ================= */}
      {page === "list" && (
        <div className="container mt-5">
          <h2>All Survey Submissions</h2>

          {surveys.length === 0 ? (
            <p>No data yet</p>
          ) : (
            surveys.map((s, i) => (
              <div key={i} className="border p-3 mb-2">
                <strong>{s.firstName} {s.lastName}</strong><br/>
                {s.email} | {s.city}
              </div>
            ))
          )}

          <button
            className="btn btn-secondary mt-3"
            onClick={() => setPage("home")}
          >
            Back
          </button>
        </div>
      )}

    </div>
  );
}

export default App;
