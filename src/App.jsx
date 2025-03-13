import { useState, useEffect } from "react";
import bgMobile from "./assets/bg-sidebar-mobile.svg";
import bgDesktop from "./assets/bg-sidebar-desktop.svg";
import advanceIcon from "./assets/icon-advanced.svg";
import checkMarkIcon from "./assets/icon-checkmark.svg";
import arcadeIcon from "./assets/icon-arcade.svg";
import proIcon from "./assets/icon-pro.svg";
import clsx from "clsx";

function App() {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    selectedPlan: "",
    paymentPlan: "monthly",
    online_service: false,
    larger_storage: false,
    customizable_profile: false,
  });
  const steps = [
    {
      id: 1,
      name: "Your Info",
    },
    {
      id: 2,
      name: "Select Plan",
    },
    {
      id: 3,
      name: "Add-ons",
    },
    {
      id: 4,
      name: "Summary",
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    console.log(formData);
  }, [formData]);

  function handleSelectPaymentPlan() {
    const newPlan = formData.paymentPlan === "monthly" ? "yearly" : "monthly";
    setFormData({ ...formData, paymentPlan: newPlan });
  }

  function handleSelectPlan(id) {
    setFormData({ ...formData, selectedPlan: id });
  }
  function handleSelectAddOns(id) {
    setFormData({ ...formData, [id]: !formData[id] });
  }

  const PlanSelector = ({
    inputId,
    inputName,
    inputPriceMonthly,
    freeMonths,
    icon,
  }) => {
    return (
      <label
        className={clsx(
          "category-selector focus-within:bg-neutral-magnolia   focus-within:border-primary-purplish-blue",
          formData.selectedPlan === inputId
            ? "border-primary-purplish-blue bg-neutral-magnolia "
            : ""
        )}
        for={inputId}
      >
        <input
          type="radio"
          className="opacity-0 absolute pointer-events-none"
          name="plan"
          id={inputId}
          onChange={() => handleSelectPlan(inputId)}
        />
        <img className="h-12 w-12" src={icon} alt="" />
        <div className="flex flex-col justify-center">
          <span className="text-primary-marine-blue font-bold">
            {inputName}
          </span>
          <span className="text-neutral-cool-gray font-medium text-[14px]">
            {inputPriceMonthly}
          </span>
          {freeMonths ? (
            <span className="text-primary-marine-blue text-xs">
              2 months free
            </span>
          ) : (
            ""
          )}
        </div>
      </label>
    );
  };

  const ServiceSelector = ({ name, description, price, inputName }) => {
    const calculatedPrice =
      formData.paymentPlan === "yearly" ? `${price}0` : price;
    return (
      <label
        className={clsx(
          "flex items-center justify-between border-neutral-light-gray border-1 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:border-primary-purplish-blue md:py-4 md:px-6",
          formData[inputName]
            ? "border-primary-purplish-blue bg-neutral-magnolia"
            : ""
        )}
      >
        <div className="flex items-center justify-center gap-4">
          <input
            type="checkbox"
            className="opacity-0 absolute pointer-events-none peer"
            name={inputName}
            id={inputName}
            onChange={() => handleSelectAddOns(inputName)}
          />
          <div
            className={clsx(
              "w-6 h-6 border-1 border-neutral-light-gray rounded-sm transition-all duration-300 peer-checked:bg-primary-purplish-blue flex justify-center items-center",
              formData[inputName] ? "bg-primary-purplish-blue" : ""
            )}
          >
            <img className="w-4 h-4" src={checkMarkIcon} alt="" />
          </div>
          <div className="flex flex-col">
            <p className="text-primary-marine-blue text-base font-bold">
              {name}
            </p>
            <p className="text-neutral-cool-gray text-sm font-medium">
              {description}
            </p>
          </div>
        </div>
        <p className="price text-primary-purplish-blue">{`+$${calculatedPrice}/mo`}</p>
      </label>
    );
  };
  return (
    <div className="h-dvh w-dvw bg-neutral-magnolia md:flex md:items-center">
      <div className="bg-neutral-gray h-full flex flex-col justify-between absolute left-0 right-0 top-0 bottom-0">
        <img
          className="w-full h-auto bg-cover bg-no-repeat z-0 md:hidden"
          src={bgMobile}
        />
      </div>
      <div className="z-9 relative h-full overflow-hidden w-full flex flex-col justify-between items-center md:justify-center md:items-center md:pb-0 md:max-h-150">
        <div className="w-full flex justify-center gap-4 py-12 md:hidden">
          {steps.map((step, index) => {
            return (
              <span
                key={index}
                onClick={() => handleSetStep(step.id)}
                className={clsx(
                  "steps",
                  step.id === activeStep ? "selected" : ""
                )}
              >
                {step.id}
              </span>
            );
          })}
        </div>
        <div className="h-full w-full flex justify-center max-w-220 md:h-full ">
          <form action="#" className="form">
            <div className="w-110 max-h-full relative max-md:hidden">
              <img
                src={bgDesktop}
                className="absolute z-2 w-full h-full object-cover rounded-lg"
                alt=""
              />
              <div
                className="
                w-full h-full p-8
                flex justify-baseline flex-col gap-8 
                z-30 relative"
              >
                {steps.map((step, index) => {
                  return (
                    <div
                      key={`desktop-${index}`}
                      className="step-selector"
                      onClick={() => handleSetStep(step.id)}
                    >
                      <span
                        key={index}
                        className={clsx(
                          "steps",
                          step.id === activeStep ? "selected" : ""
                        )}
                      >
                        {step.id}
                      </span>
                      <div className="flex flex-col text-neutral-white justify-center gap-1">
                        <span className="uppercase text-xs text-neutral-cool-gray leading-3">
                          Step {step.id}
                        </span>
                        <p className="font-semibold uppercase leading-3.5">
                          {step.name}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="content relative w-full flex flex-col px-2">
              <div className="w-full h-full relative">
                <div
                  className={clsx(
                    "form-section",
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
                <div
                  className={clsx(
                    "form-section",
                    activeStep === 2 ? "active" : "inactive"
                  )}
                >
                  <h2 className="section-title">Select your plan</h2>
                  <p className="description">
                    You have the option of monthly or yearly billing.
                  </p>

                  <div className="categories flex flex-col gap-4">
                    <div className="flex flex-col gap-4 md:flex-row">
                      <PlanSelector
                        inputName="Arcade"
                        inputId="arcade"
                        inputPriceMonthly={
                          formData.paymentPlan === "yearly" ? "$90/yr" : "$9/mo"
                        }
                        freeMonths={formData.paymentPlan === "yearly"}
                        icon={arcadeIcon}
                      />
                      <PlanSelector
                        inputName="Advanced"
                        inputId="advanced"
                        inputPriceMonthly={
                          formData.paymentPlan === "yearly"
                            ? "$120/yr"
                            : "$12/mo"
                        }
                        freeMonths={formData.paymentPlan === "yearly"}
                        icon={advanceIcon}
                      />
                      <PlanSelector
                        inputName="Pro"
                        inputId="pro"
                        inputPriceMonthly={
                          formData.paymentPlan === "yearly"
                            ? "$150/yr"
                            : "$15/mo"
                        }
                        freeMonths={formData.paymentPlan === "yearly"}
                        icon={proIcon}
                      />
                    </div>

                    <div className="flex p-2 w-full justify-center gap-6 bg-neutral-magnolia rounded-md ">
                      <p
                        className={clsx(
                          "font-medium transition-all duration-300",
                          formData.paymentPlan === "yearly"
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
                        className={clsx(
                          "w-14 bg-primary-marine-blue rounded-2xl relative after:w-4 after:h-4 after:bg-neutral-white after:rounded-full after:absolute after:left-1 after:top-1/2 after:-translate-y-1/2 after:transition-all after:duration-300 cursor-pointer",
                          formData.paymentPlan === "yearly"
                            ? "peer-checked:after:translate-x-[calc(100%+1rem)]"
                            : ""
                        )}
                        htmlFor="paryment-frequency"
                        onClick={handleSelectPaymentPlan}
                      ></label>
                      <p
                        className={clsx(
                          "font-medium transition-all duration-300",
                          formData.paymentPlan === "yearly"
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
                    "form-section",
                    activeStep === 3 ? "active" : "inactive"
                  )}
                >
                  <p className="section-title">Pick add-ons</p>
                  <p className="description">
                    Add-ons help enhance your gaming experience.
                  </p>
                  <div className="flex flex-col gap-4">
                    <ServiceSelector
                      name="Online Service"
                      description="Access to multiplayer games"
                      price="1"
                      inputName="online_service"
                    ></ServiceSelector>
                    <ServiceSelector
                      name="Larger storage"
                      description="Extra 1TB of cloud save"
                      price="2"
                      inputName="larger_storage"
                    ></ServiceSelector>
                    <ServiceSelector
                      name="Customizable profile"
                      description="Custom theme on your profile"
                      price="2"
                      inputName="customizable_profile"
                    ></ServiceSelector>
                  </div>
                </div>
                <div
                  className={clsx(
                    "form-section bg-indigo-900",
                    activeStep === 4 ? "active" : "inactive"
                  )}
                ></div>
              </div>
              <div className="bg-neutral-white p-4 hidden justify-between md:flex">
                <button
                  onClick={handlePreviusStep}
                  className="text-neutral-cool-gray font-semibold transition-all duration-300 hover:text-primary-marine-blue cursor-pointer"
                >
                  Go Back
                </button>
                <button
                  onClick={handleNextStep}
                  className="bg-primary-marine-blue text-neutral-alabaster py-3 px-5 rounded-md ml-auto hover:brightness-110 cursor-pointer "
                  type="button"
                >
                  Next Step
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="bg-neutral-white p-4 flex justify-between w-full md:hidden">
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
