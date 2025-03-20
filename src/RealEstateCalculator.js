import React, { useState } from "react";

export default function RealEstateCalculator() {
  const [inputs, setInputs] = useState({
    propertyPrice: "",
    downPayment: "",
    loanRate: "",
    loanTerm: "",
    rent: "",
    propertyTax: "",
    insurance: "",
    maintenance: "",
    vacancyRate: "",
    hoaFees: "",
    managementFee: "",
    utilities: "",
  });

  const handleChange = (e) => {
    const value = e.target.value === '' ? '' : parseFloat(e.target.value);
    setInputs({ ...inputs, [e.target.name]: value });
  };

  const calculateResults = () => {
    const {
      propertyPrice,
      downPayment,
      loanRate,
      loanTerm,
      rent,
      propertyTax,
      insurance,
      maintenance,
      vacancyRate,
      hoaFees,
      managementFee,
      utilities,
    } = inputs;

    const downPaymentAmount = propertyPrice * (downPayment / 100);
    const loanAmount = propertyPrice - downPaymentAmount;
    const monthlyInterestRate = (loanRate / 100) / 12;
    const numPayments = loanTerm * 12;
    const monthlyMortgage = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numPayments)) / (Math.pow(1 + monthlyInterestRate, numPayments) - 1);
    const annualDebtService = monthlyMortgage * 12;

    const annualRent = rent * 12;
    const annualVacancyLoss = annualRent * (vacancyRate / 100);
    const annualMaintenance = annualRent * (maintenance / 100);
    const annualManagement = annualRent * (managementFee / 100);

    const operatingExpenses = parseFloat(propertyTax) + parseFloat(insurance) + parseFloat(hoaFees) + parseFloat(utilities) + annualMaintenance + annualManagement + annualVacancyLoss;
    const noi = annualRent - operatingExpenses;
    const capRate = (noi / propertyPrice) * 100;
    const cashFlow = noi - annualDebtService;

    return { noi, capRate, cashFlow };
  };

  const { noi, capRate, cashFlow } = calculateResults();

  return (
    <div>
      <h2>Real Estate Investment Calculator</h2>
      <div>
        {Object.keys(inputs).map((key) => (
          <div key={key}>
            <label>{key.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="number"
              name={key}
              value={inputs[key]}
              onChange={handleChange}
              placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1')}`}
            />
          </div>
        ))}
      </div>
      <div>
        <p>Net Operating Income (NOI): ${noi.toFixed(2)}</p>
        <p>Cap Rate: {capRate.toFixed(2)}%</p>
        <p>Cash Flow: ${cashFlow.toFixed(2)}</p>
      </div>
    </div>
  );
}
