function createCard(name, description, pictureUrl, starts, ends, location) {
    return `
        <div class="col mb-3">
            <div class="card shadow p-3 mb-5 bg-body-tertiary rounded">
                <img src="${pictureUrl}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <h6>${location}</h6>
                    <p class="card-text">${description}</p>
                </div>
                <div class="card-footer"><small class="text-muted">${starts} - ${ends}</div></small></div>
        </div>
    `;

}

function dateTranslation(d) {
    return `${d.getUTCMonth() + 1}/${d.getUTCDate()}/${d.getUTCFullYear()}`;
}

function errorAlert() {
    return `
        <div class="col-md-12 mt-2 alert alert-warning full-width-div" role="alert">No conferences to show. Please contact a site administrator.</div>
    `;
}

window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

      try {
        const response = await zfetch(url);

        if (!response.ok) {
            const errorHtml = errorAlert();
            const error = document.querySelector('.row');
            error.innerHTML += errorHtml;
            console.log("Response error.")
        } else {
            const data = await response.json();

            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                    const details = await detailResponse.json();

                    const name = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    const location = details.conference.location.name;

                    const startDate = new Date(details.conference.starts);
                    const starts = dateTranslation(startDate);
                    const endDate = new Date(details.conference.ends);
                    const ends = dateTranslation(endDate);

                    const html = createCard(name, description, pictureUrl, starts, ends, location);
                    const column = document.querySelector('.row');
                    column.innerHTML += html;

                }
            }
        }
    } catch (e) {
        const errorHtml = errorAlert();
        const error = document.querySelector('.row');
        error.innerHTML += errorHtml;
        console.log("Javascript error.")
    }


  });



  // could be useful to for ACL to make sure that the start/end date has the correct form
