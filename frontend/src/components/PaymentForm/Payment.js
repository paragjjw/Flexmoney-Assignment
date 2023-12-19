import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "./payment.css";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Payment({
  click,
  setClick,
  handleNext,
  userDetails,
  setUserDetails,
}) {
  const submitBtn = useRef();
  const [accountNumberHelperTxt, setAccountNumberHelperTxt] = useState("");
  const [ifscCodeHelperTxt, setIfscCodeHelperTxt] = useState("");
  const [bankAccountDetails, setBankAccountDetails] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name == "accountNumber") {
      value = value.replace(/\D/g, "").slice(0, 18);
    } else if (name == "ifscCode") {
      value = value.slice(0, 11);
    }
    setBankAccountDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bankAccountDetails.accountNumber.length < 8) {
      setAccountNumberHelperTxt(
        "Account number should be atleast 8 digits long"
      );
    } else if (
      bankAccountDetails.hasOwnProperty("ifscCode") &&
      !/^[A-Z]{4}0\d{6}$/.test(bankAccountDetails.ifscCode)
    ) {
      setIfscCodeHelperTxt("Invalid IFSC code");
    } else {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/user/fetch?mobileNo=${userDetails.mobileNo}`
        )
        .then((res) => {
          if (!res.data) {
            // create user
            axios
              .post(`${process.env.REACT_APP_API_URL}/user/create`, userDetails)
              .then((res) => {
                bankAccountDetails.paidBy = res.data._id;
                //complete transaction
                axios
                  .post(
                    `${process.env.REACT_APP_API_URL}/transaction/create`,
                    bankAccountDetails
                  )
                  .then((response) => {
                    toast.success("Registration successful", {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                    handleNext();
                    setUserDetails({});
                  })
                  .catch((err) => {
                    // delete user
                    axios.delete(
                      `${process.env.REACT_APP_API_URL}/user/remove/${res.data._id}`
                    );
                    toast.error("Some error occurred. Try later", {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                  });
              })
              .catch((err) => {
                toast.error("Some error occurred. Try later", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              });
          } else {
            axios
              .patch(
                `${process.env.REACT_APP_API_URL}/user/edit/${res.data._id}`,
                userDetails
              )
              .then((res) => {
                bankAccountDetails.paidBy = res.data._id;
                //complete transaction
                axios
                  .post(
                    `${process.env.REACT_APP_API_URL}/transaction/create`,
                    bankAccountDetails
                  )
                  .then((response) => {
                    axios.patch(
                      `${process.env.REACT_APP_API_URL}/user/edit/${res.data._id}`,
                      { dateOfPayment: Date.now() }
                    );
                    toast.success("Registration successful", {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                    handleNext();
                    setUserDetails({});
                  })
                  .catch((err) => {
                    toast.error("Some error occurred. Try later", {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                  });
              })
              .catch((err) => {
                toast.error("Some error occurred. Try later", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              });
          }
        })
        .catch((error) => {
          toast.error("Some error occurred. Try later", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    }
  };

  useEffect(() => {
    if (click) {
      setClick(false);
      submitBtn.current.click();
    }
  }, [click]);
  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <h1>Account Details</h1>
        <div className="formElement">
          <TextField
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            value={500}
            disabled={true}
            fullWidth
          />
        </div>
        <div className="formElement">
          <TextField
            id="outlined-basic"
            label="Account Number"
            variant="outlined"
            name="accountNumber"
            value={bankAccountDetails?.accountNumber || ""}
            onChange={handleChange}
            helperText={accountNumberHelperTxt}
            error={accountNumberHelperTxt.length}
            required={true}
            fullWidth
          />
        </div>
        <div className="formElement">
          <TextField
            id="outlined-basic"
            label="IFSC Code"
            variant="outlined"
            name="ifscCode"
            value={bankAccountDetails?.ifscCode || ""}
            onChange={handleChange}
            helperText={ifscCodeHelperTxt}
            error={ifscCodeHelperTxt.length}
            fullWidth
          />
        </div>
        <div className="formElement">
          <TextField
            id="outlined-basic"
            label="Account Holder Name"
            variant="outlined"
            name="accountHolderName"
            value={bankAccountDetails?.accountHolderName || ""}
            onChange={handleChange}
            required={true}
            fullWidth
          />
        </div>

        <Button type="submit" ref={submitBtn}></Button>
      </form>
    </div>
  );
}
