const projects = [];

function addProject(event) {
  event.preventDefault();

  const inputProjectTitle = document.getElementById("input-project-title").value;
  const inputProjectDescription = document.getElementById("input-project-description").value;
  const inputProjectImage = document.getElementById("input-project-image").files;
  // const inputProjectDescription = document.getElementById("input-project-description").value;
  // const inputProjectDescription = document.getElementById("input-project-description").value;

  const image = URL.createObjectURL(inputProjectImage[0]);

  const project = {
    title: inputProjectTitle,
    description: inputProjectDescription,
    createdAt: new Date(),
    image: image,
  };

  projects.unshift(project);
  console.log(projects);
  renderProject();
}

function renderProject() {
  let html = ``;

  for (let index = 0; index < projects.length; index++) {
    html += `<div class="project-list-item">
          <div class="project-image">
            <img src="${projects[index].image}" alt="" />
          </div>
          <div class="project-description">
            <div class="btn-group">
              <button class="btn-edit">Edit Post</button>
              <button class="btn-post" onclick="deleteProject(${index})">Delete Post</button>
            </div>
            <h1>
              <a href="project-detail.html" target="_blank"
                >${projects[index].title}</a
              >
            </h1>
            <div class="detail-project-description">
                ${getFullTime(projects[index].createdAt)} | Ichsan Emrald Alamsyah
            </div>
            <p>
              ${projects[index].description}
            </p>
            <p>
                ${getDistanceTime(projects[index].createdAt)}
            </p>
          </div>
        </div>`;
  }

  document.getElementById("descriptions").innerHTML = html;
}

function deleteProject(index) {
  projects.splice(index, 1);
  renderProject();
}

function getFullTime(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const tanggal = date.getDate();
  const bulan = months[date.getMonth()];
  const tahun = date.getFullYear();

  let jam = date.getHours();
  let menit = date.getMinutes();

  if (jam < 10) {
    jam = "0" + jam;
  }

  if (menit < 10) {
    menit = "0" + menit;
  }

  return `${tanggal} ${bulan} ${tahun} ${jam}:${menit} WIB`;
}

function getDistanceTime(timePost) {
  const timeNow = new Date();
  const distance = timeNow - timePost; // hasilnya miliseconds -> 1000ms = 1 detik

  const seconds = Math.floor(distance / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const day = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 60) {
    return `${hours} hours ago`;
  } else if (day < 24) {
    return `${day} day ago`;
  }
}
