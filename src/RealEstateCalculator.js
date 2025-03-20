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
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Real Estate Investment Calculator</h2>
      <div style={{ display: "grid", gap: "10px" }}>
        {[
          { key: "propertyPrice", label: "Property Price ($)" },
          { key: "downPayment", label: "Down Payment (%)" },
          { key: "loanRate", label: "Loan Interest Rate (%)" },
          { key: "loanTerm", label: "Loan Term (Years)" },
          { key: "rent", label: "Monthly Rental Income ($)" },
          { key: "propertyTax", label: "Property Tax (Annual, $)" },
          { key: "insurance", label: "Insurance (Annual, $)" },
          { key: "maintenance", label: "Maintenance (% of Annual Rent)" },
          { key: "vacancyRate", label: "Vacancy Rate (%)" },
          { key: "hoaFees", label: "HOA Fees (Annual, $)" },
          { key: "managementFee", label: "Management Fee (%)" },
          { key: "utilities", label: "Utilities (Annual, $)" },
        ].map(({ key, label }) => (
          <div key={key}>
            <label>{label}</label>
            <input
              type="number"
              name={key}
              value={inputs[key]}
              onChange={handleChange}
              placeholder={label}
              style={{ width: "100%", padding: "5px", marginBottom: "5px" }}
            />
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}>
        <p><strong>Net Operating Income (NOI):</strong> ${noi.toFixed(2)}</p>
        <p><strong>Capitalization Rate (Cap Rate):</strong> {capRate.toFixed(2)}%</p>
        <p><strong>Cash Flow:</strong> ${cashFlow.toFixed(2)}</p>
      </div>
    </div>
  );
}
