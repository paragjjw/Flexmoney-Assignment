import React, { useState, useEffect, useRef } from "react";
import "./form.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-toastify";

export default function Form({
  click,
  setClick,
  handleNext,
  userDetails,
  setUserDetails,
}) {
  const submitBtn = useRef();
  const [helperTxt, setHelperTxt] = useState("");
  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name == "mobileNo") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userDetails.mobileNo.length < 10)
      setHelperTxt("Mobile number should be 10 digits long");
    else {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/user/fetch?mobileNo=${userDetails.mobileNo}`
        )
        .then((res) => {
          if (!res.data) {
            handleNext();
          } else {
            if (
              new Date().getMonth() ==
                new Date(res.data.dateOfPayment).getMonth() &&
              new Date().getFullYear() ==
                new Date(res.data.dateOfPayment).getFullYear()
            ) {
              toast.info(
                "You have already registered for the Yoga classes this month",
                {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                }
              );
            } else {
              handleNext();
            }
          }
        })
        .catch((error) => {
          toast.error("Some error occured. Try later", {
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
        <h1>Admission form for Yoga Classes</h1>
        <div className="formElement">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            name="username"
            value={userDetails?.username || ""}
            onChange={handleChange}
            required={true}
            fullWidth
          />
        </div>
        <div className="formElement">
          <TextField
            id="outlined-basic"
            label="Mobile Number"
            variant="outlined"
            name="mobileNo"
            value={userDetails?.mobileNo || ""}
            onChange={handleChange}
            required={true}
            helperText={helperTxt}
            error={helperTxt.length}
            fullWidth
          />
          {/* <FormHelperText */}
        </div>
        <div className="formElement">
          <Typography id="age" gutterBottom>
            Age
          </Typography>
          <Slider
            aria-labelledby="age"
            valueLabelDisplay="auto"
            defaultValue={18}
            step={1}
            marks
            min={18}
            max={65}
            marks={[
              { value: 18, label: "18" },
              { value: 65, label: "65" },
            ]}
            name="age"
            value={userDetails?.age || 18}
            onChange={handleChange}
          />
        </div>
        <div className="formElement">
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              <p className="radioGroupLabel">Gender</p>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="gender"
              value={userDetails?.gender || "male"}
              onChange={handleChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="formElement">
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              <p className="radioGroupLabel">Time Slot</p>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="slot"
              value={userDetails?.slot || "6-7AM"}
              onChange={handleChange}
            >
              <FormControlLabel
                value="6-7AM"
                control={<Radio />}
                label="6-7AM"
              />
              <FormControlLabel
                value="7-8AM"
                control={<Radio />}
                label="7-8AM"
              />
              <FormControlLabel
                value="8-9AM"
                control={<Radio />}
                label="8-9AM"
              />
              <FormControlLabel
                value="5-6PM"
                control={<Radio />}
                label="5-6PM"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <Button type="submit" ref={submitBtn}></Button>
      </form>
    </div>
  );
}
