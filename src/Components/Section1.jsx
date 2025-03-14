import clsx from "clsx";
import React from "react";

function Section1(props) {
  const { handleChange, activeStep } = props;

  return (
    <div
      className={clsx("form-section", activeStep === 1 ? "active" : "inactive")}
    >
      <h2 className="section-title">Personal info</h2>
      <p className="description">
        Please provide your name, email address, and phone number.
      </p>

      <div className="flex flex-col gap-1 w-full">
        <label className="label" htmlFor="name">
          Name
        </label>
        <input
          className="input"
          type="text"
          name="name"
          id="name"
          placeholder="z.B. Stephen King"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="label" htmlFor="email">
          Email Address
        </label>
        <input
          className="input"
          type="text"
          name="email"
          id="email"
          placeholder="z.B. stephenking@lorem.com"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="label" htmlFor="phone">
          Phone Number
        </label>
        <input
          className="input"
          type="number"
          name="phone"
          id="phone"
          placeholder="z.B. +1 234 567 890"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default Section1;
