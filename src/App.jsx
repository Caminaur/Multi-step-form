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
    selectedPlan: "arcade",
    paymentPlan: "monthly",
    plans: [
      {
        id: "arcade",
        price: 9,
        icon: arcadeIcon,
        label: "Arcade",
      },
      {
        id: "advance",
        price: 12,
        icon: advanceIcon,
        label: "Advance",
      },
      {
        id: "pro",
        price: 15,
        icon: proIcon,
        label: "Pro",
      },
    ],
    addons: [
      {
        id: "online_service",
        label: "Online Service",
        description: "Access to multiplayer games",
        price: 1,
        selected: false,
      },
      {
        id: "larger_storage",
        label: "Larger Storage",
        description: "Extra 1TB of cloud save",
        price: 2,
        selected: false,
      },
      {
        id: "customizable_profile",
        label: "Customizable Profile",
        description: "Custom theme on your profile",
        price: 2,
        selected: false,
      },
    ],
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

  function calculateTotal() {
    const selectedPlan = formData.plans.filter(
      (plan) => plan.id === formData.selectedPlan
    )[0];
    const price = selectedPlan.price;
    const paymentPlan = formData.paymentPlan;
    const selectedAddons = formData.addons.filter((addon) => addon.selected);
    const frecuencyLabel = paymentPlan === "monthly" ? "mo" : "yr";

    let total = 0;
    if (paymentPlan === "monthly") {
      for (const addon of selectedAddons) {
        total += parseInt(addon.price);
      }
      total += price;
    } else {
      for (const addon of selectedAddons) {
        total += parseInt(`${addon.price}0`);
      }
      total += parseInt(`${price}0`);
    }
    return `+$${total}/${frecuencyLabel}`;
  }

  function handleNextStep() {
    setActiveStep((s) => s + 1);
  }
  function handlePreviusStep(e) {
    e.preventDefault();
    setActiveStep((s) => s - 1);
  }

  function handleSetStep(step) {
    setActiveStep(step);
  }

  useEffect(() => {
    // console.log(formData);
  }, [activeStep]);

  function handleSelectPaymentPlan() {
    const newPlan = formData.paymentPlan === "monthly" ? "yearly" : "monthly";
    setFormData({ ...formData, paymentPlan: newPlan });
  }

  function handleSelectPlan(id) {
    setFormData({ ...formData, selectedPlan: id });
  }
  function handleSelectAddOns(id) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      addons: prevFormData.addons.map((addon) => {
        return addon.id === id
          ? { ...addon, selected: !addon.selected }
          : addon;
      }),
    }));
  }

  const PlanSelector = ({
    inputId,
    inputName,
    inputPrice,
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
            {inputPrice}
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

  const ServiceSelector = ({
    name,
    description,
    price,
    inputName,
    selected,
  }) => {
    const calculatedPrice =
      formData.paymentPlan === "yearly" ? `${price}0` : price;
    console.log(calculatedPrice);

    return (
      <label
        className={clsx(
          "flex items-center justify-between border-neutral-light-gray border-1 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:border-primary-purplish-blue md:py-4 md:px-6",
          selected ? "border-primary-purplish-blue bg-neutral-magnolia" : ""
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
              selected ? "bg-primary-purplish-blue" : ""
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
  const AddOn = ({ name, price }) => {
    const calculatedPrice =
      formData.paymentPlan === "yearly" ? `+$${price}0/yr` : `+$${price}/mo`;
    return (
      <div className="flex justify-between">
        <p className="description">{name}</p>
        <p className="text-primary-marine-blue font-semibold">
          {calculatedPrice}
        </p>
      </div>
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
                      {formData.plans.map((plan, index) => {
                        return (
                          <PlanSelector
                            key={index}
                            inputName={plan.label}
                            inputId={plan.id}
                            inputPrice={
                              formData.paymentPlan === "yearly"
                                ? `$${plan.price}0/yr`
                                : `$${plan.price}/mo`
                            }
                            freeMonths={formData.paymentPlan === "yearly"}
                            icon={plan.icon}
                          />
                        );
                      })}
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
                    {formData.addons.map((addon, id) => {
                      return (
                        <ServiceSelector
                          key={id}
                          name={addon.label}
                          description={addon.description}
                          price={addon.price}
                          inputName={addon.id}
                          selected={addon.selected}
                        ></ServiceSelector>
                      );
                    })}
                  </div>
                </div>
                <div
                  className={clsx(
                    "form-section bg-indigo-900",
                    activeStep === 4 ? "active" : "inactive"
                  )}
                >
                  <p className="section-title">Finishing up</p>
                  <p className="description">
                    Double-check everything looks OK before confirming.
                  </p>
                  <div className="flex flex-col bg-neutral-magnolia p-4 rounded-lg">
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <p className="text-primary-marine-blue font-semibold capitalize">
                          {formData.selectedPlan} ({formData.paymentPlan})
                        </p>
                        <p className="text-base text-neutral-cool-gray pr-8 md:pr-0 underline">
                          Change
                        </p>
                      </div>
                      <p className="text-primary-marine-blue font-semibold">
                        {`$${
                          formData.plans.filter(
                            (plan) => plan.id === formData.selectedPlan
                          )[0].price
                        }${
                          formData.paymentPlan === "monthly" ? "/mo" : "0/yr"
                        }`}
                      </p>
                    </div>
                    <div className="h-0.5 w-full bg-neutral-light-gray my-4"></div>
                    {formData.addons.map((addon, index) => {
                      return addon.selected ? (
                        <AddOn
                          key={index}
                          name={addon.label}
                          price={addon.price}
                        ></AddOn>
                      ) : (
                        ""
                      );
                    })}
                  </div>
                  <div className="flex justify-between p-4">
                    <p className="text-base text-neutral-cool-gray pr-8 md:pr-0">
                      Total (per{" "}
                      {formData.paymentPlan === "yearly" ? "year" : "month"})
                    </p>
                    <p className="text-primary-purplish-blue font-semibold text-lg">
                      {calculateTotal()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-neutral-white p-4 hidden justify-between md:flex">
                {activeStep === 1 ? (
                  ""
                ) : (
                  <button
                    onClick={handlePreviusStep}
                    className="text-neutral-cool-gray font-semibold transition-all duration-300 hover:text-primary-marine-blue cursor-pointer"
                  >
                    Go Back
                  </button>
                )}
                {activeStep === 4 ? (
                  <button
                    onClick={handleNextStep}
                    className="bg-primary-marine-blue text-neutral-alabaster py-3 px-5 rounded-md ml-auto hover:brightness-110 cursor-pointer "
                    type="button"
                  >
                    Finish Form
                  </button>
                ) : (
                  <button
                    onClick={handleNextStep}
                    className="bg-primary-marine-blue text-neutral-alabaster py-3 px-5 rounded-md ml-auto hover:brightness-110 cursor-pointer "
                    type="button"
                  >
                    Next Step
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="bg-neutral-white p-4 flex justify-between w-full md:hidden">
          {activeStep === 1 ? (
            ""
          ) : (
            <button
              onClick={(e) => handlePreviusStep(e)}
              className="text-neutral-cool-gray font-semibold hover:text-primary-marine-blue"
            >
              Go Back
            </button>
          )}
          {activeStep === 4 ? (
            <button
              onClick={handleNextStep}
              className="bg-primary-marine-blue text-neutral-alabaster py-3 px-5 rounded-md ml-auto"
              type="button"
            >
              Finish Form
            </button>
          ) : (
            <button
              onClick={handleNextStep}
              className="bg-primary-marine-blue text-neutral-alabaster py-3 px-5 rounded-md ml-auto"
              type="button"
            >
              Next Step
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
