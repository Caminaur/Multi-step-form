import clsx from "clsx";
import React from "react";

function Section2(props) {
  const { activeStep, formData, handleSelectPaymentPlan, handleSelectPlan } =
    props;
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
  return (
    <div
      className={clsx("form-section", activeStep === 2 ? "active" : "inactive")}
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
  );
}

export default Section2;
