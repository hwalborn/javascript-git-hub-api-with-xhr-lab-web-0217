
/////Repo Shit/////
function getRepositories(){
  let user = document.getElementById('username').value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", `https://api.github.com/users/${user}/repos`)
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + '</li>' +
    '<li>' + r.owner.login + '</li>' + '<li><a href =' + r.html_url +
    '>this repo</a></li>' + '<li>' + r.name +
    ' - <a href="#" data-repo="' + r.name +
    '" onclick="getCommits(this)">Get Commits</a></li>' + '<li>' + r.name +
    ' - <a href="#" data-repo="' + r.name +
    '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

/////Commit Shit/////
function getCommits(el) {
  let user = el.dataset.username
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayCommits)
  req.open("GET", `https://api.github.com/repos/${user}/${name}/commits`)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(r => '<li>'
    + r.commit.author.name + '</li><li>' + r.author.login +
    '</li><li>' + r.commit.message + '</li>').join('')}</ul>`
  document.getElementById('details').innerHTML = commitsList
}

/////Branch Shit/////
function getBranches(el) {
  let user = el.dataset.username
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayBranches)
  req.open("GET", `https://api.github.com/repos/${user}/${name}/branches`)
  req.send()
}

function displayBranches (){
  const branches = JSON.parse(this.responseText)
  const branchList = `<ul>${branches.map(branch => '<li>' +
    branch.name + '</li><li>').join('')}</ul>`
    document.getElementById('details').innerHTML = branchList
}
