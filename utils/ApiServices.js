export const ApiServices = {
  on_login: async ({ email, password, UserCookie }) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", UserCookie);

    var raw = JSON.stringify({
      email: email,
      password: password
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    return fetch(
      "https://market-place-main.onrender.com/auth/signin",
      requestOptions
    ).then((response) => response.json());
  },

  on_register: async ({
    name,
    email,
    account_verification,
    account_type,
    phone,
    UserCookie,
    password
  }) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", UserCookie);

    var raw = JSON.stringify({
      name: name,
      email: email,
      account_verification: account_verification,
      account_type: account_type,
      phone: phone,
      password: password
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    return fetch(
      "https://market-place-main.onrender.com/api/users",
      requestOptions
    ).then((response) => response.json());
  },

  on_post_house: async ({
    streetName,
    amount,
    description,
    images,
    contactNumber,
    location
  }) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      streetName: streetName,
      amount: amount,
      description: description,
      images: images,
      contactNumber: contactNumber,
      location: location
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    return fetch(
      "https://market-place-main.onrender.com/places",
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed with status code " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
