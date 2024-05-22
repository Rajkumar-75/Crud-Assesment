import React from "react";
import { Form, Input, message, Button } from "antd";
import axios from "axios";
import TableDisplay from "./TableDisplay";
import "./App.css";

function App() {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await axios.post("http://localhost:5000/Detail", values);
      console.log("Response:", response);
      form.resetFields();
      message.success("Form submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      message.error("Submission failed. Please try again.");
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="container-fluid h-100 pt-5 m-0">
      <div className="container py-5 rounded-1 justify-content-center">
        <div  className="mx-auto shadow1 blur-container  text-dark col-md-5 col-sm-12 p-5 rounded-4">
          <div className="text-center">
            <h3 className="fs-3 fw-bold mt-2">Student Detail</h3>
          </div>
          <div className="mt-4">
            <Form form={form} onFinish={onFinish}>
              <Form.Item
                name="Name"
                rules={[
                  { required: true, message: "Please enter your Name!" },
                  { pattern: /^[A-Za-z\s]+$/, message: "Please enter text only!" }
                ]}
              >
                <Input
                  className="myInput"
                  placeholder="Enter Your Name"
                  style={{ background: "transparent", border: "none", borderRadius: "0", borderBottom: "1px solid #000" }}
                />
              </Form.Item>
              <Form.Item
                name="number"
                rules={[
                  { required: true, message: "Please enter your Mobile No" },
                  { pattern: /^[0-9]+$/, message: "Please enter numbers only!" },
                  { len: 10, message: "Please enter exactly 10 digits!" }
                ]}
              >
                <Input
                  className="rounded-0 border-0 border-bottom border-1 border-dark"
                  placeholder="Enter Your Mobile No"
                  style={{ background: "transparent", border: "none", borderBottom: "1px solid #000" }}
                />
              </Form.Item>
             
              <Form.Item
                name="age"
                rules={[
                  { required: true, message: "Please enter your Age!" },
                  { pattern: /^[0-9]+$/, message: "Please enter numbers only!" },
                  { len: 2, message: "Please enter exactly 2 digits!" }
                ]}
              >
                <Input
                  className="rounded-0 border-0 border-bottom border-1 border-dark"
                  placeholder="Enter Your Age"
                  style={{ background: "transparent", border: "none", borderBottom: "1px solid #000" }}
                />
              </Form.Item>
              <Form.Item
                name="city"
                rules={[
                  { required: true, message: "Please enter your city!" },
                  { pattern: /^[A-Za-z\s]+$/, message: "Please enter text only!" }
                ]}
              >
                <Input
                  className="myInput"
                  placeholder="Enter Your City"
                  style={{ background: "transparent", border: "none", borderRadius: "0", borderBottom: "1px solid #000" }}
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { type: "email", message: "The input is not valid E-mail!" },
                  { required: true, message: "Please enter your E-mail!" }
                ]}
              >
                <Input
                  className="py-2 rounded-0 border-0 border-bottom border-1 border-dark"
                  placeholder="Enter Your Email"
                  style={{ background: "transparent", border: "none", borderBottom: "1px solid #000" }}
                />
              </Form.Item>
              
              <div className="mt-4 d-flex justify-content-center">
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="btns fw-bold mx-4  px-4 " >
                    Submit
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button htmlType="button" onClick={onReset} className="fw-bold px-4  mx-4 text-bg-danger border-0" >
                    Reset
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
        <div className="Table">
          <TableDisplay />
        </div>
      </div>
    </div>
  );
}

export default App;
