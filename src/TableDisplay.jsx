import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Modal, Form, Input} from 'antd';
import './TableDisplay.css';

function TableDisplay() {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editGrade, setEditGrade] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, [data]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/DataFetch');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(
        `http://localhost:5000/update-Grade/${editGrade._id}`,
        values
      );
      setVisible(false);
      form.resetFields();
      const updatedGrades = data.map((item) =>
        item._id === editGrade._id ? { ...item, ...values } : item
      );
      setData(updatedGrades);
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const handleEdit = (item) => {
    setEditGrade(item);
    form.setFieldsValue(item);
    setVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this data?");
      if (confirmed) {
        await axios.delete(`http://localhost:5000/deleteData/${id}`);
        setData(prevData => prevData.filter(item => item._id !== id));
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <>
      <div className="shadow1 blur-container  my-5 p-3">
       <h1 className='text-dark text-center my-3'>Table</h1>
        <div className='rounded  table-responsive'>
          <table className="table border">
            <thead className=''>
              <tr className="text-center border">
                <th>S/No</th>
                <th>NAME</th>
                <th>CONTACT</th>
                <th>AGE</th>
                <th>CITY</th>
                <th>EMAIL</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className=''>
                  <td className='text-center'>{index + 1}</td>
                  <td>{item.Name}</td>
                  <td >{item.number}</td>
                  <td className='text-center'>{item.age}</td>
                  <td>{item.city}</td>
                  <td>{item.email}</td>
                  
                  <td className="d-flex justify-content-center">
                    <FaEdit
                      className="btn-success accept mx-2 fs-4"
                      onClick={() => handleEdit(item)}
                    />
                    <MdDelete
                      className="btn-danger  delete mx-2 fs-4"
                      onClick={() => handleDelete(item._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal
          title="Edit Data"
          open={visible}
          onOk={handleUpdate}
          onCancel={() => setVisible(false)}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Name"
              name="Name"
              rules={[{ required: true, message: "Please input the name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Contact"
              name="number"
              rules={[{ required: true, message: "Please input the contact number!" }]}
            >
              <Input />
            </Form.Item>
            
            <Form.Item
              label="Age"
              name="age"
              rules={[{ required: true, message: "Please input the roll number!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please input the city!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input the email!" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default TableDisplay;
