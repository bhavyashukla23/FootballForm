const emailswitch = document.getElementById("emailswitch");
const username = document.getElementById("username");
const address1 = document.getElementById("address");
const email = document.getElementById("email");
const country_code = document.getElementById("country_code");
const inputCountry = document.getElementById("inputCountry");
const inputState = document.getElementById("inputState");
const inputCity = document.getElementById("inputCity");
const submitbutton = document.getElementById("submitbutton");
const age = document.getElementById("age");
const pno = document.getElementById("pno");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const pin = document.getElementById("pin");
// desired team
const teams = document.getElementsByName("teams");
// desired position
const positions = document.getElementsByName("positions");

const form = document.getElementById("form");

// array for submit validation
const arrValidate = [
  { id: "fname", isValid: false },
  { id: "username", isValid: true },
  { id: "lname", isValid: true },
  { id: "pno", isValid: false },
  { id: "email", isValid: false },
  { id: "age", isValid: false },
  { id: "teams", isValid: false },
  { id: "positions", isValid: false },
  { id: "address", isValid: true },
  { id: "pin", isValid: true },
  { id: "inputCountry", isValid: false },
  { id: "inputState", isValid: false },
  { id: "inputCity", isValid: false },
];

// TOGGLE SWITCH
// emailswitch.addEventListener("change", () =>)......can also be used
emailswitch.addEventListener("click", () => {
  if (email.hasAttribute("disabled")) email.removeAttribute("disabled");
  else email.setAttribute("disabled", "");
});

// Country dial codes
fetch("https://countriesnow.space/api/v0.1/countries/codes")
  .then((response) => response.json())
  .then((data) => {
    // data.data and not data.data.dial_code as dail_code is not an array so it cannot be mapped
    data.data.map((country) => {
      const option = document.createElement("option");
      option.innerText =
        country.dial_code.padEnd(15, "\u00A0") + "-" + country.name;
      country_code.append(option);
    });
  });

// to get all the countries
document.addEventListener("DOMContentLoaded", () => {
  fetch("https://countriesnow.space/api/v0.1/countries")
    .then((response) => response.json())
    .then((data) => {
      data.data.map((country) => {
        const option = document.createElement("option");
        option.innerText = country.country;
        inputCountry.append(option);
      });
    });
});

//   Enter state
inputCountry.addEventListener("change", () => {
  fetch("https://countriesnow.space/api/v0.1/countries/states", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      country: inputCountry.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // to remove the previous validation just in case we decide to sitch between options
      inputState.classList.remove("is-valid");
      inputState.classList.remove("is-Invalid");
      while (inputState.firstChild) {
        inputState.firstChild.remove();
      }
      inputCity.classList.remove("is-valid");
      inputCity.classList.remove("is-Invalid");
      while (inputCity.firstChild) {
        inputCity.firstChild.remove();
      }
      const option = document.createElement("option");
      option.innerText = "Choose...";
      inputState.append(option);

      data.data.states.map((state) => {
        const option = document.createElement("option");
        option.innerText = state.name;
        inputState.append(option);
      });
    });
});

// Enter city
inputState.addEventListener("change", () => {
  fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      country: inputCountry.value,
      state: inputState.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      inputCity.classList.remove("is-valid");
      inputCity.classList.remove("is-Invalid");
      while (inputCity.firstChild) {
        inputCity.firstChild.remove();
      }
      const option = document.createElement("option");
      option.innerText = "Choose...";
      inputCity.append(option);
      data.data.map((data) => {
        const option = document.createElement("option");
        option.innerText = data;
        inputCity.append(option);
      });
    });
});

// VALIDATIONS

let message;
const validateemail = () => {
  if (email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    email.setAttribute("class", "form-control is-valid");
    submitvalidate("email", true);
  }
  // email.setAttribute("attribute-name", "attribute value")//set attribute removes the previous value and sets the value being passed to it
  else {
    email.setAttribute("class", "form-control is-invalid");
  }
};
email.addEventListener("input", validateemail);

