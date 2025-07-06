import React, { useState } from 'react';
import {
  RecaptchaVerifier,
  GoogleAuthProvider,
  signInWithPhoneNumber,
  signInWithPopup,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_ROLE } from '../graphql/queries';
import { auth } from '../firebase';
import useAuthStore from '../store/useAuthStore';
import '../styles/modal.css';

export default function LoginModal({ onClose }) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [roleTab, setRoleTab] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setRole } = useAuthStore();

  const [fetchRole] = useLazyQuery(GET_USER_ROLE);

  const sendOTP = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha',
        { size: 'invisible', callback: () => console.log('reCAPTCHA verified') },
        auth
      );
    }

    signInWithPhoneNumber(auth, `+91${phone}`, window.recaptchaVerifier)
      .then(confirm => {
        window.confirmationResult = confirm;
        setIsOtpSent(true);
      })
      .catch(err => alert('OTP error: ' + err.message));
  };

  const verifyOTP = () => {
    window.confirmationResult
      .confirm(otp)
      .then(res => {
        setUser(res.user);
        setRole('customer'); // Always customer for phone login
        localStorage.setItem('role', 'customer');
        onClose();
      })
      .catch(() => alert('Invalid OTP'));
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(res => {
        setUser(res.user);
        setRole('customer'); // Always customer for Google login
        localStorage.setItem('role', 'customer');
        onClose();
      })
      .catch(() => alert('Google login failed'));
  };

  const loginWithEmailPassword = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async res => {
        setUser(res.user);
        const { data } = await fetchRole({ variables: { email: res.user.email } });
        const role = data?.getUserRole;

        if (role?.toLowerCase() === roleTab.toLowerCase()) {
          setRole(role);
          localStorage.setItem('role', role);
          onClose();
        } else {
          alert('Unauthorized email for this role');
          auth.signOut();
        }
      })
      .catch(() => alert('Login failed'));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Login</h2>
        <div className="tab-buttons">
          <button onClick={() => setRoleTab('customer')}>Customer</button>
          <button onClick={() => setRoleTab('employee')}>Employee</button>
          <button onClick={() => setRoleTab('admin')}>Admin</button>
        </div>

        {roleTab === 'customer' && (
          <>
            <input type="tel" value={phone} placeholder="Phone" onChange={e => setPhone(e.target.value)} />
            {isOtpSent && (
              <input type="text" value={otp} placeholder="OTP" onChange={e => setOtp(e.target.value)} />
            )}
            {!isOtpSent ? (
              <button onClick={sendOTP}>Send OTP</button>
            ) : (
              <button onClick={verifyOTP}>Verify OTP</button>
            )}
            <div id="recaptcha" style={{ display: 'none' }}></div>
            <div className="divider">or</div>
            <button className="google-btn" onClick={loginWithGoogle}>
              Sign in with Google
            </button>
          </>
        )}

        {(roleTab === 'admin' || roleTab === 'employee') && (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button onClick={loginWithEmailPassword}>Login</button>
          </>
        )}

        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
