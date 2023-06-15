import emailjs from 'emailjs-com';
const EmailOtp = (email,Name='') => {
    const OTP = Math.floor(Math.random() * 1000000 + 1);
    // const msg = 'Your OTP for verification is ' + OTP;
    // var templateParams = {
    //   name: Name,
    //   email: email,
    //   subject: 'OTP for account verification',
    //   message: msg,
    // };
    var templateParams = {
      from_name: "Reverr",
      to_name: Name,
      to_email: email,
      otp:OTP,
    };
    emailjs.init('user_FR6AulWQMZry87FBzhKNu');
    emailjs
      .send('service_lfmmz8k', 'template_n3pcht5', templateParams)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    console.log(templateParams, 'send email');

    return OTP;
  };

  export {EmailOtp};