import React from "react";
import checkMarkIcon from "../assets/icon-checkmark.svg";
import clsx from "clsx";

function Section3(props) {
  const { activeStep, formData, handleSelectAddOns } = props;

  const ServiceSelector = ({
    name,
    description,
    price,
    inputName,
    selected,
  }) => {
    const calculatedPrice =
      formData.paymentPlan === "yearly" ? `${price}0` : price;
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

  return (
    <div
      className={clsx("form-section", activeStep === 3 ? "active" : "inactive")}
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
  );
}

export default Section3;
