import { useState, useEffect } from "react";
import bgMobile from "./assets/bg-sidebar-mobile.svg";
import bgDesktop from "./assets/bg-sidebar-desktop.svg";
import advanceIcon from "./assets/icon-advanced.svg";
import arcadeIcon from "./assets/icon-arcade.svg";
import proIcon from "./assets/icon-pro.svg";
import clsx from "clsx";
import Section1 from "./Components/Section1";
import Section2 from "./Components/Section2";
import Section3 from "./Components/Section3";
import Section4 from "./Components/Section4";
import Section5 from "./Components/Section5";

function App() {
  const [activeStep, setActiveStep] = useState(1);
  const [formErrors, setFormErrors] = useState([]);
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
  useEffect(() => {
    console.log(formErrors);
  }, [formErrors]);

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
    if (!validateCurrentStep()) return;
    setActiveStep((s) => s + 1);
  }
  function handlePreviusStep(e) {
    e.preventDefault();
    setActiveStep((s) => s - 1);
  }

  function handleSetStep(step) {
    if (activeStep > 4) return;
    setActiveStep(step);
  }

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

  function validateCurrentStep() {
    const errors = {};

    if (activeStep === 1) {
      if (!formData.name.trim()) errors.name = "Name is required";
      if (!formData.email.trim()) errors.email = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(formData.email))
        errors.email = "Invalid email format";
      if (!formData.phone.trim()) errors.phone = "Phone number is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

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
                  step.id === activeStep || (step.id === 4 && activeStep > 4)
                    ? "selected"
                    : ""
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
                          step.id === activeStep ||
                            (step.id === 4 && activeStep > 4)
                            ? "selected"
                            : ""
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
                <Section1
                  handleChange={handleChange}
                  activeStep={activeStep}
                  errors={formErrors}
                />
                <Section2
                  activeStep={activeStep}
                  formData={formData}
                  handleSelectPaymentPlan={handleSelectPaymentPlan}
                  handleSelectPlan={handleSelectPlan}
                />

                <Section3
                  activeStep={activeStep}
                  formData={formData}
                  handleSelectAddOns={handleSelectAddOns}
                />
                <Section4
                  activeStep={activeStep}
                  formData={formData}
                  calculateTotal={calculateTotal}
                  handleSetStep={handleSetStep}
                />
                <Section5 activeStep={activeStep} formData={formData} />
              </div>

              {activeStep === 5 ? (
                ""
              ) : (
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

                  {activeStep !== 5 &&
                    (activeStep === 4 ? (
                      <button
                        onClick={handleNextStep}
                        className="bg-primary-marine-blue text-neutral-alabaster py-3 px-5 rounded-md ml-auto hover:brightness-110 cursor-pointer"
                        type="button"
                      >
                        Finish Form
                      </button>
                    ) : (
                      <button
                        onClick={handleNextStep}
                        className="bg-primary-marine-blue text-neutral-alabaster py-3 px-5 rounded-md ml-auto hover:brightness-110 cursor-pointer"
                        type="button"
                      >
                        Next Step
                      </button>
                    ))}
                </div>
              )}
            </div>
          </form>
        </div>
        {activeStep === 5 ? (
          ""
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default App;