// Phone number validation
const validatePhone = () => {
  if (pno.value.match(/^[1-9][0-9]{9}$/)) {
    pno.setAttribute("class", "form-control is-valid");
    submitvalidate("pno", true);
  } else {
    pno.setAttribute("class", "form-control is-invalid");
  }
};
pno.addEventListener("input", validatePhone);

// First name validation
const validateFname = () => {
  if (fname.value.match(/^[A-Z][a-z]{0,20}$/)) {
    fname.setAttribute("class", "form-control is-valid");
    submitvalidate("fname", true);
  } else {
    fname.setAttribute("class", "form-control is-invalid");
  }
};
fname.addEventListener("input", validateFname);

// Last name validation
const validateLname = () => {
  if (lname.value.match(/^[A-Z][a-z]{0,20}$/)) {
    lname.setAttribute("class", "form-control is-valid");
    submitvalidate("lname", true);
  } else {
    lname.setAttribute("class", "form-control is-invalid");
  }
};
lname.addEventListener("input", validateLname);

// Pin Code validation
const validatePin = () => {
  if (pin.value.match(/^[1-9][0-9]{5}$/)) {
    pin.setAttribute("class", "form-control is-valid");
    submitvalidate("pin", true);
  } else {
    pin.setAttribute("class", "form-control is-invalid");
  }
};
pin.addEventListener("input", validatePin);

// age validation
const validateAge = () => {
  if (age.value !== "") {
    age.setAttribute("class", "form-control text-secondary is-valid");
    submitvalidate("age", true);
  } else {
    age.setAttribute("class", "form-control text-secondary is-invalid");
    submitvalidate("age", false);
  }
};
age.addEventListener("change", validateAge);

// country validation
const validateCountry = () => {
  if (inputCountry.value !== "") {
    inputCountry.setAttribute("class", "form-control text-secondary is-valid");
    submitvalidate("inputCountry", true);
  } else {
    inputCountry.setAttribute(
      "class",
      "form-control text-secondary is-invalid"
    );
    submitvalidate("inputCountry", false);
  }
};
inputCountry.addEventListener("change", validateCountry);

// State validation
const validateState = () => {
  if (inputState.value !== "") {
    inputState.setAttribute("class", "form-control text-secondary is-valid");
    submitvalidate("inputState", true);
  } else {
    inputState.setAttribute("class", "form-control text-secondary is-invalid");
    submitvalidate("inputState", false);
  }
};
inputState.addEventListener("change", validateState);

// City validation
const validateCity = () => {
  if (inputCity.value !== "") {
    inputCity.setAttribute("class", "form-control text-secondary is-valid");
    submitvalidate("inputCity", true);
  } else {
    inputCity.setAttribute("class", "form-control text-secondary is-invalid");
    submitvalidate("inputCity", false);
  }
};
inputCity.addEventListener("change", validateCity);

// team validation
const validateTeam = () => {
  if (Array.from(teams).find((team) => team.checked)) {
    teams.forEach((team) =>
      team.setAttribute("class", "form-check-input is-valid")
    );
    submitvalidate("teams", true);
  } else {
    teams.forEach((team) =>
      team.setAttribute("class", "form-check-input is-invalid")
    );
    submitvalidate("teams", false);
  }
};
teams.forEach((team) => team.addEventListener("change", validateTeam));

// position validation
const validatePosition = () => {
  if (Array.from(positions).find((position) => position.checked)) {
    positions.forEach((position) =>
      position.setAttribute("class", "form-check-input is-valid")
    );
    submitvalidate("positions", true);
  } else {
    positions.forEach((position) =>
      position.setAttribute("class", "form-check-input is-invalid")
    );
    submitvalidate("positions", false);
  }
};
positions.forEach((position) =>
  position.addEventListener("change", validatePosition)
);

// Submit button activation
function submitvalidate(id, status) {
  arrValidate.forEach((element) => {
    // == can also be used but === is used for checking value as well as its type
    element.id === id ? (element.isValid = status) : "";
  });
  if (arrValidate.find((elt) => elt.isValid === false)) {
    console.log(id, status);
  } else {
    console.log("disabled");
    submitbutton.removeAttribute("disabled");
    //  POST
  }
}
// Event listener for form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  newfeed();
});

