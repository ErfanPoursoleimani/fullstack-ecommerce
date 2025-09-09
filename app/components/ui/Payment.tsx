/* import { useState } from 'react';

export default function PaymentForm() {
  const [loading, setLoading] = useState(false);
  
  const handlePayment = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    const paymentData = {
      amount: formData.get('amount'),
      description: formData.get('description'),
      email: formData.get('email')
    };
    
    try {
      const response = await fetch('/api/payment/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handlePayment}>
      <input name="amount" type="number" placeholder="Amount (Toman)" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="description" placeholder="Payment description" required />
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
} */