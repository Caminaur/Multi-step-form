import { useState, useEffect } from "react";
import bgMobile from "./assets/bg-sidebar-mobile.svg";
import advanceIcon from "./assets/icon-advanced.svg";
import arcadeIcon from "./assets/icon-arcade.svg";
import proIcon from "./assets/icon-pro.svg";
import clsx from "clsx";

function App() {
  const [activeStep, setActiveStep] = useState(2);
  const [steps, setSteps] = useState([1, 2, 3, 4]);
  const [switchState, setSwitchState] = useState(false);

  function handleNextStep() {
    setActiveStep((s) => s + 1);
  }
  function handlePreviusStep() {
    setActiveStep((s) => s - 1);
  }

  function handleSetStep(step) {
    setActiveStep(step);
  }

  useEffect(() => {
    // console.log(activeStep);
  }, [activeStep]);

  function switchSchalten() {
    setSwitchState((v) => !v);
  }

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
      </div>
      <div className="z-9 relative h-full w-full overflow-hidde flex flex-col overflow-hidden justify-between">
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
        <form action="#" className="relative h-full m-4">
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

              <div className="flex p-2 w-full justify-center gap-6 bg-neutral-magnolia rounded-md ">
                <p
                  className={clsx(
                    "font-medium transition-all duration-300",
                    switchState
                      ? "text-neutral-cool-gray"
                      : "text-primary-marine-blue"
                  )}
                >
                  Monthly
                </p>
                <input
                  type="radio"
                  name="payment-frequency"
                  id="paryment-frequency"
                  className="absolute hidden peer"
                />
                <label
                  // className=
                  className={clsx(
                    "w-14 bg-primary-marine-blue rounded-2xl relative after:w-4 after:h-4 after:bg-neutral-white after:rounded-full after:absolute after:left-1 after:top-1/2 after:-translate-y-1/2 after:transition-all after:duration-300 cursor-pointer",
                    switchState
                      ? "peer-checked:after:translate-x-[calc(100%+1rem)]"
                      : ""
                  )}
                  htmlFor="paryment-frequency"
                  onClick={switchSchalten}
                ></label>
                <p
                  className={clsx(
                    "font-medium transition-all duration-300",
                    switchState
                      ? "text-primary-marine-blue"
                      : "text-neutral-cool-gray"
                  )}
                >
                  Yearly
                </p>
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
        <div className="bg-neutral-white p-4 flex justify-between">
          <button
            onClick={handlePreviusStep}
            className="text-neutral-cool-gray font-semibold hover:text-primary-marine-blue"
          >
            Go Back
          </button>
          <button
            onClick={handleNextStep}
            className="bg-primary-marine-blue text-neutral-alabaster py-3 px-5 rounded-md ml-auto"
            type="button"
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
