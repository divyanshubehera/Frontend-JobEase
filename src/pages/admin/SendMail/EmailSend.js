import React, { useState, useEffect } from "react";
import axios from 'axios'
import Swal from "sweetalert2";
import './EmailSend.css';
import baseURL from "../../../config";

const AdminEmailSend = () => {
    document.title = "Job Ease | Admin Contact"

    useEffect(() => {
        const adminLogin = localStorage.getItem("adminLogin");
        if (!adminLogin) {
            window.location.href = "/";
        }
    }, [])

    const [error, setError] = useState("");
    const [msg, setMsg] = useState('');
    const [user, setUser] = useState({
        from: "",
        to: "",
        subject: "",
        description: ""
    });

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const url = `${baseURL}/api/adminmail/`;
            const { data: res } = await axios.post(url, user);
            console.log(res.message);
            Swal.fire({
                title: 'Success!',
                text: res.message,
                icon: 'success',
                confirmButtonText: 'Cool'
            }).then((result) => {
                if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                    window.location.reload();
                }
            });
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    }

    return (
        <div className="email">
            <form className="admin-contact-form" onSubmit={onSubmit}>
                <h4>Send E Mail </h4>
                <p><b>{msg}</b></p>
                <input
                    type="email"
                    placeholder="from"
                    name="from"
                    onChange={onInputChange}
                    value={user.from}
                />
                <input
                    type="email"
                    placeholder="To"
                    name="to"
                    onChange={onInputChange}
                    value={user.to}
                />
                <input
                    type="text"
                    placeholder="Subject"
                    name="subject"
                    onChange={onInputChange}
                    value={user.subject}
                />
                <textarea
                    type="text"
                    placeholder="Description"
                    name="description"
                    onChange={onInputChange}
                    value={user.description}
                ></textarea>

                <button type="submit" className="blue-btn">Send Mail</button>

            </form>
        </div>
    );

}

export default AdminEmailSend;
