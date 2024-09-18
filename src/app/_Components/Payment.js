"use client";
import { appBaseUrl } from '@/schema/appurl';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validateCardNumber = (number) => /^[0-9]{16}$/.test(number.replace(/\s+/g, ''));
const validateExpirationMonth = (month) => /^[0-9]{2}$/.test(month) && month >= 1 && month <= 12;
const validateExpirationYear = (year) => /^[0-9]{2}$/.test(year) && (parseInt(year) >= new Date().getFullYear() % 100);
const validateCvv = (cvv) => /^[0-9]{3,4}$/.test(cvv);

export default function PaymentComponent({ info}) {
 
  const [cardNumber, setCardNumber] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [errors, setErrors] = useState({});
  const [UserId, setUserId] = useState()
  const [loader, setloader] = useState(false)

  useEffect(() => {
    const jwtVerify = async () => {
        try {
            const responseVerify = await fetch(`${appBaseUrl}/api/tokengetter`, {
                method: "POST",
            });
            const data = await responseVerify.json();

            if (data.success==true) {
                setUserId(data.verifytoken.userid);
            }
        } catch (error) {
            console.error("Error verifying token:", error);
        }
    };

    jwtVerify();
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    const errors = {};
    if (!validateCardNumber(cardNumber)) errors.cardNumber = 'Invalid card number';
    if (!validateExpirationMonth(expirationMonth)) errors.expirationMonth = 'Invalid month';
    if (!validateExpirationYear(expirationYear)) errors.expirationYear = 'Invalid year';
    if (!validateCvv(cvv)) errors.cvv = 'Invalid CVV';
    if (!cardholderName) errors.cardholderName = 'Cardholder name is required';

   

  
    
    // Reset form fields
    setCardNumber('');
    setExpirationMonth('');
    setExpirationYear('');
    setCvv('');
    setCardholderName('');
    setErrors({});
    };

  const enrolled = async (courseId, price, teacherId) => {
    // console.log("teacherid",teacherId)
    if (Object.keys(errors).length <= 0 && cardNumber!="" && expirationMonth!="" && expirationYear!="" && cvv!="" && cardholderName!="") {
      setloader(true)
      const paymentProcess = await fetch(`${appBaseUrl}/api/payment`, {
        method: "Post",
        body:JSON.stringify({courseid:courseId,teacherid:teacherId,userid:UserId,price:price})
      })
      const paymenRes = await paymentProcess.json()
      if (paymenRes.success == true) {
        setloader(false)
        toast.success("payment successfull", {
          position:"top-center",
        });
        
        window.location.replace(window.location.href);
        console.log(paymenRes.message)
      } else {
        setloader(false)
       
      
        alert(paymenRes.message)
      }
    } else {
      alert("please fill info correctly")
    }
    
  }

  return (
    <div className=" fixed w-full left-4 flex justify-center items-center gap-8 top-12">
          <div className="bg-white relative shadow-lg w-[500px] rounded-lg p-8">
    

        <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
        <p className="mb-6 text-gray-600">Enter your payment information below.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-sm font-medium mb-2">Card Number</label>
            <input
              id="cardNumber"
              type="text"
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className={`w-full p-3 border rounded-md ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="expiration-month" className="block text-sm font-medium mb-2">Expiration Date</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  id="expiration-month"
                  type="text"
                  placeholder="MM"
                  value={expirationMonth}
                  onChange={(e) => setExpirationMonth(e.target.value)}
                  className={`w-full p-3 border rounded-md ${errors.expirationMonth ? 'border-red-500' : 'border-gray-300'}`}
                />
                <input
                  id="expiration-year"
                  type="text"
                  placeholder="YY"
                  value={expirationYear}
                  onChange={(e) => setExpirationYear(e.target.value)}
                  className={`w-full p-3 border rounded-md ${errors.expirationYear ? 'border-red-500' : 'border-gray-300'}`}
                />
              </div>
              {errors.expirationMonth && <p className="text-red-500 text-xs mt-1">{errors.expirationMonth}</p>}
              {errors.expirationYear && <p className="text-red-500 text-xs mt-1">{errors.expirationYear}</p>}
            </div>
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium mb-2">CVV</label>
              <input
                id="cvv"
                type="text"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className={`w-full p-3 border rounded-md ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="cardholderName" className="block text-sm font-medium mb-2">Cardholder Name</label>
            <input
              id="cardholderName"
              type="text"
              placeholder="John Doe"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              className={`w-full p-3 border rounded-md ${errors.cardholderName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.cardholderName && <p className="text-red-500 text-xs mt-1">{errors.cardholderName}</p>}
          </div>
          <button onClick={() => { enrolled(info.courseId, info.price, info.userId) }} type="submit" className={`w-full py-3 ${loader=="beta"?"bg-[#2cce2c]":"bg-[#19dd19]"} bg-[#19dd19] text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}>{loader == false ? "Pay" :
<div role="status" className='w-full flex justify-center items-center'>
<svg aria-hidden="true" class="w-4 h-4 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
            </div>
            
          }</button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
}
