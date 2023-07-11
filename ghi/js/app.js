window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            // Figure out what to do when the response is bad
        } else {
            const data = await response.json();

            const conference = data.conferences[0];
            const nameTag = document.querySelector('.card-title');
            nameTag.innerHTML = conference.name;

            const detailUrl = `http://localhost:8000${conference.href}`;
            const detailResponse = await fetch(detailUrl);
            if (detailResponse.ok) {
                const details = await detailResponse.json();
                const description = details.conference.description;
                const detailTag = document.querySelector('.card-text');
                const picture_url = details.conference.location.picture_url;
                detailTag.innerHTML = description;
                const imageTag = document.querySelector('.card-img-top');
                imageTag.src = picture_url;
            }
        }
    } catch (e) {
      // Figure out what to do if an error is raised
    }


  });
