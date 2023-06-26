import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { ResponsiveContainer } from 'recharts';
import { FaEdit, FaTrash } from 'react-icons/fa';
const Userstored = () => {

    const [employeeData, setEmployeeData] = useState([]);
    const [editID, setEditID] = useState('');
    const [editRole, setEditRole] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editPassword, setEditPassword] = useState('');
    const [editname, setEditName] = useState('')
    const [showEditForm, setShowEditForm] = useState(false);
    const [editData, setEditData] = useState([]);
    const [updatedRole, setUpdatedRole] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [updatedPassword, setUpdatedPassword] = useState('');
    const [isEditing, setIsEditing] = useState(false); // New state variable
    const [refresh, setRefresh] = useState('')
    useEffect(() => {
        fetchEmployeeData();
    }, []);
    useEffect(() => {
        setEditID(editData._id)
        setEditEmail(editData.email)
        setEditRole(editData.role)
        setEditName(editData.name)
    }, [editData]);
    const fetchEmployeeData = async () => {
        try {
            const response = await fetch('/api/employeedata');
            const data = await response.json();
            if (response.ok) {
                setEmployeeData(data.data);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    };
    const handleEdit = (user_id, role, email,name) => {
        setEditID(user_id);
        setEditRole(role);
        setEditEmail(email);
        setEditName(name);
        setShowEditForm(true);
        setIsEditing(true); // Set editing mode to true
    };
    const handleUpdateData = async () => {
        try {
            const updatedData = {
                role: editRole,
                email: editEmail,
                password: editPassword,
                name:editname,
            };
            await axios.put(`/api/employeedata/${editID}`, updatedData);
            fetchEmployeeData();
            setShowEditForm(false);

            setEditRole('');
            setEditEmail('');
            setEditPassword('');
            setEditName('');
            window.location.reload();

            // Fetch updated data after successful update
        } catch (error) {
            console.error('Error updating data:', error);
            // Handle the error appropriately
        }
    };
    const handleDeleteData = async (id) => {
        try {
            await axios.delete(`/api/employeedata/${id}`);
            fetchEmployeeData();
            // Fetch updated data after successful deletion
        } catch (error) {
            console.log(error);
        }
    };
    const handleCancelEdit = () => {
        setEditRole('');
        setEditEmail('');
        setEditPassword('');
        setEditName('');
        setIsEditing(false);
        setShowEditForm(false);
        setRefresh('');

    };

    return (
        <>


            {showEditForm && (
                <div>
                    <select value={editRole} onChange={(e) => setEditRole(e.target.value)}>
                        {/* <option  value="" disabled>Select Role</option> */}
                        <option value="Admin">Admin</option>
                        <option value="HR">HR</option>
                        <option value="Employee">Employee</option>
                    </select>
                    {/* <input type="text" value={editRole} onChange={(e) => setEditRole(e.target.value)} /> */}
                    <input type="text" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                    <input type="password" value={editPassword} onChange={(e) => setEditPassword(e.target.value)} />

                    <Button variant="primary" onClick={() => handleUpdateData(editID)}>
                        Update
                    </Button>

                    <Button variant="danger" onClick={handleCancelEdit}>
                        Cancel
                    </Button>


                </div>
            )}

            <h1>Employee Data</h1>
            <br />
            <div>
              
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>No</th>
                            <th style={{ textAlign: 'center' }}>Role</th>
                            <th style={{ textAlign: 'center' }}>Email</th>
                            {/* <th style={{ textAlign: 'center' }}>Password</th> */}
                            <th style={{ textAlign: 'center' }}>Update</th>
                            <th style={{ textAlign: 'center' }}>Delete</th>
                        </tr>
                    </thead>

                    <tbody >
                        {employeeData.map((user, index) => (
                            <tr key={user._id} >
                                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                <td style={{ textAlign: 'center' }}>{user.role}</td>
                                <td style={{ textAlign: 'center' }}>{user.email}</td>
                                <td style={{ textAlign: 'center' }}>
                                    {/* {isEditing ? (
                                        <Button variant="danger" value={refresh} onClick={handleCancelEdit}>
                                            Cancel
                                        </Button>
                                    ) : ( */}
                                    <Button  variant="primary" onClick={() => handleEdit(user._id, user.role, user.email)}>
                                        <FaEdit /> Edit
                                    </Button>
                                    {/* )} */}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDeleteData(user._id)}
                                    >
                                        <FaTrash /> Delete
                                    </Button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                
            </div>

        </>
    );
};

export default Userstored;

