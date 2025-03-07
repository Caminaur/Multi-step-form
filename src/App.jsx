import { useState, useEffect } from "react";
import bgMobile from "./assets/bg-sidebar-mobile.svg";
import advanceIcon from "./assets/icon-advanced.svg";
import arcadeIcon from "./assets/icon-arcade.svg";
import proIcon from "./assets/icon-pro.svg";
import clsx from "clsx";

function App() {
  const [activeStep, setActiveStep] = useState(2);
  const [steps, setSteps] = useState([1, 2, 3, 4]);

  function handleNextStep() {
    setActiveStep((s) => s + 1);
  }

  function handleSetStep(step) {
    setActiveStep(step);
  }

  useEffect(() => {
    // console.log(activeStep);
  }, [activeStep]);

  const PlanSelector = ({
    inputId,
    inputName,
    inputPriceMonthly,
    inputPriceYearly,
    icon,
  }) => {
    return (
      <label className="category-selector" for={inputId}>
        <input
          type="radio"
          className="opacity-0 absolute pointer-events-none"
          name="plan"
          id={inputId}
        />
        <img className="h-12 w-12" src={icon} alt="" />
        <div className="flex flex-col justify-center">
          <span className="text-primary-marine-blue font-bold">
            {inputName}
          </span>
          <span className="text-neutral-cool-gray font-semibold text-[14px]">
            {inputPriceMonthly}
          </span>
        </div>
      </label>
    );
  };
  return (
    <div className="h-dvh w-dvw bg-neutral-magnolia">
      <div className="bg-neutral-gray h-full flex flex-col justify-between absolute left-0 right-0 top-0 bottom-0">
        <img
          className="w-full h-auto bg-cover bg-no-repeat z-0"
          src={bgMobile}
        />
        <div className="bg-neutral-white p-4 flex justify-end">
          <button
            onClick={handleNextStep}
            className="bg-primary-marine-blue text-neutral-alabaster py-3 px-5 rounded-md "
            type="button"
          >
            Next Step
          </button>
        </div>
      </div>
      <div className="z-9 relative p-4 h-full w-full overflow-hidden">
        <div className="w-full flex justify-center gap-4 py-12">
          {steps.map((step, index) => {
            return (
              <span
                key={index}
                onClick={() => handleSetStep(step)}
                className={clsx("steps", step === activeStep ? "selected" : "")}
              >
                {step}
              </span>
            );
          })}
        </div>
        <form action="#" className="relative h-full">
          <div
            className={clsx(
              "form-section bg-neutral-white",
              activeStep === 1 ? "active" : "inactive"
            )}
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
              />
            </div>
          </div>
          <div
            className={clsx(
              "form-section bg-neutral-white",
              activeStep === 2 ? "active" : "inactive"
            )}
          >
            <h2 className="section-title">Select your plan</h2>
            <p className="description">
              You have the option of monthly or yearly billing.
            </p>

            <div className="categories flex flex-col gap-4">
              <PlanSelector
                inputName="Arcade"
                inputId="arcade"
                inputPriceMonthly="$9/mo"
                icon={arcadeIcon}
              />
              <PlanSelector
                inputName="Advanced"
                inputId="advanced"
                inputPriceMonthly="$12/mo"
                icon={advanceIcon}
              />
              <PlanSelector
                inputName="Pro"
                inputId="pro"
                inputPriceMonthly="$15/mo"
                icon={proIcon}
              />

              <div>
                <p>Monthly</p>
                <input type="radio" name="payment-" id="" />
                <p>Yearly</p>
              </div>
            </div>
          </div>

          <div
            className={clsx(
              "form-section bg-emerald-800",
              activeStep === 3 ? "active" : "inactive"
            )}
          ></div>
          <div
            className={clsx(
              "form-section bg-indigo-900",
              activeStep === 4 ? "active" : "inactive"
            )}
          ></div>
        </form>
      </div>
    </div>
  );
}

export default App;
