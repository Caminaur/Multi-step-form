import clsx from "clsx";
import React from "react";

function Section4(props) {
  const { activeStep, formData, calculateTotal } = props;

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
            }${formData.paymentPlan === "monthly" ? "/mo" : "0/yr"}`}
          </p>
        </div>
        <div className="h-0.5 w-full bg-neutral-light-gray my-4"></div>
        {formData.addons.map((addon, index) => {
          return addon.selected ? (
            <AddOn key={index} name={addon.label} price={addon.price}></AddOn>
          ) : (
            ""
          );
        })}
      </div>
      <div className="flex justify-between p-4">
        <p className="text-base text-neutral-cool-gray pr-8 md:pr-0">
          Total (per {formData.paymentPlan === "yearly" ? "year" : "month"})
        </p>
        <p className="text-primary-purplish-blue font-semibold text-lg">
          {calculateTotal()}
        </p>
      </div>
    </div>
  );
}

export default Section4;
