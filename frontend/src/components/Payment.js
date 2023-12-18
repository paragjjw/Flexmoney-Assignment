import React, { useEffect } from "react";
import { toast } from "react-toastify";
import "./payment.css";
import axios from "axios";
export default function Payment({
  click,
  setClick,
  handleNext,
  userDetails,
  setUserDetails,
}) {
  // console.log(userDetails);
  const bankAccountDetails = {
    accountNumber: "8957573537443",
    accountHolderName: userDetails.username,
  };
  useEffect(() => {
    if (click) {
      setClick(false);
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
  }, [click]);
  return (
    <div>
      <h3>
        <b>Account Details</b>
      </h3>
      <div>
        <p>Amount:Rs.500</p>
      </div>
      <div>
        <p>Account Number:{bankAccountDetails.accountNumber}</p>
      </div>
      <div>
        <p>Account Holder Name:{bankAccountDetails.accountHolderName}</p>
      </div>
    </div>
  );
}
