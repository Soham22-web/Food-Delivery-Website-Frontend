import React, { useEffect, useContext } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { url, token } = useContext(StoreContext);

  useEffect(() => {
    const orderId = searchParams.get("orderId");

    const markPaymentTrue = async () => {
      try {
        await axios.post(
          url + "/api/order/verify",
          { orderId },
          { headers: { token } }
        );
      } catch (error) {
        console.log("Verify Error:", error);
      } finally {
        navigate("/myorders");
      }
    };

    if (orderId) {
      markPaymentTrue();
    } else {
      navigate("/myorders");
    }
  }, [searchParams, url, token, navigate]);

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
