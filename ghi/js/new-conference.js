window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/locations/';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.log("Response error. New-conference.js")
        } else {
            const data = await response.json();
            const selectTag = document.getElementById("location");
            for (let location of data.locations) {
                const lst = (location.href).split("/")
                const id = lst[lst.length -2]
                const option = document.createElement("option")
                option.value = id;
                option.innerHTML = location.name;
                selectTag.appendChild(option);
            }

            const formTag = document.getElementById("create-conference-form");
            formTag.addEventListener("submit", async event => {
                event.preventDefault();
                const formData = new FormData(formTag);
                const json = JSON.stringify(Object.fromEntries(formData));
                const conferenceUrl = 'http://localhost:8000/api/conferences/';

                const fetchConfig = {
                    method: "post",
                    body: json,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                const response = await fetch(conferenceUrl, fetchConfig);
                if (response.ok) {
                    console.log("jello")
                    formTag.reset();
                    const newConference = await response.json();
                    console.log("new conference:", newConference);
                }

            });


        }

    } catch (e) {
        console.log("Javascript error. See new-conference.js")
    }


  });
