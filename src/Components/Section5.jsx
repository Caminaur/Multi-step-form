import clsx from "clsx";
import React from "react";
import iconThankYou from "../assets/icon-thank-you.svg";
function Section5(props) {
  const { activeStep } = props;
  return (
    <div
      className={clsx(
        "form-section-5",
        activeStep === 5 ? "active" : "inactive"
      )}
    >
      <img className="w-16 self-center" src={iconThankYou} alt="" />
      <p className="section-title text-center">Thank you!</p>
      <p className="description text-center">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </div>
  );
}

export default Section5;
