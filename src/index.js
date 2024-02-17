
const wheel = document.querySelector('.wheel');
const spinBtn = document.querySelector('.spin-btn');
const prizeSpan = document.querySelectorAll('.amount span');
const couponCode = document.getElementById('coupon-code');
const couponBtn = document.getElementById('coupon-btn');
const wheelContainer = document.querySelector('.container');
const couponContainer = document.querySelector('.coupon-container');
const spinningAudio = document.getElementById('wheel-spinning');
const cheerAudio = document.getElementById('cheering');
const couponForm = document.getElementById('couponForm');

function handleSubmit(event) {
  event.preventDefault();

  const userid = useridInput.value;
  const zoneid = zoneidInput.value;

  if (userid === zoneid) {
      swal("Terima kasih!", "Anda sudah menggunakan ini", "success");

     
      setTimeout(() => {
          window.location.href = "banner.html";
      }, 3000);
  } else {
      swal("Oops!", "User ID dan Zone ID harus diisi.", "error");
  }
}


couponForm.addEventListener('submit', handleSubmit);


// Array to store the prize values
let prizes = []; 

// Message variable to display the prize won
let message = "";

// Counter variable to keep track of spins
let counter = 0;

// Storing the prize values in reverse order
prizeSpan.forEach((prize) => {
  prizes.unshift(prize.innerText);
});

//  rotation Spinner
wheel.style.transform = `rotate(+24.5deg)`;


const hasCouponApplied = localStorage.getItem('couponApplied') === 'true';


spinBtn.addEventListener('click', () => {
 

  wheel.style.transition = "transform 5s ease-in-out";
  spinBtn.classList.remove('inOut');

  counter++;
  spinningAudio.play();

 
  let val = 0;
  if (counter > 1) {
    val += Math.ceil(Math.random() * 3600);
  } else {
    val += 170;
  }


  const spinInterval = setInterval(() => {
    wheel.style.transform = `rotate(${val}deg)`;
  }, 500);

 
  setTimeout(() => {
    clearInterval(spinInterval);
    spinningAudio.pause();
    spinBtn.classList.add('inOut');

   // Presentasi Jika Menang
val = Math.floor((val % 360) / 45) % 8;

if (prizes[val] !== "Try Again") {
  message = "Congratulations, kamu beruntung " + prizes[val];
  localStorage.setItem('spunWheel', 'true');
}

if (message !== "") {
//  mendapatkan code kupon 
  const couponCard = document.querySelector('.coupon-card h3');
  couponCard.innerText = message;
  wheelContainer.classList.toggle('hide');
  couponContainer.classList.toggle('hide');

  // kembali ke banner 
  setTimeout(() => {
    swal("Terima kasih!", "Anda sudah menggunakan ini", "success");
    
    window.location.href = "banner.html";
  }, 10000);
} else {
  // Jika kalah 
  alert('Please Try Again...!');
  wheel.style.transition = "";
  initialState();
}
  }, 5000);
});




