import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAHdbvqrttaGhKf0imy7q6k560KAAOk2aU",
    authDomain: "sulok-beach.firebaseapp.com",
    projectId: "sulok-beach",
    storageBucket: "sulok-beach.appspot.com",
    messagingSenderId: "234710762630",
    appId: "1:234710762630:web:5c8b56cbe84a28593d3d07"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  firebase.initializeApp(firebaseConfig);

  import {
    getFirestore, doc, getDoc, collection, addDoc, setDoc, updateDoc, deleteDoc, deleteField, onSnapshot
  }
  from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
  
  const db = getFirestore();
  const client = firebase.firestore();

  const BookSubmit = document.getElementById('book-submit');
  
  function checkbooked(){
    let cottageGoodFor=[];
    let cottageID;
    let adult = document.getElementById('selectadult').value
    let child = document.getElementById('selectchild').value
    let container;
    let cottageData = [];
    client.collection("avail-cottage").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((data) => {
        cottageData = data.data();
        cottageID = data.id;
        cottageGoodFor.push({ ...cottageData,cottageID});
  })
    container = Number.parseFloat(adult) + Number.parseFloat(child);
        // Hide all cottages initially
    document.getElementById('availheader').style.display = "none";
    document.getElementById('availheader-span').style.display = "none";
    document.getElementById('available-cottage').style.display = "none";
    document.getElementById('cottage1').style.display = "none";
    document.getElementById('cottage2').style.display = "none";
    document.getElementById('cottage3').style.display = "none";
    document.getElementById('cottage4').style.display = "none";
    let count = 0;

    cottageGoodFor.forEach((data) => {
        

        if (container <= data.GoodFor && data.isAvail === true) {
            // Common styling for all cottages
            document.getElementById('availheader').style.display = "flex";
            document.getElementById('available-cottage').style.display = "flex";
            document.getElementById('availheader-span').style.display = "flex";
            document.getElementById('user-booking').style.top = "50%";

            // Determine which cottage to display based on data.cottageID
            switch (data.cottageID) {
                case "cottage-1":
                    document.getElementById('cottage1').style.display = "flex";
                    break;
                case "cottage-2":
                    document.getElementById('cottage2').style.display = "flex";
                    break;
                case "cottage-3":
                    document.getElementById('cottage3').style.display = "flex";
                    break;
                case "cottage-4":
                    document.getElementById('cottage4').style.display = "flex";
                    break;
                default:
                    // Handle the case when no matching cottage is available
                    break;
            }
        } else {
            count++; // Increment count
        }
        if (count == cottageGoodFor.length) {
            swal("info", "No available Cottage", "info");
        }

        
    });

  })
  }
  function checkreserved(){
    let cottageGoodFor=[];
    let cottageID;
    let adult = document.getElementById('reserved_selectadult').value
    let child = document.getElementById('reserved_selectchild').value
    let container;
    let cottageData = [];
    client.collection("avail-cottage").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((data) => {
        cottageData = data.data();
        cottageID = data.id;
        cottageGoodFor.push({ ...cottageData,cottageID});
  })
    container = Number.parseFloat(adult) + Number.parseFloat(child);
    console.log(container);
    document.getElementById('reservedavailable-cottage').style.display = "none";
    document.getElementById('reservedcottage1').style.display = "none";
    document.getElementById('reservedcottage2').style.display = "none";
    document.getElementById('reservedcottage3').style.display = "none";
    document.getElementById('reservedcottage4').style.display = "none";
    let count = 0;

    cottageGoodFor.forEach((data) => {
        

        if (container <= data.GoodFor && data.isAvail === true) {
            document.getElementById('reservedavailable-cottage').style.display = "flex";
            document.getElementById('reserved-container').style.marginTop = "200px";
            document.getElementById('price-container').style.marginTop = "180px";


            // Determine which cottage to display based on data.cottageID
            switch (data.cottageID) {
                case "cottage-1":
                    document.getElementById('reservedcottage1').style.display = "flex";
                    window.scrollBy(0, 220);
                    break;
                case "cottage-2":
                    document.getElementById('reservedcottage2').style.display = "flex";
                    window.scrollBy(0, 220);
                    break;
                case "cottage-3":
                    document.getElementById('reservedcottage3').style.display = "flex";
                    window.scrollBy(0, 220);
                    break;
                case "cottage-4":
                    document.getElementById('reservedcottage4').style.display = "flex";
                    window.scrollBy(0, 220);
                    break;
                default:
                    // Handle the case when no matching cottage is available
                    break;
            }
        } else {
            count++; // Increment count
        }
        if (count == cottageGoodFor.length) {
            swal("info", "No available Cottage", "info");
        }

        
    });

  })
  }
  reserved_submit.addEventListener('click',function(){
    if(document.getElementById('reservedcheck-in').value ==="" && document.getElementById('reservedcheck-out').value===""){
        swal("Error!", "Please select check-in aswell the check-out, Thank you!", "error")
    }else{
        checkreserved();
    }
})
  BookSubmit.addEventListener('click',function(){
    if(document.getElementById('formcheck-in').value ==="" && document.getElementById('formcheck-out').value===""){
        swal("Error!", "Please select check-in aswell the check-out, Thank you!", "error")
    }else{
        checkbooked();
    }
    
})
const reloadCottage = document.getElementById('reload-cottage');
reloadCottage.addEventListener('click',function(){
    checkbooked();
})

const bookform_submit = document.getElementById('bookform-submit');
bookform_submit.addEventListener('click', function() {
    const form = document.getElementById('book-fillup');
    try {
        const toSaveDoc = doc(db, "avail-cottage", isAvail);
        setDoc(toSaveDoc, {
            GoodFor: GoodFor,
            isAvail: false,
            person: document.getElementById('bookform-username').value,
            email: document.getElementById('bookform-email').value,
            contact: document.getElementById('bookform-contactnum').value,
            GcashRef: document.getElementById('bookform-gcashref').value,
            address: document.getElementById('bookform-address').value,
            message: document.getElementById('bookform-message').value,
            check_in: document.getElementById('formcheck-in').value,
            check_out: document.getElementById('formcheck-out').value,
        });
        
        isAvail = "";
        form.reset();
        form.style.display="none";
        swal({
            title: "Great!",
            text: "Reservation is saved successfully!",
            icon: "success",
        })
    } catch (error) {
        alert(error);
        swal("Error!", "Saving reservation failed", "error");
    }
});
