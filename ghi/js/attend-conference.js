window.addEventListener('DOMContentLoaded', async () => {
    const selectTag = document.getElementById('conference');

    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();

        for (let conference of data.conferences) {
            const option = document.createElement('option');
            option.value = conference.href;
            option.innerHTML = conference.name;
            selectTag.appendChild(option);
        }

        let div = document.querySelector(".spinner-grow");
        div.classList.add("d-none");
        let select = document.querySelector("#conference");
        select.classList.toggle("d-none");

        const formTag = document.getElementById("create-attendee-form");
        formTag.addEventListener("submit", async event => {
            event.preventDefault();
            const formData = new FormData(formTag);
            const json = JSON.stringify(Object.fromEntries(formData));
            const attendeeUrl = 'http://localhost:8001/api/attendees/';

            const fetchConfig = {
                method: "post",
                body: json,
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(attendeeUrl, fetchConfig);
            if (response.ok) {
                const newAttendee = await response.json();
                console.log("new attendee:", newAttendee);
                let div = document.querySelector("#success-message");
                div.classList.remove("d-none");
                let form = document.querySelector("#create-attendee-form");
                form.classList.add("d-none")
            }

        });


    }



  });