const getPosition = () => {
  const position = Array.from(positions)
    .filter((pos) => pos.checked)
    .map((pos) => pos.value)
    .join(" ");
  return position ? position : null;
};
const getTeam = () => {
  const dteam = Array.from(teams).filter((team) => team.checked)[0];
  return dteam ? dteam.value : null;
};

var getUserData = () => ({
  username: username.value,
  firstname: fname.value,
  lastname: lname.value,
  ccode: country_code.value,
  phone: pno.value,
  email: email.value,
  age_group: age.value,
  team: getTeam(),
  position: getPosition(),
  address: address1.value,
  pin_code: pin.value,
  country: inputCountry.value,
  states: inputState.value,
  city: inputCity.value,
});

const fillData = (userData) => {
  username.value = userData.username;
  fname.value = userData.firstname;
  lname.value = userData.lastname;
  country_code.value = userData.ccode;
  pno.value = userData.phone;
  email.value = userData.email;
  age.value = userData.age_group;

  Array.from(teams).find((team) => team.value == userData.team).checked = true;

  const matchedPositions = userData.position.split(" ");
  matchedPositions.forEach(
    (pos) =>
      (Array.from(positions).find((val) => val.value === pos).checked = true)
  );
  address1.value = userData.address;
  pin.value = userData.pin_code;
  inputCountry.value = userData.country;

  //for state retrieval
  fetch("https://countriesnow.space/api/v0.1/countries/states", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      country: inputCountry.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // to remove the previous validation just in case we decide to sitch between options
      inputState.classList.remove("is-valid");
      inputState.classList.remove("is-Invalid");
      while (inputState.firstChild) {
        inputState.firstChild.remove();
      }
      inputCity.classList.remove("is-valid");
      inputCity.classList.remove("is-Invalid");
      while (inputCity.firstChild) {
        inputCity.firstChild.remove();
      }
      const option = document.createElement("option");
      option.innerText = "Choose...";
      inputState.append(option);

      data.data.states.map((state) => {
        const option = document.createElement("option");
        option.innerText = state.name;
        inputState.append(option);
      });
      inputState.value = userData.states;

      //           for city retrieval
      fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country: inputCountry.value,
          state: inputState.value,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          inputCity.classList.remove("is-valid");
          inputCity.classList.remove("is-Invalid");
          while (inputCity.firstChild) {
            inputCity.firstChild.remove();
          }
          const option = document.createElement("option");
          option.innerText = "Choose...";
          inputCity.append(option);
          data.data.map((data) => {
            const option = document.createElement("option");
            option.innerText = data;
            inputCity.append(option);
          });
          inputCity.value = userData.city;
          console.log(userData.city);
        });
    });
};

//GET
var getfunc = (username) => {
  fetch(`/hello?username=${username}`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.status) {
        console.log(data);
        alert("User already exists!!");
        retrievebutton.removeAttribute("disabled");
        retrievebutton.onclick = function () {
          fillData(data);
          alert("Your data is here!!");
        };
        updateButton.removeAttribute("disabled");
        updateButton.onclick = function () {
          update(username);
        };
      } else retrievebutton.setAttribute("disabled", "");
    })

    .catch((error) => {
      // console.error(`Network error - ${error}`);
      submitbutton.setAttribute("disabled", "");
    });
};

//  POST
var newfeed = () => {
  fetch("/hello", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getUserData()),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert(data.message);
      if (data.status === 201) alert("User created");
      else alert("Registration failed");
    })
    .catch((error) => {
      // alert("Network error");
    });
};

//PUT
var update = (username) => {
  fetch(`/hello?username=${username}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getUserData()),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert("Data has been updated!!");
    })
    .catch((error) => {
      // alert("Network error");
    });
};

username.oninput = function () {
  getfunc(username.value);
};
